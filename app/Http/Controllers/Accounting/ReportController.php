<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Accounting\AccountingClosing;
use Carbon\Carbon;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $closings = AccountingClosing::with(['closedBy', 'items'])
            ->orderBy('closing_date', 'desc')
            ->get();

        $periodStart = Carbon::now()->startOfMonth()->toDateString();
        $periodEnd = Carbon::now()->endOfMonth()->toDateString();

        $periodClosings = $closings->filter(function ($closing) use ($periodStart, $periodEnd) {
            return $closing->closing_date >= $periodStart && $closing->closing_date <= $periodEnd;
        });

        return Inertia::render('Accounting/Reports/Index', [
            'closings' => $closings,
            'summary' => [
                'period_label' => Carbon::now()->translatedFormat('F Y'),
                'total_closings' => $closings->count(),
                'period_total_settlement' => $periodClosings->sum('daily_settlement'),
                'period_total_revenue' => $periodClosings->sum('total_revenue'),
                'period_total_expense' => $periodClosings->sum('total_expense'),
            ],
        ]);
    }
}