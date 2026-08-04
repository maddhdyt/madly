<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\AdSwipe;
use App\Models\MarketingBrand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AdSwipeController extends Controller
{
    public function index()
    {
        $swipes = AdSwipe::with('marketingBrand')->latest()->get();
        $brands = MarketingBrand::where('is_active', true)->get();
        
        return Inertia::render('Marketing/AdSwipes/Index', [
            'swipes' => $swipes,
            'brands' => $brands
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'marketing_brand_id' => 'nullable|exists:marketing_brands,id',
            'title' => 'required|string|max:255',
            'platform' => 'nullable|string|max:255',
            'url' => 'nullable|url',
            'angle' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'image' => 'nullable|image|max:5120', // Max 5MB
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('ad_swipes', 'public');
            $validated['image_path'] = $path;
        }

        AdSwipe::create($validated);
        return back()->with('success', 'Ad Swipe berhasil ditambahkan.');
    }

    public function update(Request $request, AdSwipe $adSwipe)
    {
        $validated = $request->validate([
            'marketing_brand_id' => 'nullable|exists:marketing_brands,id',
            'title' => 'required|string|max:255',
            'platform' => 'nullable|string|max:255',
            'url' => 'nullable|url',
            'angle' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($adSwipe->image_path) {
                Storage::disk('public')->delete($adSwipe->image_path);
            }
            $path = $request->file('image')->store('ad_swipes', 'public');
            $validated['image_path'] = $path;
        }

        $adSwipe->update($validated);
        return back()->with('success', 'Ad Swipe berhasil diperbarui.');
    }

    public function destroy(AdSwipe $adSwipe)
    {
        if ($adSwipe->image_path) {
            Storage::disk('public')->delete($adSwipe->image_path);
        }
        $adSwipe->delete();
        return back()->with('success', 'Ad Swipe berhasil dihapus.');
    }
}
