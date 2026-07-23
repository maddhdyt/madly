<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductPrice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricelistController extends Controller
{
    public function index()
    {
        // Load all prices with their parent product and brand
        $prices = ProductPrice::with(['product', 'product.brand', 'product.service'])
            ->latest()
            ->get();
            
        // Load products for the creation dropdown
        $products = Product::with('brand')->orderBy('name')->get();

        return Inertia::render('Admin/Pricelists/Index', [
            'prices' => $prices,
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'package_name' => 'required|string',
            'normal_price' => 'required|numeric',
            'promo_price' => 'nullable|numeric',
            'notes' => 'nullable|string',
        ]);

        ProductPrice::create($validated);

        return redirect()->route('admin.pricelists.index')->with('success', 'Price package added successfully.');
    }

    public function update(Request $request, ProductPrice $pricelist)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'package_name' => 'required|string',
            'normal_price' => 'required|numeric',
            'promo_price' => 'nullable|numeric',
            'notes' => 'nullable|string',
        ]);

        $pricelist->update($validated);

        return redirect()->route('admin.pricelists.index')->with('success', 'Price package updated successfully.');
    }

    public function destroy(ProductPrice $pricelist)
    {
        $pricelist->delete();
        return redirect()->back()->with('success', 'Price package deleted successfully.');
    }
}
