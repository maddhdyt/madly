<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Services\Marketing\RoasService;
use Inertia\Inertia;

class RoasCalculatorController extends Controller
{
    protected RoasService $roasService;

    public function __construct(RoasService $roasService)
    {
        $this->roasService = $roasService;
    }

    public function index()
    {
        return Inertia::render('Marketing/RoasCalculator/Index', $this->roasService->getRoasPageData());
    }
}
