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

            <div className="w-full p-6 md:p-8 lg:p-10">
                {/* Dot Grid Banner & Actions */}
                <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.05] dark:group-hover:opacity-[0.08] transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'currentColor' }}></div>
                    <div className="relative z-10">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{greeting}, {user} 👋</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('Pusat komando untuk pencatatan revenue, expense, dan closing harian.')}</p>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3">
                        <Link href={route('accounting.closing.index')} className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-white dark:text-gray-900 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                            <TrendingUp className="w-4 h-4 text-white/80 dark:text-gray-900/80" />
                            {t('Daily Closing')}
                        </Link>
                    </div>
                </div>

                {/* Metrics with Monochrome Trends */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: t('Penerimaan (A)'), value: formatIDR(safeMetrics.todayRevenue), icon: TrendingUp, trend: '+0%', isUp: true },
                        { label: t('Pengeluaran (B)'), value: formatIDR(safeMetrics.todayExpense), icon: ArrowDownRight, trend: '+0%', isUp: true },
                        { label: t('Jumlah Setoran (A-B)'), value: formatIDR(safeMetrics.todaySettlement), icon: Wallet, trend: '+0%', isUp: true },
                        { label: t('Active Projects'), value: String(safeMetrics.activeProjects), icon: Activity, trend: '+0', isUp: true },
                    ].map((stat, i) => (
                        <div key={i} className="relative bg-white dark:bg-gray-900 px-5 py-5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all overflow-hidden group">
                            {/* Decorative monochrome sparkline hint */}
                            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10 flex justify-between items-start mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
                                    <stat.icon className="w-4 h-4" />
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/80 px-2 py-1 rounded-md border border-gray-200/50 dark:border-gray-700/50">
                                    <ArrowRight className={`w-3 h-3 ${stat.trend.startsWith('+') ? '-rotate-45' : ''}`} />
                                    {t('Today')}
                                </div>
                            </div>
                            <div className="relative z-10">
                                <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-1.5 truncate" title={stat.value}>{stat.value}</div>
                                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-2 flex flex-col min-h-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                                    <Wallet className="w-4 h-4 text-gray-900 dark:text-white" />
                                    {t('Today\'s Summary')}
                                </h2>
                            </div>
                            <div className="flex-1 p-6 space-y-4">
                                {[
                                    { label: t('Penerimaan (A)'), value: formatIDR(safeMetrics.todayRevenue), icon: TrendingUp },
                                    { label: t('Pengeluaran (B)'), value: formatIDR(safeMetrics.todayExpense), icon: ArrowDownRight },
                                    { label: t('Jumlah Setoran (A-B)'), value: formatIDR(safeMetrics.todaySettlement), icon: Wallet },
                                ].map((row, index) => (
                                    <div key={index} className="flex items-center justify-between rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 px-5 py-4 hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 shadow-sm">
                                                <row.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{row.label}</div>
                                                <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{t('Today')}</div>
                                            </div>
                                        </div>
                                        <div className="text-lg font-black text-gray-900 dark:text-white">{row.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="xl:col-span-1 flex flex-col gap-6">
                            <div className="flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden h-full">
                                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                    <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                                        <LockKeyhole className="w-4 h-4 text-gray-900 dark:text-white" />
                                        {t('Quick Tools')}
                                    </h2>
                                </div>
                                <div className="flex-1 p-5 space-y-3">
                                    <Link href={route('accounting.projects.index')} className="group flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
                                        <div className="mt-0.5 shrink-0 w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                                            <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{t('Projects')}</h3>
                                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transform group-hover:translate-x-1 transition-all" />
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{t('Lihat proyek yang sedang berjalan dan terhubung dengan laporan keuangan.')}</p>
                                        </div>
                                    </Link>
                                    
                                    <Link href={route('accounting.revenues.index')} className="group flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
                                        <div className="mt-0.5 shrink-0 w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                                            <PiggyBank className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{t('Revenues')}</h3>
                                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transform group-hover:translate-x-1 transition-all" />
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{t('Kelola semua penerimaan dana ke kas.')}</p>
                                        </div>
                                    </Link>
                                    
                                    <Link href={route('accounting.expenses.index')} className="group flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
                                        <div className="mt-0.5 shrink-0 w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                                            <ArrowRightLeft className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{t('Expenses')}</h3>
                                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transform group-hover:translate-x-1 transition-all" />
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{t('Kelola semua pengeluaran dana dari kas.')}</p>
                                        </div>
                                    </Link>

                                    <Link href={route('accounting.closing.index')} className="group flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all duration-300 cursor-pointer">
                                        <div className="mt-0.5 shrink-0 w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                                            <LockKeyhole className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{t('Daily Closing')}</h3>
                                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transform group-hover:translate-x-1 transition-all" />
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{t('Tutup buku harian dan siapkan rekap setoran.')}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </AccountingLayout>
    );
}
