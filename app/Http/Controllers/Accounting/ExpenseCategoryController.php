<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Http\Requests\Accounting\StoreExpenseCategoryRequest;
use App\Http\Requests\Accounting\UpdateExpenseCategoryRequest;
use App\Models\Accounting\ExpenseCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseCategoryController extends Controller
{
    public function index()
    {
        $categories = ExpenseCategory::orderBy('sort_order')
            ->orderBy('name')
            ->get();
            
        return Inertia::render('Accounting/ExpenseCategories/Index', [
            'categories' => $categories
        ]);
    }

    public function store(StoreExpenseCategoryRequest $request)
    {
        ExpenseCategory::create($request->validated());
        return redirect()->back()->with('success', 'Expense Category created successfully.');
    }

    public function update(UpdateExpenseCategoryRequest $request, ExpenseCategory $expenseCategory)
    {
        $expenseCategory->update($request->validated());
        return redirect()->back()->with('success', 'Expense Category updated successfully.');
    }

    public function destroy(ExpenseCategory $expenseCategory)
    {
        // Check if category is being used by expenses
        if ($expenseCategory->expenses()->exists() || $expenseCategory->calculationRules()->exists()) {
            return redirect()->back()->with('error', 'Cannot delete category because it is in use.');
        }

        $expenseCategory->delete();
        return redirect()->back()->with('success', 'Expense Category deleted successfully.');
    }
}
