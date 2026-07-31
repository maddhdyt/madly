import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, Box, MessageSquare, BookOpen, FileText, ChevronRight, Loader2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import useTranslations from '../Hooks/useTranslations';

export default function GlobalSearchModal({ isOpen, onClose }) {
    const { t } = useTranslations();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setResults([]);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const timer = setTimeout(() => {
            setLoading(true);
            fetch(route('admin.search') + `?q=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(data => {
                    setResults(data);
                    setActiveIndex(0);
                })
                .finally(() => setLoading(false));
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
            } else if (e.key === 'Enter' && results.length > 0) {
                e.preventDefault();
                handleSelect(results[activeIndex]);
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, activeIndex]);

    const handleSelect = (item) => {
        onClose();
        router.visit(item.url);
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Product': return <Box className="w-5 h-5 text-blue-500" />;
            case 'Snippet': return <MessageSquare className="w-5 h-5 text-emerald-500" />;
            case 'Pricelist': return <BookOpen className="w-5 h-5 text-purple-500" />;
            case 'Brochure': return <FileText className="w-5 h-5 text-amber-500" />;
            default: return <Search className="w-5 h-5 text-gray-400" />;
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-200 flex items-start justify-center pt-24 sm:pt-32 px-4">
            <div className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-200">
                {/* Search Input */}
                <div className="flex items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <Search className="w-6 h-6 text-gray-400 mr-4 shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent border-none text-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 p-0"
                        placeholder={t("Search products, snippets, pricelists...")}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {loading && <Loader2 className="w-5 h-5 text-gray-400 animate-spin ml-4" />}
                    <div className="hidden sm:flex items-center gap-1 ml-4 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-[10px] font-bold text-gray-500 dark:text-gray-400">
                        ESC
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
                    {query && results.length === 0 && !loading && (
                        <div className="px-6 py-12 text-center">
                            <p className="text-gray-500 dark:text-gray-400">{t('No results found for')} "<span className="text-gray-900 dark:text-white font-semibold">{query}</span>"</p>
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="py-2">
                            {results.map((item, index) => (
                                <div
                                    key={`${item.type}-${item.id}`}
                                    onClick={() => handleSelect(item)}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={`flex items-center px-6 py-3 cursor-pointer transition-colors ${
                                        activeIndex === index 
                                        ? 'bg-gray-50 dark:bg-gray-800' 
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center mr-4 shrink-0">
                                        {getIcon(item.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`text-sm font-bold truncate ${activeIndex === index ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                    <div className="ml-4 flex items-center gap-3">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                            {item.type === 'Product' ? t('Product') : item.type === 'Snippet' ? t('Snippet') : item.type === 'Pricelist' ? t('Catalog') : t('Brochure')}
                                        </span>
                                        <ChevronRight className={`w-4 h-4 transition-colors ${activeIndex === index ? 'text-gray-900 dark:text-white' : 'text-gray-300 dark:text-gray-600'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {!query && (
                        <div className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center">
                            <Search className="w-8 h-8 text-gray-200 dark:text-gray-800 mb-3" />
                            <p>{t('Start typing to search across your workspace')}</p>
                            <div className="flex items-center gap-2 mt-4 text-xs font-semibold">
                                <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{t('Products')}</span>
                                <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{t('Snippets')}</span>
                                <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{t('Catalogs')}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
