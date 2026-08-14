import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Play, Calendar, FileText, AlertCircle } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import dayjs from 'dayjs';

export default function PeriodClosingFormSlideOver({ isOpen, onClose }) {
    const { t } = useTranslations();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        period_name: '',
        period_start: '',
        period_end: '',
        notes: '',
    });

    useEffect(() => {
        if (isOpen) {
            reset();
            clearErrors();
            
            // Suggest default dates (e.g. past 30 days)
            const end = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
            const start = dayjs().subtract(30, 'day').format('YYYY-MM-DD');
            
            setData({
                period_name: `Period ${dayjs(start).format('MMM YYYY')}`,
                period_start: start,
                period_end: end,
                notes: '',
            });
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('accounting.period-closings.store'), {
            onSuccess: () => {
                onClose();
                reset();
            },
            preserveScroll: true
        });
    };

    const labelClass = "block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 ml-1";
    const inputClass = "w-full bg-[#f4f5f5] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:bg-white dark:focus:bg-gray-800 transition-all";

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity animate-fade-in" 
                onClick={onClose}
            ></div>
            
            {/* Panel */}
            <div className="relative w-full max-w-sm md:max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-full animate-slide-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Play className="w-5 h-5 text-gray-900 dark:text-white" fill="currentColor" />
                            {t('Run Period Closing')}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {t('Calculate distribution for a selected date range')}
                        </p>
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
                    <form id="period-closing-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="p-4 bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl flex gap-3">
                            <AlertCircle className="w-5 h-5 text-gray-900 dark:text-white shrink-0 mt-0.5" />
                            <div className="text-sm text-gray-800 dark:text-gray-200">
                                <strong>{t('Warning')}:</strong> {t('Running a period closing will lock the daily settlements in this date range and distribute the profits according to the active profit sharing scheme. This action is final.')}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className={labelClass}>
                                        <FileText className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Period Name')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.period_name}
                                        onChange={e => setData('period_name', e.target.value)}
                                        className={inputClass}
                                    />
                                    {errors.period_name && <p className="text-red-500 text-xs mt-1">{errors.period_name}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            <Calendar className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                            {t('Start Date')} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={data.period_start}
                                            onChange={e => setData('period_start', e.target.value)}
                                            className={inputClass}
                                        />
                                        {errors.period_start && <p className="text-red-500 text-xs mt-1">{errors.period_start}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            <Calendar className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                            {t('End Date')} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={data.period_end}
                                            onChange={e => setData('period_end', e.target.value)}
                                            className={inputClass}
                                        />
                                        {errors.period_end && <p className="text-red-500 text-xs mt-1">{errors.period_end}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <FileText className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Notes (Optional)')}
                                    </label>
                                    <textarea
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                        className={`${inputClass} min-h-[100px] resize-y`}
                                        placeholder={t('Add any specific notes for this period...')}
                                    />
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
                        className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        {t('Cancel')}
                    </button>
                    <button
                        type="submit"
                        form="period-closing-form"
                        disabled={processing}
                        className="px-8 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm disabled:opacity-70 transition-colors"
                    >
                        <Play className="w-4 h-4" fill="currentColor" />
                        {processing ? t('Processing...') : t('Run & Distribute Profit')}
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
