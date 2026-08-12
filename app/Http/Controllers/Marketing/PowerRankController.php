<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Services\Marketing\PowerRankService;
use Inertia\Inertia;

class PowerRankController extends Controller
{
    protected PowerRankService $powerRankService;

    public function __construct(PowerRankService $powerRankService)
    {
        $this->powerRankService = $powerRankService;
    }

    public function index()
    {
        return Inertia::render('Marketing/PowerRank/Index', [
            'leaderboard' => $this->powerRankService->getLeaderboard()
        ]);
    }
}
