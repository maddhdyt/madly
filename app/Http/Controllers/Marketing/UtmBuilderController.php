<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UtmBuilderController extends Controller
{
    public function index()
    {
        $brands = \App\Models\MarketingBrand::orderBy('name')->get();
        $history = \App\Models\UtmLink::with(['user', 'marketingBrand'])
                    ->orderBy('created_at', 'desc')
                    ->paginate(10);

        return inertia('Marketing/UtmBuilder/Index', [
            'brands' => $brands,
            'history' => $history
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'marketing_brand_id' => 'nullable|exists:marketing_brands,id',
            'target_url' => 'required|url',
            'utm_source' => 'required|string|max:255',
            'utm_medium' => 'nullable|string|max:255',
            'utm_campaign' => 'nullable|string|max:255',
            'utm_term' => 'nullable|string|max:255',
            'utm_content' => 'nullable|string|max:255',
        ]);

        $urlParts = parse_url($validated['target_url']);
        $query = [];
        if (isset($urlParts['query'])) {
            parse_str($urlParts['query'], $query);
        }

        $query['utm_source'] = $validated['utm_source'];
        if (!empty($validated['utm_medium'])) $query['utm_medium'] = $validated['utm_medium'];
        if (!empty($validated['utm_campaign'])) $query['utm_campaign'] = $validated['utm_campaign'];
        if (!empty($validated['utm_term'])) $query['utm_term'] = $validated['utm_term'];
        if (!empty($validated['utm_content'])) $query['utm_content'] = $validated['utm_content'];

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

        $validated['generated_url'] = $generatedUrl;
        $validated['user_id'] = auth()->id();

        \App\Models\UtmLink::create($validated);

        return back()->with('success', 'UTM Link generated successfully.');
    }

    public function destroy($id)
    {
        $utm = \App\Models\UtmLink::findOrFail($id);
        $utm->delete();
        
        return back()->with('success', 'UTM Link deleted successfully.');
    }
}
