<?php

namespace App\Services\Marketing;

use App\Models\Battlecard;
use App\Models\Competitor;
use Illuminate\Database\Eloquent\Collection;

class CompetitorService
{
    public function getAllCompetitorsWithBattlecards(): Collection
    {
        return Competitor::with('battlecards')->orderBy('name')->get();
    }

    public function createCompetitor(array $data): Competitor
    {
        return Competitor::create($data);
    }

    public function updateCompetitor(Competitor $competitor, array $data): bool
    {
        return $competitor->update($data);
    }

    public function deleteCompetitor(Competitor $competitor): ?bool
    {
        return $competitor->delete();
    }

    public function createBattlecard(Competitor $competitor, array $data): Battlecard
    {
        return $competitor->battlecards()->create($data);
    }

    public function updateBattlecard(Battlecard $battlecard, array $data): bool
    {
        return $battlecard->update($data);
    }

    public function deleteBattlecard(Battlecard $battlecard): ?bool
    {
        return $battlecard->delete();
    }
}
