<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Http\Requests\Marketing\BattlecardRequest;
use App\Http\Requests\Marketing\CompetitorRequest;
use App\Models\Battlecard;
use App\Models\Competitor;
use App\Services\Marketing\CompetitorService;
use Inertia\Inertia;

class CompetitorController extends Controller
{
    protected CompetitorService $competitorService;

    public function __construct(CompetitorService $competitorService)
    {
        $this->competitorService = $competitorService;
    }

    public function index()
    {
        return Inertia::render('Marketing/Competitors/Index', [
            'competitors' => $this->competitorService->getAllCompetitorsWithBattlecards(),
        ]);
    }

    public function store(CompetitorRequest $request)
    {
        $this->competitorService->createCompetitor($request->validated());
        return back()->with('success', 'Kompetitor berhasil ditambahkan.');
    }

    public function update(CompetitorRequest $request, Competitor $competitor)
    {
        $this->competitorService->updateCompetitor($competitor, $request->validated());
        return back()->with('success', 'Kompetitor berhasil diperbarui.');
    }

    public function destroy(Competitor $competitor)
    {
        $this->competitorService->deleteCompetitor($competitor);
        return back()->with('success', 'Kompetitor berhasil dihapus.');
    }

    public function storeBattlecard(BattlecardRequest $request, Competitor $competitor)
    {
        $this->competitorService->createBattlecard($competitor, $request->validated());
        return back()->with('success', 'Battlecard berhasil ditambahkan.');
    }

    public function updateBattlecard(BattlecardRequest $request, Battlecard $battlecard)
    {
        $this->competitorService->updateBattlecard($battlecard, $request->validated());
        return back()->with('success', 'Battlecard berhasil diperbarui.');
    }

    public function destroyBattlecard(Battlecard $battlecard)
    {
        $this->competitorService->deleteBattlecard($battlecard);
        return back()->with('success', 'Battlecard berhasil dihapus.');
    }
}
