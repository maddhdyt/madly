<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductRequest;
use App\Models\Product;
use App\Models\Service;
use App\Services\Admin\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request)
    {
        $serviceId = $request->input('service_id');
        $activeFilters = $request->input('filters', []);
        $search = $request->input('search');

        $products = $this->productService->getPaginatedProducts($serviceId, $activeFilters, $search);
        $filterOptions = $this->productService->getFilterOptions($serviceId);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'services' => Cache::remember('master_services', 86400, function () {
                return Service::orderBy('name')->get();
            }),
            'activeFilters' => $activeFilters,
            'filterOptions' => $filterOptions,
        ]);
    }

    public function store(ProductRequest $request)
    {
        $this->productService->createProduct($request->validated());

        return redirect()->back()->with('success', 'Product created successfully.');
    }

    public function update(ProductRequest $request, Product $product)
    {
        $this->productService->updateProduct($product, $request->validated());

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $this->productService->deleteProduct($product);

        return redirect()->back()->with('success', 'Product deleted successfully.');
    }
}
