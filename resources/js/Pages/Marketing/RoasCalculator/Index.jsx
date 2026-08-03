import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import MarketingLayout from '../../../Layouts/MarketingLayout';
import useTranslations from '../../../Hooks/useTranslations';
import { Calculator, DollarSign, TrendingUp, AlertTriangle, CheckCircle2, TrendingDown, Target, Zap } from 'lucide-react';

export default function RoasCalculator() {
    const { t } = useTranslations();

    const [inputs, setInputs] = useState({
        sellingPrice: 100000,
        cogs: 40000,
        otherCosts: 10000,
        dailyBudget: 500000,
        targetCpa: 25000,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericValue = parseInt(value.replace(/\D/g, ''), 10);
        setInputs(prev => ({ ...prev, [name]: isNaN(numericValue) ? '' : numericValue }));
    };

    const formatInputNumber = (val) => {
        if (val === '' || val === null || val === undefined) return '';
        return new Intl.NumberFormat('id-ID').format(val);
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    const calc = useMemo(() => {
        const { sellingPrice, cogs, otherCosts, dailyBudget, targetCpa } = inputs;
        
        const grossProfit = sellingPrice - cogs - otherCosts;
        const profitMargin = sellingPrice > 0 ? (grossProfit / sellingPrice) : 0;
        
        const maxCpa = grossProfit;
        const bepRoas = profitMargin > 0 ? (1 / profitMargin) : 0;
        
        // Simulation
        const projectedSales = targetCpa > 0 ? Math.floor(dailyBudget / targetCpa) : 0;
        const projectedRevenue = projectedSales * sellingPrice;
        const projectedProfit = (projectedSales * grossProfit) - dailyBudget;
        const projectedRoas = dailyBudget > 0 ? (projectedRevenue / dailyBudget) : 0;

        const isProfitable = projectedProfit > 0;
        const isSafe = targetCpa < maxCpa;

        let profitState = 'loss';
        if (projectedProfit > 0) profitState = 'profitable';
        else if (projectedProfit === 0 && projectedSales > 0) profitState = 'breakeven';

        return {
            grossProfit,
            profitMargin,
            maxCpa,
            bepRoas,
            projectedSales,
            projectedRevenue,
            projectedProfit,
            projectedRoas,
            isProfitable,
            isSafe,
            profitState
        };
    }, [inputs]);

    return (
        <MarketingLayout title="ROAS Calculator">
            <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto font-sans bg-white dark:bg-gray-900 rounded-tl-3xl border-l border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
                
                <div className="flex-1 w-full p-6 md:p-8 lg:p-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{t('ROAS & BEP Calculator')}</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
                                {t('Calculate your Break-Even Point (BEP) ROAS and Maximum CPA to ensure your advertising campaigns remain profitable before scaling up.')}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                        
                        {/* Input Section */}
                        <div className="xl:col-span-5 flex flex-col gap-6">
                            
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Target className="w-4 h-4" /> {t('1. Product Economics')}
                                </h3>
                                
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Selling Price')}</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-gray-500 font-bold">Rp</span>
                                            </div>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                name="sellingPrice"
                                                value={formatInputNumber(inputs.sellingPrice)}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Cost of Goods (COGS)')}</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-gray-500 font-bold">Rp</span>
                                            </div>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                name="cogs"
                                                value={formatInputNumber(inputs.cogs)}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Other Costs (Shipping, Fees)')}</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-gray-500 font-bold">Rp</span>
                                            </div>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                name="otherCosts"
                                                value={formatInputNumber(inputs.otherCosts)}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Zap className="w-4 h-4" /> {t('2. Ad Simulation (Optional)')}
                                </h3>
                                
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Daily Ad Budget')}</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-gray-500 font-bold">Rp</span>
                                            </div>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                name="dailyBudget"
                                                value={formatInputNumber(inputs.dailyBudget)}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">{t('Target CPA per Sale')}</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-gray-500 font-bold">Rp</span>
                                            </div>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                name="targetCpa"
                                                value={formatInputNumber(inputs.targetCpa)}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Result Section */}
                        <div className="xl:col-span-7 flex flex-col gap-6">
                            
                            {/* Key Metrics */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-gray-900 dark:bg-white p-6 md:p-8 rounded-3xl text-white dark:text-gray-900 shadow-xl relative overflow-hidden group">
                                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 dark:bg-black/5 rounded-full blur-2xl pointer-events-none"></div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">{t('Max CPA')}</h3>
                                    <p className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                                        {formatCurrency(calc.maxCpa)}
                                    </p>
                                    <p className="text-xs font-medium opacity-70">{t('Never spend more than this to acquire 1 customer.')}</p>
                                </div>

                                <div className="bg-white dark:bg-gray-900 border-2 border-gray-900 dark:border-white p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden group">
                                    <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">{t('Break-Even ROAS')}</h3>
                                    <p className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-gray-900 dark:text-white">
                                        {calc.bepRoas.toFixed(2)}x
                                    </p>
                                    <p className="text-xs font-medium text-gray-500">{t('Minimum ROAS needed to not lose money.')}</p>
                                </div>
                            </div>

                            {/* Simulation Results */}
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <TrendingUp className="w-5 h-5 text-gray-400" />
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                                            {t('Scale-Up Simulation')}
                                        </h3>
                                    </div>
                                    
                                    {calc.profitState === 'profitable' && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-green-50 dark:bg-green-500/10 border border-green-200/50 dark:border-green-500/20">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                            <span className="text-xs font-bold text-green-700 dark:text-green-400">{t('Profitable')}</span>
                                        </div>
                                    )}
                                    {calc.profitState === 'breakeven' && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200/50 dark:border-yellow-500/20">
                                            <AlertTriangle className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
                                            <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400">{t('Break Even')}</span>
                                        </div>
                                    )}
                                    {calc.profitState === 'loss' && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-50 dark:bg-red-500/10 border border-red-200/50 dark:border-red-500/20">
                                            <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                                            <span className="text-xs font-bold text-red-700 dark:text-red-400">{t('Losing Money')}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('Projected Sales')}</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white flex items-baseline gap-1">
                                            {calc.projectedSales} <span className="text-xs text-gray-400 font-medium">{t('pcs')}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('Total Revenue')}</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white truncate">{formatCurrency(calc.projectedRevenue)}</p>
                                    </div>
                                    <div>
                                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${calc.profitState === 'profitable' ? 'text-green-500' : calc.profitState === 'breakeven' ? 'text-yellow-500' : 'text-red-500'}`}>{t('Est. ROAS')}</p>
                                        <p className={`text-2xl font-bold ${calc.profitState === 'profitable' ? 'text-green-600 dark:text-green-400' : calc.profitState === 'breakeven' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {calc.projectedRoas.toFixed(2)}x
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('Net Profit (Daily)')}</p>
                                        <p className={`text-2xl font-bold truncate ${calc.profitState === 'profitable' ? 'text-green-600 dark:text-green-400' : calc.profitState === 'breakeven' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {calc.profitState === 'profitable' ? '+' : ''}{formatCurrency(calc.projectedProfit)}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex justify-between text-[11px] font-bold text-gray-500 mb-2">
                                        <span>{t('Cost (COGS + Ad + Other)')}</span>
                                        <span>{t('Gross Revenue')}</span>
                                    </div>
                                    
                                    <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex relative">
                                        {calc.projectedRevenue > 0 ? (
                                            <>
                                                {/* COGS + Others Portion */}
                                                <div 
                                                    className="h-full bg-slate-300 dark:bg-slate-600 transition-all duration-500 border-r border-white/20"
                                                    style={{ width: `${Math.min(100, ((inputs.cogs + inputs.otherCosts) * calc.projectedSales / calc.projectedRevenue) * 100)}%` }}
                                                    title={t('COGS & Other Costs')}
                                                ></div>
                                                
                                                {/* Ad Spend Portion */}
                                                <div 
                                                    className="h-full bg-amber-300 dark:bg-amber-500 transition-all duration-500 border-r border-white/20"
                                                    style={{ width: `${Math.min(100, (inputs.dailyBudget / calc.projectedRevenue) * 100)}%` }}
                                                    title={t('Ad Spend')}
                                                ></div>

                                                {/* Profit Portion */}
                                                {calc.profitState === 'profitable' && (
                                                    <div 
                                                        className="h-full bg-emerald-400 dark:bg-emerald-500 transition-all duration-500"
                                                        style={{ width: `${Math.min(100, (calc.projectedProfit / calc.projectedRevenue) * 100)}%` }}
                                                        title={t('Net Profit')}
                                                    ></div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 dark:bg-gray-800"></div>
                                        )}
                                    </div>
                                    
                                    <div className="flex justify-between mt-3 text-xs font-medium text-gray-500">
                                        <div className="flex gap-4">
                                            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></div> {t('Prod. Cost')}</span>
                                            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-300 dark:bg-amber-500"></div> {t('Ad Spend')}</span>
                                        </div>
                                        {calc.profitState === 'profitable' ? (
                                            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500"></div> {t('Net Profit')}</span>
                                        ) : calc.profitState === 'breakeven' ? (
                                            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400"><div className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500"></div> {t('Break Even')}</span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-red-500"><AlertTriangle className="w-3 h-3" /> {t('Loss')}</span>
                                        )}
                                    </div>
                                </div>
                            </div>    

                        </div>

                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}
