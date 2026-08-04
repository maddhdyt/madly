import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Head, router, useForm } from '@inertiajs/react';
import MarketingLayout from '../../../Layouts/MarketingLayout';
import useTranslations from '../../../Hooks/useTranslations';
import { LineChart, Plus, X, Edit, Trash2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/id'; // Assuming Indonesian locale is available or default

export default function RevenueLogs({ logs, copyToClipboard, showToast }) {
    const { t } = useTranslations();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLog, setEditingLog] = useState(null);

    const form = useForm({
        date: dayjs().format('YYYY-MM-DD'),
        revenue_amount: '',
        trend: 'stable', // up, down, stable
        reason: ''
    });

    const openModal = (log = null) => {
        setEditingLog(log);
        if (log) {
            form.setData({
                date: dayjs(log.date).format('YYYY-MM-DD'),
                revenue_amount: log.revenue_amount || '',
                trend: log.trend,
                reason: log.reason || ''
            });
        } else {
            form.reset();
        }
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingLog) {
            form.put(route('marketing.revenue-logs.update', editingLog.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    showToast(t('Log updated!'), 'success');
                }
            });
        } else {
            form.post(route('marketing.revenue-logs.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    showToast(t('Log created!'), 'success');
                }
            });
        }
    };

    const deleteLog = (id) => {
        if (confirm(t('Delete this log?'))) {
            router.delete(route('marketing.revenue-logs.destroy', id), {
                onSuccess: () => showToast(t('Log deleted!'), 'success')
            });
        }
    };

    const TrendIcon = ({ trend, className }) => {
        if (trend === 'up') return <TrendingUp className={`text-green-500 ${className}`} />;
        if (trend === 'down') return <TrendingDown className={`text-red-500 ${className}`} />;
        return <Minus className={`text-gray-400 ${className}`} />;
    };

    const getTrendBg = (trend) => {
        if (trend === 'up') return 'bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-800/30';
        if (trend === 'down') return 'bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-800/30';
        return 'bg-gray-50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800';
    };

    return (
        <MarketingLayout title={t('Revenue Fluctuation Log')}>
            <Head title={t('Revenue Fluctuation Log')} />
            
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <LineChart className="w-8 h-8 text-orange-500" />
                            {t('Revenue Fluctuation Log')}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            {t('Manually track revenue anomalies, stagnations, and their underlying reasons.')}
                        </p>
                    </div>
                    <button onClick={() => openModal()} className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4"/> {t('Add Log Entry')}
                    </button>
                </div>

                <div className="space-y-4">
                    {logs.map(log => (
                        <div key={log.id} className={`flex flex-col sm:flex-row gap-4 p-5 rounded-3xl border transition-all hover:shadow-md ${getTrendBg(log.trend)}`}>
                            <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
                                <TrendIcon trend={log.trend} className="w-7 h-7" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                            {dayjs(log.date).format('DD MMMM YYYY')}
                                        </h3>
                                        {log.revenue_amount && (
                                            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                                Rp {new Intl.NumberFormat('id-ID').format(log.revenue_amount)}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => openModal(log)} className="p-2 text-gray-400 hover:text-blue-500 rounded-full transition-colors"><Edit className="w-4 h-4"/></button>
                                        <button onClick={() => deleteLog(log.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-full transition-colors"><Trash2 className="w-4 h-4"/></button>
                                    </div>
                                </div>
                                <div className="mt-2 text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                                    <span className="font-bold text-xs uppercase tracking-wider text-gray-500 block mb-1">{t('Analysis / Reason')}</span>
                                    {log.reason}
                                </div>
                            </div>
                        </div>
                    ))}
                    {logs.length === 0 && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-12 text-center border border-dashed border-gray-200 dark:border-gray-700">
                            <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('No Logs Available')}</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">{t('Start logging significant revenue drops or spikes to identify patterns in your marketing.')}</p>
                            <button onClick={() => openModal()} className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                                <Plus className="w-4 h-4"/> {t('Add First Log')}
                            </button>
                        </div>
                    )}
                </div>

                {isModalOpen && typeof document !== 'undefined' && createPortal(
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingLog ? t('Edit Log Entry') : t('Add Log Entry')}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5"/></button>
                            </div>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Date')}</label>
                                        <input type="date" required value={form.data.date} onChange={e => form.setData('date', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Trend')}</label>
                                        <div className="flex bg-gray-50 dark:bg-gray-800 rounded-2xl p-1 border border-gray-200 dark:border-gray-700">
                                            <button type="button" onClick={() => form.setData('trend', 'up')} className={`flex-1 flex justify-center items-center py-2 rounded-xl transition-colors ${form.data.trend === 'up' ? 'bg-white dark:bg-gray-900 shadow-sm text-green-500' : 'text-gray-400 hover:text-gray-600'}`}>
                                                <TrendingUp className="w-4 h-4"/>
                                            </button>
                                            <button type="button" onClick={() => form.setData('trend', 'stable')} className={`flex-1 flex justify-center items-center py-2 rounded-xl transition-colors ${form.data.trend === 'stable' ? 'bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-white' : 'text-gray-400 hover:text-gray-600'}`}>
                                                <Minus className="w-4 h-4"/>
                                            </button>
                                            <button type="button" onClick={() => form.setData('trend', 'down')} className={`flex-1 flex justify-center items-center py-2 rounded-xl transition-colors ${form.data.trend === 'down' ? 'bg-white dark:bg-gray-900 shadow-sm text-red-500' : 'text-gray-400 hover:text-gray-600'}`}>
                                                <TrendingDown className="w-4 h-4"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Revenue Amount (Optional)')}</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3.5 text-gray-400 text-sm font-semibold">Rp</span>
                                        <input type="number" placeholder="0" value={form.data.revenue_amount} onChange={e => form.setData('revenue_amount', e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Reason / Analysis')}</label>
                                    <textarea required placeholder="Why did revenue go up/down? e.g. Meta Ads algorithm update, End of month payday, etc." value={form.data.reason} onChange={e => form.setData('reason', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white h-32 leading-relaxed" />
                                </div>
                                
                                <button type="submit" disabled={form.processing} className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors mt-4">
                                    {form.processing ? t('Saving...') : (editingLog ? t('Update Log') : t('Save Log'))}
                                </button>
                            </form>
                        </div>
                    </div>, document.body
                )}
            </div>
        </MarketingLayout>
    );
}
