import React from 'react';
import AccountingLayout from '../../../Layouts/AccountingLayout';
import { Head, Link } from '@inertiajs/react';
import { CalendarRange, Copy, FileText, TrendingUp, ArrowDownRight, Wallet, Eye } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';

export default function Index({ closings = [], summary = {} }) {
    const { t } = useTranslations();

    const formatIDR = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value || 0);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const generateReport = (closing) => {
        let report = `LAPORAN HARIAN — ${formatDate(closing.closing_date)}\n\n`;

        if (closing.items && closing.items.length > 0) {
            const revenueItems = closing.items.filter(item => item.item_type === 'revenue');
            const expenseItems = closing.items.filter(item => item.item_type === 'expense');

            revenueItems.forEach(item => {
                report += `Penerimaan: ${item.label} - ${formatIDR(item.amount)}\n`;
            });

            expenseItems.forEach(item => {
                report += `Pengeluaran: ${item.label} - ${formatIDR(item.amount)}\n`;
            });
        } else {
            report += `Total Penerimaan: ${formatIDR(closing.total_revenue)}\n`;
            report += `Total Pengeluaran: ${formatIDR(closing.total_expense)}\n`;
        }

        report += `\nJumlah Setoran Harian: ${formatIDR(closing.daily_settlement)}`;

        if (closing.notes) {
            report += `\nCatatan: ${closing.notes}`;
        }

        return report;
    };

    const copyReport = async (closing) => {
        await navigator.clipboard.writeText(generateReport(closing));
    };

    return (
        <AccountingLayout title={t('Reports')}>
            <Head title={t('Reports')} />



            <div className="flex flex-col h-full w-full bg-[#f8f9fa] dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-300 relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 gap-4 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {t('Reports')}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {t('Daily closing snapshots and ready-to-copy financial reports.')}
                        </p>
                    </div>
                </div>

            <div className="flex-1 overflow-y-auto bg-[#f8f9fa] dark:bg-[#0a0a0a] p-8 space-y-8">
                <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl px-4 py-3 shadow-sm w-max">
                    <CalendarRange className="w-5 h-5 text-gray-500" />
                    <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{t('Current Period')}</div>
                        <div className="font-black text-gray-900 dark:text-white">{summary.period_label}</div>
                    </div>
                </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                {[
                    { label: t('Total Closings'), value: summary.total_closings || 0, icon: FileText },
                    { label: t('Period Revenue'), value: formatIDR(summary.period_total_revenue || 0), icon: TrendingUp },
                    { label: t('Period Expense'), value: formatIDR(summary.period_total_expense || 0), icon: ArrowDownRight },
                    { label: t('Period Settlement'), value: formatIDR(summary.period_total_settlement || 0), icon: Wallet },
                ].map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-4 text-gray-500">
                            <item.icon className="w-5 h-5" />
                        </div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">{item.label}</div>
                        <div className="text-2xl font-black text-gray-900 dark:text-white break-words">{item.value}</div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <h2 className="font-bold text-gray-900 dark:text-white">{t('Closing Report List')}</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-500 text-[11px] uppercase tracking-widest font-extrabold border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
                            <tr>
                                <th className="px-8 py-4">{t('Date')}</th>
                                <th className="px-8 py-4 text-right">{t('Revenue')}</th>
                                <th className="px-8 py-4 text-right">{t('Expense')}</th>
                                <th className="px-8 py-4 text-right">{t('Settlement')}</th>
                                <th className="px-8 py-4">{t('Closed By')}</th>
                                <th className="px-8 py-4 text-right">{t('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                            {closings.map((closing) => (
                                <tr key={closing.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-8 py-4 font-bold text-gray-900 dark:text-white">
                                        {formatDate(closing.closing_date)}
                                    </td>
                                    <td className="px-8 py-4 text-right text-gray-900 dark:text-white font-bold">{formatIDR(closing.total_revenue)}</td>
                                    <td className="px-8 py-4 text-right text-gray-900 dark:text-white font-bold">{formatIDR(closing.total_expense)}</td>
                                    <td className="px-8 py-4 text-right font-black text-gray-900 dark:text-white">{formatIDR(closing.daily_settlement)}</td>
                                    <td className="px-8 py-4 text-gray-600 dark:text-gray-400">{closing.closed_by?.name || (typeof closing.closed_by === 'object' ? '—' : closing.closed_by) || '—'}</td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => copyReport(closing)} className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors" title={t('Copy Report')}>
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <Link href={route('accounting.closing.show', closing.id)} className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" title={t('View Detail')}>
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {closings.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-8 py-12 text-center text-gray-500 dark:text-gray-400">
                                        {t('No closing reports found.')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
            </div>
        </AccountingLayout>
    );
}