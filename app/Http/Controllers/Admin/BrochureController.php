<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brochure;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BrochureController extends Controller
{
    public function index()
    {
        $brochures = Brochure::with('brand')->latest()->get();
        $brands = Brand::orderBy('name')->get();

        return Inertia::render('Admin/Brochures/Index', [
            'brochures' => $brochures,
            'brands' => $brands,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'brand_id' => 'nullable|exists:brands,id',
            'file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240', // max 10MB
        ]);

        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();
        $fileType = in_array(strtolower($extension), ['pdf']) ? 'pdf' : 'image';
        
        $path = $file->store('brochures', 'public');

        Brochure::create([
            'title' => $validated['title'],
            'brand_id' => $validated['brand_id'],
            'file_path' => $path,
            'file_type' => $fileType,
        ]);

        return redirect()->route('admin.brochures.index')->with('success', 'Brochure uploaded successfully.');
    }

    public function update(Request $request, Brochure $brochure)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'brand_id' => 'nullable|exists:brands,id',
            'file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:10240',
        ]);

        $data = [
            'title' => $validated['title'],
            'brand_id' => $validated['brand_id'],
        ];

        if ($request->hasFile('file')) {
            // Delete old file
            if (Storage::disk('public')->exists($brochure->file_path)) {
                Storage::disk('public')->delete($brochure->file_path);
            }

            $file = $request->file('file');
            $extension = $file->getClientOriginalExtension();
            $fileType = in_array(strtolower($extension), ['pdf']) ? 'pdf' : 'image';
            
            $data['file_path'] = $file->store('brochures', 'public');
            $data['file_type'] = $fileType;
        }

        $brochure->update($data);

        return redirect()->route('admin.brochures.index')->with('success', 'Brochure updated successfully.');
    }

    public function destroy(Brochure $brochure)
    {
        if (Storage::disk('public')->exists($brochure->file_path)) {
            Storage::disk('public')->delete($brochure->file_path);
        }
        
        $brochure->delete();
        return redirect()->back()->with('success', 'Brochure deleted successfully.');
    }
}
