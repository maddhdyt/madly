<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PricelistController extends Controller
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
                return $query->where('name', 'like', '%' . $search . '%')
                             ->orWhere('attributes->focus_scope', 'like', '%' . $search . '%');
            })
            ->when(!empty($activeFilters) && is_array($activeFilters), function($query) use ($activeFilters) {
                foreach ($activeFilters as $key => $value) {
                    if (!empty($value)) {
                        $query->where('attributes->' . $key, 'like', '%' . $value . '%');
                    }
                }
            })
            ->orderBy('name')
            ->paginate(20)
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

        return Inertia::render('Admin/Pricelists/Index', [
            'products' => $products,
            'services' => \Illuminate\Support\Facades\Cache::remember('master_services', 86400, function() { return Service::orderBy('name')->get(); }),
            'activeFilters' => $activeFilters,
            'filterOptions' => $filterOptions
        ]);
    }

    public function bulkUpdate(Request $request)
    {
        $validated = $request->validate([
            'product_ids' => 'required|array',
            'product_ids.*' => 'exists:products,id',
            'target_field' => 'required|in:harga_jual_minimum_info,harga_jual_standar',
            'update_type' => 'required|in:fixed,percentage',
            'base_field' => 'nullable|in:hpp,harga_jual_minimum_info',
            'fixed_price' => 'nullable|numeric|min:0',
            'percentage_increase' => 'nullable|numeric',
        ]);

        $products = Product::whereIn('id', $validated['product_ids'])->get();

        DB::beginTransaction();
        try {
            foreach ($products as $product) {
                $attrs = $product->attributes ?? [];
                $targetField = $validated['target_field'];
                
                if ($validated['update_type'] === 'fixed') {
                    $attrs[$targetField] = $validated['fixed_price'];
                } else if ($validated['update_type'] === 'percentage') {
                    $baseAmount = 0;
                    if ($validated['base_field'] === 'hpp') {
                        $baseAmount = floatval($product->hpp);
                    } else if ($validated['base_field'] === 'harga_jual_minimum_info') {
                        $baseAmount = floatval($attrs['harga_jual_minimum_info'] ?? $product->hpp);
                    }
                    
                    $increase = $baseAmount * ($validated['percentage_increase'] / 100);
                    $attrs[$targetField] = $baseAmount + $increase;
                }

                $product->attributes = $attrs;
                $product->save();
            }
            DB::commit();
            return redirect()->back()->with('success', count($products) . ' products updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to update prices.');
        }
    }
}
