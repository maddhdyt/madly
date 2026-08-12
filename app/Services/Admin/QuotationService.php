<?php

namespace App\Services\Admin;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Quotation;
use App\Models\Service;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class QuotationService
{
    public function getCalculatorData(): array
    {
        return [
            'products' => Product::with(['service'])->orderBy('name')->get(),
            'brands' => Cache::remember('master_brands', 86400, function () {
                return Brand::orderBy('name')->get();
            }),
            'services' => Cache::remember('master_services', 86400, function () {
                return Service::orderBy('name')->get();
            }),
        ];
    }

    public function createQuotation(array $validatedData): Quotation
    {
        return DB::transaction(function () use ($validatedData) {
            $subtotal = collect($validatedData['items'])->sum('subtotal');
            $discount = $validatedData['discount'] ?? 0;
            $total = max(0, $subtotal - $discount);

            $quotation = Quotation::create([
                'client_name' => $validatedData['client_name'] ?? null,
                'client_email' => $validatedData['client_email'] ?? null,
                'client_phone' => $validatedData['client_phone'] ?? null,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'total_amount' => $total,
                'status' => 'draft',
                'notes' => $validatedData['notes'] ?? null,
            ]);

            foreach ($validatedData['items'] as $item) {
                $quotation->items()->create([
                    'product_id' => $item['product_id'],
                    'product_price_id' => $item['product_price_id'],
                    'item_name' => $item['item_name'],
                    'package_name' => $item['package_name'] ?? null,
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'subtotal' => $item['subtotal'],
                ]);
            }

            return $quotation;
        });
    }

    public function downloadPdf(int $id)
    {
        $quotation = Quotation::with('items.product')->findOrFail($id);
        $pdf = Pdf::loadView('pdf.quotation', compact('quotation'));
        $filename = 'Quotation-' . str_pad($quotation->id, 5, '0', STR_PAD_LEFT) . '.pdf';

        return $pdf->download($filename);
    }
}
