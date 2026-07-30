<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class UpdateCurrencyRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'currency:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update product HPP automatically based on live USD to IDR exchange rate';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info("Fetching latest USD to IDR rate...");

        $rate = Cache::remember('usd_to_idr', 43200, function () {
            try {
                $json = file_get_contents('https://open.er-api.com/v6/latest/USD');
                if ($json) {
                    $data = json_decode($json, true);
                    return $data['rates']['IDR'] ?? null;
                }
            } catch (\Exception $e) {
                Log::error("Failed to fetch currency rate: " . $e->getMessage());
            }
            return null;
        });

        if (!$rate) {
            $this->error("Could not fetch exchange rate. Using fallback of 16000.");
            $rate = 16000;
        }

        $this->info("Current Rate: 1 USD = " . number_format($rate, 2) . " IDR");

        // Find all products that have hpp_usd in their attributes
        $products = Product::whereNotNull('attributes')->get();
        $updatedCount = 0;

        foreach ($products as $product) {
            $attributes = $product->attributes;
            if (!empty($attributes['hpp_usd']) && is_numeric($attributes['hpp_usd'])) {
                $usdPrice = (float) $attributes['hpp_usd'];
                $newHpp = round($usdPrice * $rate);
                
                if ($product->hpp != $newHpp) {
                    $product->hpp = $newHpp;
                    $product->save();
                    $updatedCount++;
                    $this->line("Updated {$product->name} to Rp " . number_format($newHpp));
                }
            }
        }

        $this->info("Successfully updated $updatedCount products!");
    }
}
