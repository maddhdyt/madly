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
        
        $products = Product::with('service')
            ->when($serviceId && $serviceId !== 'all', function($query) use ($serviceId) {
                return $query->where('service_id', $serviceId);
            })
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'services' => Service::orderBy('name')->get()
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
