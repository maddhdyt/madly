<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BrandRequest;
use App\Models\Brand;
use App\Services\Admin\BrandService;
use Inertia\Inertia;

class BrandController extends Controller
{
    protected BrandService $brandService;

    public function __construct(BrandService $brandService)
    {
        $this->brandService = $brandService;
    }

    public function index()
    {
        $brands = $this->brandService->getPaginatedBrands();

        return Inertia::render('Admin/Brands/Index', [
            'brands' => $brands,
        ]);
    }

    public function store(BrandRequest $request)
    {
        $this->brandService->createBrand($request->validated(), $request->file('logo'));

        return redirect()->back()->with('success', 'Brand created successfully.');
    }

    public function update(BrandRequest $request, Brand $brand)
    {
        $this->brandService->updateBrand($brand, $request->validated(), $request->file('logo'));

        return redirect()->back()->with('success', 'Brand updated successfully.');
    }

    public function destroy(Brand $brand)
    {
        $this->brandService->deleteBrand($brand);

        return redirect()->back()->with('success', 'Brand deleted successfully.');
    }
}
