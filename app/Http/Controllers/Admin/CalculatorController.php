<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Service;
use App\Models\Quotation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

class CalculatorController extends Controller
{
    public function index()
    {
        // Load all data needed for the calculator
        $products = Product::with(['brand', 'service', 'prices'])->orderBy('name')->get();
        $brands = Brand::orderBy('name')->get();
        $services = Service::orderBy('name')->get();

        return Inertia::render('Admin/Calculator/Index', [
            'products' => $products,
            'brands' => $brands,
            'services' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'nullable|string|max:255',
            'client_email' => 'nullable|email|max:255',
            'client_phone' => 'nullable|string|max:255',
            'discount' => 'numeric|min:0',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.product_price_id' => 'required|exists:product_prices,id',
            'items.*.item_name' => 'required|string',
            'items.*.package_name' => 'nullable|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.subtotal' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            $subtotal = collect($validated['items'])->sum('subtotal');
            $discount = $validated['discount'];
            $total = max(0, $subtotal - $discount);

            $quotation = Quotation::create([
                'client_name' => $validated['client_name'],
                'client_email' => $validated['client_email'],
                'client_phone' => $validated['client_phone'],
                'subtotal' => $subtotal,
                'discount' => $discount,
                'total_amount' => $total,
                'status' => 'draft',
                'notes' => $validated['notes'],
            ]);

            foreach ($validated['items'] as $item) {
                $quotation->items()->create([
                    'product_id' => $item['product_id'],
                    'product_price_id' => $item['product_price_id'],
                    'item_name' => $item['item_name'],
                    'package_name' => $item['package_name'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'subtotal' => $item['subtotal'],
                ]);
            }

            DB::commit();

            return redirect()->back()->with([
                'success' => 'Quotation drafted successfully!',
                'quotation_id' => $quotation->id
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Failed to save quotation. ' . $e->getMessage()]);
        }
    }

    public function generatePdf($id)
    {
        $quotation = Quotation::with('items.product')->findOrFail($id);

        $pdf = Pdf::loadView('pdf.quotation', compact('quotation'));
        
        return $pdf->download('Quotation-' . str_pad($quotation->id, 5, '0', STR_PAD_LEFT) . '.pdf');
    }
}
