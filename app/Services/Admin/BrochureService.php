<?php

namespace App\Services\Admin;

use App\Models\Brand;
use App\Models\Brochure;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class BrochureService
{
    public function getPaginatedBrochures(int $perPage = 15): LengthAwarePaginator
    {
        return Brochure::with('brand')->latest()->paginate($perPage)->withQueryString();
    }

    public function getMasterBrands()
    {
        return Cache::remember('master_brands', 86400, function () {
            return Brand::orderBy('name')->get();
        });
    }

    public function createBrochure(array $data, UploadedFile $file): Brochure
    {
        $extension = $file->getClientOriginalExtension();
        $fileType = in_array(strtolower($extension), ['pdf']) ? 'pdf' : 'image';
        $path = $file->store('brochures', 'public');

        return Brochure::create([
            'title' => $data['title'],
            'brand_id' => $data['brand_id'] ?? null,
            'file_path' => $path,
            'file_type' => $fileType,
        ]);
    }

    public function updateBrochure(Brochure $brochure, array $data, ?UploadedFile $file = null): bool
    {
        $updateData = [
            'title' => $data['title'],
            'brand_id' => $data['brand_id'] ?? null,
        ];

        if ($file) {
            if (Storage::disk('public')->exists($brochure->file_path)) {
                Storage::disk('public')->delete($brochure->file_path);
            }

            $extension = $file->getClientOriginalExtension();
            $fileType = in_array(strtolower($extension), ['pdf']) ? 'pdf' : 'image';
            $updateData['file_path'] = $file->store('brochures', 'public');
            $updateData['file_type'] = $fileType;
        }

        return $brochure->update($updateData);
    }

    public function deleteBrochure(Brochure $brochure): ?bool
    {
        if (Storage::disk('public')->exists($brochure->file_path)) {
            Storage::disk('public')->delete($brochure->file_path);
        }

        return $brochure->delete();
    }
}
