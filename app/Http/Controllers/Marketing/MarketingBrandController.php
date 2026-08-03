<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\MarketingBrand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarketingBrandController extends Controller
{
    public function index()
    {
        $brands = MarketingBrand::latest()->get();
        return Inertia::render('Marketing/Brands/Index', [
            'brands' => $brands
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:marketing_brands',
            'is_active' => 'boolean'
        ]);

        MarketingBrand::create($validated);

        return back()->with('success', 'Brand berhasil ditambahkan.');
    }

    public function update(Request $request, MarketingBrand $brand)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:marketing_brands,name,' . $brand->id,
            'is_active' => 'boolean'
        ]);

        $brand->update($validated);

        return back()->with('success', 'Brand berhasil diperbarui.');
    }

    public function destroy(MarketingBrand $brand)
    {
        $brand->delete();
        return back()->with('success', 'Brand berhasil dihapus.');
    }
}
