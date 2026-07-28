import React, { useState, useEffect } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Copy, Calculator, Check, Box, MessageSquare, History, Command, Zap, Search, Plus, Minus, FileText } from 'lucide-react';
import QuotationModal from './QuotationModal';

export default function Welcome({ copyToClipboard, searchQuery = "", pricelists = [], snippets = [], stats = {}, recentProducts = [] }) {
    
    // 1. DATA PROCESSING (Metrics)
    const query = searchQuery.toLowerCase();
    
    const filteredPricelists = pricelists.map(pricelist => {
        const filteredPrices = pricelist.prices.filter(price => {
            const matchProduct = price.product.name.toLowerCase().includes(query) || (price.product.focus_scope && price.product.focus_scope.toLowerCase().includes(query));
            const matchPrices = price.package_name.toLowerCase().includes(query) || price.normal_price.toString().includes(query);
            return matchProduct || matchPrices;
        });
        return { ...pricelist, prices: filteredPrices };
    }).filter(pricelist => pricelist.prices.length > 0 || pricelist.name.toLowerCase().includes(query));

    const filteredSnippets = snippets.filter(snippet => 
        snippet.title.toLowerCase().includes(query) || 
        snippet.shortcut.toLowerCase().includes(query) || 
        snippet.content_text.toLowerCase().includes(query)
    );

    // 2. STATE (Quoter & Activity Log & Scalability)
    const [selectedItems, setSelectedItems] = useState([]);
    const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);
    const [recentCopies, setRecentCopies] = useState([]); // [{ id, text, time, type }]
    const [collapsedPricelists, setCollapsedPricelists] = useState({});
    const [copiedSnippetIndex, setCopiedSnippetIndex] = useState(null);

    const togglePricelist = (pricelistName) => {
        setCollapsedPricelists(prev => ({
            ...prev,
            [pricelistName]: !prev[pricelistName]
        }));
    };

    // Intercept copy action to log it
    const handleCopy = (text, type = 'Snippet') => {
        if (copyToClipboard) {
            copyToClipboard(text);
        }
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setRecentCopies(prev => {
            const newLog = [{ id: Date.now(), text, time: timeString, type }, ...prev];
            return newLog.slice(0, 4); // Keep only last 4
        });
    };

    // Quoter Logic
    const toggleItem = (pricelist, product, priceItem) => {
        const itemId = `${pricelist.name}-${product.name}-${priceItem.id}`;
        setSelectedItems(prev => {
            const exists = prev.find(item => item.id === itemId);
            if (exists) {
                return prev.filter(item => item.id !== itemId);
            } else {
                return [...prev, {
                    id: itemId,
                    product_id: product.id,
                    price_id: priceItem.id,
                    pricelistName: pricelist.name,
                    productName: product.name,
                    category: product.category,
                    promoHeader: pricelist.promo_header,
                    footerText: pricelist.footer_text,
                    includes: pricelist.includes || [],
                    packageName: priceItem.package_name,
                    normalPrice: priceItem.normal_price,
                    promoPrice: priceItem.promo_price,
                    notes: priceItem.notes
                }];
            }
        });
    };

    const isItemSelected = (pricelistName, productName, priceId) => {
        return selectedItems.some(item => item.id === `${pricelistName}-${productName}-${priceId}`);
    };

    const totalCalculatorPrice = selectedItems.reduce((total, item) => total + (item.promoPrice ? item.promoPrice : item.normalPrice), 0);

    const formatPrice = (price) => {
        return price.toLocaleString('id-ID').replace(/,/g, '.');
    };

    const copyQuotation = () => {
        if (selectedItems.length === 0) return;
        
        // Group selected items by Product
        const productsMap = {};
        selectedItems.forEach(item => {
            if (!productsMap[item.productName]) {
                productsMap[item.productName] = {
                    promoHeader: item.promoHeader,
                    category: item.category,
                    includes: item.includes,
                    footerText: item.footerText,
                    packages: []
                };
            }
            productsMap[item.productName].packages.push(item);
        });

        let text = "";
        
        Object.keys(productsMap).forEach((prodName, index) => {
            const prod = productsMap[prodName];
            
            if (prod.promoHeader) {
                text += `${prod.promoHeader}\n`;
            }
            text += `${prodName}\n\n`;
            
            if (prod.category) {
                text += `Bidang:  ${prod.category}\n`;
            }
            
            prod.packages.forEach(pkg => {
                text += `- ${pkg.packageName} : Rp. ${formatPrice(pkg.normalPrice)}`;
                if (pkg.promoPrice) {
                    text += ` Diskon Menjadi 👉 ${formatPrice(pkg.promoPrice)}`;
                }
                if (pkg.notes) {
                    text += ` (${pkg.notes})`;
                }
                text += "\n";
            });
            
            if (prod.includes && prod.includes.length > 0) {
                text += "\nInclude: \n";
                prod.includes.forEach(inc => {
                    text += `✅ ${inc}\n`;
                });
            }
            
            if (prod.footerText) {
                text += `\n${prod.footerText}\n`;
            }
            
            // Add separator between products if there are multiple
            if (index < Object.keys(productsMap).length - 1) {
                text += "\n---\n\n";
            }
        });
        
        handleCopy(text, 'Quotation');
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
                <div className="bg-white dark:bg-gray-900 rounded-[32px] p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between group hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-gray-300 group-hover:scale-110 transition-transform">
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
                <div className="bg-white dark:bg-gray-900 rounded-[32px] p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between group hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-gray-300 group-hover:scale-110 transition-transform">
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
                <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-[32px] shadow-soft border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden relative">
                    <div className="px-7 pt-7 pb-4 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10 border-b border-gray-50 dark:border-gray-800">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 tracking-tight">Quick Replies</h2>
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
                                        ? 'bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900' 
                                        : 'bg-[#f9f9f8] hover:bg-gray-50 border-transparent hover:border-gray-200 dark:bg-gray-800/40 dark:hover:bg-gray-800/80 dark:hover:border-gray-700'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className={`text-sm font-bold ${isCopied ? 'text-white dark:text-gray-900' : 'text-gray-900 dark:text-gray-200'}`}>{snippet.title}</h3>
                                        <code className={`bg-white dark:bg-gray-900 border text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-sm transition-colors ${
                                            isCopied ? 'border-gray-700 text-gray-900 dark:border-gray-300 dark:text-white' : 'border-gray-200 text-gray-500 dark:border-gray-800 dark:text-gray-400'
                                        }`}>
                                            {snippet.shortcut}
                                        </code>
                                    </div>
                                    <p className={`text-xs whitespace-pre-wrap leading-relaxed pr-8 line-clamp-3 group-hover:line-clamp-none transition-all ${isCopied ? 'text-gray-300 dark:text-gray-700' : 'text-gray-600 dark:text-gray-400'}`}>
                                        {snippet.content_text}
                                    </p>
                                    <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
                                        isCopied ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100 scale-100'
                                    }`}>
                                        <div className={`w-6 h-6 rounded-full shadow-sm border flex items-center justify-center transition-colors ${
                                            isCopied 
                                            ? 'bg-white border-white text-gray-900 dark:bg-gray-900 dark:border-gray-900 dark:text-white' 
                                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400'
                                        }`}>
                                            {isCopied ? <Check className="w-3 h-3" strokeWidth={3} /> : <Copy className="w-3 h-3" />}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* MIDDLE TALL: Pricelist (Col Span 4) */}
                <div className="lg:col-span-4 bg-white dark:bg-gray-900 rounded-[32px] shadow-soft border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden">
                    <div className="px-7 pt-7 pb-4 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10 border-b border-gray-50 dark:border-gray-800">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 tracking-tight">Product Catalog</h2>
                        <p className="text-xs font-medium text-gray-400 mt-0.5">Select items to create quote</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-7 pt-4 space-y-6">
                        {filteredPricelists.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                                <Search className="w-8 h-8 mb-2" />
                                <p className="text-sm font-medium">No catalogs found</p>
                            </div>
                        )}
                        
                        {filteredPricelists.map((pricelist, plIndex) => (
                            <div key={plIndex} className="flex flex-col gap-3">
                                <div 
                                    className="flex items-center justify-between cursor-pointer group/pricelist px-1"
                                    onClick={() => togglePricelist(pricelist.name)}
                                >
                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{pricelist.name}</h3>
                                    <div className="w-5 h-5 rounded flex items-center justify-center text-gray-300 group-hover/pricelist:bg-gray-100 group-hover/pricelist:text-gray-600 transition-colors">
                                        {collapsedPricelists[pricelist.name] ? <Plus className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                    </div>
                                </div>
                                
                                {!collapsedPricelists[pricelist.name] && (
                                    <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                        {pricelist.prices.map((price, priceIndex) => {
                                            const product = price.product;
                                            const selected = isItemSelected(pricelist.name, product.name, price.id);
                                            const copyText = `${pricelist.name} - ${product.name} - ${price.package_name} - Rp${price.normal_price.toLocaleString('id-ID')}`;
                                            
                                            return (
                                                <div 
                                                    key={`${plIndex}-${priceIndex}`}
                                                    className={`group relative flex items-start gap-3 p-3 rounded-2xl transition-all duration-200 border cursor-pointer ${
                                                        selected 
                                                        ? 'bg-gray-100/80 dark:bg-gray-800/80 border-gray-300 dark:border-gray-600 shadow-inner' 
                                                        : 'bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-100 dark:border-gray-800'
                                                    }`}
                                                >
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); toggleItem(pricelist, product, price); }}
                                                        className={`mt-1 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all ${
                                                            selected 
                                                            ? 'bg-gray-900 dark:bg-white border-gray-900 dark:border-white text-white dark:text-gray-900 shadow-sm scale-110' 
                                                            : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-transparent hover:border-gray-400 dark:hover:border-gray-500'
                                                        }`}
                                                    >
                                                        <Check className="w-2.5 h-2.5" strokeWidth={4} />
                                                    </button>
                                                    
                                                    <div className="flex-1 min-w-0" onClick={() => handleCopy(copyText, 'Price')}>
                                                        <div className="flex flex-col gap-0.5">
                                                            <div className="flex items-center justify-between">
                                                                <h3 className={`text-[13px] font-bold truncate pr-2 ${selected ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-gray-200'}`}>
                                                                    {product.name}
                                                                </h3>
                                                                <span className="text-[13px] font-bold text-gray-900 dark:text-gray-100 flex-shrink-0">
                                                                    Rp{price.promo_price ? price.promo_price.toLocaleString('id-ID') : price.normal_price.toLocaleString('id-ID')}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <span className="text-gray-500 text-[11px] font-semibold uppercase tracking-wide">
                                                                    {price.package_name}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT TALL: Quoter & Activity (Col Span 3) */}
                <div className="lg:col-span-3 flex flex-col gap-6 min-h-0">
                    
                    {/* Quoter Box */}
                    <div className="bg-gray-900 rounded-[32px] p-6 shadow-logo text-white flex flex-col flex-shrink-0">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold tracking-tight text-gray-100">Quotation</h2>
                            <Calculator className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="bg-gray-800/50 rounded-2xl p-4 mb-4 border border-white/5">
                            <span className="text-xs font-medium text-gray-400 block mb-1">Total ({selectedItems.length} items)</span>
                            <span className="text-2xl font-black tracking-tighter">Rp{totalCalculatorPrice.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <button 
                                onClick={() => setIsQuotationModalOpen(true)}
                                disabled={selectedItems.length === 0}
                                className={`w-full py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                                    selectedItems.length > 0 
                                    ? 'bg-white text-gray-900 shadow-sm hover:scale-[1.02] hover:bg-gray-50' 
                                    : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed opacity-70'
                                }`}
                            >
                                <FileText className="w-4 h-4" />
                                Generate PDF
                            </button>
                            <button 
                                onClick={copyQuotation}
                                disabled={selectedItems.length === 0}
                                className={`w-full py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                                    selectedItems.length > 0 
                                    ? 'bg-transparent text-gray-400 hover:text-white hover:bg-gray-800/50' 
                                    : 'bg-transparent text-gray-600 cursor-not-allowed opacity-70'
                                }`}
                            >
                                <Copy className="w-3.5 h-3.5" />
                                Copy to Clipboard
                            </button>
                        </div>
                    </div>

                    {/* Activity Log */}
                    <div className="bg-white dark:bg-gray-900 rounded-[32px] shadow-soft border border-gray-100 dark:border-gray-800 p-6 flex-1 flex flex-col min-h-0 overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 tracking-tight">Recent Activity</h2>
                            <History className="w-4 h-4 text-gray-400" />
                        </div>
                        
                        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                            {recentCopies.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 opacity-60">
                                    <p className="text-xs font-medium leading-relaxed">No actions yet.<br/>Copied items will appear here.</p>
                                </div>
                            ) : (
                                recentCopies.map((log) => (
                                    <div key={log.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100/50 dark:border-gray-800/50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-gray-400 mt-1.5 flex-shrink-0"></div>
                                        <div className="min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-0.5">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{log.type}</span>
                                                <span className="text-[10px] font-medium text-gray-400">{log.time}</span>
                                            </div>
                                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{log.text.split('\n')[0]}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <QuotationModal 
                isOpen={isQuotationModalOpen} 
                onClose={() => setIsQuotationModalOpen(false)} 
                selectedItems={selectedItems}
                totalItemsAmount={totalCalculatorPrice}
            />
        </div>
    );
}

Welcome.layout = page => <MainLayout children={page} />;
