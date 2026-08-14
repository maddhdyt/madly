import React from 'react';
import AccountingLayout from '../../../Layouts/AccountingLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, FileText, CheckCircle2, TrendingUp, Users, Network } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import dayjs from 'dayjs';

export default function Show({ periodClosing }) {
    const { t } = useTranslations();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <AccountingLayout title={`${t('Period Closing')}: ${periodClosing.period_name}`}>
            <Head title={`${t('Period Closing')}: ${periodClosing.period_name}`} />

            <div className="mb-6">
                <Link
                    href={route('accounting.period-closings.index')}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('Back to Period Closings')}
                </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                            {periodClosing.period_name}
                        </h1>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
                            <CheckCircle2 className="w-4 h-4" />
                            {t('Closed')}
                        </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {dayjs(periodClosing.period_start).format('DD MMM YYYY')} - {dayjs(periodClosing.period_end).format('DD MMM YYYY')}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                    <div className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                        {t('Total Revenue')}
                    </div>
                    <div className="text-3xl font-black text-gray-900 dark:text-white">
                        {formatCurrency(periodClosing.total_revenue)}
                    </div>
                </div>
                <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                    <div className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                        {t('Total Expense')}
                    </div>
                    <div className="text-3xl font-black text-gray-900 dark:text-white">
                        {formatCurrency(periodClosing.total_expense)}
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                    <div className="text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wider flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        {t('Total Distributable Profit')}
                    </div>
                    <div className="text-3xl font-black text-gray-900 dark:text-white">
                        {formatCurrency(periodClosing.total_daily_settlements)}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Distributions */}
                <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Network className="w-5 h-5 text-gray-900 dark:text-white" />
                            {t('Profit Distribution')}
                        </h2>
                    </div>
                    <div className="p-6 flex-1 bg-gray-50/50 dark:bg-gray-900/30">
                        {periodClosing.distributions?.length > 0 ? (
                            <div className="space-y-4">
                                {periodClosing.distributions.map(dist => (
                                    <div key={dist.id} className="flex items-center justify-between p-4 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 dark:text-white">
                                                    {dist.participant?.name || 'Unknown'}
                                                </div>
                                                <div className="text-xs text-gray-500 font-medium mt-0.5">
                                                    {dist.scheme?.scheme_name || 'Legacy Scheme'} &bull; {Number(dist.share_percentage)}%
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-black text-gray-900 dark:text-white">
                                                {formatCurrency(dist.distributed_amount)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center py-12 text-gray-500">
                                <Network className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4" />
                                <p>{t('No distributions found for this period.')}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Daily Closings Included */}
                <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            {t('Included Daily Closings')}
                        </h2>
                    </div>
                    <div className="overflow-y-auto max-h-[500px]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 sticky top-0">
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('Date')}</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">{t('Settlement')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {periodClosing.items?.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                        <td className="px-6 py-3">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {dayjs(item.closing_date).format('DD MMM YYYY')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-right">
                                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                                {formatCurrency(item.daily_settlement)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AccountingLayout>
    );
}
