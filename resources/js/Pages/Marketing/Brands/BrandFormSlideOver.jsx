import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, Briefcase } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';

export default function BrandFormSlideOver({ isOpen, onClose, brand, showToast }) {
    const { t } = useTranslations();
    const isEdit = !!brand;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, clearErrors, reset } = useForm({
        name: '',
        is_active: true,
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (isEdit && brand) {
                setData({
                    name: brand.name || '',
                    is_active: brand.is_active ?? true,
                });
            } else {
                reset();
                setData({
                    name: '',
                    is_active: true,
                });
            }
        }
    }, [isOpen, brand]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEdit) {
            put(route('marketing.brands.update', brand.id), {
                onSuccess: () => {
                    onClose();
                    if (showToast) showToast(t('Brand updated successfully!'));
                },
                onError: (err) => {
                    const firstError = Object.values(err)[0];
                    if (showToast) showToast(firstError || t('Failed to update Brand.'), 'error');
                }
            });
        } else {
            post(route('marketing.brands.store'), {
                onSuccess: () => {
                    onClose();
                    reset();
                    if (showToast) showToast(t('Brand created successfully!'));
                },
                onError: (err) => {
                    const firstError = Object.values(err)[0];
                    if (showToast) showToast(firstError || t('Failed to create Brand.'), 'error');
                }
            });
        }
    };

    if (!mounted) return null;

    const inputClass = "w-full bg-[#f4f5f5] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:bg-white dark:focus:bg-gray-800 transition-all";
    const labelClass = "block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2";

    return createPortal(
        <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm" onClick={onClose}></div>
            
            <div className={`absolute top-0 right-0 h-full w-full sm:w-[450px] bg-white dark:bg-gray-950 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                <Briefcase className="w-4 h-4" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                                {isEdit ? t('Edit Brand') : t('New Brand')}
                            </h2>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                        <div className="p-6 space-y-6">
                            
                            <div>
                                <label className={labelClass}>{t('Brand Name')}</label>
                                <input 
                                    type="text" 
                                    className={inputClass}
                                    placeholder={t('Enter brand name')}
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    autoFocus
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                            data.is_active 
                                            ? 'bg-gray-900 border-gray-900 dark:bg-white dark:border-white' 
                                            : 'bg-transparent border-gray-300 dark:border-gray-600'
                                        }`}>
                                            <svg className={`w-3.5 h-3.5 text-white dark:text-gray-900 transition-opacity ${
                                                data.is_active ? 'opacity-100' : 'opacity-0'
                                            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white tracking-wide">{t('Active Status')}</span>
                                </label>
                            </div>

                        </div>
                    </form>

                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                        <button 
                            type="button"
                            onClick={handleSubmit}
                            disabled={processing}
                            className="flex items-center justify-center w-full gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-sm disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {processing ? t('Saving...') : t('Save Brand')}
                        </button>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
}
