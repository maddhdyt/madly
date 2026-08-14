import React from 'react';
import AccountingLayout from '../../../Layouts/AccountingLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Copy, CalendarDays, TrendingUp, ArrowDownRight, Wallet, User, FileText } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';

export default function Show({ closing }) {
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
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const copyReport = async () => {
        let report = `LAPORAN HARIAN — ${formatDate(closing.closing_date)}\n\n`;

        if (closing.items && closing.items.length > 0) {
            const revenueItems = closing.items.filter(item => item.item_type === 'revenue');
            const expenseItems = closing.items.filter(item => item.item_type === 'expense');

            revenueItems.forEach(item => {
                report += `Penerimaan: ${item.label} - ${formatIDR(item.amount)}\n`;
            });

            report += '\n';

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

        await navigator.clipboard.writeText(report);
    };

    return (
        <AccountingLayout title={t('Daily Closing Report')}>
            <Head title={t('Daily Closing Report')} />

            <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <Link href={route('accounting.reports.index')} className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                            {t('Daily Closing Report')}
                        </h1>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {formatDate(closing.closing_date)}
                        </p>
                    </div>
                </div>

                <button onClick={copyReport} className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-bold transition-all shadow-sm">
                    <Copy className="w-4 h-4" />
                    {t('Copy Report')}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {[
                    { label: t('Revenue (A)'), value: formatIDR(closing.total_revenue), icon: TrendingUp },
                    { label: t('Expense (B)'), value: formatIDR(closing.total_expense), icon: ArrowDownRight },
                    { label: t('Settlement'), value: formatIDR(closing.daily_settlement), icon: Wallet },
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

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            {t('Report Items')}
                        </h2>
                    </div>
                    <div className="p-6 space-y-3">
                        {closing.items && closing.items.length > 0 ? (
                            closing.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/30 px-5 py-4">
                                    <div>
                                        <div className="font-bold text-gray-900 dark:text-white">{item.label}</div>
                                        <div className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{item.item_type}</div>
                                    </div>
                                    <div className="font-black text-gray-900 dark:text-white">{formatIDR(item.amount)}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-500 dark:text-gray-400">{t('No report items available for this closing.')}</div>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-gray-500" />
                            {t('Closing Info')}
                        </h2>
                    </div>
                    <div className="p-6 space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                            <User className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                                <div className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t('Closed By')}</div>
                                <div className="font-bold text-gray-900 dark:text-white">{closing.closed_by?.name || (typeof closing.closed_by === 'object' ? '—' : closing.closed_by) || '—'}</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">{t('Notes')}</div>
                            <div className="text-gray-700 dark:text-gray-300">{closing.notes || '—'}</div>
                        </div>
                        <div>
                            <div className="text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">{t('Status')}</div>
                            <div className="inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
                                {closing.status}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AccountingLayout>
    );
}