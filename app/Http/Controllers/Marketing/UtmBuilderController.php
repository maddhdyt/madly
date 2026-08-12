<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Http\Requests\Marketing\UtmBuilderRequest;
use App\Services\Marketing\UtmService;
use Inertia\Inertia;

class UtmBuilderController extends Controller
{
    protected UtmService $utmService;

    public function __construct(UtmService $utmService)
    {
        $this->utmService = $utmService;
    }

    public function index()
    {
        $data = $this->utmService->getUtmPageData();

        return Inertia::render('Marketing/UtmBuilder/Index', $data);
    }

    public function store(UtmBuilderRequest $request)
    {
        $this->utmService->generateAndSaveUtm($request->validated(), auth()->id());

        return back()->with('success', 'UTM Link generated successfully.');
    }

    public function destroy($id)
    {
        $this->utmService->deleteUtm((int)$id);

        return back()->with('success', 'UTM Link deleted successfully.');
    }
}
