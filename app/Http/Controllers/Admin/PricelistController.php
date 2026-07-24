<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pricelist;
use App\Models\Product;
use App\Models\ProductPrice;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class PricelistController extends Controller
{
    public function index()
    {
        $pricelists = Pricelist::with('service', 'prices.product')->latest()->get();
        $products = Product::orderBy('name')->get();
        $services = Service::orderBy('name')->get();

        return Inertia::render('Admin/Pricelists/Index', [
            'pricelists' => $pricelists,
            'products' => $products,
            'services' => $services
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'service_id' => 'required|exists:services,id',
            'promo_header' => 'nullable|string',
            'footer_text' => 'nullable|string',
            'includes' => 'nullable|array',
            'prices' => 'nullable|array',
            'prices.*.product_id' => 'required|exists:products,id',
            'prices.*.package_name' => 'required|string',
            'prices.*.normal_price' => 'required|numeric|min:0',
            'prices.*.promo_price' => 'nullable|numeric|min:0',
            'prices.*.notes' => 'nullable|string',
        ]);

        // Validate HPP
        if (isset($validated['prices']) && is_array($validated['prices'])) {
            foreach ($validated['prices'] as $idx => $priceItem) {
                $product = Product::find($priceItem['product_id']);
                if ($product) {
                    if ($priceItem['normal_price'] < $product->hpp) {
                        throw ValidationException::withMessages([
                            "prices.{$idx}.normal_price" => "Normal price for {$product->name} cannot be lower than its HPP (Rp " . number_format($product->hpp, 0, ',', '.') . ")."
                        ]);
                    }
                    if (isset($priceItem['promo_price']) && $priceItem['promo_price'] < $product->hpp) {
                        throw ValidationException::withMessages([
                            "prices.{$idx}.promo_price" => "Promo price for {$product->name} cannot be lower than its HPP (Rp " . number_format($product->hpp, 0, ',', '.') . ")."
                        ]);
                    }
                }
            }
        }

        $pricelist = Pricelist::create([
            'name' => $validated['name'],
            'service_id' => $validated['service_id'],
            'promo_header' => $validated['promo_header'],
            'footer_text' => $validated['footer_text'],
            'includes' => $validated['includes'] ?? [],
        ]);

        if (isset($validated['prices']) && is_array($validated['prices'])) {
            foreach ($validated['prices'] as $priceItem) {
                $pricelist->prices()->create([
                    'product_id' => $priceItem['product_id'],
                    'package_name' => $priceItem['package_name'],
                    'normal_price' => $priceItem['normal_price'],
                    'promo_price' => $priceItem['promo_price'],
                    'notes' => $priceItem['notes'],
                ]);
            }
        }

        return redirect()->route('admin.pricelists.index')->with('success', 'Pricelist created successfully.');
    }

    public function update(Request $request, Pricelist $pricelist)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'service_id' => 'required|exists:services,id',
            'promo_header' => 'nullable|string',
            'footer_text' => 'nullable|string',
            'includes' => 'nullable|array',
            'prices' => 'nullable|array',
            'prices.*.id' => 'nullable|exists:product_prices,id',
            'prices.*.product_id' => 'required|exists:products,id',
            'prices.*.package_name' => 'required|string',
            'prices.*.normal_price' => 'required|numeric|min:0',
            'prices.*.promo_price' => 'nullable|numeric|min:0',
            'prices.*.notes' => 'nullable|string',
        ]);

        // Validate HPP
        if (isset($validated['prices']) && is_array($validated['prices'])) {
            foreach ($validated['prices'] as $idx => $priceItem) {
                $product = Product::find($priceItem['product_id']);
                if ($product) {
                    if ($priceItem['normal_price'] < $product->hpp) {
                        throw ValidationException::withMessages([
                            "prices.{$idx}.normal_price" => "Normal price for {$product->name} cannot be lower than its HPP (Rp " . number_format($product->hpp, 0, ',', '.') . ")."
                        ]);
                    }
                    if (isset($priceItem['promo_price']) && $priceItem['promo_price'] < $product->hpp) {
                        throw ValidationException::withMessages([
                            "prices.{$idx}.promo_price" => "Promo price for {$product->name} cannot be lower than its HPP (Rp " . number_format($product->hpp, 0, ',', '.') . ")."
                        ]);
                    }
                }
            }
        }

        $pricelist->update([
            'name' => $validated['name'],
            'service_id' => $validated['service_id'],
            'promo_header' => $validated['promo_header'],
            'footer_text' => $validated['footer_text'],
            'includes' => $validated['includes'] ?? [],
        ]);

        // Sync prices
        $existingPriceIds = $pricelist->prices()->pluck('id')->toArray();
        $newPriceIds = [];

        if (isset($validated['prices']) && is_array($validated['prices'])) {
            foreach ($validated['prices'] as $priceItem) {
                if (isset($priceItem['id'])) {
                    // Update existing
                    $pricelist->prices()->where('id', $priceItem['id'])->update([
                        'product_id' => $priceItem['product_id'],
                        'package_name' => $priceItem['package_name'],
                        'normal_price' => $priceItem['normal_price'],
                        'promo_price' => $priceItem['promo_price'],
                        'notes' => $priceItem['notes'],
                    ]);
                    $newPriceIds[] = $priceItem['id'];
                } else {
                    // Create new
                    $newPrice = $pricelist->prices()->create([
                        'product_id' => $priceItem['product_id'],
                        'package_name' => $priceItem['package_name'],
                        'normal_price' => $priceItem['normal_price'],
                        'promo_price' => $priceItem['promo_price'],
                        'notes' => $priceItem['notes'],
                    ]);
                    $newPriceIds[] = $newPrice->id;
                }
            }
        }

        // Delete removed prices
        $pricesToDelete = array_diff($existingPriceIds, $newPriceIds);
        if (count($pricesToDelete) > 0) {
            ProductPrice::whereIn('id', $pricesToDelete)->delete();
        }

        return redirect()->route('admin.pricelists.index')->with('success', 'Pricelist updated successfully.');
    }

    public function destroy(Pricelist $pricelist)
    {
        $pricelist->delete();
        return redirect()->back()->with('success', 'Pricelist deleted successfully.');
    }
}
