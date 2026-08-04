<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\AdIdentity;
use App\Models\MarketingBrand;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdIdentityController extends Controller
{
    public function index()
    {
        $identities = AdIdentity::with(['marketingBrand', 'sales'])->latest()->get();
        $brands = MarketingBrand::orderBy('name')->get();
        $salesUsers = User::where('role', 'sales')->orderBy('name')->get();

        return Inertia::render('Marketing/AdIdentities/Index', [
            'identities' => $identities,
            'brands' => $brands,
            'salesUsers' => $salesUsers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'marketing_brand_id' => 'required|exists:marketing_brands,id',
            'ad_platform' => 'required|string|max:255',
            'landing_page_url' => 'nullable|url',
            'sales_id' => 'nullable|exists:users,id',
            'is_active' => 'boolean',
        ]);

        // Automate gamification points (Flat 10 points for new Ad Identity)
        $validated['power_points'] = 10;

        AdIdentity::create($validated);

        return redirect()->back()
            ->with('success', 'Identitas Iklan berhasil ditambahkan.');
    }

    public function update(Request $request, AdIdentity $adIdentity)
    {
        $validated = $request->validate([
            'marketing_brand_id' => 'required|exists:marketing_brands,id',
            'ad_platform' => 'required|string|max:255',
            'landing_page_url' => 'nullable|url',
            'sales_id' => 'nullable|exists:users,id',
            'is_active' => 'boolean',
        ]);

        $adIdentity->update($validated);

        return redirect()->back()
            ->with('success', 'Identitas Iklan berhasil diperbarui.');
    }

    public function destroy(AdIdentity $adIdentity)
    {
        $adIdentity->delete();

        return redirect()->back()
            ->with('success', 'Identitas Iklan berhasil dihapus.');
    }
}
