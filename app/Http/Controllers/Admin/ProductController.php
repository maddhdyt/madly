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
                return $query->where('name', 'like', '%' . $search . '%');
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
                $allProducts = Product::where('service_id', $serviceId)->get();
                foreach ($service->product_schema as $field) {
                    if (!in_array($field['type'] ?? '', ['tags', 'label'])) {
                        continue;
                    }
                    $fieldName = $field['name'];
                    $values = [];
                    foreach ($allProducts as $product) {
                        $val = $product->attributes[$fieldName] ?? null;
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
            'services' => Service::orderBy('name')->get(),
            'activeFilters' => $activeFilters,
            'filterOptions' => $filterOptions
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'hpp' => 'required|numeric|min:0',
            'status_note' => 'nullable|string',
            'service_id' => 'required|exists:services,id',
            'attributes' => 'nullable|array'
        ]);

        Product::create($validated);

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'hpp' => 'required|numeric|min:0',
            'status_note' => 'nullable|string',
            'service_id' => 'required|exists:services,id',
            'attributes' => 'nullable|array'
        ]);

        $product->update($validated);

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        // Check if product is used in any pricelist before deleting
        if ($product->prices()->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete product because it is associated with a pricelist package.');
        }

        $product->delete();
        return redirect()->back()->with('success', 'Product deleted successfully.');
    }
}
