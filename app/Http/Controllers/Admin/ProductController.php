<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductPrice;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('brand', 'service', 'prices')->latest()->get();
        $products->each(function ($product) {
            if (!$product->includes) {
                $product->includes = [];
            }
            if (!$product->metadata) {
                $product->metadata = [];
            }
        });

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'brands' => Brand::orderBy('name')->get(),
            'services' => Service::orderBy('name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255',
            'description_snippet' => 'nullable|string',
            'category' => 'nullable|string',
            'service_id' => 'required|exists:services,id',
            'metadata' => 'nullable|array',
            'promo_header' => 'nullable|string',
            'footer_text' => 'nullable|string',
            'includes' => 'nullable|array',
            
            // Prices validation
            'prices' => 'required|array|min:1',
            'prices.*.package_name' => 'required|string',
            'prices.*.normal_price' => 'required|numeric',
            'prices.*.promo_price' => 'nullable|numeric',
            'prices.*.notes' => 'nullable|string',
        ]);

        $product = Product::create([
            'brand_id' => $validated['brand_id'],
            'name' => $validated['name'],
            'description_snippet' => $validated['description_snippet'],
            'category' => $validated['category'],
            'service_id' => $validated['service_id'],
            'metadata' => $validated['metadata'] ?? [],
            'promo_header' => $validated['promo_header'],
            'footer_text' => $validated['footer_text'],
            'includes' => $validated['includes'] ?? [],
        ]);

        foreach ($validated['prices'] as $price) {
            ProductPrice::create([
                'product_id' => $product->id,
                'package_name' => $price['package_name'],
                'normal_price' => $price['normal_price'],
                'promo_price' => $price['promo_price'] ?? null,
                'notes' => $price['notes'] ?? null,
            ]);
        }

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255',
            'description_snippet' => 'nullable|string',
            'category' => 'nullable|string',
            'service_id' => 'required|exists:services,id',
            'metadata' => 'nullable|array',
            'promo_header' => 'nullable|string',
            'footer_text' => 'nullable|string',
            'includes' => 'nullable|array',
            
            'prices' => 'required|array|min:1',
            'prices.*.package_name' => 'required|string',
            'prices.*.normal_price' => 'required|numeric',
            'prices.*.promo_price' => 'nullable|numeric',
            'prices.*.notes' => 'nullable|string',
        ]);

        $product->update([
            'brand_id' => $validated['brand_id'],
            'name' => $validated['name'],
            'description_snippet' => $validated['description_snippet'],
            'category' => $validated['category'],
            'service_id' => $validated['service_id'],
            'metadata' => $validated['metadata'] ?? [],
            'promo_header' => $validated['promo_header'],
            'footer_text' => $validated['footer_text'],
            'includes' => $validated['includes'] ?? [],
        ]);

        // Re-create prices
        $product->prices()->delete();
        foreach ($validated['prices'] as $price) {
            ProductPrice::create([
                'product_id' => $product->id,
                'package_name' => $price['package_name'],
                'normal_price' => $price['normal_price'],
                'promo_price' => $price['promo_price'] ?? null,
                'notes' => $price['notes'] ?? null,
            ]);
        }

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->back()->with('success', 'Product deleted successfully.');
    }
}
