import React from 'react';
import AccountingLayout from '../../Layouts/AccountingLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { TrendingUp, ArrowDownRight, Wallet, Activity, ArrowRight, FileText, PiggyBank, ArrowRightLeft, LockKeyhole } from 'lucide-react';
import useTranslations from '../../Hooks/useTranslations';

export default function Dashboard({ metrics }) {
    const { t } = useTranslations();
    const { auth } = usePage().props;
    const user = auth?.user?.name || 'Admin';
    
    const safeMetrics = {
        todayRevenue: metrics?.todayRevenue || 0,
        todayExpense: metrics?.todayExpense || 0,
        todaySettlement: metrics?.todaySettlement || 0,
        activeProjects: metrics?.activeProjects || 0,
    };

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const hour = new Date().getHours();
    const greeting = hour < 12 ? t('Good morning') : hour < 18 ? t('Good afternoon') : t('Good evening');

    return (
        <AccountingLayout title={t('Accounting Dashboard')}>
            <Head title={t('Accounting Dashboard')} />

            <div className="flex flex-col font-sans bg-white dark:bg-gray-900 min-h-[calc(100vh-80px)] rounded-tl-3xl border-l border-t border-gray-100 dark:border-gray-800 overflow-y-auto transition-colors duration-300">
                <div className="w-full p-6 md:p-8 lg:p-10 space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{greeting}, {user}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                                {t('Pusat komando untuk pencatatan revenue, expense, dan closing harian.')}
                            </p>
                        </div>
                        <Link href={route('accounting.closing.index')} className="shrink-0 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            {t('Daily Closing')}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { label: t('Penerimaan (A)'), value: formatIDR(safeMetrics.todayRevenue), icon: TrendingUp, trend: t('Today') },
                            { label: t('Pengeluaran (B)'), value: formatIDR(safeMetrics.todayExpense), icon: ArrowDownRight, trend: t('Today') },
                            { label: t('Jumlah Setoran (A-B)'), value: formatIDR(safeMetrics.todaySettlement), icon: Wallet, trend: t('Today') },
                            { label: t('Active Projects'), value: String(safeMetrics.activeProjects), icon: Activity, trend: t('Status') },
                        ].map((stat, index) => (
                            <div key={index} className="relative bg-white dark:bg-gray-900 px-6 py-6 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.02)] transition-all duration-300 overflow-hidden group">
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-100 dark:bg-gray-800 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10 flex justify-between items-start mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors duration-300">
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.trend}</span>
                                </div>
                                <div className="relative z-10">
                                    <div className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-2 truncate" title={stat.value}>{stat.value}</div>
                                    <div className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-2 flex flex-col min-h-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden p-6 lg:p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                                        <Wallet className="w-5 h-5 text-gray-900 dark:text-white" />
                                        {t('Today\'s Summary')}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('Ringkasan A, B, dan jumlah setoran harian.')}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: t('Penerimaan (A)'), value: formatIDR(safeMetrics.todayRevenue), icon: TrendingUp },
                                    { label: t('Pengeluaran (B)'), value: formatIDR(safeMetrics.todayExpense), icon: ArrowDownRight },
                                    { label: t('Jumlah Setoran (A-B)'), value: formatIDR(safeMetrics.todaySettlement), icon: Wallet },
                                ].map((row, index) => (
                                    <div key={index} className="flex items-center justify-between rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/30 px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                                <row.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900 dark:text-white">{row.label}</div>
                                                <div className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t('Today')}</div>
                                            </div>
                                        </div>
                                        <div className="text-lg md:text-xl font-black text-gray-900 dark:text-white">{row.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="xl:col-span-1 flex flex-col gap-4">
                            <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wider px-1 uppercase">{t('Quick Tools')}</h2>

                            <Link href={route('accounting.projects.index')} className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-3xl p-5 md:p-6 hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden transform hover:-translate-y-1 cursor-pointer">
                                <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 dark:bg-black/5 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150"></div>
                                <div className="relative z-10 flex items-center justify-between mb-3 md:mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 dark:bg-black/5 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-white dark:text-gray-900" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </div>
                                <h3 className="relative z-10 text-lg font-bold">{t('Projects')}</h3>
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                                    <div className="overflow-hidden">
                                        <p className="relative z-10 text-xs opacity-70 mt-2">{t('Lihat proyek yang sedang berjalan dan terhubung dengan laporan keuangan.')}</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href={route('accounting.revenues.index')} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 md:p-6 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col group transform hover:-translate-y-1 cursor-pointer">
                                <div className="flex items-center justify-between mb-3 md:mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors">
                                        <PiggyBank className="w-5 h-5" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gray-900 dark:group-hover:text-white transition-all duration-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('Revenues')}</h3>
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                                    <div className="overflow-hidden">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{t('Masukkan penerimaan harian dan pantau total A.')}</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href={route('accounting.expenses.index')} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 md:p-6 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col group transform hover:-translate-y-1 cursor-pointer">
                                <div className="flex items-center justify-between mb-3 md:mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors">
                                        <ArrowRightLeft className="w-5 h-5" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gray-900 dark:group-hover:text-white transition-all duration-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('Expenses')}</h3>
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                                    <div className="overflow-hidden">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{t('Catat pengeluaran operasional dan biaya lain-lain.')}</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href={route('accounting.closing.index')} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 md:p-6 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col group transform hover:-translate-y-1 cursor-pointer">
                                <div className="flex items-center justify-between mb-3 md:mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors">
                                        <LockKeyhole className="w-5 h-5" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gray-900 dark:group-hover:text-white transition-all duration-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('Daily Closing')}</h3>
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                                    <div className="overflow-hidden">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{t('Tutup buku harian dan siapkan rekap setoran.')}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AccountingLayout>
    );
}
