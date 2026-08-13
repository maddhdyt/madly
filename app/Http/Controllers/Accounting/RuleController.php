<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Accounting\CalculationRule;
use App\Models\Accounting\CalculationRuleVersion;
use App\Models\Accounting\ExpenseCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class RuleController extends Controller
{
    public function index()
    {
        $rules = CalculationRule::with(['expenseCategory', 'versions' => function($q) {
            $q->orderBy('effective_from', 'desc');
        }])->get();
        
        $categories = ExpenseCategory::where('is_active', true)->get();

        return Inertia::render('Accounting/Rules/Index', [
            'rules' => $rules,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rule_name' => 'required|string|max:255',
            'expense_category_id' => 'required|exists:expense_categories,id',
            'calculation_type' => 'required|in:percentage_of_revenue,fixed_amount',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'value' => 'required|numeric|min:0',
            'effective_from' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated) {
            $rule = CalculationRule::create([
                'rule_name' => $validated['rule_name'],
                'expense_category_id' => $validated['expense_category_id'],
                'calculation_type' => $validated['calculation_type'],
                'description' => $validated['description'],
                'is_active' => $validated['is_active'] ?? true,
            ]);

            $rule->versions()->create([
                'value' => $validated['value'],
                'effective_from' => $validated['effective_from'],
                'notes' => $validated['notes'],
            ]);
        });

        return redirect()->back()->with('success', 'Calculation rule created successfully.');
    }

    public function update(Request $request, CalculationRule $rule)
    {
        $validated = $request->validate([
            'rule_name' => 'required|string|max:255',
            'expense_category_id' => 'required|exists:expense_categories,id',
            'calculation_type' => 'required|in:percentage_of_revenue,fixed_amount',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            
            // New version fields if we want to add a new version
            'add_new_version' => 'boolean',
            'value' => 'required_if:add_new_version,true|numeric|min:0',
            'effective_from' => 'required_if:add_new_version,true|date',
            'notes' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated, $rule) {
            $rule->update([
                'rule_name' => $validated['rule_name'],
                'expense_category_id' => $validated['expense_category_id'],
                'calculation_type' => $validated['calculation_type'],
                'description' => $validated['description'],
                'is_active' => $validated['is_active'] ?? true,
            ]);

            if (!empty($validated['add_new_version'])) {
                // Close the previous active version
                $latestVersion = $rule->versions()->orderBy('effective_from', 'desc')->first();
                if ($latestVersion) {
                    $latestVersion->update([
                        'effective_until' => \Carbon\Carbon::parse($validated['effective_from'])->subDay()->toDateString()
                    ]);
                }

                $rule->versions()->create([
                    'value' => $validated['value'],
                    'effective_from' => $validated['effective_from'],
                    'notes' => $validated['notes'],
                ]);
            }
        });

        return redirect()->back()->with('success', 'Calculation rule updated successfully.');
    }

    public function destroy(CalculationRule $rule)
    {
        $rule->delete(); // Or set is_active = false
        return redirect()->back()->with('success', 'Calculation rule deleted successfully.');
    }
}
