<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ServiceRequest;
use App\Models\Service;
use App\Services\Admin\ServiceTypeService;
use Inertia\Inertia;

class ServiceController extends Controller
{
    protected ServiceTypeService $serviceTypeService;

    public function __construct(ServiceTypeService $serviceTypeService)
    {
        $this->serviceTypeService = $serviceTypeService;
    }

    public function index()
    {
        $services = $this->serviceTypeService->getPaginatedServices();
        return Inertia::render('Admin/Services/Index', [
            'services' => $services
        ]);
    }

    public function store(ServiceRequest $request)
    {
        $this->serviceTypeService->createService($request->validated());

        return redirect()->back()->with('success', 'Service template created successfully.');
    }

    public function update(ServiceRequest $request, Service $service)
    {
        $this->serviceTypeService->updateService($service, $request->validated());

        return redirect()->back()->with('success', 'Service template updated successfully.');
    }

    public function destroy(Service $service)
    {
        $this->serviceTypeService->deleteService($service);

        return redirect()->back()->with('success', 'Service template deleted successfully.');
    }
}
