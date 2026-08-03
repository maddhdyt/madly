import React, { useState, useEffect } from 'react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import MarketingLayout from '../../../Layouts/MarketingLayout';
import useTranslations from '../../../Hooks/useTranslations';
import { Link2, Copy, Trash2, Globe, FileText, MousePointerClick, CheckCircle2, Search, ArrowRight, Activity, Plus } from 'lucide-react';
import dayjs from 'dayjs';

export default function UtmBuilder({ brands, history, showToast, copyToClipboard }) {
    const { t } = useTranslations();
    const [copiedId, setCopiedId] = useState(null);
    const [generatedLink, setGeneratedLink] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        marketing_brand_id: '',
        target_url: '',
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('marketing.utm-builder.store'), {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = page.props.flash || {};
                if (flash.success) {
                    showToast(flash.success);
                    if (page.props.history.data && page.props.history.data.length > 0) {
                        setGeneratedLink(page.props.history.data[0].generated_url);
                    }
                    reset('target_url', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content');
                }
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm(t('Are you sure you want to delete this UTM link?'))) {
            router.delete(route('marketing.utm-builder.destroy', id), {
                preserveScroll: true,
                onSuccess: (page) => {
                    const flash = page.props.flash || {};
                    if (flash.success) showToast(flash.success);
                }
            });
        }
    };

    const handleCopy = (url, id = null) => {
        copyToClipboard(url);
        if (id) {
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    const sourceOptions = [
        { value: 'facebook', label: 'Facebook' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'google', label: 'Google' },
        { value: 'tiktok', label: 'TikTok' },
        { value: 'twitter', label: 'Twitter / X' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'email', label: 'Email Newsletter' },
        { value: 'whatsapp', label: 'WhatsApp' },
    ];

    const mediumOptions = [
        { value: 'cpc', label: 'CPC / Paid Ads' },
        { value: 'social', label: 'Organic Social' },
        { value: 'email', label: 'Email' },
        { value: 'affiliate', label: 'Affiliate' },
        { value: 'banner', label: 'Banner / Display' },
        { value: 'video', label: 'Video Ads' },
    ];

    return (
        <MarketingLayout title="UTM Builder">
            <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto font-sans bg-white dark:bg-gray-900 rounded-tl-3xl border-l border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
                
                <div className="flex-1 w-full p-6 md:p-8 lg:p-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{t('Campaign URL Builder')}</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
                                {t('Generate standarized UTM parameters for your advertising campaigns to track performance accurately in Google Analytics.')}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        
                        {/* Form Section */}
                        <div className="xl:col-span-1 flex flex-col gap-6">
                            
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                                <form onSubmit={submit} className="space-y-5">
                                    
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Brand (Optional)')}</label>
                                        <select
                                            value={data.marketing_brand_id}
                                            onChange={e => setData('marketing_brand_id', e.target.value)}
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all appearance-none"
                                        >
                                            <option value="">-- {t('Select Brand')} --</option>
                                            {brands.map(b => (
                                                <option key={b.id} value={b.id}>{b.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Target URL')} <span className="text-red-500">*</span></label>
                                        <input
                                            type="url"
                                            required
                                            value={data.target_url}
                                            onChange={e => setData('target_url', e.target.value)}
                                            placeholder="https://example.com/promo"
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                        />
                                        {errors.target_url && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.target_url}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Source')} <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                list="source-options"
                                                value={data.utm_source}
                                                onChange={e => setData('utm_source', e.target.value)}
                                                placeholder="google, facebook"
                                                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                            />
                                            <datalist id="source-options">
                                                {sourceOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                            </datalist>
                                            {errors.utm_source && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.utm_source}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Medium')}</label>
                                            <input
                                                type="text"
                                                list="medium-options"
                                                value={data.utm_medium}
                                                onChange={e => setData('utm_medium', e.target.value)}
                                                placeholder="cpc, banner"
                                                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                            />
                                            <datalist id="medium-options">
                                                {mediumOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                            </datalist>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Campaign Name')}</label>
                                        <input
                                            type="text"
                                            value={data.utm_campaign}
                                            onChange={e => setData('utm_campaign', e.target.value)}
                                            placeholder="summer_sale, launch_2026"
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Term')}</label>
                                            <input
                                                type="text"
                                                value={data.utm_term}
                                                onChange={e => setData('utm_term', e.target.value)}
                                                placeholder="running+shoes"
                                                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Content')}</label>
                                            <input
                                                type="text"
                                                value={data.utm_content}
                                                onChange={e => setData('utm_content', e.target.value)}
                                                placeholder="logolink, textlink"
                                                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full mt-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3.5 px-6 rounded-2xl font-bold text-sm hover:bg-black dark:hover:bg-gray-100 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        <Link2 className="w-4 h-4" />
                                        {processing ? t('Generating...') : t('Generate URL')}
                                    </button>
                                </form>
                            </div>

                            {/* Result Box */}
                            {generatedLink && (
                                <div className="bg-gray-900 dark:bg-white p-6 rounded-3xl text-white dark:text-gray-900 shadow-xl relative overflow-hidden group animate-in fade-in slide-in-from-bottom-4">
                                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 dark:bg-black/5 rounded-full blur-2xl pointer-events-none"></div>
                                    
                                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 opacity-80 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> {t('Generated Link')}
                                    </h3>
                                    
                                    <div className="bg-black/20 dark:bg-gray-100 rounded-xl p-3 mb-4 max-h-32 overflow-y-auto">
                                        <p className="text-sm font-mono break-all leading-relaxed">{generatedLink}</p>
                                    </div>
                                    
                                    <button
                                        onClick={() => handleCopy(generatedLink)}
                                        className="w-full py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Copy className="w-4 h-4" /> {t('Copy to Clipboard')}
                                    </button>
                                </div>
                            )}

                        </div>

                        {/* History Section */}
                        <div className="xl:col-span-2">
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
                                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                    <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-gray-500" />
                                        {t('Generated Links History')}
                                    </h2>
                                </div>

                                <div className="flex-1 overflow-x-auto">
                                    {history.data.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center py-20 text-center text-gray-400 dark:text-gray-500">
                                            <div className="w-16 h-16 mb-4 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-700">
                                                <Link2 className="w-8 h-8 opacity-50" />
                                            </div>
                                            <p className="text-sm font-medium">{t('No UTM links generated yet.')}</p>
                                        </div>
                                    ) : (
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                                    <th className="py-3.5 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">{t('Brand & Date')}</th>
                                                    <th className="py-3.5 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">{t('Campaign / Source')}</th>
                                                    <th className="py-3.5 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">{t('Target URL')}</th>
                                                    <th className="py-3.5 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-right whitespace-nowrap">{t('Actions')}</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                                {history.data.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors group">
                                                        <td className="py-4 px-6 align-top">
                                                            <div className="font-bold text-sm text-gray-900 dark:text-white mb-0.5">
                                                                {item.marketing_brand?.name || <span className="italic text-gray-400">{t('General')}</span>}
                                                            </div>
                                                            <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                                                                {dayjs(item.created_at).format('DD MMM YYYY, HH:mm')}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6 align-top">
                                                            <div className="flex flex-wrap gap-1.5 mb-1.5">
                                                                {item.utm_campaign && (
                                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-[10px] font-bold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 uppercase tracking-wider">
                                                                        {item.utm_campaign}
                                                                    </span>
                                                                )}
                                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 uppercase tracking-wider">
                                                                    {item.utm_source} {item.utm_medium ? `/ ${item.utm_medium}` : ''}
                                                                </span>
                                                            </div>
                                                            <div className="text-[10px] text-gray-400 flex flex-wrap gap-2">
                                                                {item.utm_term && <span>T: {item.utm_term}</span>}
                                                                {item.utm_content && <span>C: {item.utm_content}</span>}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6 align-top max-w-[200px]">
                                                            <div className="truncate text-xs text-gray-500 dark:text-gray-400 font-medium" title={item.target_url}>
                                                                {item.target_url}
                                                            </div>
                                                            <div className="mt-1 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <a href={item.generated_url} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-blue-500 hover:underline inline-flex items-center gap-1">
                                                                    {t('Test Link')} <ArrowRight className="w-3 h-3" />
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6 align-top text-right">
                                                            <div className="flex justify-end gap-1.5">
                                                                <button
                                                                    onClick={() => handleCopy(item.generated_url, item.id)}
                                                                    className={`p-2 rounded-lg border transition-all ${
                                                                        copiedId === item.id 
                                                                        ? 'bg-green-50 border-green-200 text-green-600 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
                                                                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                                                                    }`}
                                                                    title="Copy URL"
                                                                >
                                                                    {copiedId === item.id ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(item.id)}
                                                                    className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                                
                                {history.data.length > 0 && history.links && (
                                    <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-center bg-gray-50/30 dark:bg-gray-800/30">
                                        <div className="flex gap-1">
                                            {history.links.map((link, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={link.url || '#'}
                                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                                                        link.active 
                                                        ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white' 
                                                        : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-800'
                                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}
