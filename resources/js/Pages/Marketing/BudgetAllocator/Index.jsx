import React, { useState, useMemo, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '../../../Layouts/MarketingLayout';
import useTranslations from '../../../Hooks/useTranslations';
import { Target, Zap, Filter, PieChart, Info, TrendingUp, AlertTriangle, ArrowRight, DollarSign } from 'lucide-react';

export default function BudgetAllocator({ brands }) {
    const { t } = useTranslations();

    const [totalBudget, setTotalBudget] = useState(100000000);
    const [brandMetrics, setBrandMetrics] = useState({});

    // Initialize metrics for brands
    useEffect(() => {
        if (brands && brands.length > 0) {
            const initialMetrics = {};
            brands.forEach(b => {
                initialMetrics[b.id] = {
                    platform: 'meta', // default
                    currentRoas: 2.0,
                    targetRoas: 2.5,
                    closingRate: 20
                };
            });
            setBrandMetrics(initialMetrics);
        }
    }, [brands]);

    const handleMetricChange = (brandId, field, value) => {
        setBrandMetrics(prev => ({
            ...prev,
            [brandId]: {
                ...prev[brandId],
                [field]: value
            }
        }));
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    // Smart Allocation Algorithm
    const allocations = useMemo(() => {
        if (!brands || brands.length === 0 || Object.keys(brandMetrics).length === 0) return [];
        
        // 1. Calculate weights based on ROAS performance and Closing Rate
        let totalWeight = 0;
        const brandWeights = brands.map(brand => {
            const metrics = brandMetrics[brand.id];
            if (!metrics) return { brand, weight: 0 };
            
            // Performance ratio: Current ROAS / Target ROAS
            // E.g. Current 4.0 / Target 2.0 = 2.0 (Doing very well!)
            // Current 1.0 / Target 2.0 = 0.5 (Doing poorly)
            let performanceRatio = Number(metrics.currentRoas) / Number(metrics.targetRoas);
            if (isNaN(performanceRatio) || !isFinite(performanceRatio)) performanceRatio = 1;
            
            // Factor in closing rate as a multiplier (higher closing rate = better sales efficiency)
            const closingMultiplier = 1 + (Number(metrics.closingRate) / 100);

            // Final weight formula
            let weight = performanceRatio * closingMultiplier;
            // Floor at 0.1 to give everyone at least a little budget for testing
            if (weight < 0.1) weight = 0.1;
            
            totalWeight += weight;
            
            return {
                brand,
                metrics,
                weight,
                performanceRatio
            };
        });

        // 2. Distribute budget based on weights
        return brandWeights.map(item => {
            const allocatedAmount = totalWeight > 0 ? (item.weight / totalWeight) * totalBudget : 0;
            return {
                ...item,
                allocatedAmount,
                percentage: totalWeight > 0 ? (item.weight / totalWeight) * 100 : 0
            };
        }).sort((a, b) => b.allocatedAmount - a.allocatedAmount); // Sort by highest budget

    }, [totalBudget, brandMetrics, brands]);

    return (
        <MarketingLayout title="Smart Budget Allocator">
            <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto font-sans bg-[#f4f5f5] dark:bg-gray-950 rounded-tl-3xl border-l border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
                
                <div className="flex-1 w-full p-6 md:p-8 lg:p-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{t('Smart Budget Re-Allocator')}</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
                                {t('AI-driven budget distribution across your brands based on current performance and closing rates.')}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                        
                        {/* Input Section */}
                        <div className="xl:col-span-7 flex flex-col gap-6">
                            
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" /> 1. Total Investment
                                </h3>
                                
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Total Campaign Budget')}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-gray-500 font-bold">Rp</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={totalBudget || ''}
                                            onChange={(e) => setTotalBudget(Number(e.target.value))}
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-lg font-black text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm overflow-x-auto">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-6">
                                    <Filter className="w-4 h-4" /> 2. Brand Performance Inputs
                                </h3>
                                
                                {brands && brands.length > 0 ? (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-100 dark:border-gray-800">
                                                <th className="pb-3 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t('Brand')}</th>
                                                <th className="pb-3 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t('Platform')}</th>
                                                <th className="pb-3 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t('Target ROAS')}</th>
                                                <th className="pb-3 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t('Current ROAS')}</th>
                                                <th className="pb-3 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t('Closing Rate (%)')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {brands.map(brand => (
                                                <tr key={brand.id} className="border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                                                    <td className="py-4 pr-4">
                                                        <span className="font-bold text-sm text-gray-900 dark:text-white">{brand.name}</span>
                                                    </td>
                                                    <td className="py-4 pr-4">
                                                        <select
                                                            value={brandMetrics[brand.id]?.platform || 'meta'}
                                                            onChange={(e) => handleMetricChange(brand.id, 'platform', e.target.value)}
                                                            className="w-full p-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 font-medium"
                                                        >
                                                            <option value="meta">Meta Ads</option>
                                                            <option value="google">Google Ads</option>
                                                            <option value="tiktok">TikTok Ads</option>
                                                        </select>
                                                    </td>
                                                    <td className="py-4 pr-4">
                                                        <input
                                                            type="number"
                                                            step="0.1"
                                                            value={brandMetrics[brand.id]?.targetRoas || ''}
                                                            onChange={(e) => handleMetricChange(brand.id, 'targetRoas', e.target.value)}
                                                            className="w-full p-2 text-sm rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 font-bold"
                                                        />
                                                    </td>
                                                    <td className="py-4 pr-4">
                                                        <input
                                                            type="number"
                                                            step="0.1"
                                                            value={brandMetrics[brand.id]?.currentRoas || ''}
                                                            onChange={(e) => handleMetricChange(brand.id, 'currentRoas', e.target.value)}
                                                            className="w-full p-2 text-sm rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 font-bold"
                                                        />
                                                    </td>
                                                    <td className="py-4">
                                                        <input
                                                            type="number"
                                                            value={brandMetrics[brand.id]?.closingRate || ''}
                                                            onChange={(e) => handleMetricChange(brand.id, 'closingRate', e.target.value)}
                                                            className="w-full p-2 text-sm rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 font-bold"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                                        <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{t('No active brands found.')}</p>
                                        <Link href={route('marketing.brands.index')} className="mt-2 text-xs font-bold text-blue-500 hover:underline">
                                            {t('Setup Brands Here')}
                                        </Link>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* Result Section */}
                        <div className="xl:col-span-5 flex flex-col gap-6">
                            
                            <div className="bg-[#111] dark:bg-white p-6 md:p-8 rounded-3xl text-white dark:text-gray-900 shadow-2xl relative overflow-hidden">
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                                
                                <div className="flex items-center justify-between mb-8 relative z-10">
                                    <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-yellow-400" /> {t('AI Recommendations')}
                                    </h3>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    {allocations.map((alloc, idx) => (
                                        <div key={alloc.brand.id} className="p-4 rounded-2xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/10">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-lg">{alloc.brand.name}</span>
                                                    {alloc.performanceRatio >= 1 ? (
                                                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 text-[10px] font-black uppercase tracking-wider">
                                                            Scale
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 dark:text-red-600 text-[10px] font-black uppercase tracking-wider">
                                                            Maintain
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-xl font-black">{formatCurrency(alloc.allocatedAmount)}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-white/10 dark:bg-black/10 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full ${alloc.performanceRatio >= 1 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                        style={{ width: `${alloc.percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-bold opacity-60 w-10 text-right">{alloc.percentage.toFixed(1)}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            
                            {/* Insight Box */}
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-5 h-5 text-blue-500" /> {t('Strategy Insights')}
                                </h4>
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                                        <span>Brands with Current ROAS exceeding their Target ROAS are automatically prioritized for scaling.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                                        <span>A higher CS Closing Rate acts as a multiplier, as it indicates a highly efficient sales funnel.</span>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}
