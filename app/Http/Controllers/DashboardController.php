<?php

namespace App\Http\Controllers;

use App\Models\Pricelist;
use App\Models\ChatSnippet;
use App\Models\Product;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'total_pricelists' => Pricelist::count(),
            'total_snippets' => ChatSnippet::count(),
            'total_brands' => Brand::count(),
        ];

        $recentProducts = Product::with('service')->latest()->take(5)->get();
        $pricelists = Pricelist::with('prices.product', 'service')->get();
        $snippets = ChatSnippet::all();

        return Inertia::render('Welcome', [
            'stats' => $stats,
            'recentProducts' => $recentProducts,
            'pricelists' => $pricelists,
            'snippets' => $snippets
        ]);
    }
}
