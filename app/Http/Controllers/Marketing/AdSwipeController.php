<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Http\Requests\Marketing\AdSwipeRequest;
use App\Models\AdSwipe;
use App\Services\Marketing\AdSwipeService;
use Inertia\Inertia;

class AdSwipeController extends Controller
{
    protected AdSwipeService $adSwipeService;

    public function __construct(AdSwipeService $adSwipeService)
    {
        $this->adSwipeService = $adSwipeService;
    }

    public function index()
    {
        return Inertia::render('Marketing/AdSwipes/Index', $this->adSwipeService->getAdSwipePageData());
    }

    public function store(AdSwipeRequest $request)
    {
        $this->adSwipeService->createAdSwipe($request->validated(), $request->file('image'));
        return back()->with('success', 'Ad Swipe berhasil ditambahkan.');
    }

    public function update(AdSwipeRequest $request, AdSwipe $adSwipe)
    {
        $this->adSwipeService->updateAdSwipe($adSwipe, $request->validated(), $request->file('image'));
        return back()->with('success', 'Ad Swipe berhasil diperbarui.');
    }

    public function destroy(AdSwipe $adSwipe)
    {
        $this->adSwipeService->deleteAdSwipe($adSwipe);
        return back()->with('success', 'Ad Swipe berhasil dihapus.');
    }
}
