<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ChatSnippet;
use App\Models\Pricelist;
use App\Models\Brochure;

class GlobalSearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');

        if (empty($query)) {
            return response()->json([]);
        }

        $results = [];

        // Search Products
        $products = Product::where('name', 'like', "%{$query}%")
            ->orWhere('category', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'name', 'category']);
            
        foreach ($products as $product) {
            $results[] = [
                'id' => $product->id,
                'title' => $product->name,
                'subtitle' => $product->category,
                'type' => 'Product',
                'url' => route('admin.products.index')
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

        // Search Pricelists
        $pricelists = Pricelist::where('name', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'name']);
            
        foreach ($pricelists as $pricelist) {
            $results[] = [
                'id' => $pricelist->id,
                'title' => $pricelist->name,
                'subtitle' => 'Catalog',
                'type' => 'Pricelist',
                'url' => route('admin.pricelists.index')
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

        return response()->json($results);
    }
}
