import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { useForm, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, ArrowLeft, Filter, Eye, X, Tag, Box, Search } from 'lucide-react';
import { createPortal } from 'react-dom';
import ProductFormSlideOver from './ProductFormSlideOver';
import CustomSelect from '../../../Components/CustomSelect';
import ConfirmModal from '../../../Components/ConfirmModal';
import Pagination from '../../../Components/Pagination';
import useTranslations from '../../../Hooks/useTranslations';

// Specs Modal Component
const SpecsModal = ({ isOpen, onClose, product, service, t }) => {
    if (!isOpen || !product) return null;

    const attributes = product.attributes || {};
    const hasAttributes = Object.keys(attributes).length > 0;
    
    // We use the service schema to order and label things if available
    const schema = service?.product_schema || [];

    const renderValue = (val, type) => {
        if (!val) return null;
        
        if (type === 'link_builder' && Array.isArray(val)) {
            if (val.length === 0) return <span className="text-gray-400 italic">No links available</span>;
            return (
                <div className="flex flex-col gap-2">
                    {val.map((link, i) => (
                        <div key={i} className="flex flex-col gap-0.5">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{link.label}</span>
                            <a href={link.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-1.5 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-bold transition-colors underline-offset-4 underline hover:no-underline w-fit text-sm break-all">
                                {link.url}
                                <svg className="w-3.5 h-3.5 opacity-70 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </a>
                        </div>
                    ))}
                </div>
            );
        }

        if (type === 'url' || (typeof val === 'string' && val.includes('http'))) {
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const parts = val.split(urlRegex);
            
            return (
                <div className="text-sm font-semibold text-gray-900 dark:text-white wrap-break-word leading-relaxed whitespace-pre-wrap flex flex-col gap-1.5">
                    {parts.map((part, i) => {
                        if (part.match(urlRegex)) {
                            return (
                                <a key={i} href={part} target="_blank" rel="noreferrer" className="inline-flex items-start gap-1.5 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-bold transition-colors underline-offset-4 underline hover:no-underline w-fit break-all">
                                    {part}
                                    <svg className="w-3.5 h-3.5 opacity-70 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                </a>
                            );
                        }
                        // Render plain text parts if they are not empty spaces
                        return part.trim() ? <span key={i} className="text-gray-600 dark:text-gray-400 font-medium">{part}</span> : null;
                    })}
                </div>
            );
        }
        
        if (type === 'tags') {
            const tags = val.split(',').map(t => t.trim()).filter(t => t);
            if (tags.length === 0) return val;
            
            return (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            );
        }
        
        return (
            <span className="text-sm font-semibold text-gray-900 dark:text-white wrap-break-word leading-relaxed whitespace-pre-wrap">
                {val}
            </span>
        );
    };

    return createPortal(
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-fade-in" onClick={onClose}></div>
            
            <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <Tag className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                {t('Product Specifications')}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">{product.name}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-0 max-h-[60vh] overflow-y-auto scrollbar-none">
                    {!hasAttributes ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400 italic text-sm">
                            {t('No custom specifications for this product.')}
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {/* Priority render based on Schema */}
                            {schema.length > 0 ? (
                                schema.map(field => {
                                    const val = attributes[field.name];
                                    if (!val) return null;
                                    return (
                                        <div key={field.name} className="flex flex-col gap-2 px-4 lg:px-8 py-4 lg:py-5 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                                            <span className="font-bold text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                                {field.label}
                                            </span>
                                            {renderValue(val, field.type)}
                                        </div>
                                    );
                                })
                            ) : (
                                /* Fallback if no schema is defined but attributes exist */
                                Object.entries(attributes).map(([key, val]) => {
                                    if (!val) return null;
                                    const formattedKey = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                                    return (
                                        <div key={key} className="flex flex-col gap-2 px-4 lg:px-8 py-4 lg:py-5 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                                            <span className="font-bold text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                                {formattedKey}
                                            </span>
                                            {renderValue(val, 'text')}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>
                
                <div className="px-4 lg:px-8 py-4 lg:py-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2.5 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 transition-colors">
                        {t('Close')}
                    </button>
                </div>
            </div>
            
            <style>{`
                @keyframes scaleIn { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-scale-in { animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
            `}</style>
        </div>,
        document.body
    );
};

export default function Index({ products, brands, services, activeFilters = {}, filterOptions = {}, showToast }) {
    const { t } = useTranslations();
    const { delete: destroy } = useForm();
    const params = new URLSearchParams(window.location.search);
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedServiceFilter, setSelectedServiceFilter] = useState(params.get('service_id') || 'all');
    
    // Dynamic Filters State
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [filterValues, setFilterValues] = useState(activeFilters);
    
    const selectedServiceObj = services.find(s => s.id.toString() === selectedServiceFilter?.toString());
    const productSchema = selectedServiceObj?.product_schema || [];
    const filterableSchema = productSchema.filter(field => ['tags', 'label'].includes(field.type));
    
    // Modal state
    const [isSpecsModalOpen, setIsSpecsModalOpen] = useState(false);
    const [viewSpecsProduct, setViewSpecsProduct] = useState(null);
    
    // Search state
    const urlParams = new URLSearchParams(window.location.search);
    const [searchQuery, setSearchQuery] = useState(urlParams.get('search') || '');
    const previousSearch = useRef(urlParams.get('search') || '');

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
            router.get(route('admin.products.index'), Object.fromEntries(params), {
                preserveState: true,
                preserveScroll: true,
            });
        }, 400); // 400ms debounce

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleDelete = (id) => {
        setProductToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            destroy(route('admin.products.destroy', productToDelete), {
                onSuccess: () => {
                    setIsConfirmModalOpen(false);
                    setProductToDelete(null);
                    if (showToast) showToast('Product deleted successfully');
                },
                onError: (errors) => {
                    setIsConfirmModalOpen(false);
                    if (showToast) showToast(errors.error || 'Failed to delete product', 'error');
                }
            });
        }
    };

    const openCreateForm = () => {
        setSelectedProduct(null);
        setIsSlideOverOpen(true);
    };

    const openEditForm = (product) => {
        setSelectedProduct(product);
        setIsSlideOverOpen(true);
    };

    const openSpecsModal = (product) => {
        setViewSpecsProduct(product);
        setIsSpecsModalOpen(true);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleFilterChange = (e) => {
        const val = e.target.value.toString();
        setSelectedServiceFilter(val);
        setFilterValues({});
        setIsFilterPanelOpen(false);
        router.get(route('admin.products.index'), { service_id: val === 'all' ? null : val }, { preserveState: true, replace: true });
    };

    const handleApplyFilters = () => {
        router.get(route('admin.products.index'), { 
            service_id: selectedServiceFilter === 'all' ? null : selectedServiceFilter, 
            filters: filterValues
        }, { preserveState: true, replace: true });
    };

    const handleClearFilters = () => {
        setFilterValues({});
        router.get(route('admin.products.index'), { 
            service_id: selectedServiceFilter === 'all' ? null : selectedServiceFilter
        }, { preserveState: true, replace: true });
    };

    const filteredProducts = products.data;

    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-300">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-8 py-8 border-b border-gray-100 dark:border-gray-800 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{t('Product Management (Master Data)')}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('Manage global product catalog and their base HPP.')}</p>
                </div>
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                    
                    {/* Mobile: Row 3, Desktop: Left */}
                    <div className="flex items-center justify-between gap-3 w-full md:w-auto order-3 md:order-1">
                        <button 
                            onClick={() => router.visit(route('home'))}
                            className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors flex-1 md:flex-none justify-center"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="md:inline">{t('Back')}</span>
                        </button>
                        
                        <button 
                            onClick={openCreateForm}
                            className="px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm transition-colors flex-1 md:flex-none justify-center"
                        >
                            <Plus className="w-4 h-4" />
                            {t('Add Product')}
                        </button>
                    </div>

                    {/* Mobile: Row 1, Desktop: Middle */}
                    <div className="relative w-full md:w-auto order-1 md:order-2">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                            type="text"
                            placeholder={t('Search products...')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:bg-white transition-all w-full md:w-64"
                        />
                    </div>
                    
                    {/* Mobile: Row 2, Desktop: Right */}
                    <div className="flex items-center gap-3 w-full md:w-auto order-2 md:order-3">
                        <div className="flex-1 md:flex-none">
                            <CustomSelect
                                value={selectedServiceFilter}
                                onChange={handleFilterChange}
                                options={[
                                    { value: 'all', label: t('All Services') },
                                    ...services.map(service => ({ value: service.id, label: service.name }))
                                ]}
                                icon={<Filter className="w-4 h-4" />}
                                className="pl-3 py-2.5 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-full"
                            />
                        </div>

                        {selectedServiceFilter !== 'all' && filterableSchema.length > 0 && (
                            <div className="relative">
                                <button 
                                    onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                                    className={`px-4 py-2.5 border rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shadow-sm ${Object.values(activeFilters).some(v => v) ? 'bg-gray-100 border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'}`}
                                >
                                    <Filter className="w-4 h-4" />
                                    <span className="hidden sm:inline">{t('Filters')}</span>
                                    {Object.values(activeFilters).some(v => v) && (
                                        <span className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                                    )}
                                </button>

                                {isFilterPanelOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsFilterPanelOpen(false)}></div>
                                        <div className="absolute right-0 top-full mt-2 w-75 sm:w-105 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl animate-fade-in origin-top-right flex flex-col">
                                            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30 rounded-t-2xl">
                                                <div className="flex items-center gap-2">
                                                    <Filter className="w-4 h-4 text-gray-500" />
                                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{t('Advanced Filters')}</h3>
                                                </div>
                                                {Object.values(filterValues).some(v => v) && (
                                                    <button onClick={handleClearFilters} className="text-xs font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                                        {t('Clear All')}
                                                    </button>
                                                )}
                                            </div>
                                            <div className="p-6 flex flex-col gap-6">
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
                                                                placeholder={t('All') + ` ${field.label}`}
                                                                className="py-2.5 px-4 text-sm font-medium border-gray-200 dark:border-gray-700 shadow-sm rounded-xl w-full"
                                                            />
                                                        ) : (
                                                            <input 
                                                                type="text" 
                                                                placeholder={t('Search') + ` ${field.label}...`}
                                                                value={filterValues[field.name] || ''}
                                                                onChange={(e) => setFilterValues({...filterValues, [field.name]: e.target.value})}
                                                                onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                                                                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex justify-end gap-3 rounded-b-2xl">
                                                <button 
                                                    onClick={() => setIsFilterPanelOpen(false)}
                                                    className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    {t('Cancel')}
                                                </button>
                                                <button 
                                                    onClick={handleApplyFilters}
                                                    className="px-5 py-2.5 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-sm"
                                                >
                                                    {t('Apply')}
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
                    <thead className="bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-500 text-[11px] uppercase tracking-widest font-extrabold border-b border-gray-100 dark:border-gray-800">
                        <tr>
                            <th className="px-4 lg:px-8 py-4 lg:py-5 w-16">{t('No.')}</th>
                            <th className="px-4 lg:px-8 py-4 lg:py-5">{t('Service Category')}</th>
                            <th className="px-4 lg:px-8 py-4 lg:py-5">{t('Product Name')}</th>
                            <th className="px-4 lg:px-8 py-4 lg:py-5">{t('Base HPP')}</th>
                            <th className="px-4 lg:px-8 py-4 lg:py-5">{t('Min Price')}</th>
                            <th className="px-4 lg:px-8 py-4 lg:py-5">{t('Akreditasi')}</th>
                            <th className="px-4 lg:px-8 py-4 lg:py-5 text-center">{t('Specifications')}</th>
                            <th className="px-4 lg:px-8 py-4 lg:py-5 text-right sticky right-0 bg-white dark:bg-gray-900 z-10 drop-shadow-[-5px_0_5px_rgba(0,0,0,0.05)] md:drop-shadow-none">{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="100%" className="px-8 py-16 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <Box className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                                        <p className="text-gray-500 dark:text-gray-400 font-medium">{t('No products found in this category.')}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map((product, index) => (
                                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-4 lg:px-8 py-4 lg:py-5 text-gray-500 dark:text-gray-400 font-medium">
                                        {(products.current_page - 1) * products.per_page + index + 1}
                                    </td>
                                    <td className="px-4 lg:px-8 py-4 lg:py-5">
                                        {product.service ? (
                                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border border-transparent dark:border-gray-700">
                                                {product.service.name}
                                            </span>
                                        ) : (
                                            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border border-transparent dark:border-red-800">
                                                {t('No Service')}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 lg:px-8 py-4 lg:py-5 font-bold text-gray-900 dark:text-white">
                                        {product.name}
                                    </td>
                                    <td className="px-4 lg:px-8 py-4 lg:py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(product.hpp)}</span>
                                            {product.attributes?.hpp_usd && (
                                                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md w-fit border border-gray-200/80 dark:border-gray-700">
                                                    $ {Number(product.attributes.hpp_usd).toLocaleString('en-US')}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 lg:px-8 py-4 lg:py-5">
                                        <span className="font-bold text-gray-900 dark:text-white">
                                            {product.min_price ? formatCurrency(product.min_price) : '-'}
                                        </span>
                                    </td>
                                    <td className="px-4 lg:px-8 py-4 lg:py-5">
                                        {product.attributes?.accreditation_type ? (
                                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border border-gray-200 dark:border-gray-700">
                                                {product.attributes.accreditation_type}
                                            </span>
                                        ) : '-'}
                                    </td>
                                    <td className="px-4 lg:px-8 py-4 lg:py-5 text-center">
                                        <button 
                                            onClick={() => openSpecsModal(product)}
                                            className="inline-flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 rounded-lg transition-colors border border-transparent group-hover:border-gray-200 dark:group-hover:border-gray-700 shadow-sm"
                                            title="View Specifications"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                    <td className="px-4 lg:px-8 py-4 lg:py-5 text-right sticky right-0 bg-white dark:bg-gray-900 group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50 transition-colors">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => openEditForm(product)}
                                                className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                title="Edit Product"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                title="Delete Product"
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
                <Pagination links={products.links} />
            </div>

            <ProductFormSlideOver 
                isOpen={isSlideOverOpen}
                onClose={() => setIsSlideOverOpen(false)}
                product={selectedProduct}
                services={services}
                showToast={showToast}
            />

            <SpecsModal 
                isOpen={isSpecsModalOpen}
                onClose={() => setIsSpecsModalOpen(false)}
                product={viewSpecsProduct}
                service={viewSpecsProduct ? services.find(s => s.id === viewSpecsProduct.service_id) : null}
                t={t}
            />

            <ConfirmModal 
                isOpen={isConfirmModalOpen} 
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                title={t('Delete Product')}
                message={t('Are you sure you want to delete this product?')}
                confirmText={t('Delete')}
            />
        </div>
    );
}

Index.layout = page => <MainLayout title="Products" children={page} />;
