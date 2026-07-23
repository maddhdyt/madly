import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, Box, Book, Monitor, Server, TrendingUp } from 'lucide-react';

export default function ServiceFormSlideOver({ isOpen, onClose, service }) {
    const isEdit = !!service;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        description: '',
        icon: 'box',
        form_config: {
            includes_label: 'Includes / Fasilitas (✅)',
            includes_placeholder: 'e.g., Editing Mendeley',
            promo_header_label: 'Promo Header Text',
            promo_header_placeholder: 'e.g., Pricelist Spesial Promo :',
            footer_text_label: 'Footer Text',
            footer_text_placeholder: 'e.g., Harga belum termasuk PPN',
        }
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (service) {
                setData({
                    name: service.name || '',
                    description: service.description || '',
                    icon: service.icon || 'box',
                    form_config: service.form_config || {
                        includes_label: 'Includes / Fasilitas (✅)',
                        includes_placeholder: 'e.g., Editing Mendeley',
                        promo_header_label: 'Promo Header Text',
                        promo_header_placeholder: 'e.g., Pricelist Spesial Promo :',
                        footer_text_label: 'Footer Text',
                        footer_text_placeholder: 'e.g., Harga belum termasuk PPN',
                    }
                });
            } else {
                reset();
            }
        }
    }, [isOpen, service]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.services.update', service.id), {
                onSuccess: () => onClose()
            });
        } else {
            post(route('admin.services.store'), {
                onSuccess: () => onClose()
            });
        }
    };

    const updateConfig = (field, value) => {
        setData('form_config', { ...data.form_config, [field]: value });
    };

    const labelClass = "block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 ml-1";
    const inputClass = "w-full bg-[#f4f5f5] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:bg-white dark:focus:bg-gray-800 transition-all";

    if (!isOpen || !mounted) return null;

    const availableIcons = [
        { id: 'box', icon: <Box className="w-5 h-5" />, label: 'Box' },
        { id: 'book', icon: <Book className="w-5 h-5" />, label: 'Book' },
        { id: 'monitor', icon: <Monitor className="w-5 h-5" />, label: 'Monitor' },
        { id: 'server', icon: <Server className="w-5 h-5" />, label: 'Server' },
        { id: 'trending-up', icon: <TrendingUp className="w-5 h-5" />, label: 'Trending' },
    ];

    return createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity animate-fade-in" onClick={onClose}></div>
            
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-full animate-slide-in">
                <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{isEdit ? 'Edit Service Type' : 'Add Service Type'}</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Configure service template and form labels.</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-none bg-[#f8f9fa] dark:bg-black">
                    <form id="service-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
                        
                        {/* SECTION 1: General Info */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5 border-b border-gray-100 dark:border-gray-700 pb-3">
                                General Information
                            </h3>
                            
                            <div className="grid grid-cols-1 gap-5">
                                <div>
                                    <label className={labelClass}>Service Name</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder="e.g., Web Development"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Description</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder="Brief explanation of this service"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Icon Selection</label>
                                    <div className="flex flex-wrap gap-3">
                                        {availableIcons.map(ic => (
                                            <button
                                                key={ic.id}
                                                type="button"
                                                onClick={() => setData('icon', ic.id)}
                                                className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all ${data.icon === ic.id ? 'bg-gray-900 dark:bg-white border-gray-900 dark:border-white text-white dark:text-gray-900 shadow-md' : 'bg-[#f4f5f5] dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                                title={ic.label}
                                            >
                                                {ic.icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: Form Configurations */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5 border-b border-gray-100 dark:border-gray-700 pb-3">
                                Form Configuration (Labels & Placeholders)
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>Promo Header Label</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={data.form_config.promo_header_label}
                                        onChange={e => updateConfig('promo_header_label', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Promo Header Placeholder</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={data.form_config.promo_header_placeholder}
                                        onChange={e => updateConfig('promo_header_placeholder', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Includes Label</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={data.form_config.includes_label}
                                        onChange={e => updateConfig('includes_label', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Includes Placeholder</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={data.form_config.includes_placeholder}
                                        onChange={e => updateConfig('includes_placeholder', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Footer Text Label</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={data.form_config.footer_text_label}
                                        onChange={e => updateConfig('footer_text_label', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Footer Text Placeholder</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={data.form_config.footer_text_placeholder}
                                        onChange={e => updateConfig('footer_text_placeholder', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

                <div className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 z-10">
                    <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                        Cancel
                    </button>
                    <button type="submit" form="service-form" disabled={processing} className="px-8 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm disabled:opacity-70 transition-colors">
                        <Save className="w-4 h-4" /> 
                        {processing ? 'Saving...' : 'Save Service Type'}
                    </button>
                </div>
            </div>
            
            <style>{`
                @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-slide-in { animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
            `}</style>
        </div>,
        document.body
    );
}
