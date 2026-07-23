<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::withCount('products')->latest()->get();

        return Inertia::render('Admin/Brands/Index', [
            'brands' => $brands,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        // Check if slug already exists to prevent duplicate key errors
        if (Brand::where('slug', $validated['slug'])->exists()) {
            return redirect()->back()->withErrors(['name' => 'Brand with this name already exists.'])->withInput();
        }

        Brand::create($validated);

        return redirect()->route('admin.brands.index')->with('success', 'Brand created successfully.');
    }

    public function update(Request $request, Brand $brand)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        if (Brand::where('slug', $validated['slug'])->where('id', '!=', $brand->id)->exists()) {
            return redirect()->back()->withErrors(['name' => 'Brand with this name already exists.'])->withInput();
        }

        $brand->update($validated);

        return redirect()->route('admin.brands.index')->with('success', 'Brand updated successfully.');
    }

    public function destroy(Brand $brand)
    {
        if ($brand->products()->count() > 0) {
            return redirect()->back()->withErrors(['error' => 'Cannot delete brand with associated products.']);
        }
        
        $brand->delete();
        return redirect()->back()->with('success', 'Brand deleted successfully.');
    }
}
