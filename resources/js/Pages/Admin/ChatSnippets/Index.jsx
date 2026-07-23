import React, { useState } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { useForm, router, usePage } from '@inertiajs/react';
import { Plus, Edit2, Trash2, ArrowLeft, MessageSquareQuote } from 'lucide-react';
import ChatSnippetFormSlideOver from './ChatSnippetFormSlideOver';

export default function Index({ snippets, filters }) {
    const { delete: destroy } = useForm();
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
    const [selectedSnippet, setSelectedSnippet] = useState(null);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this chat snippet?')) {
            destroy(route('admin.chat-snippets.destroy', id));
        }
    };

    const openCreateForm = () => {
        setSelectedSnippet(null);
        setIsSlideOverOpen(true);
    };

    const openEditForm = (snippet) => {
        setSelectedSnippet(snippet);
        setIsSlideOverOpen(true);
    };

    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-300">
            {/* Header Area */}
            <div className="flex items-center justify-between px-8 py-8 border-b border-gray-100 dark:border-gray-800">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Chat Snippets</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage quick replies and text templates.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => router.visit(route('home'))}
                        className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </button>
                    <button 
                        onClick={openCreateForm}
                        className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Snippet
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-x-auto bg-white dark:bg-gray-900">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                    <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold border-b border-gray-200 dark:border-gray-800">
                        <tr>
                            <th className="px-8 py-4">Shortcut</th>
                            <th className="px-8 py-4">Title</th>
                            <th className="px-8 py-4 w-1/2">Content</th>
                            <th className="px-8 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                        {snippets.data.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-8 py-12 text-center text-gray-500 dark:text-gray-400">
                                    No chat snippets found. Create one to get started.
                                </td>
                            </tr>
                        ) : (
                            snippets.data.map((snippet) => (
                                <tr key={snippet.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-8 py-4">
                                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 font-mono text-sm font-semibold">
                                            {snippet.shortcut}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 font-bold text-gray-900 dark:text-white">{snippet.title}</td>
                                    <td className="px-8 py-4 text-gray-500 dark:text-gray-400">
                                        <div className="max-w-xl truncate">
                                            {snippet.content_text}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => openEditForm(snippet)}
                                                className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(snippet.id)}
                                                className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                title="Delete Snippet"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination could go here */}

            <ChatSnippetFormSlideOver 
                isOpen={isSlideOverOpen}
                onClose={() => setIsSlideOverOpen(false)}
                snippet={selectedSnippet}
            />
        </div>
    );
}

Index.layout = page => <MainLayout children={page} />;
