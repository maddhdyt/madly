import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, Plus, Trash2, ListPlus, Box, Book, Monitor, Server, TrendingUp } from 'lucide-react';

export default function ProductFormSlideOver({ isOpen, onClose, product, brands, services = [] }) {
    const isEdit = !!product;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        service_id: '',
        brand_id: '',
        name: '',
        description_snippet: '',
        category: '',
        promo_header: '',
        footer_text: '',
        includes: [''],
        prices: [{ package_name: '', normal_price: '', promo_price: '', notes: '' }],
        metadata: {}
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (product) {
                setData({
                    service_id: product.service_id || (services.length > 0 ? services[0].id : ''),
                    brand_id: product.brand_id || '',
                    name: product.name || '',
                    description_snippet: product.description_snippet || '',
                    category: product.category || '',
                    promo_header: product.promo_header || '',
                    footer_text: product.footer_text || '',
                    includes: product.includes?.length ? product.includes : [''],
                    prices: product.prices?.length ? product.prices : [{ package_name: '', normal_price: '', promo_price: '', notes: '' }],
                    metadata: product.metadata || {}
                });
            } else {
                reset();
                setData('includes', ['']);
                setData('prices', [{ package_name: '', normal_price: '', promo_price: '', notes: '' }]);
            }
        }
    }, [isOpen, product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.products.update', product.id), {
                onSuccess: () => onClose()
            });
        } else {
            post(route('admin.products.store'), {
                onSuccess: () => onClose()
            });
        }
    };

    // Includes Handlers
    const addInclude = () => setData('includes', [...data.includes, '']);
    const removeInclude = (idx) => setData('includes', data.includes.filter((_, i) => i !== idx));
    const updateInclude = (idx, val) => {
        const newIncludes = [...data.includes];
        newIncludes[idx] = val;
        setData('includes', newIncludes);
    };

    // Prices Handlers
    const addPrice = () => setData('prices', [...data.prices, { package_name: '', normal_price: '', promo_price: '', notes: '' }]);
    const removePrice = (idx) => setData('prices', data.prices.filter((_, i) => i !== idx));
    const updatePrice = (idx, field, val) => {
        const newPrices = [...data.prices];
        newPrices[idx][field] = val;
        setData('prices', newPrices);
    };

    const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1";
    const inputClass = "w-full bg-[#f4f5f5] border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all";

    if (!isOpen || !mounted) return null;

    const selectedService = services.find(s => s.id === data.service_id) || services[0] || { form_config: {} };
    const currentConfig = selectedService.form_config || {};

    const renderIcon = (iconName) => {
        const icons = {
            'book': <Book className="w-5 h-5" />,
            'monitor': <Monitor className="w-5 h-5" />,
            'server': <Server className="w-5 h-5" />,
            'trending-up': <TrendingUp className="w-5 h-5" />
        };
        return icons[iconName] || <Box className="w-5 h-5" />;
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity animate-fade-in" 
                onClick={onClose}
            ></div>
            
            {/* Panel */}
            <div className="relative w-full max-w-2xl bg-white shadow-2xl flex flex-col h-full animate-slide-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-gray-100 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
                        <p className="text-xs text-gray-500 mt-1">Configure the product details and pricing packages.</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-none bg-[#f8f9fa]">
                    <form id="product-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
                        
                        {/* SECTION 0: Type Selector (Only for New Products) */}
                        {!isEdit && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {services.map(type => {
                                    const isSelected = data.service_id === type.id;
                                    return (
                                        <button 
                                            key={type.id}
                                            type="button"
                                            onClick={() => setData('service_id', type.id)}
                                            className={`p-5 rounded-2xl border flex flex-col items-start gap-3 transition-all ${isSelected ? 'border-gray-900 bg-gray-900 text-white shadow-md transform scale-[1.02]' : 'border-gray-200 bg-white hover:border-gray-300 text-gray-900 hover:bg-gray-50 hover:scale-[1.01]'}`}
                                        >
                                            <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                                {renderIcon(type.icon)}
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold">{type.label}</div>
                                                <div className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                                                    {type.description}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {isEdit && selectedService && (
                            <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                                <div className="p-3 bg-gray-100 text-gray-900 rounded-xl">
                                    {renderIcon(selectedService.icon)}
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">Service Type: {selectedService.name}</h3>
                                    <p className="text-xs text-gray-500">To change the service type, please create a new product.</p>
                                </div>
                            </div>
                        )}
                        
                        {/* SECTION 1: General Info */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2 border-b border-gray-100 pb-3">
                                <Box className="w-4 h-4 text-gray-400" />
                                General Information
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>Brand</label>
                                    <select 
                                        className={inputClass}
                                        value={data.brand_id}
                                        onChange={e => setData('brand_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Brand</option>
                                        {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                    </select>
                                    {errors.brand_id && <p className="text-red-500 text-xs mt-1">{errors.brand_id}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Product Name</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder="e.g., 🔥SINTA 3🔥"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className={labelClass}>Category / Bidang</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder="e.g., Hukum"
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className={labelClass}>Short Description (Optional)</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder="Used internally on dashboard"
                                        value={data.description_snippet}
                                        onChange={e => setData('description_snippet', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: Copy Format Overrides */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2 border-b border-gray-100 pb-3">
                                <ListPlus className="w-4 h-4 text-gray-400" />
                                Quotation Format (Copy-Paste)
                            </h3>
                            
                            <div className="grid grid-cols-1 gap-5">
                                <div>
                                    <label className={labelClass}>{currentConfig.promo_header_label || 'Promo Header Text'}</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder={currentConfig.promo_header_placeholder || 'e.g., Pricelist Spesial Promo :'}
                                        value={data.promo_header}
                                        onChange={e => setData('promo_header', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>{currentConfig.includes_label || 'Includes / Fasilitas (✅)'}</label>
                                    <div className="flex flex-col gap-3">
                                        {data.includes.map((inc, idx) => (
                                            <div key={idx} className="flex gap-3">
                                                <div className="flex-1 relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✅</div>
                                                    <input 
                                                        type="text" 
                                                        className={`${inputClass} pl-10`}
                                                        placeholder={currentConfig.includes_placeholder || 'e.g., Editing Mendeley'}
                                                        value={inc}
                                                        onChange={e => updateInclude(idx, e.target.value)}
                                                    />
                                                </div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeInclude(idx)}
                                                    className="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-gray-200 text-gray-400 rounded-xl hover:bg-gray-100 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button 
                                            type="button"
                                            onClick={addInclude}
                                            className="w-fit text-xs font-bold text-gray-900 hover:underline flex items-center gap-1 mt-2"
                                        >
                                            <Plus className="w-3 h-3" /> Add Include Item
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>{currentConfig.footer_text_label || 'Footer Text'}</label>
                                    <textarea 
                                        className={inputClass}
                                        rows="2"
                                        placeholder={currentConfig.footer_text_placeholder || 'e.g., Harga belum termasuk PPN'}
                                        value={data.footer_text}
                                        onChange={e => setData('footer_text', e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 3: Packages & Prices */}
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-logo">
                            <div className="flex items-center justify-between mb-5 border-b border-gray-800 pb-3">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    Packages & Pricing
                                </h3>
                                <button 
                                    type="button"
                                    onClick={addPrice}
                                    className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-xs font-bold hover:bg-gray-100 flex items-center gap-1.5"
                                >
                                    <Plus className="w-3 h-3" /> Add Package
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {data.prices.map((price, idx) => (
                                    <div key={idx} className="bg-gray-800/80 border border-white/10 rounded-xl p-5 relative group">
                                        {data.prices.length > 1 && (
                                            <button 
                                                type="button" 
                                                onClick={() => removePrice(idx)}
                                                className="absolute -right-2 -top-2 w-7 h-7 bg-white border border-gray-200 text-gray-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:text-red-500 z-10"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className={`${labelClass} !text-gray-400`}>Package Name</label>
                                                <input 
                                                    type="text" 
                                                    className={`${inputClass} !bg-gray-800 !border-gray-700 !text-white focus:!bg-gray-900`}
                                                    placeholder="e.g., Paket ALL IN"
                                                    value={price.package_name}
                                                    onChange={e => updatePrice(idx, 'package_name', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className={`${labelClass} !text-gray-400`}>Normal Price (Rp)</label>
                                                <input 
                                                    type="number" 
                                                    className={`${inputClass} !bg-gray-800 !border-gray-700 !text-white focus:!bg-gray-900`}
                                                    placeholder="e.g., 6000000"
                                                    value={price.normal_price}
                                                    onChange={e => updatePrice(idx, 'normal_price', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className={`${labelClass} !text-gray-400`}>Promo Price (Rp - Optional)</label>
                                                <input 
                                                    type="number" 
                                                    className={`${inputClass} !bg-gray-800 !border-gray-700 !text-white focus:!bg-gray-900`}
                                                    placeholder="e.g., 3000000"
                                                    value={price.promo_price}
                                                    onChange={e => updatePrice(idx, 'promo_price', e.target.value)}
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className={`${labelClass} !text-gray-400`}>Extra Notes (Optional)</label>
                                                <input 
                                                    type="text" 
                                                    className={`${inputClass} !bg-gray-800 !border-gray-700 !text-white focus:!bg-gray-900`}
                                                    placeholder="e.g., (Tidak termasuk revisi mayor dan minor)"
                                                    value={price.notes}
                                                    onChange={e => updatePrice(idx, 'notes', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-3 z-10">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        form="product-form" 
                        disabled={processing} 
                        className="px-8 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black flex items-center gap-2 shadow-sm disabled:opacity-70"
                    >
                        <Save className="w-4 h-4" /> 
                        {processing ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </div>
            
            {/* Custom Animation CSS inline for simplicity */}
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-slide-in {
                    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-fade-in {
                    animation: fadeIn 0.2s ease-out forwards;
                }
            `}</style>
        </div>,
        document.body
    );
}
