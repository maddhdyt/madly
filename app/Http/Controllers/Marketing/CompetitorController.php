<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\Competitor;
use App\Models\Battlecard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompetitorController extends Controller
{
    public function index()
    {
        $competitors = Competitor::with('battlecards')->orderBy('name')->get();
        return Inertia::render('Marketing/Competitors/Index', [
            'competitors' => $competitors
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'strengths' => 'nullable|string',
            'weaknesses' => 'nullable|string',
            'website_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'tiktok_url' => 'nullable|url|max:255',
            'tier' => 'nullable|string|max:50',
            'service_type' => 'nullable|string|max:255',
            'specific_services' => 'nullable|string',
        ]);

        Competitor::create($validated);
        return back()->with('success', 'Kompetitor berhasil ditambahkan.');
    }

    public function update(Request $request, Competitor $competitor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'strengths' => 'nullable|string',
            'weaknesses' => 'nullable|string',
            'website_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'tiktok_url' => 'nullable|url|max:255',
            'tier' => 'nullable|string|max:50',
            'service_type' => 'nullable|string|max:255',
            'specific_services' => 'nullable|string',
        ]);

        $competitor->update($validated);
        return back()->with('success', 'Kompetitor berhasil diperbarui.');
    }

    public function destroy(Competitor $competitor)
    {
        $competitor->delete();
        return back()->with('success', 'Kompetitor berhasil dihapus.');
    }

    public function storeBattlecard(Request $request, Competitor $competitor)
    {
        $validated = $request->validate([
            'category' => 'nullable|string|max:255',
            'objection' => 'required|string',
            'response' => 'required|string',
        ]);

        $competitor->battlecards()->create($validated);
        return back()->with('success', 'Battlecard berhasil ditambahkan.');
    }

    public function updateBattlecard(Request $request, Battlecard $battlecard)
    {
        $validated = $request->validate([
            'category' => 'nullable|string|max:255',
            'objection' => 'required|string',
            'response' => 'required|string',
        ]);

        $battlecard->update($validated);
        return back()->with('success', 'Battlecard berhasil diperbarui.');
    }

    public function destroyBattlecard(Battlecard $battlecard)
    {
        $battlecard->delete();
        return back()->with('success', 'Battlecard berhasil dihapus.');
    }
}
