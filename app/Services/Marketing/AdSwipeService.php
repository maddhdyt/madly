<?php

namespace App\Services\Marketing;

use App\Models\AdSwipe;
use App\Models\MarketingBrand;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Collection;

class AdSwipeService
{
    public function getAdSwipePageData(): array
    {
        return [
            'swipes' => AdSwipe::with('marketingBrand')->latest()->get(),
            'brands' => MarketingBrand::where('is_active', true)->get(),
        ];
    }

    public function createAdSwipe(array $data, ?UploadedFile $image = null): AdSwipe
    {
        if ($image) {
            $data['image_path'] = $image->store('ad_swipes', 'public');
        }

        return AdSwipe::create($data);
    }

    public function updateAdSwipe(AdSwipe $adSwipe, array $data, ?UploadedFile $image = null): bool
    {
        if ($image) {
            if ($adSwipe->image_path) {
                Storage::disk('public')->delete($adSwipe->image_path);
            }
            $data['image_path'] = $image->store('ad_swipes', 'public');
        }

        return $adSwipe->update($data);
    }

    public function deleteAdSwipe(AdSwipe $adSwipe): ?bool
    {
        if ($adSwipe->image_path) {
            Storage::disk('public')->delete($adSwipe->image_path);
        }

        return $adSwipe->delete();
    }
}
