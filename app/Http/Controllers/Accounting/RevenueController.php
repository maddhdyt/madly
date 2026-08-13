<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Accounting\AccountingRevenue;
use App\Models\Accounting\AccountingProject;
use App\Models\Accounting\CashAccount;
use App\Services\Accounting\RevenueService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RevenueController extends Controller
{
    protected RevenueService $revenueService;

    public function __construct(RevenueService $revenueService)
    {
        $this->revenueService = $revenueService;
    }

    public function index()
    {
        $revenues = AccountingRevenue::with(['project', 'cashAccount', 'recorder'])
            ->orderBy('transaction_date', 'desc')
            ->orderBy('id', 'desc')
            ->get();
            
        $projects = AccountingProject::where('status', 'active')->get();
        $cashAccounts = CashAccount::where('is_active', true)->get();

        return Inertia::render('Accounting/Revenues/Index', [
            'revenues' => $revenues,
            'projects' => $projects,
            'cashAccounts' => $cashAccounts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'accounting_project_id' => 'required|exists:accounting_projects,id',
            'cash_account_id' => 'required|exists:cash_accounts,id',
            'transaction_date' => 'required|date',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'nullable|string',
            'reference_number' => 'nullable|string|max:255',
            'status' => 'required|in:draft,posted,voided',
        ]);

        $this->revenueService->recordRevenue($validated, auth()->id());

        return redirect()->back()->with('success', 'Revenue recorded successfully.');
    }

    public function update(Request $request, AccountingRevenue $revenue)
    {
        $validated = $request->validate([
            'accounting_project_id' => 'required|exists:accounting_projects,id',
            'cash_account_id' => 'required|exists:cash_accounts,id',
            'transaction_date' => 'required|date',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'nullable|string',
            'reference_number' => 'nullable|string|max:255',
            'status' => 'required|in:draft,posted,voided',
        ]);

        $this->revenueService->updateRevenue($revenue, $validated);

        return redirect()->back()->with('success', 'Revenue updated successfully.');
    }

    public function destroy(AccountingRevenue $revenue)
    {
        // Instead of hard deleting, usually in accounting we void.
        $this->revenueService->voidRevenue($revenue);

        return redirect()->back()->with('success', 'Revenue voided successfully.');
    }
}
