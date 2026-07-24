<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::latest()->get();
        return Inertia::render('Admin/Services/Index', [
            'services' => $services
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'required|string|max:50',
            'form_config' => 'required|array',
            'form_config.includes_label' => 'required|string',
            'form_config.includes_placeholder' => 'required|string',
            'form_config.promo_header_label' => 'required|string',
            'form_config.promo_header_placeholder' => 'required|string',
            'form_config.footer_text_label' => 'required|string',
            'form_config.footer_text_placeholder' => 'required|string',
            'product_schema' => 'nullable|array',
            'product_schema.*.name' => 'required|string',
            'product_schema.*.label' => 'required|string',
            'product_schema.*.type' => 'required|string|in:text,number,textarea,url,tags',
            'product_schema.*.placeholder' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Service::create($validated);

        return redirect()->back()->with('success', 'Service template created successfully.');
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'required|string|max:50',
            'form_config' => 'required|array',
            'form_config.includes_label' => 'required|string',
            'form_config.includes_placeholder' => 'required|string',
            'form_config.promo_header_label' => 'required|string',
            'form_config.promo_header_placeholder' => 'required|string',
            'form_config.footer_text_label' => 'required|string',
            'form_config.footer_text_placeholder' => 'required|string',
            'product_schema' => 'nullable|array',
            'product_schema.*.name' => 'required|string',
            'product_schema.*.label' => 'required|string',
            'product_schema.*.type' => 'required|string|in:text,number,textarea,url,tags',
            'product_schema.*.placeholder' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $service->update($validated);

        return redirect()->back()->with('success', 'Service template updated successfully.');
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->back()->with('success', 'Service template deleted successfully.');
    }
}
