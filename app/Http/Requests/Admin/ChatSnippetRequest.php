<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ChatSnippetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $snippetId = $this->route('chat_snippet') ? $this->route('chat_snippet')->id : null;

        return [
            'shortcut' => [
                'required',
                'string',
                'max:255',
                Rule::unique('chat_snippets', 'shortcut')->ignore($snippetId),
            ],
            'title' => 'required|string|max:255',
            'content_text' => 'required|string',
        ];
    }
}
