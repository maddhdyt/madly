import React, { useState } from 'react';
import AccountingLayout from '../../../Layouts/AccountingLayout';
import { Head, Link } from '@inertiajs/react';
import { LockKeyhole, TrendingUp, ArrowDownRight, Wallet, CheckCircle2, Clock, AlertTriangle, Copy, Eye } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import ConfirmModal from '../../../Components/ConfirmModal';
import { router } from '@inertiajs/react';

export default function Index({ closings = [], todayPreview = {} }) {
    const { t } = useTranslations();
    const [closeModalOpen, setCloseModalOpen] = useState(false);
    const [closingNotes, setClosingNotes] = useState('');
    const [copied, setCopied] = useState(false);

    const formatIDR = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value || 0);
    const formatDate = (ds) => {
        if (!ds) return '';
        return new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(ds));
    };
    const formatShortDate = (ds) => {
        if (!ds) return '';
        return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(ds));
    };

    const handleCloseDay = () => {
        router.post(route('accounting.closing.store'), {
            closing_date: todayPreview.date,
            notes: closingNotes,
        }, {
            onSuccess: () => { setCloseModalOpen(false); setClosingNotes(''); },
        });
    };

    const generateReport = (closing) => {
        if (!closing) return '';
        let report = `📊 LAPORAN HARIAN — ${formatDate(closing.closing_date)}\n\n`;
        if (closing.items && closing.items.length > 0) {
            const revenueItems = closing.items.filter(i => i.item_type === 'revenue');
            const expenseItems = closing.items.filter(i => i.item_type === 'expense');
            revenueItems.forEach(item => { report += `✅ ${item.label}: ${formatIDR(item.amount)}\n`; });
            report += '\n';
            expenseItems.forEach(item => { report += `📤 ${item.label}: ${formatIDR(item.amount)}\n`; });
        } else {
            report += `✅ Total Penerimaan: ${formatIDR(closing.total_revenue)}\n`;
            report += `📤 Total Pengeluaran: ${formatIDR(closing.total_expense)}\n`;
        }
        report += `\n💰 Jumlah Setoran Harian: ${formatIDR(closing.daily_settlement)}\n`;
        if (closing.notes) report += `\n📝 Catatan: ${closing.notes}`;
        return report;
    };

    const copyReport = (closing) => {
        navigator.clipboard.writeText(generateReport(closing));
        setCopied(closing.id);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AccountingLayout title={t('Daily Closing')}>
            <Head title={t('Daily Closing')} />

            <div className="flex flex-col h-full w-full bg-[#f8f9fa] dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-300 relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 gap-4 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {t('Daily Closing')}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {t('Lock daily transactions and generate settlement reports.')}
                        </p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-[#f8f9fa] dark:bg-black p-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                        <Clock className="w-5 h-5 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900 dark:text-white">{t('Today\'s Preview')}</h2>
                        <p className="text-xs text-gray-500">{formatDate(todayPreview.date)}</p>
                    </div>
                    {todayPreview.alreadyClosed && (
                        <span className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4" /> {t('Already Closed')}
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-gray-900 dark:text-white" />
                        </div>
                        <div>
                            <span className="text-[11px] font-bold text-gray-400 uppercase">{t('Revenue (A)')}</span>
                            <div className="font-black text-gray-900 dark:text-white text-lg">{formatIDR(todayPreview.revenue)}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <ArrowDownRight className="w-5 h-5 text-gray-900 dark:text-white" />
                        </div>
                        <div>
                            <span className="text-[11px] font-bold text-gray-400 uppercase">{t('Expense (B)')}</span>
                            <div className="font-black text-gray-900 dark:text-white text-lg">{formatIDR(todayPreview.expense)}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-gray-900 dark:text-white" />
                        </div>
                        <div>
                            <span className="text-[11px] font-bold text-gray-400 uppercase">{t('Settlement (A-B)')}</span>
                            <div className={`font-black text-lg ${todayPreview.settlement >= 0 ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
                                {formatIDR(todayPreview.settlement)}
                            </div>
                        </div>
                    </div>
                </div>

                {!todayPreview.alreadyClosed && (
                    <button onClick={() => setCloseModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-xl text-sm font-bold transition-all shadow-sm">
                        <LockKeyhole className="w-4 h-4" />
                        {t('Close Today')}
                    </button>
                )}
            </div>

            {/* Closing History */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="font-bold text-gray-900 dark:text-white">{t('Closing History')}</h2>
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
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-gray-900 dark:text-white" />
                                            <span className="font-bold text-gray-900 dark:text-white">{formatShortDate(closing.closing_date)}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-right text-gray-900 dark:text-white font-bold">{formatIDR(closing.total_revenue)}</td>
                                    <td className="px-8 py-4 text-right text-gray-900 dark:text-white font-bold">{formatIDR(closing.total_expense)}</td>
                                    <td className="px-8 py-4 text-right">
                                        <span className={`font-black ${closing.daily_settlement >= 0 ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
                                            {formatIDR(closing.daily_settlement)}
                                        </span>
                                    </td>
                                    <td className="px-8 py-4 text-gray-600 dark:text-gray-400">
                                        {closing.closed_by?.name || (typeof closing.closed_by === 'object' ? '—' : closing.closed_by) || '—'}
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => copyReport(closing)}
                                                className={`p-1.5 rounded-lg transition-colors ${copied === closing.id ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
                                                title={t('Copy Report')}>
                                                {copied === closing.id ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {closings.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-8 py-12 text-center text-gray-500 dark:text-gray-400">
                                        {t('No closings yet. Complete your first daily closing.')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            </div>

            {/* Close Day Modal */}
            {closeModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/30 dark:bg-black/50 backdrop-blur-sm" onClick={() => setCloseModalOpen(false)}></div>
                    <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                                <AlertTriangle className="w-6 h-6 text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('Confirm Daily Closing')}</h3>
                                <p className="text-sm text-gray-500">{formatDate(todayPreview.date)}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">{t('Penerimaan (A)')}</span>
                                <span className="font-bold text-gray-900 dark:text-white">{formatIDR(todayPreview.revenue)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">{t('Pengeluaran (B)')}</span>
                                <span className="font-bold text-gray-900 dark:text-white">{formatIDR(todayPreview.expense)}</span>
                            </div>
                            <div className="flex justify-between text-sm font-black pt-2 border-t border-gray-200 dark:border-gray-700">
                                <span className="text-gray-900 dark:text-white">{t('Jumlah Setoran (A-B)')}</span>
                                <span className="text-gray-900 dark:text-white">{formatIDR(todayPreview.settlement)}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">{t('Notes (Optional)')}</label>
                            <textarea value={closingNotes} onChange={e => setClosingNotes(e.target.value)} rows={2}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all resize-none"
                                placeholder={t('Add notes for this closing...')}></textarea>
                        </div>

                        <p className="text-xs text-gray-900 dark:text-white font-medium mb-4">
                            ⚠️ {t('Once closed, this day\'s transactions will be locked and cannot be modified.')}
                        </p>

                        <div className="flex gap-3">
                            <button onClick={() => setCloseModalOpen(false)}
                                className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-xl border border-gray-200 dark:border-gray-700">
                                {t('Cancel')}
                            </button>
                            <button onClick={handleCloseDay}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-xl text-sm font-bold transition-all">
                                <LockKeyhole className="w-4 h-4" />
                                {t('Close & Lock')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AccountingLayout>
    );
}
