import React, { useState, useMemo } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Copy, Check, Box, MessageSquare, History, Command, Zap, Search, Clock, Users, Layers, FileText, ArrowRight } from 'lucide-react';
import useTranslations from '../Hooks/useTranslations';
import { Link, usePage } from '@inertiajs/react';

export default function Welcome({ copyToClipboard, searchQuery = "", snippets = [], stats = {}, recentProducts = [] }) {
    const { t } = useTranslations();
    const { auth } = usePage().props;
    const user = auth?.user?.name || 'Admin';

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    // 1. DATA PROCESSING (Metrics)
    const query = searchQuery.toLowerCase();

    const filteredSnippets = useMemo(() => {
        return snippets.filter(snippet =>
            snippet.title.toLowerCase().includes(query) ||
            snippet.shortcut.toLowerCase().includes(query) ||
            snippet.content_text.toLowerCase().includes(query)
        );
    }, [snippets, query]);

    // 2. STATE (Activity Log)
    const [recentCopies, setRecentCopies] = useState([]);
    const [copiedSnippetIndex, setCopiedSnippetIndex] = useState(null);

    // Intercept copy action to log it
    const handleCopy = (text, type = 'Snippet') => {
        if (copyToClipboard) {
            copyToClipboard(text);
        }

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setRecentCopies(prev => {
            const newLog = [{ id: Date.now(), text, time: timeString, type }, ...prev];
            return newLog.slice(0, 5); // Keep only last 5
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price || 0);
    };

    return (
        <div className="flex flex-col font-sans bg-white dark:bg-gray-900 min-h-[calc(100vh-80px)] rounded-tl-3xl border-l border-t border-gray-100 dark:border-gray-800 overflow-y-auto transition-colors duration-300">
            <div className="w-full p-6 md:p-8 lg:p-10">

                {/* Dot Grid Banner & Actions */}
                <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.05] dark:group-hover:opacity-[0.08] transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'currentColor' }}></div>
                    <div className="relative z-10">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{greeting}, {user} 👋</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3">
                        <Link href={route('admin.calculator.index')} className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                            <Box className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            {t('Quick Quotation')}
                        </Link>
                        <Link href={route('admin.products.index')} className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-white dark:text-gray-900 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                            <Box className="w-4 h-4 text-white/80 dark:text-gray-900/80" />
                            {t('Manage Products')}
                        </Link>
                    </div>
                </div>

                {/* Metrics with Monochrome Trends */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: t('Total Products'), value: stats.total_products, icon: Box, trend: '+12%', isUp: true },
                        { label: t('Active Snippets'), value: stats.total_snippets, icon: MessageSquare, trend: '+3', isUp: true },
                        { label: t('Total Brochures'), value: stats.total_brochures, icon: FileText, trend: '0%', isUp: true },
                        { label: t('Registered Users'), value: stats.total_users, icon: Users, trend: '+1', isUp: true },
                    ].map((stat, i) => (
                        <div key={i} className="relative bg-white dark:bg-gray-900 px-5 py-5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all overflow-hidden group">
                            {/* Decorative monochrome sparkline hint */}
                            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10 flex justify-between items-start mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
                                    <stat.icon className="w-4 h-4" />
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/80 px-2 py-1 rounded-md border border-gray-200/50 dark:border-gray-700/50">
                                    <ArrowRight className={`w-3 h-3 ${stat.trend.startsWith('+') ? '-rotate-45' : ''}`} />
                                    {stat.trend}
                                </div>
                            </div>
                            <div className="relative z-10">
                                <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-1.5">{stat.value || 0}</div>
                                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* Database View: Products (Left) */}
                    <div className="xl:col-span-2 flex flex-col min-h-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{t('Recently Added Products')}</h2>
                        </div>

                        <div className="flex-1 overflow-x-auto">
                            {recentProducts.length === 0 ? (
                                <div className="py-12 flex items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                                    {t('No data yet')}
                                </div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-800">
                                            <th className="py-3 px-6 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50/50 dark:bg-gray-800/50">{t('Product Name')}</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50/50 dark:bg-gray-800/50">{t('Service')}</th>
                                            <th className="py-3 px-6 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right bg-gray-50/50 dark:bg-gray-800/50">{t('Price')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                        {recentProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors group">
                                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-white flex items-center gap-3 font-semibold">
                                                    <div className="w-8 h-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center shrink-0 shadow-sm group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors">
                                                        <FileText className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                                                    </div>
                                                    <span className="truncate">{product.name}</span>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-700">{product.service?.name || '-'}</span>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-white text-right font-bold whitespace-nowrap">
                                                    {formatPrice(product.attributes?.harga_jual_minimum_info || product.hpp)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Snippets & Activity */}
                    <div className="flex flex-col gap-8">

                        {/* Snippets List */}
                        <div className="flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden h-100">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{t('Quick Replies')}</h2>
                                <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                                {filteredSnippets.length === 0 ? (
                                    <div className="py-12 flex items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                                        {t('No snippets found')}
                                    </div>
                                ) : (
                                    filteredSnippets.map((snippet, index) => {
                                        const isCopied = copiedSnippetIndex === index;
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    handleCopy(snippet.content_text, 'Snippet');
                                                    setCopiedSnippetIndex(index);
                                                    setTimeout(() => setCopiedSnippetIndex(null), 2000);
                                                }}
                                                className={`group cursor-pointer p-3 rounded-xl transition-all border ${isCopied
                                                        ? 'bg-gray-900 dark:bg-white border-gray-900 dark:border-white text-white dark:text-gray-900 shadow-md'
                                                        : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm'
                                                    } flex items-start gap-3`}
                                            >
                                                <div className="mt-0.5 shrink-0">
                                                    {isCopied ? (
                                                        <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-gray-900/20 flex items-center justify-center">
                                                            <Check className="w-3.5 h-3.5 text-white dark:text-gray-900" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-6 h-6 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-all">
                                                            <MessageSquare className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center justify-between gap-2 mb-0.5">
                                                        <span className={`text-sm font-bold truncate ${isCopied ? 'text-white dark:text-gray-900' : 'text-gray-900 dark:text-white'}`}>{snippet.title}</span>
                                                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${isCopied ? 'bg-transparent border-gray-600 dark:border-gray-300 text-gray-300 dark:text-gray-600' : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'
                                                            }`}>{snippet.shortcut}</span>
                                                    </div>
                                                    <p className={`text-xs line-clamp-1 group-hover:line-clamp-none transition-all leading-relaxed ${isCopied ? 'text-gray-300 dark:text-gray-700' : 'text-gray-500 dark:text-gray-400'}`}>{snippet.content_text}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Activity Timeline (Monochrome) */}
                        <div className="flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex-1 min-h-62.5">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{t('Recent Activity')}</h2>
                                <History className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                                {recentCopies.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500">
                                        <Clock className="w-6 h-6 mb-2 text-gray-300 dark:text-gray-600" />
                                        <p className="text-xs font-medium">{t('No actions yet.')}</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {recentCopies.map((log, index) => (
                                            <div key={log.id} className={`relative pl-6 pb-4 ${index !== recentCopies.length - 1 ? 'border-l border-gray-200 dark:border-gray-700' : ''}`}>
                                                <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600"></div>
                                                <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">{log.time}</div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {t('Copied')} <span className="font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-1.5 rounded">{log.type}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">{log.text.split('\n')[0]}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

Welcome.layout = page => <MainLayout children={page} />;
