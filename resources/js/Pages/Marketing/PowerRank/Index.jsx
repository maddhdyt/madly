import React from 'react';
import MarketingLayout from '../../../Layouts/MarketingLayout';
import { Trophy, Zap, Target, MousePointerClick, TrendingUp, Medal } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';

export default function PowerRank({ leaderboard = [] }) {
    const { t } = useTranslations();
    const maxPower = leaderboard.length > 0 ? Math.max(...leaderboard.map(l => l.total_power)) : 100;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <MarketingLayout title="Power Rank">
            <div className="flex flex-col font-sans bg-white dark:bg-gray-900 min-h-[calc(100vh-80px)] rounded-tl-3xl border-l border-t border-gray-100 dark:border-gray-800 overflow-y-auto transition-colors duration-300">
                <div className="w-full p-6 md:p-8 lg:p-10 space-y-8">
                    
                    {/* Header Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                                <Trophy className="w-8 h-8 text-yellow-500" />
                                {t('Global Power Rank')}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('Klasemen utama seluruh entitas Brand berdasarkan akumulasi poin aktivitas (Ad Spend & Revenue).')}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {leaderboard.length === 0 ? (
                            <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400">
                                <Medal className="w-16 h-16 mb-4 opacity-20" />
                                <p className="font-bold text-lg">{t('Belum ada peserta')}</p>
                                <p className="text-sm">{t('Jalankan kampanye iklan untuk mulai memperebutkan tahta.')}</p>
                            </div>
                        ) : leaderboard.map((item, idx) => {
                            const percent = Math.min(100, Math.max(0, (item.total_power / (maxPower || 1)) * 100));
                            const isTop1 = idx === 0 && item.total_power > 0;
                            const isTop3 = idx < 3 && item.total_power > 0;
                            
                            return (
                                <div key={idx} className={`relative bg-white dark:bg-gray-900 rounded-3xl border transition-all hover:shadow-lg overflow-hidden group ${
                                    isTop1 ? 'border-yellow-300 shadow-[0_0_25px_rgba(250,204,21,0.15)] transform hover:-translate-y-1' : 
                                    isTop3 ? 'border-gray-300 dark:border-gray-600 shadow-md transform hover:-translate-y-1' :
                                    'border-gray-200 dark:border-gray-800'
                                }`}>
                                    {isTop1 && <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/20 blur-3xl rounded-full"></div>}
                                    
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                                                    isTop1 ? 'bg-yellow-500 text-white' : 
                                                    idx === 1 ? 'bg-gray-300 dark:bg-gray-400 text-gray-800' : 
                                                    idx === 2 ? 'bg-orange-300 dark:bg-orange-800/60 text-orange-900 dark:text-orange-200' :
                                                    'bg-gray-100 dark:bg-gray-800 text-gray-500'
                                                }`}>
                                                    #{idx + 1}
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-lg text-gray-900 dark:text-white leading-tight">
                                                        {item.brand?.name || 'Unknown'}
                                                    </h3>
                                                    {item.level && (
                                                        <span className={`inline-block px-2 py-0.5 mt-1 rounded text-[10px] font-black uppercase tracking-widest ${item.level.colorClass} border`}>
                                                            {item.level.name}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={`flex flex-col items-end ${isTop1 ? 'text-yellow-600 dark:text-yellow-500' : 'text-gray-900 dark:text-white'}`}>
                                                <div className="flex items-center gap-1 font-black text-2xl leading-none">
                                                    {item.total_power} <Zap className="w-5 h-5 fill-current" />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">{t('Total Power')}</span>
                                            </div>
                                        </div>

                                        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-6 overflow-hidden flex">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-1000 ${isTop1 ? 'bg-yellow-500' : 'bg-gray-900 dark:bg-white'}`} 
                                                style={{ width: `${percent}%` }}
                                            ></div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 mb-1">
                                                    <Target className="w-3.5 h-3.5" /> {t('Total Revenue')}
                                                </div>
                                                <div className="font-bold text-sm text-gray-900 dark:text-white">
                                                    {formatCurrency(item.total_revenue)}
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 mb-1">
                                                    <MousePointerClick className="w-3.5 h-3.5" /> {t('Total Spend')}
                                                </div>
                                                <div className="font-bold text-sm text-gray-900 dark:text-white">
                                                    {formatCurrency(item.total_spend)}
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-800 col-span-2 flex justify-between items-center">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                                                    <TrendingUp className="w-3.5 h-3.5" /> {t('Avg ROAS')}
                                                </div>
                                                <div className="font-black text-base text-gray-900 dark:text-white">
                                                    {item.roas}x
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </MarketingLayout>
    );
}