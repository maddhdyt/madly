<?php

namespace App\Services\Admin;

use App\Models\Brochure;
use App\Models\ChatSnippet;
use App\Models\Product;

class GlobalSearchService
{
    public function search(string $query): array
    {
        if (empty($query)) {
            return [];
        }

        $results = [];

        // Search Products
        $products = Product::with('service:id,name')
            ->where('name', 'like', "%{$query}%")
            ->orWhere('attributes->focus_scope', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'name', 'service_id']);

        foreach ($products as $product) {
            $results[] = [
                'id' => $product->id,
                'title' => $product->name,
                'subtitle' => $product->service ? $product->service->name : 'Product',
                'type' => 'Product',
                'url' => route('admin.products.index', ['search' => $product->name])
            ];
        }

        // Search Snippets
        $snippets = ChatSnippet::where('title', 'like', "%{$query}%")
            ->orWhere('shortcut', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'title', 'shortcut']);

        foreach ($snippets as $snippet) {
            $results[] = [
                'id' => $snippet->id,
                'title' => $snippet->title,
                'subtitle' => 'Shortcut: ' . $snippet->shortcut,
                'type' => 'Snippet',
                'url' => route('admin.chat-snippets.index')
            ];
        }

        // Search Brochures
        $brochures = Brochure::where('title', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'title']);

        foreach ($brochures as $brochure) {
            $results[] = [
                'id' => $brochure->id,
                'title' => $brochure->title,
                'subtitle' => 'File',
                'type' => 'Brochure',
                'url' => route('admin.brochures.index')
            ];
        }

        return $results;
    }
}
