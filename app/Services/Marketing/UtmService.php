<?php

namespace App\Services\Marketing;

use App\Models\MarketingBrand;
use App\Models\UtmLink;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UtmService
{
    public function getUtmPageData(int $perPage = 10): array
    {
        return [
            'brands' => MarketingBrand::orderBy('name')->get(),
            'history' => UtmLink::with(['user', 'marketingBrand'])
                ->orderBy('created_at', 'desc')
                ->paginate($perPage)
                ->withQueryString(),
        ];
    }

    public function generateAndSaveUtm(array $validatedData, int $userId): UtmLink
    {
        $urlParts = parse_url($validatedData['target_url']);
        $query = [];
        if (isset($urlParts['query'])) {
            parse_str($urlParts['query'], $query);
        }

        $query['utm_source'] = $validatedData['utm_source'];
        if (!empty($validatedData['utm_medium'])) $query['utm_medium'] = $validatedData['utm_medium'];
        if (!empty($validatedData['utm_campaign'])) $query['utm_campaign'] = $validatedData['utm_campaign'];
        if (!empty($validatedData['utm_term'])) $query['utm_term'] = $validatedData['utm_term'];
        if (!empty($validatedData['utm_content'])) $query['utm_content'] = $validatedData['utm_content'];

        $generatedUrl = '';
        if (isset($urlParts['scheme'])) {
            $generatedUrl .= $urlParts['scheme'] . '://';
        }
        if (isset($urlParts['host'])) {
            $generatedUrl .= $urlParts['host'];
        }
        if (isset($urlParts['port'])) {
            $generatedUrl .= ':' . $urlParts['port'];
        }
        if (isset($urlParts['path'])) {
            $generatedUrl .= $urlParts['path'];
        }
        
        $generatedUrl .= '?' . http_build_query($query);

        if (isset($urlParts['fragment'])) {
            $generatedUrl .= '#' . $urlParts['fragment'];
        }

        $validatedData['generated_url'] = $generatedUrl;
        $validatedData['user_id'] = $userId;

        return UtmLink::create($validatedData);
    }

    public function deleteUtm(int $id): bool
    {
        $utm = UtmLink::findOrFail($id);
        return (bool) $utm->delete();
    }
}
