<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ChatSnippetRequest;
use App\Models\ChatSnippet;
use App\Services\Admin\ChatSnippetService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatSnippetController extends Controller
{
    protected ChatSnippetService $chatSnippetService;

    public function __construct(ChatSnippetService $chatSnippetService)
    {
        $this->chatSnippetService = $chatSnippetService;
    }

    public function index(Request $request)
    {
        $search = $request->input('search');
        $snippets = $this->chatSnippetService->getPaginatedSnippets($search);

        return Inertia::render('Admin/ChatSnippets/Index', [
            'snippets' => $snippets,
            'filters' => ['search' => $search],
        ]);
    }

    public function store(ChatSnippetRequest $request)
    {
        $this->chatSnippetService->createSnippet($request->validated());

        return redirect()->back()->with('success', 'Chat snippet created successfully.');
    }

    public function update(ChatSnippetRequest $request, ChatSnippet $chatSnippet)
    {
        $this->chatSnippetService->updateSnippet($chatSnippet, $request->validated());

        return redirect()->back()->with('success', 'Chat snippet updated successfully.');
    }

    public function destroy(ChatSnippet $chatSnippet)
    {
        $this->chatSnippetService->deleteSnippet($chatSnippet);

        return redirect()->back()->with('success', 'Chat snippet deleted successfully.');
    }
}
