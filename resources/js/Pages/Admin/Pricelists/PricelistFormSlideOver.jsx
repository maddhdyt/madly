import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, Box } from 'lucide-react';

export default function PricelistFormSlideOver({ isOpen, onClose, price, products = [] }) {
    const isEdit = !!price;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        product_id: '',
        package_name: '',
        normal_price: '',
        promo_price: '',
        notes: ''
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (price) {
                setData({
                    product_id: price.product_id || '',
                    package_name: price.package_name || '',
                    normal_price: price.normal_price || '',
                    promo_price: price.promo_price || '',
                    notes: price.notes || ''
                });
            } else {
                reset();
                if (products.length > 0) {
                    setData('product_id', products[0].id);
                }
            }
        }
    }, [isOpen, price]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.pricelists.update', price.id), {
                onSuccess: () => onClose()
            });
        } else {
            post(route('admin.pricelists.store'), {
                onSuccess: () => onClose()
            });
        }
    };

    const labelClass = "block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 ml-1";
    const inputClass = "w-full bg-[#f4f5f5] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:bg-white dark:focus:bg-gray-800 transition-all";

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity animate-fade-in" 
                onClick={onClose}
            ></div>
            
            {/* Panel */}
            <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-full animate-slide-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{isEdit ? 'Edit Package' : 'Add New Package'}</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Configure pricing details for this package.</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-none bg-[#f8f9fa] dark:bg-black">
                    <form id="pricelist-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                        
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className={labelClass}>Product</label>
                                    <select 
                                        className={inputClass}
                                        value={data.product_id}
                                        onChange={e => setData('product_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select a Product</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.brand?.name ? `${p.brand.name} - ` : ''}{p.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.product_id && <p className="text-red-500 text-xs mt-1">{errors.product_id}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Package Name</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder="e.g., Paket ALL IN"
                                        value={data.package_name}
                                        onChange={e => setData('package_name', e.target.value)}
                                        required
                                    />
                                    {errors.package_name && <p className="text-red-500 text-xs mt-1">{errors.package_name}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Normal Price (Rp)</label>
                                    <input 
                                        type="number" 
                                        className={inputClass}
                                        placeholder="e.g., 6000000"
                                        value={data.normal_price}
                                        onChange={e => setData('normal_price', e.target.value)}
                                        required
                                    />
                                    {errors.normal_price && <p className="text-red-500 text-xs mt-1">{errors.normal_price}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Promo Price (Rp - Optional)</label>
                                    <input 
                                        type="number" 
                                        className={inputClass}
                                        placeholder="e.g., 3000000"
                                        value={data.promo_price}
                                        onChange={e => setData('promo_price', e.target.value)}
                                    />
                                    {errors.promo_price && <p className="text-red-500 text-xs mt-1">{errors.promo_price}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Extra Notes (Optional)</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder="e.g., Harga khusus member"
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                    />
                                    {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes}</p>}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
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
                        {processing ? 'Saving...' : 'Save Package'}
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
