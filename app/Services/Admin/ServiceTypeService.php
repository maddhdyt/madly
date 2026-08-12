<?php

namespace App\Services\Admin;

use App\Models\Service;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class ServiceTypeService
{
    public function getPaginatedServices(int $perPage = 15): LengthAwarePaginator
    {
        return Service::orderBy('name')->paginate($perPage)->withQueryString();
    }

    public function createService(array $data): Service
    {
        $data['slug'] = Str::slug($data['name']);
        if (isset($data['includes']) && is_array($data['includes'])) {
            $data['includes'] = array_values(array_filter($data['includes']));
        }

        $service = Service::create($data);
        Cache::forget('master_services');
        return $service;
    }

    public function updateService(Service $service, array $data): bool
    {
        $data['slug'] = Str::slug($data['name']);
        if (isset($data['includes']) && is_array($data['includes'])) {
            $data['includes'] = array_values(array_filter($data['includes']));
        }

        $updated = $service->update($data);
        Cache::forget('master_services');
        return $updated;
    }

    public function deleteService(Service $service): ?bool
    {
        $deleted = $service->delete();
        Cache::forget('master_services');
        return $deleted;
    }
}
