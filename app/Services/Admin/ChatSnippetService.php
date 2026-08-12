<?php

namespace App\Services\Admin;

use App\Models\ChatSnippet;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ChatSnippetService
{
    public function getPaginatedSnippets(?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return ChatSnippet::query()
            ->when($search, function ($query, $search) {
                return $query->where('title', 'like', "%{$search}%")
                             ->orWhere('shortcut', 'like', "%{$search}%")
                             ->orWhere('content_text', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function createSnippet(array $data): ChatSnippet
    {
        return ChatSnippet::create($data);
    }

    public function updateSnippet(ChatSnippet $chatSnippet, array $data): bool
    {
        return $chatSnippet->update($data);
    }

    public function deleteSnippet(ChatSnippet $chatSnippet): ?bool
    {
        return $chatSnippet->delete();
    }
}
