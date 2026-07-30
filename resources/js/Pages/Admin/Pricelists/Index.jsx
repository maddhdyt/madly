import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { useForm, router, Head } from '@inertiajs/react';
import { Settings2, ArrowLeft, Search, Filter, Save, X } from 'lucide-react';
import Pagination from '../../../Components/Pagination';
import CustomSelect from '../../../Components/CustomSelect';

export default function Index({ products, services, activeFilters = {}, filterOptions = {}, showToast }) {
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
        <div className="flex flex-col h-full w-full bg-[#f8f9fa] rounded-3xl border border-gray-200 overflow-hidden">
            <Head title="Global Base Pricing" />
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-8 py-8 bg-white border-b border-gray-100 gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Global Base Pricing
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage standard selling prices (Harga Jual Minimum) for all journals.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button 
                        onClick={() => router.visit(route('home'))}
                        className="px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                                type="text" 
                                placeholder="Search journal name or scope..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-64 bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all shadow-sm placeholder:text-gray-400"
                            />
                        </div>
                        
                        <div className="flex items-center gap-3 relative">
                            <CustomSelect 
                                className="bg-gray-50 border border-gray-200 py-2.5 pl-3 pr-10 text-sm font-semibold text-gray-700 shadow-sm rounded-xl"
                                value={selectedServiceFilter}
                                onChange={handleFilterChange}
                                options={[
                                    { value: 'all', label: 'All Services' },
                                    ...services.map(s => ({ value: s.id, label: s.name }))
                                ]}
                                icon={<Filter className="w-4 h-4 text-gray-400" />}
                            />
                            
                            {selectedServiceFilter !== 'all' && filterableSchema.length > 0 && (
                                <div className="relative">
                                    <button 
                                        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                                        className={`px-4 py-2.5 border rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shadow-sm ${
                                            Object.values(activeFilters).some(v => v) 
                                                ? 'bg-gray-900 text-white border-gray-900' 
                                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <Filter className="w-4 h-4" />
                                        Filters
                                        {Object.values(activeFilters).some(v => v) && (
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                        )}
                                    </button>

                                    {isFilterPanelOpen && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setIsFilterPanelOpen(false)}></div>
                                            <div className="absolute right-0 top-full mt-2 w-[420px] z-50 bg-white border border-gray-200 rounded-2xl shadow-xl animate-fade-in origin-top-right flex flex-col">
                                                <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
                                                    <div className="flex items-center gap-2">
                                                        <Filter className="w-4 h-4 text-gray-500" />
                                                        <h3 className="text-sm font-bold text-gray-900">Advanced Filters</h3>
                                                    </div>
                                                    {Object.values(filterValues).some(v => v) && (
                                                        <button onClick={handleClearFilters} className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">
                                                            Clear All
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="p-6 flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
                                                    {filterableSchema.map(field => (
                                                        <div key={field.name} className="flex flex-col gap-2 relative">
                                                            <label className="text-xs font-bold text-gray-600">{field.label}</label>
                                                            {filterOptions[field.name] ? (
                                                                <CustomSelect
                                                                    value={filterValues[field.name] || ''}
                                                                    onChange={(e) => setFilterValues({...filterValues, [field.name]: e.target.value})}
                                                                    options={[
                                                                        { value: '', label: `All ${field.label}` },
                                                                        ...filterOptions[field.name].map(opt => ({ value: opt, label: opt }))
                                                                    ]}
                                                                    placeholder={`All ${field.label}`}
                                                                    className="py-2.5 px-4 text-sm font-medium border border-gray-200 shadow-sm rounded-xl w-full bg-white"
                                                                />
                                                            ) : (
                                                                <input 
                                                                    type="text" 
                                                                    placeholder={`Search ${field.label}...`}
                                                                    value={filterValues[field.name] || ''}
                                                                    onChange={(e) => setFilterValues({...filterValues, [field.name]: e.target.value})}
                                                                    onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                                                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all shadow-sm placeholder:text-gray-400"
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="p-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-2xl">
                                                    <button 
                                                        onClick={() => setIsFilterPanelOpen(false)}
                                                        className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button 
                                                        onClick={handleApplyFilters}
                                                        className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-sm"
                                                    >
                                                        Apply Filters
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {selectedIds.length > 0 && (
                        <button 
                            onClick={() => {
                                setData('product_ids', selectedIds);
                                setIsBulkModalOpen(true);
                            }}
                            className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black flex items-center gap-2 shadow-sm transition-colors ml-2"
                        >
                            Adjust Prices ({selectedIds.length})
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-x-auto bg-white">
                <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
                    <thead className="bg-white text-gray-400 text-[11px] uppercase tracking-widest font-extrabold border-b border-gray-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-8 py-5 w-16 text-center">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                    checked={products.data.length > 0 && selectedIds.length === products.data.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="px-8 py-5">Journal Name & Scope</th>
                            <th className="px-8 py-5">Accreditation</th>
                            <th className="px-8 py-5">Base HPP</th>
                            <th className="px-8 py-5">Harga Minimum</th>
                            <th className="px-8 py-5">Harga Standar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
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
                                    <tr key={product.id} className={`hover:bg-gray-50 transition-colors group ${isSelected ? 'bg-gray-50/50' : ''}`}>
                                        <td className="px-8 py-5 text-center">
                                            <input 
                                                type="checkbox" 
                                                className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                                checked={isSelected}
                                                onChange={(e) => handleSelectOne(e, product.id)}
                                            />
                                        </td>
                                        <td className="px-8 py-5 max-w-sm whitespace-normal">
                                            <div className="font-bold text-gray-900 leading-tight">{product.name}</div>
                                            <div className="text-xs text-gray-500 mt-1 truncate">
                                                {product.attributes?.focus_scope 
                                                    ? product.attributes.focus_scope.split(',')[0].trim() 
                                                    : (product.attributes?.subject_area ? product.attributes.subject_area.split(',')[0].trim() : '-')}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            {product.attributes?.accreditation_type ? (
                                                <span className="bg-gray-100 text-gray-900 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border border-gray-200">
                                                    {product.attributes.accreditation_type}
                                                </span>
                                            ) : '-'}
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="font-bold text-gray-900">
                                                {formatCurrency(product.hpp)}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="font-bold text-gray-900">
                                                {minPrice ? formatCurrency(minPrice) : '-'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="font-bold text-gray-900">
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
            
            <div className="shrink-0 bg-white border-t border-gray-100">
                <Pagination links={products.links} />
            </div>

            {/* Bulk Edit Modal */}
            {isBulkModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm" onClick={() => setIsBulkModalOpen(false)}></div>
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 animate-fade-in-up">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900">Adjust Selling Prices</h3>
                            <button onClick={() => setIsBulkModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleBulkSubmit} className="p-5 space-y-4">
                            <p className="text-sm text-gray-500">Updating <b>{selectedIds.length}</b> selected journals.</p>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Target Price to Update</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${data.target_field === 'harga_jual_minimum_info' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input 
                                            type="radio" 
                                            name="target_field" 
                                            value="harga_jual_minimum_info" 
                                            className="sr-only"
                                            checked={data.target_field === 'harga_jual_minimum_info'}
                                            onChange={() => setData('target_field', 'harga_jual_minimum_info')}
                                        />
                                        <span className="font-bold text-sm text-gray-900">Harga Jual Minimum</span>
                                        <span className="text-[10px] text-gray-500 mt-1 text-center">Batas bawah harga</span>
                                    </label>
                                    <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${data.target_field === 'harga_jual_standar' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input 
                                            type="radio" 
                                            name="target_field" 
                                            value="harga_jual_standar" 
                                            className="sr-only"
                                            checked={data.target_field === 'harga_jual_standar'}
                                            onChange={() => setData('target_field', 'harga_jual_standar')}
                                        />
                                        <span className="font-bold text-sm text-gray-900">Harga Jual Standar</span>
                                        <span className="text-[10px] text-gray-500 mt-1 text-center">Harga default sales</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Adjustment Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${data.update_type === 'percentage' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input 
                                            type="radio" 
                                            name="update_type" 
                                            value="percentage" 
                                            className="sr-only"
                                            checked={data.update_type === 'percentage'}
                                            onChange={() => setData('update_type', 'percentage')}
                                        />
                                        <span className="font-bold text-sm text-gray-900">% Markup</span>
                                        <span className="text-[10px] text-gray-500 mt-1 text-center">Dari harga dasar</span>
                                    </label>
                                    <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${data.update_type === 'fixed' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input 
                                            type="radio" 
                                            name="update_type" 
                                            value="fixed" 
                                            className="sr-only"
                                            checked={data.update_type === 'fixed'}
                                            onChange={() => setData('update_type', 'fixed')}
                                        />
                                        <span className="font-bold text-sm text-gray-900">Fixed Price</span>
                                        <span className="text-[10px] text-gray-500 mt-1 text-center">Exact Amount</span>
                                    </label>
                                </div>
                            </div>

                            {data.update_type === 'percentage' ? (
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Markup Base</label>
                                        <select 
                                            className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-gray-900 focus:ring-gray-900"
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
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Markup Percentage (%)</label>
                                        <input 
                                            type="number" 
                                            step="0.1"
                                            className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 focus:ring-gray-900"
                                            placeholder="e.g., 20"
                                            value={data.percentage_increase}
                                            onChange={e => setData('percentage_increase', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Fixed Selling Price (Rp)</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 focus:ring-gray-900"
                                        placeholder="e.g., 15000000"
                                        value={data.fixed_price}
                                        onChange={e => setData('fixed_price', e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setIsBulkModalOpen(false)}
                                    className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-6 py-2 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black disabled:opacity-70 flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    {processing ? 'Applying...' : 'Apply Prices'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

Index.layout = page => <MainLayout children={page} />;
