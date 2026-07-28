import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, FileText, User, Mail, Phone, Tag } from 'lucide-react';

export default function QuotationModal({ isOpen, onClose, selectedItems, totalItemsAmount }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        client_name: '',
        client_email: '',
        client_phone: '',
        discount: 0,
        notes: '',
        items: []
    });

    // Populate items when modal opens
    React.useEffect(() => {
        if (isOpen) {
            clearErrors();
            setData('items', selectedItems.map(item => ({
                product_id: item.product_id,
                product_price_id: item.price_id,
                item_name: item.productName,
                package_name: item.packageName,
                quantity: 1, // Default 1 for quoting
                unit_price: item.promoPrice || item.normalPrice,
                subtotal: item.promoPrice || item.normalPrice
            })));
        }
    }, [isOpen, selectedItems]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.calculator.store'), {
            onSuccess: (page) => {
                const quotationId = page.props.flash.quotation_id;
                if (quotationId) {
                    window.open(route('admin.quotations.pdf', quotationId), '_blank');
                }
                onClose();
            }
        });
    };

    if (!isOpen) return null;

    const inputClass = "w-full bg-[#f4f5f5] dark:bg-gray-900 border border-transparent dark:border-gray-700 focus:bg-white dark:focus:bg-black focus:border-gray-300 dark:focus:border-gray-600 rounded-xl px-4 py-2.5 pl-10 text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all";
    const labelClass = "block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2";

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            
            <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Generate Quotation</h2>
                            <p className="text-xs text-gray-500 mt-0.5">{selectedItems.length} items selected</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    
                    <div>
                        <label className={labelClass}>Client Name (Optional)</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                className={inputClass}
                                placeholder="e.g. Acme Corp"
                                value={data.client_name}
                                onChange={e => setData('client_name', e.target.value)}
                            />
                        </div>
                        {errors.client_name && <p className="text-red-500 text-xs mt-1">{errors.client_name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Email (Optional)</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="email" 
                                    className={inputClass}
                                    placeholder="client@acme.com"
                                    value={data.client_email}
                                    onChange={e => setData('client_email', e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Phone (Optional)</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    className={inputClass}
                                    placeholder="0812..."
                                    value={data.client_phone}
                                    onChange={e => setData('client_phone', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                        <label className={labelClass}>Extra Discount (Rp)</label>
                        <div className="relative">
                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="number" 
                                className={inputClass}
                                placeholder="0"
                                value={data.discount}
                                onChange={e => setData('discount', e.target.value)}
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl flex items-center justify-between mt-6">
                        <span className="text-sm font-bold text-gray-500">Grand Total:</span>
                        <span className="text-2xl font-black text-gray-900 dark:text-white">
                            Rp {(totalItemsAmount - (data.discount || 0)).toLocaleString('id-ID')}
                        </span>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-4 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            {processing ? 'Generating...' : 'Create & Download PDF'}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
