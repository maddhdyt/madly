import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, Plus, Trash2, ListPlus, Box, Book, Monitor, Server, TrendingUp, Briefcase, Code, PenTool, Award, Shield, Globe, Camera, Palette, Database, Layers } from 'lucide-react';

export default function PricelistFormSlideOver({ isOpen, onClose, pricelist, products = [], services = [], showToast }) {
    const isEdit = !!pricelist;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, clearErrors } = useForm({
        service_id: '',
        name: '',
        promo_header: '',
        footer_text: '',
        includes: [''],
        prices: []
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (pricelist) {
                setData({
                    service_id: pricelist.service_id || (services.length > 0 ? services[0].id : ''),
                    name: pricelist.name || '',
                    promo_header: pricelist.promo_header || '',
                    footer_text: pricelist.footer_text || '',
                    includes: pricelist.includes?.length ? pricelist.includes : [''],
                    prices: pricelist.prices?.length ? pricelist.prices : []
                });
            } else {
                setData({
                    service_id: services.length > 0 ? services[0].id : '',
                    name: '',
                    promo_header: '',
                    footer_text: '',
                    includes: [''],
                    prices: []
                });
            }
        }
    }, [isOpen, pricelist]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.pricelists.update', pricelist.id), {
                onSuccess: () => {
                    if (showToast) showToast('Pricelist updated successfully!');
                    onClose();
                },
                onError: (errs) => {
                    // Extract first error message
                    const firstError = Object.values(errs)[0];
                    if (showToast) showToast(firstError || 'Failed to update pricelist.', 'error');
                }
            });
        } else {
            post(route('admin.pricelists.store'), {
                onSuccess: () => {
                    if (showToast) showToast('Pricelist created successfully!');
                    onClose();
                },
                onError: (errs) => {
                    const firstError = Object.values(errs)[0];
                    if (showToast) showToast(firstError || 'Failed to create pricelist.', 'error');
                }
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
    const addPrice = () => setData('prices', [...data.prices, { product_id: '', package_name: '', normal_price: '', promo_price: '', notes: '' }]);
    const removePrice = (idx) => setData('prices', data.prices.filter((_, i) => i !== idx));
    const updatePrice = (idx, field, val) => {
        const newPrices = [...data.prices];
        newPrices[idx][field] = val;
        setData('prices', newPrices);
    };

    const labelClass = "block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 ml-1";
    const inputClass = "w-full bg-[#f4f5f5] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:bg-white dark:focus:bg-gray-800 transition-all";
    const errorClass = "text-red-500 text-xs mt-1 ml-1";

    if (!isOpen || !mounted) return null;

    const selectedService = services.find(s => s.id === data.service_id) || services[0] || { form_config: {} };
    const currentConfig = selectedService.form_config || {};

    const renderIcon = (iconName) => {
        const icons = {
            'book': <Book className="w-5 h-5" />,
            'monitor': <Monitor className="w-5 h-5" />,
            'server': <Server className="w-5 h-5" />,
            'trending-up': <TrendingUp className="w-5 h-5" />,
            'briefcase': <Briefcase className="w-5 h-5" />,
            'code': <Code className="w-5 h-5" />,
            'pen-tool': <PenTool className="w-5 h-5" />,
            'award': <Award className="w-5 h-5" />,
            'shield': <Shield className="w-5 h-5" />,
            'globe': <Globe className="w-5 h-5" />,
            'camera': <Camera className="w-5 h-5" />,
            'palette': <Palette className="w-5 h-5" />,
            'database': <Database className="w-5 h-5" />,
            'layers': <Layers className="w-5 h-5" />
        };
        return icons[iconName] || <Box className="w-5 h-5" />;
    };

    const getHPP = (productId) => {
        if (!productId) return 0;
        const p = products.find(p => p.id === parseInt(productId));
        return p ? p.hpp : 0;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount || 0);
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div 
                className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity animate-fade-in" 
                onClick={onClose}
            ></div>
            
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-full animate-slide-in">
                <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{isEdit ? 'Edit Pricelist' : 'Create Pricelist'}</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Configure format and pricing packages.</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-none bg-[#f8f9fa] dark:bg-black">
                    <form id="pricelist-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
                        
                        {/* SECTION 0: Type Selector */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {services.map(type => {
                                const isSelected = data.service_id === type.id;
                                return (
                                    <button 
                                        key={type.id}
                                        type="button"
                                        onClick={() => setData('service_id', type.id)}
                                        className={`p-5 rounded-2xl border flex flex-col items-start gap-3 transition-all ${isSelected ? 'border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md transform scale-[1.02]' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-[1.01]'}`}
                                    >
                                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/10 dark:bg-gray-900/10 text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400'}`}>
                                            {renderIcon(type.icon)}
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold">{type.name}</div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        {errors.service_id && <p className={errorClass}>{errors.service_id}</p>}

                        {/* SECTION 1: General Info */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                                <Box className="w-4 h-4 text-gray-400" />
                                Katalog Info
                            </h3>
                            
                            <div>
                                <label className={labelClass}>Nama Katalog / Pricelist</label>
                                <input 
                                    type="text" 
                                    className={inputClass}
                                    placeholder="e.g., Paket Promo Ramadhan"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className={errorClass}>{errors.name}</p>}
                            </div>
                        </div>

                        {/* SECTION 2: Copy Format Overrides */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
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
                                    <label className={labelClass}>{currentConfig.includes_label || 'Included Features (✅)'}</label>
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
                                                    className="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button 
                                            type="button"
                                            onClick={addInclude}
                                            className="w-fit text-xs font-bold text-gray-900 dark:text-white hover:underline flex items-center gap-1 mt-2"
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
                                        placeholder={currentConfig.footer_text_placeholder || 'e.g., Price excludes VAT'}
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
                                    Packages & Items
                                </h3>
                                <button 
                                    type="button"
                                    onClick={addPrice}
                                    className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-xs font-bold hover:bg-gray-100 flex items-center gap-1.5"
                                >
                                    <Plus className="w-3 h-3" /> Add Package
                                </button>
                            </div>

                            {errors.prices && typeof errors.prices === 'string' && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">
                                    {errors.prices}
                                </div>
                            )}

                            <div className="flex flex-col gap-4">
                                {data.prices.map((price, idx) => {
                                    const hpp = getHPP(price.product_id);
                                    return (
                                    <div key={idx} className="bg-gray-800/80 border border-white/10 rounded-xl p-5 relative group">
                                        <button 
                                            type="button" 
                                            onClick={() => removePrice(idx)}
                                            className="absolute -right-2 -top-2 w-7 h-7 bg-white border border-gray-200 text-gray-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:text-red-500 z-10"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className={`${labelClass} !text-gray-400 flex justify-between`}>
                                                    <span>Target Product (Jurnal)</span>
                                                    {price.product_id && (
                                                        <span className="text-orange-400">HPP: {formatCurrency(hpp)}</span>
                                                    )}
                                                </label>
                                                <select 
                                                    className={`${inputClass} !bg-gray-800 !border-gray-700 !text-white focus:!bg-gray-900`}
                                                    value={price.product_id}
                                                    onChange={e => updatePrice(idx, 'product_id', e.target.value)}
                                                    required
                                                >
                                                    <option value="">-- Pilih Jurnal --</option>
                                                    {products.map(p => (
                                                        <option key={p.id} value={p.id}>{p.name} ({p.accreditation_type || '-'})</option>
                                                    ))}
                                                </select>
                                                {errors[`prices.${idx}.product_id`] && <p className={errorClass}>{errors[`prices.${idx}.product_id`]}</p>}
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className={`${labelClass} !text-gray-400`}>Package Name</label>
                                                <input 
                                                    type="text" 
                                                    className={`${inputClass} !bg-gray-800 !border-gray-700 !text-white focus:!bg-gray-900`}
                                                    placeholder="e.g., Paket Fastrack LoA & Publish"
                                                    value={price.package_name}
                                                    onChange={e => updatePrice(idx, 'package_name', e.target.value)}
                                                    required
                                                />
                                                {errors[`prices.${idx}.package_name`] && <p className={errorClass}>{errors[`prices.${idx}.package_name`]}</p>}
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
                                                {errors[`prices.${idx}.normal_price`] && <p className={errorClass}>{errors[`prices.${idx}.normal_price`]}</p>}
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
                                                {errors[`prices.${idx}.promo_price`] && <p className={errorClass}>{errors[`prices.${idx}.promo_price`]}</p>}
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
                                )})}
                            </div>
                        </div>
                    </form>
                </div>

                <div className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 z-10">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        form="pricelist-form" 
                        disabled={processing} 
                        className="px-8 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm disabled:opacity-70 transition-colors"
                    >
                        <Save className="w-4 h-4" /> 
                        {processing ? 'Saving...' : 'Save Pricelist'}
                    </button>
                </div>
            </div>
            
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
