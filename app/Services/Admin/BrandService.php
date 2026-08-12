<?php

namespace App\Services\Admin;

use App\Models\Brand;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class BrandService
{
    public function getPaginatedBrands(int $perPage = 15): LengthAwarePaginator
    {
        return Brand::latest()->paginate($perPage)->withQueryString();
    }

    public function createBrand(array $data, ?UploadedFile $logoFile = null): Brand
    {
        $data['slug'] = Str::slug($data['name']);

        if (Brand::where('slug', $data['slug'])->exists()) {
            throw ValidationException::withMessages([
                'name' => 'Brand with this name already exists.'
            ]);
        }

        if ($logoFile) {
            $path = $logoFile->store('brands', 'public');
            $data['logo'] = '/storage/' . $path;
        }

        $brand = Brand::create($data);
        Cache::forget('master_brands');
        return $brand;
    }

    public function updateBrand(Brand $brand, array $data, ?UploadedFile $logoFile = null): bool
    {
        $data['slug'] = Str::slug($data['name']);

        if (Brand::where('slug', $data['slug'])->where('id', '!=', $brand->id)->exists()) {
            throw ValidationException::withMessages([
                'name' => 'Brand with this name already exists.'
            ]);
        }

        if ($logoFile) {
            if ($brand->logo) {
                $oldPath = str_replace('/storage/', '', $brand->logo);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $logoFile->store('brands', 'public');
            $data['logo'] = '/storage/' . $path;
        } else {
            unset($data['logo']);
        }

        $updated = $brand->update($data);
        Cache::forget('master_brands');
        return $updated;
    }

    public function deleteBrand(Brand $brand): ?bool
    {
        if ($brand->logo) {
            $oldPath = str_replace('/storage/', '', $brand->logo);
            Storage::disk('public')->delete($oldPath);
        }

        $deleted = $brand->delete();
        Cache::forget('master_brands');
        return $deleted;
    }
}
