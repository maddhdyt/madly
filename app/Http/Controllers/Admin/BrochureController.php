<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BrochureRequest;
use App\Models\Brochure;
use App\Services\Admin\BrochureService;
use Inertia\Inertia;

class BrochureController extends Controller
{
    protected BrochureService $brochureService;

    public function __construct(BrochureService $brochureService)
    {
        $this->brochureService = $brochureService;
    }

    public function index()
    {
        return Inertia::render('Admin/Brochures/Index', [
            'brochures' => $this->brochureService->getPaginatedBrochures(),
            'brands' => $this->brochureService->getMasterBrands(),
        ]);
    }

    public function store(BrochureRequest $request)
    {
        $this->brochureService->createBrochure($request->validated(), $request->file('file'));

        return redirect()->back()->with('success', 'Brochure uploaded successfully.');
    }

    public function update(BrochureRequest $request, Brochure $brochure)
    {
        $this->brochureService->updateBrochure($brochure, $request->validated(), $request->file('file'));

        return redirect()->back()->with('success', 'Brochure updated successfully.');
    }

    public function destroy(Brochure $brochure)
    {
        $this->brochureService->deleteBrochure($brochure);

        return redirect()->back()->with('success', 'Brochure deleted successfully.');
    }
}
