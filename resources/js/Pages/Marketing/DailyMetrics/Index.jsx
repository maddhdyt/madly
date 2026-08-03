import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import MarketingLayout from '../../../Layouts/MarketingLayout';
import useTranslations from '../../../Hooks/useTranslations';
import { TrendingUp, Plus, Calendar, DollarSign, MousePointerClick, Target, Save, CheckCircle2, XCircle } from 'lucide-react';
import dayjs from 'dayjs';

export default function DailyMetricsIndex({ brands, metrics }) {
    const { t } = useTranslations();

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        marketing_brand_id: brands[0]?.id || '',
        date: dayjs().format('YYYY-MM-DD'),
        ad_spend: '',
        clicks: '',
        leads: '',
        revenue: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('marketing.daily-metrics.store'), {
            onSuccess: () => {
                reset('ad_spend', 'clicks', 'leads', 'revenue');
            }
        });
    };

    const handleNumberChange = (field, value) => {
        const numericValue = parseInt(value.replace(/\D/g, ''), 10);
        setData(field, isNaN(numericValue) ? '' : numericValue);
    };

    const formatInputNumber = (val) => {
        if (val === '' || val === null || val === undefined) return '';
        return new Intl.NumberFormat('id-ID').format(val);
    };

    const handleDelete = (id) => {
        if (confirm(t('Are you sure you want to delete this metric?'))) {
            router.delete(route('marketing.daily-metrics.destroy', id));
        }
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <MarketingLayout title="Daily Metrics">
            <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto font-sans bg-white dark:bg-gray-900 rounded-tl-3xl border-l border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
                
                <div className="flex-1 w-full p-6 md:p-8 lg:p-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{t('Daily Advertising Metrics')}</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
                                {t('Log your daily campaign performance. This data will be automatically visualized on your Marketing Dashboard.')}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                        
                        {/* Input Form Section */}
                        <div className="xl:col-span-4 flex flex-col gap-6">
                            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" /> {t('Log Performance')}
                                </h3>

                                <div className="space-y-4">
                                    {/* Brand Selection */}
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Select Brand')}</label>
                                        <select
                                            value={data.marketing_brand_id}
                                            onChange={e => setData('marketing_brand_id', e.target.value)}
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all appearance-none"
                                            required
                                        >
                                            <option value="" disabled>{t('-- Select a Brand --')}</option>
                                            {brands.map(brand => (
                                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                                            ))}
                                        </select>
                                        {errors.marketing_brand_id && <p className="text-red-500 text-xs mt-1">{errors.marketing_brand_id}</p>}
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Date')}</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="date"
                                                value={data.date}
                                                onChange={e => setData('date', e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                                required
                                            />
                                        </div>
                                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                                    </div>

                                    {/* Ad Spend */}
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Ad Spend')}</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rp</span>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={formatInputNumber(data.ad_spend)}
                                                onChange={e => handleNumberChange('ad_spend', e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                        {errors.ad_spend && <p className="text-red-500 text-xs mt-1">{errors.ad_spend}</p>}
                                    </div>

                                    {/* Clicks & Leads */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Clicks')}</label>
                                            <div className="relative">
                                                <MousePointerClick className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="number"
                                                    value={data.clicks}
                                                    onChange={e => setData('clicks', e.target.value)}
                                                    className="w-full pl-9 pr-3 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                                    placeholder="0"
                                                    required
                                                />
                                            </div>
                                            {errors.clicks && <p className="text-red-500 text-xs mt-1">{errors.clicks}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Leads / Sales')}</label>
                                            <div className="relative">
                                                <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="number"
                                                    value={data.leads}
                                                    onChange={e => setData('leads', e.target.value)}
                                                    className="w-full pl-9 pr-3 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                                    placeholder="0"
                                                    required
                                                />
                                            </div>
                                            {errors.leads && <p className="text-red-500 text-xs mt-1">{errors.leads}</p>}
                                        </div>
                                    </div>

                                    {/* Revenue */}
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Total Revenue')}</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={formatInputNumber(data.revenue)}
                                                onChange={e => handleNumberChange('revenue', e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-900 text-sm font-bold text-green-900 dark:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                        {errors.revenue && <p className="text-red-500 text-xs mt-1">{errors.revenue}</p>}
                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-sm disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    {processing ? t('Saving...') : t('Save Metric')}
                                </button>
                                <p className="text-center text-[10px] text-gray-400 mt-3">
                                    {t('Saving again on the same date will overwrite the previous record.')}
                                </p>
                            </form>
                        </div>

                        {/* Recent Metrics Table */}
                        <div className="xl:col-span-8">
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm overflow-hidden">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">{t('Recent Performance Logs')}</h3>
                                
                                {metrics.length === 0 ? (
                                    <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                                        <TrendingUp className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('No daily metrics recorded yet.')}</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">{t('Date')}</th>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">{t('Brand')}</th>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 text-right">{t('Spend')}</th>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 text-right">{t('Revenue')}</th>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 text-center">{t('ROAS')}</th>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 text-right">{t('Actions')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {metrics.map(metric => {
                                                    const roas = metric.ad_spend > 0 ? (metric.revenue / metric.ad_spend).toFixed(2) : 0;
                                                    const isProfitable = roas >= 2; // Assuming 2 is decent BEP for visual purposes
                                                    
                                                    return (
                                                        <tr key={metric.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                                            <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                                {dayjs(metric.date).format('MMM D, YYYY')}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-white">
                                                                {metric.marketing_brand?.name || '-'}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-500 font-medium text-right">
                                                                {formatCurrency(metric.ad_spend)}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm font-bold text-green-600 dark:text-green-400 text-right">
                                                                {formatCurrency(metric.revenue)}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                                                                    isProfitable 
                                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                                                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                                }`}>
                                                                    {roas}x
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3 text-right">
                                                                <button 
                                                                    onClick={() => handleDelete(metric.id)}
                                                                    className="text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 p-1"
                                                                >
                                                                    <XCircle className="w-4 h-4" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
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
