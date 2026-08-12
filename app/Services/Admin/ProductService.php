<?php

namespace App\Services\Admin;

use App\Models\Product;
use App\Models\Service;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProductService
{
    public function getPaginatedProducts(?string $serviceId, array $activeFilters = [], ?string $search = null, int $perPage = 15): LengthAwarePaginator
    {
        return Product::with('service')
            ->when($serviceId && $serviceId !== 'all', function ($query) use ($serviceId) {
                return $query->where('service_id', $serviceId);
            })
            ->when($search, function ($query) use ($search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                      ->orWhere('attributes', 'like', '%' . $search . '%');
                });
            })
            ->when(!empty($activeFilters) && is_array($activeFilters), function ($query) use ($activeFilters) {
                foreach ($activeFilters as $key => $value) {
                    if (!empty($value)) {
                        $query->where('attributes->' . $key, 'like', '%' . $value . '%');
                    }
                }
            })
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getFilterOptions(?string $serviceId): array
    {
        $filterOptions = [];
        if (!$serviceId || $serviceId === 'all') {
            return $filterOptions;
        }

        $service = Service::find($serviceId);
        if ($service && !empty($service->product_schema)) {
            $allAttributes = Product::where('service_id', $serviceId)->pluck('attributes');
            foreach ($service->product_schema as $field) {
                if (!in_array($field['type'] ?? '', ['tags', 'label'])) {
                    continue;
                }
                $fieldName = $field['name'];
                $values = [];
                foreach ($allAttributes as $attributes) {
                    $val = $attributes[$fieldName] ?? null;
                    if (!empty($val)) {
                        $parts = explode(',', (string)$val);
                        foreach ($parts as $part) {
                            $cleaned = trim($part);
                            if (!empty($cleaned) && strlen($cleaned) < 60) {
                                $values[] = $cleaned;
                            }
                        }
                    }
                }
                $uniqueVals = collect($values)->unique()->sort()->values()->toArray();
                if (!empty($uniqueVals)) {
                    $filterOptions[$fieldName] = $uniqueVals;
                }
            }
        }

        return $filterOptions;
    }

    public function calculateHppFromUsd(array &$data): void
    {
        if (!empty($data['attributes']['hpp_usd'])) {
            $rate = Cache::remember('usd_to_idr', 43200, function () {
                try {
                    $response = Http::timeout(3)->get('https://open.er-api.com/v6/latest/USD');
                    if ($response->successful()) {
                        return $response->json('rates.IDR', 16000);
                    }
                } catch (\Exception $e) {
                }
                return 16000;
            });
            $usdPrice = (float) $data['attributes']['hpp_usd'];
            $data['hpp'] = round($usdPrice * $rate);
        }
    }

    public function createProduct(array $data): Product
    {
        $this->calculateHppFromUsd($data);
        return Product::create($data);
    }

    public function updateProduct(Product $product, array $data): bool
    {
        $this->calculateHppFromUsd($data);
        return $product->update($data);
    }

    public function deleteProduct(Product $product): ?bool
    {
        return $product->delete();
    }
}
