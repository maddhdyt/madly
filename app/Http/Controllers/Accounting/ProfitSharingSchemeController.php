<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Http\Requests\Accounting\StoreProfitSharingSchemeRequest;
use App\Http\Requests\Accounting\UpdateProfitSharingSchemeRequest;
use App\Models\Accounting\ProfitSharingScheme;
use App\Models\Accounting\AccountingProject;
use App\Models\Accounting\ProfitParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProfitSharingSchemeController extends Controller
{
    public function index()
    {
        $schemes = ProfitSharingScheme::with(['items.participant', 'project'])
            ->orderBy('created_at', 'desc')
            ->get();
            
        $projects = AccountingProject::select('id', 'project_name')->orderBy('project_name')->get();
        $participants = ProfitParticipant::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('Accounting/ProfitSharing/SchemesIndex', [
            'schemes' => $schemes,
            'projects' => $projects,
            'participants' => $participants,
        ]);
    }

    public function store(StoreProfitSharingSchemeRequest $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->validated();
            
            $scheme = ProfitSharingScheme::create([
                'scheme_name' => $data['scheme_name'],
                'accounting_project_id' => $data['accounting_project_id'] ?? null,
                'effective_from' => $data['effective_from'] ?? null,
                'effective_until' => $data['effective_until'] ?? null,
                'is_active' => $data['is_active'] ?? true,
                'notes' => $data['notes'] ?? null,
            ]);

            if (isset($data['items']) && is_array($data['items'])) {
                foreach ($data['items'] as $item) {
                    $scheme->items()->create([
                        'profit_participant_id' => $item['profit_participant_id'],
                        'share_percentage' => $item['share_percentage'],
                    ]);
                }
            }
        });

        return redirect()->back()->with('success', 'Profit Sharing Scheme created successfully.');
    }

    public function update(UpdateProfitSharingSchemeRequest $request, ProfitSharingScheme $profitSharingScheme)
    {
        DB::transaction(function () use ($request, $profitSharingScheme) {
            $data = $request->validated();
            
            $profitSharingScheme->update([
                'scheme_name' => $data['scheme_name'],
                'accounting_project_id' => $data['accounting_project_id'] ?? null,
                'effective_from' => $data['effective_from'] ?? null,
                'effective_until' => $data['effective_until'] ?? null,
                'is_active' => $data['is_active'] ?? true,
                'notes' => $data['notes'] ?? null,
            ]);

            if (isset($data['items']) && is_array($data['items'])) {
                // Delete existing items
                $profitSharingScheme->items()->delete();
                
                // Create new items
                foreach ($data['items'] as $item) {
                    $profitSharingScheme->items()->create([
                        'profit_participant_id' => $item['profit_participant_id'],
                        'share_percentage' => $item['share_percentage'],
                    ]);
                }
            }
        });

        return redirect()->back()->with('success', 'Profit Sharing Scheme updated successfully.');
    }

    public function destroy(ProfitSharingScheme $profitSharingScheme)
    {
        $profitSharingScheme->delete();
        return redirect()->back()->with('success', 'Profit Sharing Scheme deleted successfully.');
    }
}
