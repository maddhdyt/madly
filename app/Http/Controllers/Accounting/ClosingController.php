<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Accounting\AccountingClosing;
use App\Models\Accounting\AccountingRevenue;
use App\Models\Accounting\AccountingExpense;
use App\Services\Accounting\ClosingService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClosingController extends Controller
{
    protected ClosingService $closingService;

    public function __construct(ClosingService $closingService)
    {
        $this->closingService = $closingService;
    }

    public function index()
    {
        $closings = AccountingClosing::with(['closedBy', 'items'])
            ->orderBy('closing_date', 'desc')
            ->get();

        // Calculate today's preview
        $today = Carbon::today()->toDateString();
        $todayRevenue = AccountingRevenue::where('status', 'posted')
            ->whereDate('transaction_date', $today)
            ->sum('amount');
        $todayExpense = AccountingExpense::where('status', 'posted')
            ->whereDate('transaction_date', $today)
            ->sum('amount');

        $todayAlreadyClosed = AccountingClosing::where('closing_date', $today)
            ->where('status', 'closed')
            ->exists();

        return Inertia::render('Accounting/Closing/Index', [
            'closings' => $closings,
            'todayPreview' => [
                'date' => $today,
                'revenue' => $todayRevenue,
                'expense' => $todayExpense,
                'settlement' => $todayRevenue - $todayExpense,
                'alreadyClosed' => $todayAlreadyClosed,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'closing_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        try {
            $this->closingService->closeDay(
                Carbon::parse($validated['closing_date']),
                auth()->id(),
                $validated['notes'] ?? null
            );

            return redirect()->back()->with('success', 'Daily closing completed successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function show(AccountingClosing $closing)
    {
        $closing->load(['items.expenseCategory', 'closedBy']);

        return Inertia::render('Accounting/Closing/Show', [
            'closing' => $closing,
        ]);
    }
}
