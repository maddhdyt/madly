<?php

namespace App\Services\Marketing;

use App\Models\AdIdentity;
use App\Models\MarketingBrand;
use App\Models\User;

class AdIdentityService
{
    public function getAdIdentityPageData(): array
    {
        return [
            'identities' => AdIdentity::with(['marketingBrand', 'sales'])->latest()->get(),
            'brands' => MarketingBrand::orderBy('name')->get(),
            'salesUsers' => User::where('role', 'sales')->orderBy('name')->get(),
        ];
    }

    public function createAdIdentity(array $validatedData): AdIdentity
    {
        $validatedData['power_points'] = 10;
        return AdIdentity::create($validatedData);
    }

    public function updateAdIdentity(AdIdentity $adIdentity, array $validatedData): bool
    {
        return $adIdentity->update($validatedData);
    }

    public function deleteAdIdentity(AdIdentity $adIdentity): ?bool
    {
        return $adIdentity->delete();
    }
}
