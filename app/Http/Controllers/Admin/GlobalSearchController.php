<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\GlobalSearchService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GlobalSearchController extends Controller
{
    protected GlobalSearchService $searchService;

    public function __construct(GlobalSearchService $searchService)
    {
        $this->searchService = $searchService;
    }

    public function search(Request $request): JsonResponse
    {
        $query = (string)$request->input('q', '');
        $results = $this->searchService->search($query);

        return response()->json($results);
    }
}
