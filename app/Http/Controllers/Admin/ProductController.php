<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $serviceId = $request->input('service_id');
        $activeFilters = $request->input('filters', []);
        $search = $request->input('search');
        
        $products = Product::with('service')
            ->when($serviceId && $serviceId !== 'all', function($query) use ($serviceId) {
                return $query->where('service_id', $serviceId);
            })
            ->when($search, function($query) use ($search) {
                return $query->where(function($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                      ->orWhere('attributes', 'like', '%' . $search . '%');
                });
            })
            ->when(!empty($activeFilters) && is_array($activeFilters), function($query) use ($activeFilters) {
                foreach ($activeFilters as $key => $value) {
                    if (!empty($value)) {
                        // Dynamically filter inside the JSON attributes column using LIKE
                        $query->where('attributes->' . $key, 'like', '%' . $value . '%');
                    }
                }
            })
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        $filterOptions = [];
        if ($serviceId && $serviceId !== 'all') {
            $service = Service::find($serviceId);
            if ($service && !empty($service->product_schema)) {
                $allAttributes = Product::where('service_id', $serviceId)->pluck('attributes');
                foreach ($service->product_schema as $field) {
                    if (!in_array($field['type'] ?? '', ['tags', 'label'])) {
                        continue;
                    }
                    $fieldName = $field['name'];
                    $values = [];
                    foreach ($allAttributes as $attributes) {
                        $val = $attributes[$fieldName] ?? null;
                        if (!empty($val)) {
                            $parts = explode(',', (string)$val);
                            foreach ($parts as $part) {
                                $cleaned = trim($part);
                                if (!empty($cleaned) && strlen($cleaned) < 60) {
                                    $values[] = $cleaned;
                                }
                            }
                        }
                    }
                    $uniqueVals = collect($values)->unique()->sort()->values()->toArray();
                    if (!empty($uniqueVals)) {
                        $filterOptions[$fieldName] = $uniqueVals;
                    }
                }
            }
        }

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'services' => \Illuminate\Support\Facades\Cache::remember('master_services', 86400, function() { return Service::orderBy('name')->get(); }),
            'activeFilters' => $activeFilters,
            'filterOptions' => $filterOptions
        ]);
    }

    private function calculateHppFromUsd(array &$validated)
    {
        if (!empty($validated['attributes']['hpp_usd'])) {
            $rate = \Illuminate\Support\Facades\Cache::remember('usd_to_idr', 43200, function () {
                try {
                    $response = \Illuminate\Support\Facades\Http::timeout(3)->get('https://open.er-api.com/v6/latest/USD');
                    if ($response->successful()) {
                        return $response->json('rates.IDR', 16000);
                    }
                } catch (\Exception $e) {
                }
                return 16000;
            });
            $usdPrice = (float) $validated['attributes']['hpp_usd'];
            $validated['hpp'] = round($usdPrice * $rate);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'hpp' => 'required|numeric|min:0',
            'min_price' => 'nullable|numeric|min:0',
            'status_note' => 'nullable|string',
            'service_id' => 'required|exists:services,id',
            'attributes' => 'nullable|array'
        ]);

        $this->calculateHppFromUsd($validated);
        Product::create($validated);

        return redirect()->back()->with('success', 'Product created successfully.');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'hpp' => 'required|numeric|min:0',
            'min_price' => 'nullable|numeric|min:0',
            'status_note' => 'nullable|string',
            'service_id' => 'required|exists:services,id',
            'attributes' => 'nullable|array'
        ]);
        
        $this->calculateHppFromUsd($validated);

        $product->update($validated);

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {

        $product->delete();
        return redirect()->back()->with('success', 'Product deleted successfully.');
    }
}
