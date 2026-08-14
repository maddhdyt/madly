<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Http\Requests\Accounting\StoreProfitParticipantRequest;
use App\Http\Requests\Accounting\UpdateProfitParticipantRequest;
use App\Models\Accounting\ProfitParticipant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfitParticipantController extends Controller
{
    public function index()
    {
        $participants = ProfitParticipant::orderBy('name')->get();
        return Inertia::render('Accounting/ProfitSharing/ParticipantsIndex', [
            'participants' => $participants
        ]);
    }

    public function store(StoreProfitParticipantRequest $request)
    {
        ProfitParticipant::create($request->validated());
        return redirect()->back()->with('success', 'Profit Participant created successfully.');
    }

    public function update(UpdateProfitParticipantRequest $request, ProfitParticipant $profitParticipant)
    {
        $profitParticipant->update($request->validated());
        return redirect()->back()->with('success', 'Profit Participant updated successfully.');
    }

    public function destroy(ProfitParticipant $profitParticipant)
    {
        $profitParticipant->delete();
        return redirect()->back()->with('success', 'Profit Participant deleted successfully.');
    }
}
