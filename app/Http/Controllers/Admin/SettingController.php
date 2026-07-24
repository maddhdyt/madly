<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;
use Illuminate\Support\Facades\Artisan;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'company_name' => 'nullable|string',
            'company_tagline' => 'nullable|string',
            'company_address' => 'nullable|string',
            'company_email' => 'nullable|string',
            'company_phone' => 'nullable|string',
            'quotation_footer' => 'nullable|string',
            'quotation_terms' => 'nullable|string',
        ]);

        foreach ($data as $key => $value) {
            Setting::set($key, $value);
        }

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }
}
