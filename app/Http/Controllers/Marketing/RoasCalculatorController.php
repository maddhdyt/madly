<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RoasCalculatorController extends Controller
{
    public function index()
    {
        return inertia('Marketing/RoasCalculator/Index');
    }
}
