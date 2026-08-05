import React from 'react';
import MarketingLayout from '../../Layouts/MarketingLayout';
import { Zap, Megaphone, Target, Calculator, Link as LinkIcon, Users, Trophy, ArrowRight, MousePointerClick, TrendingUp, BarChart3 } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import useTranslations from '../../Hooks/useTranslations';

export default function Dashboard({ stats = {}, quickStats = {}, chartData = { labels: [], data: [] }, leaderboard = [], recentAds = [] }) {
    const { totalPower = 0, activeCampaigns = 0, totalBrands = 0 } = stats;
    const { totalSpend = 0, totalRevenue = 0, roas = 0, cpa = 0 } = quickStats;
    const { t } = useTranslations();
    const { auth } = usePage().props;
    const user = auth?.user?.name || 'Admin';
    
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    // Calculate max power for progress bars
    const maxPower = leaderboard.length > 0 ? Math.max(...leaderboard.map(l => l.total_power)) : 100;

    // Use real chart data passed from the controller
    const chartLabels = chartData.labels || [];
    const chartValues = chartData.data || [];
    const maxChartValue = chartValues.length > 0 ? Math.max(...chartValues, 1) : 100; // avoid division by zero

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };
    
    const formatShortCurrency = (val) => {
        if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
        if (val >= 1000) return (val / 1000).toFixed(1) + 'K';
        return val;
    }

    return (
        <>
            <div className="flex flex-col font-sans bg-white dark:bg-gray-900 min-h-[calc(100vh-80px)] rounded-tl-3xl border-l border-t border-gray-100 dark:border-gray-800 overflow-y-auto transition-colors duration-300">
                <div className="w-full p-6 md:p-8 lg:p-10 space-y-8">
                    
                    {/* Header Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{greeting}, {user} 👋</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                                Pusat komando Digital Marketing Anda.
                            </p>
                        </div>
                        <Link href={route('marketing.daily-metrics.index')} className="shrink-0 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Input Daily Metrics
                        </Link>
                    </div>

                    {/* Metrics Row (Monochrome) */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        {[
                            { label: 'Total Spend (7D)', value: formatCurrency(totalSpend), icon: Zap, trend: 'Daily' },
                            { label: 'Total Revenue (7D)', value: formatCurrency(totalRevenue), icon: Target, trend: 'Daily' },
                            { label: 'Avg ROAS (7D)', value: `${roas}x`, icon: TrendingUp, trend: 'Daily' },
                            { label: 'Avg CPA (7D)', value: formatCurrency(cpa), icon: MousePointerClick, trend: 'Daily' },
                        ].map((stat, i) => (
                            <div key={i} className="relative bg-white dark:bg-gray-900 px-6 py-6 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.02)] transition-all duration-300 overflow-hidden group">
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-100 dark:bg-gray-800 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="relative z-10 flex justify-between items-start mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors duration-300">
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <div className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-2 truncate" title={stat.value}>{stat.value || 0}</div>
                                    <div className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chart & Tools Split */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        
                        {/* Custom Tailwind Chart (Left - 2 Columns) */}
                        <div className="xl:col-span-2 flex flex-col min-h-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden p-6 lg:p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-gray-900 dark:text-white" />
                                        Revenue Overview (Last 7 Days)
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pendapatan harian dari seluruh kampanye yang berjalan.</p>
                                </div>
                                <div className="hidden sm:flex items-center gap-3 text-xs font-bold text-gray-500">
                                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-gray-900 dark:bg-white"></div> Revenue</div>
                                </div>
                            </div>
                            
                            {/* The Tailwind CSS Bar Chart */}
                            <div className="flex-1 w-full flex items-end justify-between gap-2 px-2 sm:px-6 h-48 md:h-60 mt-8 pt-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                                {chartValues.map((value, idx) => {
                                    const percent = maxChartValue > 0 ? (value / maxChartValue) * 100 : 0;
                                    return (
                                        <div key={idx} className="relative flex flex-col items-center justify-end w-full max-w-[24px] sm:max-w-[36px] md:max-w-[48px] group h-full">
                                            {/* Tooltip on hover */}
                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold px-2 py-1 rounded transition-opacity pointer-events-none whitespace-nowrap z-10">
                                                {formatCurrency(value)}
                                            </div>
                                            {/* Bar */}
                                            <div 
                                                className="w-full bg-gray-900 dark:bg-white rounded-t-md transition-all duration-500 group-hover:bg-gray-700 dark:group-hover:bg-gray-200 min-h-[4px]"
                                                style={{ height: `${Math.max(percent, 2)}%` }}
                                            ></div>
                                            <div className="mt-3 text-[10px] font-bold text-gray-400 uppercase truncate w-full text-center">{chartLabels[idx]}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="xl:col-span-1 flex flex-col gap-4">
                            <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wider px-1 uppercase">Quick Tools</h2>
                            
                            <Link href={route('marketing.roas-calculator.index')} className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-3xl p-5 md:p-6 hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden transform hover:-translate-y-1 cursor-pointer">
                                <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 dark:bg-black/5 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150"></div>
                                <div className="relative z-10 flex items-center justify-between mb-3 md:mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 dark:bg-black/5 flex items-center justify-center">
                                        <Calculator className="w-5 h-5 text-white dark:text-gray-900" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </div>
                                <h3 className="relative z-10 text-lg font-bold">ROAS Calculator</h3>
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                                    <div className="overflow-hidden">
                                        <p className="relative z-10 text-xs opacity-70 mt-2">Hitung BEP ROAS & kelayakan scale-up.</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href={route('marketing.utm-builder.index')} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 md:p-6 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col group transform hover:-translate-y-1 cursor-pointer">
                                <div className="flex items-center justify-between mb-3 md:mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors">
                                        <LinkIcon className="w-5 h-5" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gray-900 dark:group-hover:text-white transition-all duration-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">UTM Builder</h3>
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                                    <div className="overflow-hidden">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Generate tracking link standar operasional.</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href={route('marketing.budget-allocator.index')} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 md:p-6 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col group transform hover:-translate-y-1 cursor-pointer">
                                <div className="flex items-center justify-between mb-3 md:mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gray-900 dark:group-hover:text-white transition-all duration-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Budget Allocator</h3>
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                                    <div className="overflow-hidden">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Distribusi budget ke tahapan TOFU/MOFU.</p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </div>

                    {/* Data Section (Split 2/1) */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pt-4">
                        
                        {/* Recent Campaigns (Left) */}
                        <div className="xl:col-span-2 flex flex-col min-h-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                                    <MousePointerClick className="w-4 h-4 text-gray-500" />
                                    Campaigns Terbaru
                                </h2>
                                <Link href={route('marketing.ad-identities.index')} className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                    View All
                                </Link>
                            </div>
                            
                            <div className="flex-1 overflow-x-auto">
                                {recentAds.length === 0 ? (
                                    <div className="py-12 flex flex-col items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                                        <Megaphone className="w-8 h-8 mb-3 opacity-20" />
                                        Belum ada iklan yang dicatat.
                                    </div>
                                ) : (
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                                <th className="py-3 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Brand & Platform</th>
                                                <th className="py-3 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Sales PIC</th>
                                                <th className="py-3 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                            {recentAds.map((ad) => (
                                                <tr key={ad.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors">
                                                    <td className="py-4 px-6">
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-sm text-gray-900 dark:text-white">{ad.marketingBrand?.name || '-'}</span>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ad.ad_platform}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                                                        {ad.sales?.name || <span className="italic text-gray-400">Umum</span>}
                                                    </td>
                                                    <td className="py-4 px-6 text-center">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                                            ad.is_active 
                                                            ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' 
                                                            : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                                                        }`}>
                                                            {ad.is_active ? 'Active' : 'Paused'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>

                        {/* Leaderboard (Right) */}
                        <div className="xl:col-span-1 flex flex-col min-h-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-gray-500" />
                                    Power Rank
                                </h2>
                            </div>
                            
                            <div className="flex-1 overflow-x-auto p-5">
                                {leaderboard.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                                        <Zap className="w-8 h-8 mb-3 opacity-20" />
                                        Data belum tersedia
                                    </div>
                                ) : (
                                    <div className="space-y-5">
                                        {leaderboard.map((item, idx) => {
                                            const percent = Math.min(100, Math.max(0, (item.total_power / (maxPower || 1)) * 100));
                                            const isTop1 = idx === 0 && item.total_power > 0;
                                            
                                            return (
                                                <div key={idx} className={`group ${isTop1 ? 'p-3 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800/50' : ''}`}>
                                                    <div className="flex justify-between items-end mb-2">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-[10px] font-black w-3 ${isTop1 ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-500'}`}>#{idx+1}</span>
                                                                <span className={`font-bold text-sm ${isTop1 ? 'text-gray-900 dark:text-white text-base' : 'text-gray-900 dark:text-white'}`}>
                                                                    {item.brand?.name || 'Unknown'}
                                                                </span>
                                                                {item.level && (
                                                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ml-1 ${item.level.colorClass}`}>
                                                                        {item.level.name}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider mt-1 ml-5">
                                                                {item.campaign_count} Ads Active
                                                            </p>
                                                        </div>
                                                        <div className={`flex items-center gap-1 font-black ${isTop1 ? 'text-lg text-gray-900 dark:text-white' : 'text-sm text-gray-900 dark:text-white'}`}>
                                                            {item.total_power} <Zap className={`w-3 h-3 fill-current ${isTop1 ? 'text-yellow-500' : 'opacity-50'}`} />
                                                        </div>
                                                    </div>
                                                    {/* Progress Bar */}
                                                    <div className="ml-5 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
                                                        <div 
                                                            className={`h-full rounded-full transition-all duration-1000 ease-out ${isTop1 ? 'bg-yellow-500' : 'bg-gray-900 dark:bg-white'}`} 
                                                            style={{ width: `${percent}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = page => <MarketingLayout title="Marketing Dashboard">{page}</MarketingLayout>;
