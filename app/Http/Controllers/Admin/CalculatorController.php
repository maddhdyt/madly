<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\QuotationRequest;
use App\Services\Admin\QuotationService;
use Inertia\Inertia;

class CalculatorController extends Controller
{
    protected QuotationService $quotationService;

    public function __construct(QuotationService $quotationService)
    {
        $this->quotationService = $quotationService;
    }

    public function index()
    {
        $data = $this->quotationService->getCalculatorData();

        return Inertia::render('Admin/Calculator/Index', $data);
    }

    public function store(QuotationRequest $request)
    {
        try {
            $quotation = $this->quotationService->createQuotation($request->validated());

            return redirect()->back()->with([
                'success' => 'Quotation drafted successfully!',
                'quotation_id' => $quotation->id,
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to save quotation. ' . $e->getMessage()]);
        }
    }

    public function generatePdf($id)
    {
        return $this->quotationService->downloadPdf((int)$id);
    }
}
