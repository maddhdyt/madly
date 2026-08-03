import React, { useState, useMemo, useEffect } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { Search, Copy, Receipt, Filter, ChevronLeft, ChevronRight, CheckCircle2, Link as LinkIcon } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import CustomSelect from '../../../Components/CustomSelect';

export default function Calculator({ products, brands, services }) {
    const { t } = useTranslations();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeService, setActiveService] = useState('all');
    const [activeBrand, setActiveBrand] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    const [filterValues, setFilterValues] = useState({});
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

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

    // Dynamic Filters
    const selectedServiceObj = useMemo(() => services.find(s => s.id.toString() === activeService?.toString()), [services, activeService]);
    const filterableSchema = useMemo(() => {
        if (!selectedServiceObj || !selectedServiceObj.product_schema) return [];
        return selectedServiceObj.product_schema.filter(field => ['tags', 'label'].includes(field.type));
    }, [selectedServiceObj]);

    const filterOptions = useMemo(() => {
        const options = {};
        if (filterableSchema.length > 0) {
            filterableSchema.forEach(field => {
                options[field.name] = [...new Set(products.map(p => p.attributes?.[field.name]).filter(Boolean))].sort();
            });
        }
        return options;
    }, [products, filterableSchema]);

    useEffect(() => {
        setFilterValues({});
        setIsFilterPanelOpen(false);
    }, [activeService]);

    // Filtering Products
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchService = activeService === 'all' || p.service_id.toString() === activeService.toString();

            let matchDynamic = true;
            for (const key in filterValues) {
                if (filterValues[key]) {
                    if (p.attributes?.[key] !== filterValues[key]) {
                        matchDynamic = false;
                        break;
                    }
                }
            }

            return matchSearch && matchService && matchDynamic;
        });
    }, [products, searchQuery, activeService, filterValues]);

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

        let text = `${t('Pricelist Spesial Promo Terbatas')}\n`;
        text += `🔥 ${attr.accreditation_type || 'SCOPUS'} 🔥\n\n`;

        text += `${t('Terindeks :')} ${selectedProduct.status_note || 'Scopus'}\n`;
        text += `${t('Bidang :')} ${getPrimaryScope(attr.focus_scope || attr.subject_area)}\n\n`;

        const coret = formatRupiah(genData.harga_coret);
        const diskon = formatRupiah(genData.harga_diskon);
        text += `~${coret}~${t(', Diskon Menjadi 👉')} ${diskon},-\n\n`;

        if (genData.includes && genData.includes.length > 0) {
            text += `${t('Include:')}\n`;
            genData.includes.forEach(inc => {
                text += `• ${inc}\n`;
            });
            text += `\n`;
        }

        text += `${t('Terimakasih')}\n✨ ${selectedBrand?.name || 'Agency'} ✨`;

        return text;
    }, [selectedProduct, genData, selectedBrand]);

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            triggerToast(`${type} Copied to Clipboard!`);
        });
    };

    return (
        <>
            <Head title={t('Live WA Generator')} />

            {/* Toast Notification */}
            <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
                <div className="bg-gray-900 border border-gray-700 shadow-2xl rounded-2xl p-4 flex items-center gap-3 min-w-72">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm tracking-tight">Success!</h4>
                        <p className="text-gray-400 text-xs font-medium">{toastMessage}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row h-full w-full gap-4 lg:gap-6 pb-4">

                {/* LEFT PANEL: Catalog */}
                <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors">
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white tracking-tight">{t('Master Products')}</h2>
                            <span className="text-xs font-bold font-display text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">{filteredProducts.length} {t('Items')}</span>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                            <div className="relative w-full md:flex-1 md:max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder={t('Search journals or products...')}
                                    className="w-full h-10.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-9 pr-4 text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="w-50">
                                    <CustomSelect
                                        className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-10.5 pl-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                                        value={activeService}
                                        onChange={(e) => setActiveService(e.target.value)}
                                        options={[
                                            { value: 'all', label: t('All Services') },
                                            ...services.map(s => ({ value: s.id, label: s.name }))
                                        ]}
                                        icon={<Filter className="w-4 h-4 text-gray-400" />}
                                    />
                                </div>
                                {filterableSchema.length > 0 && (
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                                            className={`h-10.5 px-4 rounded-xl font-bold text-sm flex items-center gap-2 border transition-all ${isFilterPanelOpen || Object.values(filterValues).some(v => v) ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-sm' : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                                        >
                                            <Filter className="w-4 h-4" />
                                            {Object.values(filterValues).filter(v => v).length > 0 && (
                                                <span className="w-5 h-5 rounded-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs flex items-center justify-center font-bold">
                                                    {Object.values(filterValues).filter(v => v).length}
                                                </span>
                                            )}
                                        </button>

                                        {isFilterPanelOpen && (
                                            <>
                                                <div className="fixed inset-0 z-40" onClick={() => setIsFilterPanelOpen(false)}></div>
                                                <div className="absolute right-0 top-[calc(100%+8px)] w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 animate-scale-in origin-top-right">
                                                    <div className="p-4 bg-gray-50/80 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between rounded-t-2xl">
                                                        <h3 className="font-bold text-gray-900 dark:text-white">{t('Smart Filters')}</h3>
                                                        {Object.values(filterValues).some(v => v) && (
                                                            <button
                                                                onClick={() => setFilterValues({})}
                                                                className="text-xs font-bold text-red-600 hover:text-red-700"
                                                            >
                                                                {t('Reset All')}
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="p-4 flex flex-col gap-4">
                                                        {filterableSchema.map(field => (
                                                            <div key={field.name} className="flex flex-col gap-1.5">
                                                                <label className="text-xs font-bold text-gray-600">{field.label}</label>
                                                                {filterOptions[field.name] ? (
                                                                    <CustomSelect
                                                                        value={filterValues[field.name] || ''}
                                                                        onChange={(e) => setFilterValues({ ...filterValues, [field.name]: e.target.value })}
                                                                        options={[
                                                                            { value: '', label: `All ${field.label}` },
                                                                            ...filterOptions[field.name].map(opt => ({ value: opt, label: opt }))
                                                                        ]}
                                                                        placeholder={`All ${field.label}`}
                                                                        className="py-2 px-3 text-sm font-medium border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm rounded-xl w-full"
                                                                    />
                                                                ) : (
                                                                    <input
                                                                        type="text"
                                                                        placeholder={t('Search') + ` ${field.label}...`}
                                                                        value={filterValues[field.name] || ''}
                                                                        onChange={(e) => setFilterValues({ ...filterValues, [field.name]: e.target.value })}
                                                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 transition-all shadow-sm placeholder:text-gray-400"
                                                                    />
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 bg-[#f8f9fa] dark:bg-black flex flex-col transition-colors">
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 content-start flex-1">
                            {paginatedProducts.map(product => (
                                <button
                                    key={product.id}
                                    onClick={() => handleSelectProduct(product)}
                                    className={`bg-white dark:bg-gray-900 border rounded-2xl p-4 text-left transition-all shadow-sm hover:shadow-md flex flex-col justify-between h-full ${selectedProduct?.id === product.id ? 'border-gray-900 dark:border-white ring-1 ring-gray-900 dark:ring-white' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}
                                >
                                    <div className="mb-4">
                                        <h3 className="font-bold font-display text-gray-900 dark:text-white text-sm line-clamp-2 leading-tight mb-2">{product.name}</h3>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            {product.attributes?.accreditation_type && (
                                                <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded text-[10px] font-bold border border-gray-200 dark:border-gray-700">
                                                    {product.attributes.accreditation_type}
                                                </span>
                                            )}
                                            {product.service && (
                                                <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded text-[10px] font-bold border border-gray-200 dark:border-gray-700">
                                                    {product.service.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-auto border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">{t('Harga Standar')}</p>
                                            <p className="text-sm font-black font-display text-gray-900 dark:text-white">{product.attributes?.harga_jual_standar ? formatRupiah(product.attributes.harga_jual_standar) : (product.attributes?.harga_jual_minimum_info ? formatRupiah(product.attributes.harga_jual_minimum_info) : '-')}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider mb-0.5">{t('Min. Price')}</p>
                                            <p className="text-xs font-semibold text-gray-400">{product.attributes?.harga_jual_minimum_info ? formatRupiah(product.attributes.harga_jual_minimum_info) : '-'}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                            {filteredProducts.length === 0 && (
                                <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400">
                                    <Search className="w-8 h-8 mb-3 opacity-30" />
                                    <span className="text-sm font-medium">{t('No products match your search.')}</span>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-5 flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-2 px-4 shadow-sm shrink-0">
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                                    {t('Page')} {currentPage} {t('of')} {totalPages}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <div className="flex gap-1">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${currentPage === i + 1 ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL: Live WA Generator */}
                <div className="w-full lg:w-100 xl:w-112.5 shrink-0 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col overflow-hidden relative transition-colors min-h-125">
                    {!selectedProduct ? (
                        <div className="h-full flex flex-col items-center justify-center text-center px-6">
                            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                                <Receipt className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                            </div>
                            <h3 className="font-bold font-display text-gray-900 dark:text-white text-lg mb-2">{t('Live WA Generator')}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('Select a product from the catalog on the left to instantly generate WhatsApp quotation snippets.')}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-900 dark:bg-black text-white shrink-0">
                                <h2 className="text-lg font-bold font-display tracking-tight mb-1">{t('WA Generator')}</h2>
                                <p className="text-xs text-gray-400 font-medium line-clamp-1">{selectedProduct.name}</p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-5 scrollbar-none bg-[#f8f9fa] dark:bg-black space-y-5">
                                {/* Controller Area */}
                                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{t('1. Select Brand (For Footer)')}</label>
                                        <CustomSelect
                                            className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 py-2 pl-3 text-sm font-medium text-gray-900 dark:text-white"
                                            value={genData.brand_id}
                                            onChange={(e) => setGenData({ ...genData, brand_id: e.target.value })}
                                            options={brands.map(b => ({ value: b.id, label: b.name }))}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">{t('Harga Coret (Normal)')}</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">Rp</span>
                                                <input
                                                    type="text"
                                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-8 pr-3 py-2 text-sm font-bold font-display text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 transition-all"
                                                    value={genData.harga_coret ? Number(genData.harga_coret).toLocaleString('id-ID') : ''}
                                                    onChange={(e) => setGenData({ ...genData, harga_coret: e.target.value.replace(/\D/g, '') })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{t('Harga Jual (Diskon)')}</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">Rp</span>
                                                <input
                                                    type="text"
                                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-8 pr-3 py-2 text-sm font-bold font-display text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 transition-all"
                                                    value={genData.harga_diskon ? Number(genData.harga_diskon).toLocaleString('id-ID') : ''}
                                                    onChange={(e) => setGenData({ ...genData, harga_diskon: e.target.value.replace(/\D/g, '') })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end gap-1.5 -mt-1">
                                        <span className="text-[9px] font-bold text-gray-400 mr-1 uppercase tracking-wider">{t('Quick Markup:')}</span>
                                        {[15, 25, 40, 50].map(pct => (
                                            <button
                                                key={pct}
                                                onClick={() => setGenData(prev => ({ ...prev, harga_coret: Math.round(Number(prev.harga_diskon) / (1 - pct / 100)).toString() }))}
                                                className="px-2 py-0.5 rounded text-[9px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 border border-gray-200 dark:border-gray-700 transition-colors shadow-sm"
                                                title={`Set markup ${pct}%`}
                                            >
                                                {pct}%
                                            </button>
                                        ))}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{t('Custom Includes')}</label>
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 max-h-40 overflow-y-auto scrollbar-none space-y-2">
                                            {(selectedProduct.service?.includes || []).map((incName, idx) => (
                                                <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-gray-900 dark:focus:ring-gray-500"
                                                        checked={genData.includes.includes(incName)}
                                                        onChange={() => toggleInclude(incName)}
                                                    />
                                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">{incName}</span>
                                                </label>
                                            ))}
                                            {(selectedProduct.service?.includes || []).length === 0 && (
                                                <p className="text-xs text-gray-400 dark:text-gray-500 italic">{t('No includes defined in this service type.')}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Live Preview Snippet 1 */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('Snippet 1: Info Jurnal')}</label>
                                        <button onClick={() => copyToClipboard(snippet1, t('Info Jurnal'))} className="text-[10px] font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors flex items-center gap-1 shadow-sm">
                                            <Copy className="w-3 h-3" /> {t('Copy Snippet 1')}
                                        </button>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 relative shadow-inner">
                                        <pre className="text-[11px] text-gray-800 dark:text-gray-300 font-mono whitespace-pre-wrap leading-relaxed font-semibold">{snippet1}</pre>
                                    </div>
                                </div>

                                {/* Live Preview Snippet 2 */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('Snippet 2: Detail Harga')}</label>
                                        <button onClick={() => copyToClipboard(snippet2, t('Detail Harga'))} className="text-[10px] font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors flex items-center gap-1 shadow-sm">
                                            <Copy className="w-3 h-3" /> {t('Copy Snippet 2')}
                                        </button>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 relative shadow-inner">
                                        <pre className="text-[11px] text-gray-800 dark:text-gray-300 font-mono whitespace-pre-wrap leading-relaxed font-semibold">{snippet2}</pre>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}

Calculator.layout = page => <MainLayout title="Quick Quotation" children={page} />;
