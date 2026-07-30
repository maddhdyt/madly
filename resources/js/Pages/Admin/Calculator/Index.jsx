import React, { useState, useMemo, useEffect } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { Search, Copy, Receipt, Filter, ChevronLeft, ChevronRight, CheckCircle2, Link as LinkIcon } from 'lucide-react';
import CustomSelect from '../../../Components/CustomSelect';

export default function Calculator({ products, brands, services }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeService, setActiveService] = useState('all');
    const [activeBrand, setActiveBrand] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [genData, setGenData] = useState({
        brand_id: brands.length > 0 ? brands[0].id : '',
        harga_coret: '',
        harga_diskon: '',
        includes: []
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Filtering Products
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchService = activeService === 'all' || p.service_id === activeService;
            return matchSearch && matchService;
        });
    }, [products, searchQuery, activeService]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeService]);

    const formatRupiah = (number) => {
        if (!number) return '0';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        const standardPrice = parseFloat(product.attributes?.harga_jual_standar || product.attributes?.harga_jual_minimum_info || product.hpp || 0);
        setGenData({
            brand_id: brands.length > 0 ? brands[0].id : '',
            harga_coret: Math.round(standardPrice * 1.25).toString(),
            harga_diskon: Math.round(standardPrice).toString(),
            includes: product.service?.includes || []
        });
    };

    const toggleInclude = (incName) => {
        if (genData.includes.includes(incName)) {
            setGenData({ ...genData, includes: genData.includes.filter(i => i !== incName) });
        } else {
            setGenData({ ...genData, includes: [...genData.includes, incName] });
        }
    };

    const selectedBrand = useMemo(() => brands.find(b => b.id == genData.brand_id), [brands, genData.brand_id]);

    const getPrimaryScope = (scopeString) => {
        if (!scopeString) return '-';
        return scopeString.split(',')[0].trim();
    };

    const snippet1 = useMemo(() => {
        if (!selectedProduct) return '';
        const attr = selectedProduct.attributes || {};
        let text = `Journal Name: ${selectedProduct.name}\n`;
        if (attr.e_issn) text += `E-ISSN: ${attr.e_issn}\n`;
        text += `\nSubject area: ${attr.focus_scope || attr.subject_area || '-'}\n`;
        
        let journalLink = '-';
        if (attr.links && attr.links.length > 0) {
            journalLink = attr.links[0].url;
        }
        
        text += `\nJournal Link: ${journalLink}`;
        if (attr.scopus_link) text += `\nScopus Link: ${attr.scopus_link}`;
        
        return text;
    }, [selectedProduct]);

    const snippet2 = useMemo(() => {
        if (!selectedProduct) return '';
        const attr = selectedProduct.attributes || {};
        
        let text = `Pricelist Spesial Promo Terbatas\n`;
        text += `🔥 ${attr.accreditation_type || 'SCOPUS'} 🔥\n\n`;
        
        text += `Terindeks : ${selectedProduct.status_note || 'Scopus'}\n`;
        text += `Bidang : ${getPrimaryScope(attr.focus_scope || attr.subject_area)}\n\n`;
        
        const coret = formatRupiah(genData.harga_coret);
        const diskon = formatRupiah(genData.harga_diskon);
        text += `~${coret}~, Diskon Menjadi 👉 ${diskon},-\n\n`;
        
        if (genData.includes && genData.includes.length > 0) {
            text += `Include:\n`;
            genData.includes.forEach(inc => {
                text += `• ${inc}\n`;
            });
            text += `\n`;
        }
        
        text += `Terimakasih\n✨ ${selectedBrand?.name || 'Agency'} ✨`;
        
        return text;
    }, [selectedProduct, genData, selectedBrand]);

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            triggerToast(`${type} Copied to Clipboard!`);
        });
    };

    return (
        <MainLayout title="Quick Quotation">
            <Head title="Live WA Generator" />

            {/* Toast Notification */}
            <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
                <div className="bg-gray-900 border border-gray-700 shadow-2xl rounded-2xl p-4 flex items-center gap-3 min-w-72">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm tracking-tight">Success!</h4>
                        <p className="text-gray-400 text-xs font-medium">{toastMessage}</p>
                    </div>
                </div>
            </div>

            <div className="flex h-full w-full gap-6 overflow-hidden">
                
                {/* LEFT PANEL: Catalog */}
                <div className="flex-1 flex flex-col bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden h-full">
                    <div className="p-5 border-b border-gray-100 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Master Products</h2>
                            <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{filteredProducts.length} Items</span>
                        </div>
                        
                        {/* Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search journals or products..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <CustomSelect 
                                    className="bg-gray-50 border-gray-200 py-2.5 pl-3 text-sm font-medium text-gray-700"
                                    value={activeService}
                                    onChange={(e) => setActiveService(e.target.value)}
                                    options={[
                                        { value: 'all', label: 'All Services' },
                                        ...services.map(s => ({ value: s.id, label: s.name }))
                                    ]}
                                    icon={<Filter className="w-4 h-4 text-gray-400" />}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 bg-[#f8f9fa] flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 content-start flex-1">
                            {paginatedProducts.map(product => (
                                <button 
                                    key={product.id} 
                                    onClick={() => handleSelectProduct(product)}
                                    className={`bg-white border rounded-2xl p-4 text-left transition-all shadow-sm hover:shadow-md flex flex-col justify-between h-full ${selectedProduct?.id === product.id ? 'border-gray-900 ring-1 ring-gray-900' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="mb-4">
                                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight mb-2">{product.name}</h3>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            {product.attributes?.accreditation_type && (
                                                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold border border-gray-200">
                                                    {product.attributes.accreditation_type}
                                                </span>
                                            )}
                                            {product.service && (
                                                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold border border-gray-200">
                                                    {product.service.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-auto border-t border-gray-100 pt-3 flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Harga Standar</p>
                                            <p className="text-sm font-black text-gray-900">{product.attributes?.harga_jual_standar ? formatRupiah(product.attributes.harga_jual_standar) : (product.attributes?.harga_jual_minimum_info ? formatRupiah(product.attributes.harga_jual_minimum_info) : '-')}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Min. Price</p>
                                            <p className="text-xs font-semibold text-gray-400">{product.attributes?.harga_jual_minimum_info ? formatRupiah(product.attributes.harga_jual_minimum_info) : '-'}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                            {filteredProducts.length === 0 && (
                                <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400">
                                    <Search className="w-8 h-8 mb-3 opacity-30" />
                                    <span className="text-sm font-medium">No products match your search.</span>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-5 flex items-center justify-between bg-white border border-gray-200 rounded-xl p-2 px-4 shadow-sm shrink-0">
                                <span className="text-xs font-bold text-gray-500">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <div className="flex gap-1">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${currentPage === i + 1 ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL: Live WA Generator */}
                <div className="w-[450px] shrink-0 bg-white rounded-3xl border border-gray-200 shadow-xl flex flex-col overflow-hidden h-full relative">
                    {!selectedProduct ? (
                        <div className="h-full flex flex-col items-center justify-center text-center px-6">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <Receipt className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Live WA Generator</h3>
                            <p className="text-sm text-gray-500 font-medium">Select a product from the catalog on the left to instantly generate WhatsApp quotation snippets.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="p-5 border-b border-gray-100 bg-gray-900 text-white shrink-0">
                                <h2 className="text-lg font-bold tracking-tight mb-1">WA Generator</h2>
                                <p className="text-xs text-gray-400 font-medium line-clamp-1">{selectedProduct.name}</p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-5 scrollbar-none bg-[#f8f9fa] space-y-5">
                                {/* Controller Area */}
                                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">1. Select Brand (For Footer)</label>
                                        <CustomSelect 
                                            className="bg-gray-50 border-gray-200 py-2 pl-3 text-sm font-medium"
                                            value={genData.brand_id}
                                            onChange={(e) => setGenData({...genData, brand_id: e.target.value})}
                                            options={brands.map(b => ({ value: b.id, label: b.name }))}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Harga Coret (Normal)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">Rp</span>
                                                <input 
                                                    type="number" 
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                                    value={genData.harga_coret}
                                                    onChange={(e) => setGenData({...genData, harga_coret: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Harga Jual (Diskon)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">Rp</span>
                                                <input 
                                                    type="number" 
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                                    value={genData.harga_diskon}
                                                    onChange={(e) => setGenData({...genData, harga_diskon: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Custom Includes</label>
                                        <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 max-h-40 overflow-y-auto scrollbar-none space-y-2">
                                            {(selectedProduct.service?.includes || []).map((incName, idx) => (
                                                <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                                                    <input 
                                                        type="checkbox" 
                                                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                                        checked={genData.includes.includes(incName)}
                                                        onChange={() => toggleInclude(incName)}
                                                    />
                                                    <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">{incName}</span>
                                                </label>
                                            ))}
                                            {(selectedProduct.service?.includes || []).length === 0 && (
                                                <p className="text-xs text-gray-400 italic">No includes defined in this service type.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Live Preview Snippet 1 */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Snippet 1: Info Jurnal</label>
                                        <button onClick={() => copyToClipboard(snippet1, 'Info Jurnal')} className="text-[10px] font-bold text-gray-700 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 px-2 py-1 rounded transition-colors flex items-center gap-1 shadow-sm">
                                            <Copy className="w-3 h-3" /> Copy Snippet 1
                                        </button>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 relative shadow-inner">
                                        <pre className="text-[11px] text-gray-800 font-mono whitespace-pre-wrap leading-relaxed font-semibold">{snippet1}</pre>
                                    </div>
                                </div>

                                {/* Live Preview Snippet 2 */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Snippet 2: Detail Harga</label>
                                        <button onClick={() => copyToClipboard(snippet2, 'Detail Harga')} className="text-[10px] font-bold text-gray-700 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 px-2 py-1 rounded transition-colors flex items-center gap-1 shadow-sm">
                                            <Copy className="w-3 h-3" /> Copy Snippet 2
                                        </button>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 relative shadow-inner">
                                        <pre className="text-[11px] text-gray-800 font-mono whitespace-pre-wrap leading-relaxed font-semibold">{snippet2}</pre>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>

            </div>
        </MainLayout>
    );
}
