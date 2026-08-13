<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Http\Requests\Accounting\StoreCashAccountRequest;
use App\Http\Requests\Accounting\UpdateCashAccountRequest;
use App\Models\Accounting\CashAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CashAccountController extends Controller
{
    public function index()
    {
        $cashAccounts = CashAccount::orderByDesc('is_active')
            ->orderBy('account_name')
            ->get();

        $summary = [
            'total_accounts' => $cashAccounts->count(),
            'active_accounts' => $cashAccounts->where('is_active', true)->count(),
            'total_balance' => $cashAccounts->sum('current_balance'),
            'cash_accounts' => $cashAccounts->where('type', 'cash')->count(),
            'bank_accounts' => $cashAccounts->where('type', 'bank')->count(),
        ];

        return Inertia::render('Accounting/CashAccounts/Index', [
            'cashAccounts' => $cashAccounts,
            'summary' => $summary,
        ]);
    }

    public function store(StoreCashAccountRequest $request)
    {
        CashAccount::create($request->validated());

        return redirect()->back()->with('success', 'Cash account created successfully.');
    }

    public function update(UpdateCashAccountRequest $request, CashAccount $cashAccount)
    {
        $cashAccount->update($request->validated());

        return redirect()->back()->with('success', 'Cash account updated successfully.');
    }

    public function destroy(CashAccount $cashAccount)
    {
        $cashAccount->delete();

        return redirect()->back()->with('success', 'Cash account deleted successfully.');
    }
}