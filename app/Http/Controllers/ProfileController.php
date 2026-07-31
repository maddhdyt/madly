<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'avatar' => ['nullable', 'image', 'max:2048'],
            'current_password' => ['nullable', 'required_with:password', 'string'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        if (!empty($validated['password'])) {
            if (!\Hash::check($validated['current_password'], $user->password)) {
                return redirect()->back()->withErrors(['current_password' => 'The provided password does not match your current password.']);
            }
            $user->password = bcrypt($validated['password']);
        }

        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $path;
        }

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->save();

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }
}
