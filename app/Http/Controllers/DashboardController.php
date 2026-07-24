<?php

namespace App\Http\Controllers;

use App\Models\Pricelist;
use App\Models\ChatSnippet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $pricelists = Pricelist::with('prices.product')->get();
        $snippets = ChatSnippet::all();

        return Inertia::render('Welcome', [
            'pricelists' => $pricelists,
            'snippets' => $snippets
        ]);
    }
}
