import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, Megaphone, Link as LinkIcon, Zap } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import CustomSelect from '../../../Components/CustomSelect';

export default function AdIdentityFormSlideOver({ isOpen, onClose, identity, brands = [], salesUsers = [], showToast }) {
    const { t } = useTranslations();
    const isEdit = !!identity;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, clearErrors, reset } = useForm({
        marketing_brand_id: '',
        ad_platform: '',
        landing_page_url: '',
        sales_id: '',
        is_active: true,
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (isEdit && identity) {
                setData({
                    marketing_brand_id: identity.marketing_brand_id || '',
                    ad_platform: identity.ad_platform || '',
                    landing_page_url: identity.landing_page_url || '',
                    sales_id: identity.sales_id || '',
                    is_active: identity.is_active ?? true,
                });
            } else {
                reset();
                setData({
                    marketing_brand_id: '',
                    ad_platform: '',
                    landing_page_url: '',
                    sales_id: '',
                    is_active: true,
                });
            }
        }
    }, [isOpen, identity]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEdit) {
            put(route('marketing.ad-identities.update', identity.id), {
                onSuccess: () => {
                    onClose();
                    if (showToast) showToast(t('Ad Identity updated successfully!'));
                },
                onError: (err) => {
                    const firstError = Object.values(err)[0];
                    if (showToast) showToast(firstError || t('Failed to update Ad Identity.'), 'error');
                }
            });
        } else {
            post(route('marketing.ad-identities.store'), {
                onSuccess: () => {
                    onClose();
                    reset();
                    if (showToast) showToast(t('Ad Identity created successfully!'));
                },
                onError: (err) => {
                    const firstError = Object.values(err)[0];
                    if (showToast) showToast(firstError || t('Failed to create Ad Identity.'), 'error');
                }
            });
        }
    };

    if (!mounted) return null;

    const inputClass = "w-full bg-[#f4f5f5] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:bg-white dark:focus:bg-gray-800 transition-all";
    const labelClass = "block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2";

    const brandOptions = brands.map(b => ({ value: b.id, label: b.name }));
    const salesOptions = [{ value: '', label: t('-- General / No Specific Sales --') }, ...salesUsers.map(s => ({ value: s.id, label: s.name }))];
    const platformOptions = [
        { value: 'Facebook Ads', label: 'Facebook Ads' },
        { value: 'TikTok Ads', label: 'TikTok Ads' },
        { value: 'Google Ads', label: 'Google Ads' },
        { value: 'Instagram Ads', label: 'Instagram Ads' }
    ];

    return createPortal(
        <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm" onClick={onClose}></div>
            
            <div className={`absolute top-0 right-0 h-full w-full sm:w-[450px] bg-white dark:bg-gray-950 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                <Megaphone className="w-4 h-4" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                                {isEdit ? t('Edit Ad Identity') : t('New Ad Identity')}
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
                            
                            <div className="z-30 relative">
                                <label className={labelClass}>{t('Brand')}</label>
                                <CustomSelect
                                    value={data.marketing_brand_id}
                                    onChange={e => setData('marketing_brand_id', e.target.value)}
                                    options={brandOptions}
                                    className="px-4 py-2.5 bg-[#f4f5f5] dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800"
                                />
                                {errors.marketing_brand_id && <p className="text-red-500 text-xs mt-1">{errors.marketing_brand_id}</p>}
                            </div>

                            <div className="z-20 relative">
                                <label className={labelClass}>{t('Ad Platform')}</label>
                                <CustomSelect
                                    value={data.ad_platform}
                                    onChange={e => setData('ad_platform', e.target.value)}
                                    options={platformOptions}
                                    className="px-4 py-2.5 bg-[#f4f5f5] dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800"
                                />
                                {errors.ad_platform && <p className="text-red-500 text-xs mt-1">{errors.ad_platform}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>{t('Landing Page URL (LP)')}</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input 
                                        type="url" 
                                        className={`${inputClass} pl-10`}
                                        placeholder="https://example.com/lp"
                                        value={data.landing_page_url}
                                        onChange={e => setData('landing_page_url', e.target.value)}
                                    />
                                </div>
                                {errors.landing_page_url && <p className="text-red-500 text-xs mt-1">{errors.landing_page_url}</p>}
                            </div>

                            <div className="z-10 relative">
                                <label className={labelClass}>{t('Assigned Sales')}</label>
                                <CustomSelect
                                    value={data.sales_id}
                                    onChange={e => setData('sales_id', e.target.value)}
                                    options={salesOptions}
                                    className="px-4 py-2.5 bg-[#f4f5f5] dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800"
                                />
                                {errors.sales_id && <p className="text-red-500 text-xs mt-1">{errors.sales_id}</p>}
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
                            {processing ? t('Saving...') : t('Save Ad Identity')}
                        </button>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
}
