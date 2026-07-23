<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChatSnippet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatSnippetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $snippets = ChatSnippet::query()
            ->when($search, function ($query, $search) {
                return $query->where('title', 'like', "%{$search}%")
                             ->orWhere('shortcut', 'like', "%{$search}%")
                             ->orWhere('content_text', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/ChatSnippets/Index', [
            'snippets' => $snippets,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shortcut' => 'required|string|max:255|unique:chat_snippets,shortcut',
            'title' => 'required|string|max:255',
            'content_text' => 'required|string',
        ]);

        ChatSnippet::create($validated);

        return redirect()->route('admin.chat-snippets.index')->with('success', 'Chat snippet created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ChatSnippet $chatSnippet)
    {
        $validated = $request->validate([
            'shortcut' => 'required|string|max:255|unique:chat_snippets,shortcut,' . $chatSnippet->id,
            'title' => 'required|string|max:255',
            'content_text' => 'required|string',
        ]);

        $chatSnippet->update($validated);

        return redirect()->route('admin.chat-snippets.index')->with('success', 'Chat snippet updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChatSnippet $chatSnippet)
    {
        $chatSnippet->delete();

        return redirect()->route('admin.chat-snippets.index')->with('success', 'Chat snippet deleted successfully.');
    }
}
