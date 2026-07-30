import React, { useState } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Copy, Check, Box, MessageSquare, History, Command, Zap, Search, Clock } from 'lucide-react';

export default function Welcome({ copyToClipboard, searchQuery = "", snippets = [], stats = {}, recentProducts = [] }) {
    
    // 1. DATA PROCESSING (Metrics)
    const query = searchQuery.toLowerCase();
    
    const filteredSnippets = snippets.filter(snippet => 
        snippet.title.toLowerCase().includes(query) || 
        snippet.shortcut.toLowerCase().includes(query) || 
        snippet.content_text.toLowerCase().includes(query)
    );

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
        <div className="flex flex-col gap-6 h-[calc(100vh-140px)] min-h-[700px]">
            
            {/* ROW 1: BENTO TOP METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-36 flex-shrink-0">
                
                {/* Hero / Expert Title Card (Col Span 1) */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[32px] p-6 text-white shadow-logo flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight mb-1 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-gray-400 fill-gray-400" />
                            Sales Hub Pro
                        </h2>
                        <p className="text-gray-400 text-sm">System ready & fully loaded.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                        <Command className="w-3 h-3" />
                        <span>Press '/' to search globally</span>
                    </div>
                </div>

                {/* Metrics 1: Products */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between group hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-900 group-hover:scale-110 transition-transform">
                            <Box className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Database</span>
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{stats.total_products || 0}</h3>
                            <span className="text-sm font-semibold text-gray-500">Products</span>
                        </div>
                        <p className="text-xs font-medium text-gray-400 mt-1">Across {stats.total_brands || 0} Brands</p>
                    </div>
                </div>

                {/* Metrics 2: Snippets & Activity */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between group hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-900 group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Snippets</span>
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{stats.total_snippets || 0}</h3>
                            <span className="text-sm font-semibold text-gray-500">Active</span>
                        </div>
                        <p className="text-xs font-medium text-gray-400 mt-1">Ready for quick replies</p>
                    </div>
                </div>
            </div>

            {/* ROW 2: BENTO MAIN CONTENT */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
                
                {/* LEFT TALL: Chat Snippets (Col Span 5) */}
                <div className="lg:col-span-5 bg-white rounded-[32px] shadow-soft border border-gray-100 flex flex-col overflow-hidden relative">
                    <div className="px-7 pt-7 pb-4 sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-50">
                        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Quick Replies</h2>
                        <p className="text-xs font-medium text-gray-400 mt-0.5">Click any card to copy</p>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-7 pt-4 space-y-3">
                        {filteredSnippets.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                                <Search className="w-8 h-8 mb-2" />
                                <p className="text-sm font-medium">No snippets found</p>
                            </div>
                        )}
                        
                        {filteredSnippets.map((snippet, index) => {
                            const isCopied = copiedSnippetIndex === index;
                            return (
                                <div 
                                    key={index}
                                    onClick={() => {
                                        handleCopy(snippet.content_text, 'Snippet');
                                        setCopiedSnippetIndex(index);
                                        setTimeout(() => setCopiedSnippetIndex(null), 2000);
                                    }}
                                    className={`group relative p-4 rounded-2xl transition-all duration-200 border cursor-pointer hover:shadow-sm ${
                                        isCopied 
                                        ? 'bg-gray-900 border-gray-900 text-white' 
                                        : 'bg-[#f9f9f8] hover:bg-gray-50 border-transparent hover:border-gray-200'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className={`text-sm font-bold ${isCopied ? 'text-white' : 'text-gray-900'}`}>{snippet.title}</h3>
                                        <code className={`bg-white border text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-sm transition-colors ${
                                            isCopied ? 'border-gray-700 text-gray-900' : 'border-gray-200 text-gray-500'
                                        }`}>
                                            {snippet.shortcut}
                                        </code>
                                    </div>
                                    <p className={`text-xs whitespace-pre-wrap leading-relaxed pr-8 line-clamp-3 group-hover:line-clamp-none transition-all ${isCopied ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {snippet.content_text}
                                    </p>
                                    <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
                                        isCopied ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100 scale-100'
                                    }`}>
                                        <div className={`w-6 h-6 rounded-full shadow-sm border flex items-center justify-center transition-colors ${
                                            isCopied 
                                            ? 'bg-white border-white text-gray-900' 
                                            : 'bg-white border-gray-200 text-gray-400'
                                        }`}>
                                            {isCopied ? <Check className="w-3 h-3" strokeWidth={3} /> : <Copy className="w-3 h-3" />}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* MIDDLE TALL: Recent Journals (Col Span 4) */}
                <div className="lg:col-span-4 bg-white rounded-[32px] shadow-soft border border-gray-100 flex flex-col overflow-hidden">
                    <div className="px-7 pt-7 pb-4 sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-50">
                        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Recent Journals</h2>
                        <p className="text-xs font-medium text-gray-400 mt-0.5">Recently added to database</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-7 pt-4 space-y-3">
                        {recentProducts.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                                <Box className="w-8 h-8 mb-2" />
                                <p className="text-sm font-medium">No journals yet</p>
                            </div>
                        ) : (
                            recentProducts.map((product) => (
                                <div key={product.id} className="p-3 rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col gap-1 hover:border-gray-200 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                                        <span className="text-[10px] font-bold bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded whitespace-nowrap ml-2">
                                            {product.attributes?.accreditation_type || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end mt-1">
                                        <span className="text-[10px] text-gray-500 font-medium truncate pr-2">
                                            {product.attributes?.focus_scope?.split(',')[0] || product.attributes?.subject_area?.split(',')[0] || '-'}
                                        </span>
                                        <span className="text-xs font-black text-gray-900 whitespace-nowrap">
                                            {formatPrice(product.attributes?.harga_jual_minimum_info || product.hpp)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* RIGHT TALL: Activity (Col Span 3) */}
                <div className="lg:col-span-3 flex flex-col gap-6 min-h-0">
                    <div className="bg-white rounded-[32px] shadow-soft border border-gray-100 p-6 flex-1 flex flex-col min-h-0 overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-gray-900 tracking-tight">Recent Activity</h2>
                            <History className="w-4 h-4 text-gray-400" />
                        </div>
                        
                        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                            {recentCopies.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 opacity-60">
                                    <Clock className="w-6 h-6 mb-2" />
                                    <p className="text-xs font-medium leading-relaxed">No actions yet.<br/>Copied items will appear here.</p>
                                </div>
                            ) : (
                                recentCopies.map((log) => (
                                    <div key={log.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100/50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1.5 flex-shrink-0"></div>
                                        <div className="min-w-0 w-full">
                                            <div className="flex items-center justify-between gap-2 mb-0.5">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{log.type}</span>
                                                <span className="text-[10px] font-medium text-gray-400">{log.time}</span>
                                            </div>
                                            <p className="text-xs font-medium text-gray-700 truncate">{log.text.split('\n')[0]}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Welcome.layout = page => <MainLayout children={page} />;
