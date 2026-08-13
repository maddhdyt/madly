<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Accounting\AccountingProject;
use App\Models\Accounting\AccountingRevenue;
use App\Models\Accounting\AccountingExpense;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        
        $todayRevenue = AccountingRevenue::where('status', 'posted')
            ->whereDate('transaction_date', $today)
            ->sum('amount');
            
        $todayExpense = AccountingExpense::where('status', 'posted')
            ->whereDate('transaction_date', $today)
            ->sum('amount');
            
        $activeProjects = AccountingProject::where('status', 'active')->count();

        return Inertia::render('Accounting/Dashboard', [
            'metrics' => [
                'todayRevenue' => $todayRevenue,
                'todayExpense' => $todayExpense,
                'todaySettlement' => $todayRevenue - $todayExpense,
                'activeProjects' => $activeProjects,
            ]
        ]);
    }
}
