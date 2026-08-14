<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Http\Requests\Accounting\StoreAccountingPeriodClosingRequest;
use App\Models\Accounting\AccountingPeriodClosing;
use App\Services\Accounting\PeriodClosingService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PeriodClosingController extends Controller
{
    protected PeriodClosingService $periodClosingService;

    public function __construct(PeriodClosingService $periodClosingService)
    {
        $this->periodClosingService = $periodClosingService;
    }

    public function index()
    {
        $periodClosings = AccountingPeriodClosing::with('closer')
            ->orderBy('period_start', 'desc')
            ->get();

        return Inertia::render('Accounting/PeriodClosing/Index', [
            'periodClosings' => $periodClosings
        ]);
    }

    public function store(StoreAccountingPeriodClosingRequest $request)
    {
        $data = $request->validated();

        try {
            $this->periodClosingService->closePeriod(
                $data['period_name'],
                Carbon::parse($data['period_start']),
                Carbon::parse($data['period_end']),
                auth()->id(),
                $data['notes'] ?? null
            );

            return redirect()->back()->with('success', 'Period closed and profit distributed successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function show(AccountingPeriodClosing $periodClosing)
    {
        $periodClosing->load([
            'closer',
            'items.dailyClosing',
            'distributions.participant',
            'distributions.scheme'
        ]);

        return Inertia::render('Accounting/PeriodClosing/Show', [
            'periodClosing' => $periodClosing
        ]);
    }
}
