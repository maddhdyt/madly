<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Accounting\AccountingExpense;
use App\Models\Accounting\AccountingProject;
use App\Models\Accounting\CashAccount;
use App\Models\Accounting\ExpenseCategory;
use App\Services\Accounting\ExpenseService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    protected ExpenseService $expenseService;

    public function __construct(ExpenseService $expenseService)
    {
        $this->expenseService = $expenseService;
    }

    public function index()
    {
        $expenses = AccountingExpense::with(['project', 'cashAccount', 'expenseCategory', 'recorder'])
            ->orderBy('transaction_date', 'desc')
            ->orderBy('id', 'desc')
            ->get();
            
        $projects = AccountingProject::where('status', 'active')->get();
        $cashAccounts = CashAccount::where('is_active', true)->get();
        $categories = ExpenseCategory::where('is_active', true)->orderBy('sort_order')->get();

        return Inertia::render('Accounting/Expenses/Index', [
            'expenses' => $expenses,
            'projects' => $projects,
            'cashAccounts' => $cashAccounts,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'accounting_project_id' => 'required|exists:accounting_projects,id',
            'cash_account_id' => 'required|exists:cash_accounts,id',
            'expense_category_id' => 'required|exists:expense_categories,id',
            'transaction_date' => 'required|date',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'nullable|string',
            'reference_number' => 'nullable|string|max:255',
            'expense_type' => 'required|in:direct,shared,rule_based',
            'status' => 'required|in:draft,posted,voided',
        ]);

        $this->expenseService->recordExpense($validated, auth()->id());

        return redirect()->back()->with('success', 'Expense recorded successfully.');
    }

    public function update(Request $request, AccountingExpense $expense)
    {
        $validated = $request->validate([
            'accounting_project_id' => 'required|exists:accounting_projects,id',
            'cash_account_id' => 'required|exists:cash_accounts,id',
            'expense_category_id' => 'required|exists:expense_categories,id',
            'transaction_date' => 'required|date',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'nullable|string',
            'reference_number' => 'nullable|string|max:255',
            'expense_type' => 'required|in:direct,shared,rule_based',
            'status' => 'required|in:draft,posted,voided',
        ]);

        $this->expenseService->updateExpense($expense, $validated);

        return redirect()->back()->with('success', 'Expense updated successfully.');
    }

    public function destroy(AccountingExpense $expense)
    {
        $this->expenseService->voidExpense($expense);

        return redirect()->back()->with('success', 'Expense voided successfully.');
    }
}
