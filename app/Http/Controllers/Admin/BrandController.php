<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/Brands/Index', [
            'brands' => $brands,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        if (Brand::where('slug', $validated['slug'])->exists()) {
            return redirect()->back()->withErrors(['name' => 'Brand with this name already exists.'])->withInput();
        }

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('brands', 'public');
            $validated['logo'] = '/storage/' . $path;
        }

        Brand::create($validated);

        return redirect()->route('admin.brands.index')->with('success', 'Brand created successfully.');
    }

    public function update(Request $request, Brand $brand)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        if (Brand::where('slug', $validated['slug'])->where('id', '!=', $brand->id)->exists()) {
            return redirect()->back()->withErrors(['name' => 'Brand with this name already exists.'])->withInput();
        }

        if ($request->hasFile('logo')) {
            if ($brand->logo) {
                $oldPath = str_replace('/storage/', '', $brand->logo);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('logo')->store('brands', 'public');
            $validated['logo'] = '/storage/' . $path;
        } else {
            unset($validated['logo']);
        }

        $brand->update($validated);

        return redirect()->route('admin.brands.index')->with('success', 'Brand updated successfully.');
    }

    public function destroy(Brand $brand)
    {
        
        if ($brand->logo) {
            $oldPath = str_replace('/storage/', '', $brand->logo);
            Storage::disk('public')->delete($oldPath);
        }
        
        $brand->delete();
        return redirect()->back()->with('success', 'Brand deleted successfully.');
    }
}
