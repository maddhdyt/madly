<?php

namespace App\Http\Controllers;

use App\Models\Pricelist;
use App\Models\ChatSnippet;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Service;
use App\Models\User;
use App\Models\Brochure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'total_snippets' => ChatSnippet::count(),
            'total_brands' => Brand::count(),
            'total_users' => User::count(),
            'total_services' => Service::count(),
            'total_brochures' => Brochure::count(),
        ];

        $recentProducts = Product::with('service')->latest()->take(5)->get();
        $snippets = ChatSnippet::take(100)->get();

        return Inertia::render('Welcome', [
            'stats' => $stats,
            'recentProducts' => $recentProducts,
            'snippets' => $snippets
        ]);
    }
}
