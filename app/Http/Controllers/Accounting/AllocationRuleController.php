<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Http\Requests\Accounting\StoreAllocationRuleRequest;
use App\Http\Requests\Accounting\UpdateAllocationRuleRequest;
use App\Models\Accounting\AllocationRule;
use App\Models\Accounting\ExpenseCategory;
use App\Models\Accounting\AccountingProject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AllocationRuleController extends Controller
{
    public function index()
    {
        $rules = AllocationRule::with(['expenseCategory', 'project'])
            ->orderBy('created_at', 'desc')
            ->get();
            
        $categories = ExpenseCategory::where('type', 'shared')
            ->where('is_active', true)
            ->orderBy('name')
            ->get();
            
        $projects = AccountingProject::select('id', 'project_name')
            ->orderBy('project_name')
            ->get();

        return Inertia::render('Accounting/AllocationRules/Index', [
            'rules' => $rules,
            'categories' => $categories,
            'projects' => $projects,
        ]);
    }

    public function store(StoreAllocationRuleRequest $request)
    {
        AllocationRule::create($request->validated());
        return redirect()->back()->with('success', 'Allocation Rule created successfully.');
    }

    public function update(UpdateAllocationRuleRequest $request, AllocationRule $allocationRule)
    {
        $allocationRule->update($request->validated());
        return redirect()->back()->with('success', 'Allocation Rule updated successfully.');
    }

    public function destroy(AllocationRule $allocationRule)
    {
        $allocationRule->delete();
        return redirect()->back()->with('success', 'Allocation Rule deleted successfully.');
    }
}
