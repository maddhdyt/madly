<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Http\Requests\Marketing\AdIdentityRequest;
use App\Models\AdIdentity;
use App\Services\Marketing\AdIdentityService;
use Inertia\Inertia;

class AdIdentityController extends Controller
{
    protected AdIdentityService $adIdentityService;

    public function __construct(AdIdentityService $adIdentityService)
    {
        $this->adIdentityService = $adIdentityService;
    }

    public function index()
    {
        $data = $this->adIdentityService->getAdIdentityPageData();

        return Inertia::render('Marketing/AdIdentities/Index', $data);
    }

    public function store(AdIdentityRequest $request)
    {
        $this->adIdentityService->createAdIdentity($request->validated());

        return redirect()->back()->with('success', 'Identitas Iklan berhasil ditambahkan.');
    }

    public function update(AdIdentityRequest $request, AdIdentity $adIdentity)
    {
        $this->adIdentityService->updateAdIdentity($adIdentity, $request->validated());

        return redirect()->back()->with('success', 'Identitas Iklan berhasil diperbarui.');
    }

    public function destroy(AdIdentity $adIdentity)
    {
        $this->adIdentityService->deleteAdIdentity($adIdentity);

        return redirect()->back()->with('success', 'Identitas Iklan berhasil dihapus.');
    }
}
