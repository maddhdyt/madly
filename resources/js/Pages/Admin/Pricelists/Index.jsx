import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { useForm, router, Head } from '@inertiajs/react';
import { Settings2, ArrowLeft, Search, Filter, Save, X, Trash2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import Pagination from '../../../Components/Pagination';
import CustomSelect from '../../../Components/CustomSelect';
import useTranslations from '../../../Hooks/useTranslations';

export default function Index({ products, services, activeFilters = {}, filterOptions = {}, showToast }) {
    const { t } = useTranslations();
    const [selectedIds, setSelectedIds] = useState([]);
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
    
    // Search & Filter State
    const urlParams = new URLSearchParams(window.location.search);
    const [searchQuery, setSearchQuery] = useState(urlParams.get('search') || '');
    const previousSearch = useRef(urlParams.get('search') || '');
    
    const [selectedServiceFilter, setSelectedServiceFilter] = useState(urlParams.get('service_id') || 'all');
    
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [filterValues, setFilterValues] = useState(activeFilters);

    const selectedServiceObj = services.find(s => s.id.toString() === selectedServiceFilter?.toString());
    const productSchema = selectedServiceObj?.product_schema || [];
    const filterableSchema = productSchema.filter(field => ['tags', 'label'].includes(field.type));

    const { data, setData, post, processing, reset } = useForm({
        product_ids: [],
        target_field: 'harga_jual_standar',
        update_type: 'percentage',
        base_field: 'harga_jual_minimum_info',
        fixed_price: '',
        percentage_increase: ''
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount || 0);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(products.data.map(p => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (e, id) => {
        if (e.target.checked) {
            setSelectedIds([...selectedIds, id]);
        } else {
            setSelectedIds(selectedIds.filter(itemId => itemId !== id));
        }
    };

    useEffect(() => {
        if (searchQuery === previousSearch.current) return;

        const delayDebounceFn = setTimeout(() => {
            previousSearch.current = searchQuery;
            const params = new URLSearchParams(window.location.search);
            if (searchQuery) {
                params.set('search', searchQuery);
            } else {
                params.delete('search');
            }
            params.delete('page');
            router.get(route('admin.pricelists.index'), Object.fromEntries(params), {
                preserveState: true,
                preserveScroll: true,
            });
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const handleFilterChange = (e) => {
        const val = e.target.value.toString();
        setSelectedServiceFilter(val);
        setFilterValues({});
        setIsFilterPanelOpen(false);
        router.get(route('admin.pricelists.index'), { service_id: val === 'all' ? null : val }, { preserveState: true, replace: true });
    };

    const handleApplyFilters = () => {
        router.get(route('admin.pricelists.index'), { 
            service_id: selectedServiceFilter === 'all' ? null : selectedServiceFilter, 
            filters: filterValues
        }, { preserveState: true, replace: true });
    };

    const handleClearFilters = () => {
        setFilterValues({});
        router.get(route('admin.pricelists.index'), { 
            service_id: selectedServiceFilter === 'all' ? null : selectedServiceFilter
        }, { preserveState: true, replace: true });
    };

    const handleBulkSubmit = (e) => {
        e.preventDefault();
        
        // Pass selected IDs to form
        data.product_ids = selectedIds;
        
        post(route('admin.pricelists.bulk-update'), {
            onSuccess: () => {
                setIsBulkModalOpen(false);
                setSelectedIds([]);
                reset();
                if (showToast) showToast('Prices updated successfully!');
            },
            onError: () => {
                if (showToast) showToast('Failed to update prices. Check your inputs.', 'error');
            }
        });
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#f8f9fa] dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-300">
            <Head title={t('Global Base Pricing')} />
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-8 py-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white tracking-tight">
                        {t('Global Base Pricing')}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('Manage standard selling prices (Harga Jual Minimum) for all journals.')}</p>
                </div>
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                    
                    {/* Mobile: Row 3, Desktop: Left */}
                    <div className="flex items-center justify-between gap-3 w-full md:w-auto order-3 md:order-1">
                        <button 
                            onClick={() => router.visit(route('home'))}
                            className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2 transition-colors shadow-sm flex-1 md:flex-none"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="md:inline">{t('Back')}</span>
                        </button>
                        
                        {selectedIds.length > 0 && (
                            <button 
                                onClick={() => {
                                    setData('product_ids', selectedIds);
                                    setIsBulkModalOpen(true);
                                }}
                                className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center justify-center gap-2 shadow-sm transition-colors flex-1 md:flex-none"
                            >
                                Adjust Prices ({selectedIds.length})
                            </button>
                        )}
                    </div>

                    {/* Mobile: Row 1, Desktop: Middle */}
                    <div className="relative w-full md:w-auto order-1 md:order-2">
                        <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                            type="text" 
                            placeholder={t('Search journal name or scope...')}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full md:w-64 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:border-transparent transition-all shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                    </div>
                    
                    {/* Mobile: Row 2, Desktop: Right */}
                    <div className="flex items-center gap-3 w-full md:w-auto order-2 md:order-3">
                        <div className="flex-1 md:flex-none">
                            <CustomSelect 
                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 py-2.5 pl-3 pr-10 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm rounded-xl"
                                value={selectedServiceFilter}
                                onChange={handleFilterChange}
                                options={[
                                    { value: 'all', label: t('All Services') },
                                    ...services.map(s => ({ value: s.id, label: s.name }))
                                ]}
                                icon={<Filter className="w-4 h-4 text-gray-400 dark:text-gray-500" />}
                            />
                        </div>
                        
                        {selectedServiceFilter !== 'all' && filterableSchema.length > 0 && (
                            <div className="relative">
                                <button 
                                    onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                                    className={`px-4 py-2.5 border rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shadow-sm ${
                                        Object.values(activeFilters).some(v => v) 
                                            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white' 
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <Filter className="w-4 h-4" />
                                    <span className="hidden sm:inline">{t('Filters')}</span>
                                    {Object.values(activeFilters).some(v => v) && (
                                        <span className="w-2 h-2 rounded-full bg-white dark:bg-gray-900"></span>
                                    )}
                                </button>

                                {isFilterPanelOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsFilterPanelOpen(false)}></div>
                                        <div className="absolute right-0 top-full mt-2 w-75 sm:w-105 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl animate-fade-in origin-top-right flex flex-col">
                                            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50 rounded-t-2xl">
                                                <div className="flex items-center gap-2">
                                                    <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{t('Advanced Filters')}</h3>
                                                </div>
                                                {Object.values(filterValues).some(v => v) && (
                                                    <button onClick={handleClearFilters} className="text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                                        {t('Clear All')}
                                                    </button>
                                                )}
                                            </div>
                                            <div className="p-6 flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
                                                {filterableSchema.map(field => (
                                                    <div key={field.name} className="flex flex-col gap-2 relative">
                                                        <label className="text-xs font-bold text-gray-600 dark:text-gray-400">{field.label}</label>
                                                        {filterOptions[field.name] ? (
                                                            <CustomSelect
                                                                value={filterValues[field.name] || ''}
                                                                onChange={(e) => setFilterValues({...filterValues, [field.name]: e.target.value})}
                                                                options={[
                                                                    { value: '', label: t('All') + ' ' + field.label },
                                                                    ...filterOptions[field.name].map(opt => ({ value: opt, label: opt }))
                                                                ]}
                                                                placeholder={t('All') + ' ' + field.label}
                                                                className="py-2.5 px-4 text-sm font-medium border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                                            />
                                                        ) : (
                                                            <input 
                                                                type="text" 
                                                                placeholder={t('Search') + ` ${field.label}...`}
                                                                value={filterValues[field.name] || ''}
                                                                onChange={(e) => setFilterValues({...filterValues, [field.name]: e.target.value})}
                                                                onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                                                                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:border-transparent transition-all shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex justify-end gap-3 rounded-b-2xl">
                                                <button 
                                                    onClick={() => setIsFilterPanelOpen(false)}
                                                    className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    {t('Cancel')}
                                                </button>
                                                <button 
                                                    onClick={handleApplyFilters}
                                                    className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-sm"
                                                >
                                                    {t('Apply Filters')}
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-x-auto bg-white dark:bg-gray-900">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    <thead className="bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-500 text-[11px] uppercase tracking-widest font-extrabold border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 lg:px-8 py-4 lg:py-5 w-16 text-center">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-gray-900 dark:focus:ring-gray-500"
                                    checked={products.data.length > 0 && selectedIds.length === products.data.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="px-4 lg:px-8 py-4 lg:py-5">Journal Name & Scope</th>
                            <th className="px-4 lg:px-8 py-4 lg:py-5">Accreditation</th>
                            <th className="px-4 lg:px-8 py-4 lg:py-5">Base HPP</th>
                            <th className="px-4 lg:px-8 py-4 lg:py-5">Harga Minimum</th>
                            <th className="px-4 lg:px-8 py-4 lg:py-5">Harga Standar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                        {products.data.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-8 py-16 text-center text-gray-500 font-medium">
                                    No journals found matching your filters.
                                </td>
                            </tr>
                        ) : (
                            products.data.map((product) => {
                                const minPrice = product.attributes?.harga_jual_minimum_info;
                                const stdPrice = product.attributes?.harga_jual_standar;
                                const isSelected = selectedIds.includes(product.id);
                                
                                return (
                                    <tr key={product.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group ${isSelected ? 'bg-gray-50/50 dark:bg-gray-800/30' : ''}`}>
                                        <td className="px-4 lg:px-8 py-4 lg:py-5 text-center">
                                            <input 
                                                type="checkbox" 
                                                className="rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-gray-900 dark:focus:ring-gray-500"
                                                checked={isSelected}
                                                onChange={(e) => handleSelectOne(e, product.id)}
                                            />
                                        </td>
                                        <td className="px-4 lg:px-8 py-4 lg:py-5 max-w-sm whitespace-normal">
                                            <div className="font-bold text-gray-900 dark:text-white leading-tight">{product.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                                                {product.attributes?.focus_scope 
                                                    ? product.attributes.focus_scope.split(',')[0].trim() 
                                                    : (product.attributes?.subject_area ? product.attributes.subject_area.split(',')[0].trim() : '-')}
                                            </div>
                                        </td>
                                        <td className="px-4 lg:px-8 py-4 lg:py-5">
                                            {product.attributes?.accreditation_type ? (
                                                <span className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border border-gray-200 dark:border-gray-700">
                                                    {product.attributes.accreditation_type}
                                                </span>
                                            ) : '-'}
                                        </td>
                                        <td className="px-4 lg:px-8 py-4 lg:py-5">
                                            <span className="font-bold text-gray-900 dark:text-white">
                                                {formatCurrency(product.hpp)}
                                            </span>
                                        </td>
                                        <td className="px-4 lg:px-8 py-4 lg:py-5">
                                            <span className="font-bold text-gray-900 dark:text-white">
                                                {minPrice ? formatCurrency(minPrice) : '-'}
                                            </span>
                                        </td>
                                        <td className="px-4 lg:px-8 py-4 lg:py-5">
                                            <span className="font-bold text-gray-900 dark:text-white">
                                                {stdPrice ? formatCurrency(stdPrice) : '-'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="shrink-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                <Pagination links={products.links} />
            </div>

            {/* Bulk Edit Modal */}
            {isBulkModalOpen && createPortal(
                <div className="fixed inset-0 z-[110] flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-900/30 dark:bg-black/60 backdrop-blur-sm" onClick={() => setIsBulkModalOpen(false)}></div>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md relative z-10 animate-fade-in-up">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Adjust Selling Prices</h3>
                            <button onClick={() => setIsBulkModalOpen(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleBulkSubmit} className="p-5 space-y-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Updating <b className="text-gray-900 dark:text-white">{selectedIds.length}</b> selected journals.</p>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Target Price to Update</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${data.target_field === 'harga_jual_minimum_info' ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                        <input 
                                            type="radio" 
                                            name="target_field" 
                                            value="harga_jual_minimum_info" 
                                            className="sr-only"
                                            checked={data.target_field === 'harga_jual_minimum_info'}
                                            onChange={() => {
                                                setData(data => ({
                                                    ...data,
                                                    target_field: 'harga_jual_minimum_info',
                                                    base_field: 'hpp'
                                                }));
                                            }}
                                        />
                                        <span className="font-bold text-sm text-gray-900 dark:text-white">Harga Jual Minimum</span>
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 text-center">Batas bawah harga</span>
                                    </label>
                                    <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${data.target_field === 'harga_jual_standar' ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                        <input 
                                            type="radio" 
                                            name="target_field" 
                                            value="harga_jual_standar" 
                                            className="sr-only"
                                            checked={data.target_field === 'harga_jual_standar'}
                                            onChange={() => setData('target_field', 'harga_jual_standar')}
                                        />
                                        <span className="font-bold text-sm text-gray-900 dark:text-white">Harga Jual Standar</span>
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 text-center">Harga default sales</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Adjustment Type</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${data.update_type === 'percentage' ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                        <input 
                                            type="radio" 
                                            name="update_type" 
                                            value="percentage" 
                                            className="sr-only"
                                            checked={data.update_type === 'percentage'}
                                            onChange={() => setData('update_type', 'percentage')}
                                        />
                                        <span className="font-bold text-sm text-gray-900 dark:text-white text-center">% Markup</span>
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 text-center">Dari harga dasar</span>
                                    </label>
                                    <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${data.update_type === 'fixed' ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                        <input 
                                            type="radio" 
                                            name="update_type" 
                                            value="fixed" 
                                            className="sr-only"
                                            checked={data.update_type === 'fixed'}
                                            onChange={() => setData('update_type', 'fixed')}
                                        />
                                        <span className="font-bold text-sm text-gray-900 dark:text-white text-center">Fixed Price</span>
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 text-center">Exact Amount</span>
                                    </label>
                                    <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${data.update_type === 'remove' ? 'border-red-600 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                        <input 
                                            type="radio" 
                                            name="update_type" 
                                            value="remove" 
                                            className="sr-only"
                                            checked={data.update_type === 'remove'}
                                            onChange={() => setData('update_type', 'remove')}
                                        />
                                        <div className="flex items-center gap-1">
                                            <Trash2 className={`w-3.5 h-3.5 ${data.update_type === 'remove' ? 'text-red-600' : 'text-gray-400'}`} />
                                            <span className={`font-bold text-sm ${data.update_type === 'remove' ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'} text-center`}>Hapus</span>
                                        </div>
                                        <span className={`text-[10px] mt-1 text-center ${data.update_type === 'remove' ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>Kosongkan nilai</span>
                                    </label>
                                </div>
                            </div>

                            {data.update_type === 'percentage' && (
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Markup Base</label>
                                        <select 
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm font-bold text-gray-900 dark:text-white focus:ring-gray-900 dark:focus:ring-gray-500"
                                            value={data.base_field}
                                            onChange={e => setData('base_field', e.target.value)}
                                        >
                                            <option value="hpp">Dari Base HPP</option>
                                            {data.target_field === 'harga_jual_standar' && (
                                                <option value="harga_jual_minimum_info">Dari Harga Jual Minimum</option>
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Markup Percentage (%)</label>
                                        <input 
                                            type="number" 
                                            step="0.1"
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white focus:ring-gray-900 dark:focus:ring-gray-500"
                                            placeholder="e.g., 20"
                                            value={data.percentage_increase}
                                            onChange={e => setData('percentage_increase', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {data.update_type === 'fixed' && (
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Fixed Selling Price (Rp)</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white focus:ring-gray-900 dark:focus:ring-gray-500"
                                        placeholder="e.g., 15000000"
                                        value={data.fixed_price}
                                        onChange={e => setData('fixed_price', e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            {data.update_type === 'remove' && (
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm font-medium border border-red-100 dark:border-red-900/50 flex flex-col gap-1">
                                    <span className="font-bold">Peringatan:</span>
                                    <span>Nilai pada kolom <b className="font-black">{data.target_field === 'harga_jual_minimum_info' ? 'Harga Jual Minimum' : 'Harga Jual Standar'}</b> akan dihapus (dikosongkan) pada {selectedIds.length} jurnal yang dipilih.</span>
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setIsBulkModalOpen(false)}
                                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 disabled:opacity-70 flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    {processing ? 'Applying...' : 'Apply Prices'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            , document.body)}
        </div>
    );
}

Index.layout = page => <MainLayout title="Pricelists" children={page} />;
