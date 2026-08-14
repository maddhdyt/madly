<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Accounting\AccountingProject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = AccountingProject::withCount(['revenues', 'expenses'])
            ->orderBy('created_at', 'desc')
            ->get();
            
        return Inertia::render('Accounting/Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'total_budget' => 'nullable|numeric|min:0',
            'status' => 'required|in:active,completed,on_hold',
            'is_profit_sharing_enabled' => 'boolean',
        ]);

        $validated['total_budget'] = $validated['total_budget'] ?? 0;

        AccountingProject::create($validated);

        return redirect()->back()->with('success', 'Project created successfully.');
    }

    public function update(Request $request, AccountingProject $project)
    {
        $validated = $request->validate([
            'project_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'total_budget' => 'nullable|numeric|min:0',
            'status' => 'required|in:active,completed,on_hold',
            'is_profit_sharing_enabled' => 'boolean',
        ]);

        $validated['total_budget'] = $validated['total_budget'] ?? 0;

        $project->update($validated);

        return redirect()->back()->with('success', 'Project updated successfully.');
    }

    public function destroy(AccountingProject $project)
    {
        $project->delete();

        return redirect()->back()->with('success', 'Project deleted successfully.');
    }
}
