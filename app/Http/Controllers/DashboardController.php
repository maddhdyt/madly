<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\ChatSnippet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $brands = Brand::with('products.prices')->get();
        $snippets = ChatSnippet::all();

        return Inertia::render('Welcome', [
            'brands' => $brands,
            'snippets' => $snippets
        ]);
    }
}
