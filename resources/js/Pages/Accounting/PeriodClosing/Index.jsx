import React, { useState } from 'react';
import AccountingLayout from '../../../Layouts/AccountingLayout';
import { Head, Link } from '@inertiajs/react';
import { Play, Calendar, FileText, CheckCircle2, Search, ArrowRight, DollarSign } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import PeriodClosingFormSlideOver from './PeriodClosingFormSlideOver';
import dayjs from 'dayjs';

export default function Index({ periodClosings = [] }) {
    const { t } = useTranslations();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);

    const filteredClosings = periodClosings.filter(c => 
        c.period_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dayjs(c.period_start).format('DD MMM YYYY').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <AccountingLayout title={t('Period Closings')}>
            <Head title={t('Period Closings')} />

            <div className="flex flex-col h-full w-full bg-[#f8f9fa] dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-300 relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 gap-4 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {t('Period Closings')}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {t('Accumulate daily settlements and distribute profit.')}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 mt-4 sm:mt-0">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t('Search periods...')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-all dark:text-white"
                            />
                        </div>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-bold shadow-sm hover:bg-black dark:hover:bg-gray-200 transition-colors whitespace-nowrap"
                        >
                            <Play className="w-4 h-4" fill="currentColor" />
                            <span className="hidden sm:inline">{t('Run Period Closing')}</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto bg-white dark:bg-gray-900">

                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    <thead className="bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-500 text-[11px] uppercase tracking-widest font-extrabold border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
                        <tr>
                                <th className="px-8 py-4">{t('Period Name')}</th>
                                <th className="px-8 py-4">{t('Date Range')}</th>
                                <th className="px-8 py-4 text-right">{t('Total Settlement')}</th>
                                <th className="px-8 py-4">{t('Status')}</th>
                                <th className="px-8 py-4 text-right">{t('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                            {filteredClosings.length > 0 ? (
                                filteredClosings.map((closing) => (
                                    <tr key={closing.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white">
                                                    <Calendar className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 dark:text-white">{closing.period_name}</div>
                                                    <div className="text-xs text-gray-500">{t('Closed By')}: {closing.closer?.name || '-'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                {dayjs(closing.period_start).format('DD MMM YYYY')}
                                                <ArrowRight className="w-3 h-3 text-gray-400" />
                                                {dayjs(closing.period_end).format('DD MMM YYYY')}
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                                {formatCurrency(closing.total_daily_settlements)}
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                {t('Closed')}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <Link
                                                href={route('accounting.period-closings.show', closing.id)}
                                                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm font-semibold transition-colors"
                                            >
                                                <FileText className="w-4 h-4" />
                                                {t('View Report')}
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-col items-center justify-center">
                                            <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4" />
                                            <p className="text-lg font-medium">{t('No period closings found')}</p>
                                            <p className="text-sm">{t('Run your first period closing to distribute profit.')}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                </table>
            </div>

            <PeriodClosingFormSlideOver
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
            />
        </div>
        </AccountingLayout>
    );
}
