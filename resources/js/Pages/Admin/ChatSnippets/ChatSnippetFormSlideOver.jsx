import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function ChatSnippetFormSlideOver({ isOpen, onClose, snippet }) {
    const isEditing = !!snippet;
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        shortcut: '',
        title: '',
        content_text: '',
    });

    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setTimeout(() => setIsAnimating(true), 10);
            if (snippet) {
                setData({
                    shortcut: snippet.shortcut,
                    title: snippet.title,
                    content_text: snippet.content_text,
                });
            } else {
                reset();
            }
            clearErrors();
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, snippet]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Auto format shortcut to start with slash if requested by user convention,
        // but for now let's just let it be whatever they type, or force a slash if they forgot.
        let submittedData = { ...data };
        if (submittedData.shortcut && !submittedData.shortcut.startsWith('/')) {
            submittedData.shortcut = '/' + submittedData.shortcut;
        }

        setData('shortcut', submittedData.shortcut);

        if (isEditing) {
            put(route('admin.chat-snippets.update', snippet.id), {
                onSuccess: () => onClose(),
                data: submittedData
            });
        } else {
            post(route('admin.chat-snippets.store'), {
                onSuccess: () => onClose(),
                data: submittedData
            });
        }
    };

    if (!shouldRender) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            <div 
                className={`absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                    isAnimating ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={onClose}
            />

            <div 
                className={`absolute inset-y-0 right-0 w-full max-w-md bg-white dark:bg-gray-950 shadow-2xl border-l border-gray-100 dark:border-gray-800 transition-transform duration-300 ease-out flex flex-col ${
                    isAnimating ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            {isEditing ? 'Edit Snippet' : 'New Snippet'}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {isEditing ? 'Modify your chat snippet.' : 'Create a new text template.'}
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <form id="snippet-form" onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-2">
                                Shortcut
                            </label>
                            <input
                                type="text"
                                value={data.shortcut}
                                onChange={e => setData('shortcut', e.target.value)}
                                className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 ${
                                    errors.shortcut 
                                    ? 'border-red-300 dark:border-red-500/50 focus:border-red-500' 
                                    : 'border-gray-200 dark:border-gray-800 focus:border-gray-300 dark:focus:border-gray-600 text-gray-900 dark:text-white'
                                }`}
                                placeholder="e.g. /hello"
                            />
                            {errors.shortcut && (
                                <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.shortcut}</p>
                            )}
                            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">Used to quickly trigger this snippet (automatically adds / if missing).</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 ${
                                    errors.title 
                                    ? 'border-red-300 dark:border-red-500/50 focus:border-red-500' 
                                    : 'border-gray-200 dark:border-gray-800 focus:border-gray-300 dark:focus:border-gray-600 text-gray-900 dark:text-white'
                                }`}
                                placeholder="e.g. Standard Greeting"
                            />
                            {errors.title && (
                                <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.title}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-2">
                                Content
                            </label>
                            <textarea
                                value={data.content_text}
                                onChange={e => setData('content_text', e.target.value)}
                                rows={6}
                                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 resize-none ${
                                    errors.content_text 
                                    ? 'border-red-300 dark:border-red-500/50 focus:border-red-500' 
                                    : 'border-gray-200 dark:border-gray-800 focus:border-gray-300 dark:focus:border-gray-600 text-gray-900 dark:text-white'
                                }`}
                                placeholder="Type the full message here..."
                            />
                            {errors.content_text && (
                                <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.content_text}</p>
                            )}
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <button
                        type="submit"
                        form="snippet-form"
                        disabled={processing}
                        className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        {processing ? 'Saving...' : 'Save Snippet'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
