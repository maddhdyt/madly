import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Head, router, useForm } from '@inertiajs/react';
import MarketingLayout from '../../../Layouts/MarketingLayout';
import useTranslations from '../../../Hooks/useTranslations';
import { Users, Plus, X, Edit, Trash2, Shield, AlertCircle, Copy, Globe, CheckCircle2 } from 'lucide-react';

export default function Competitors({ competitors, copyToClipboard, showToast }) {
    const { t } = useTranslations();
    const [isCompetitorModalOpen, setIsCompetitorModalOpen] = useState(false);
    const [isBattlecardModalOpen, setIsBattlecardModalOpen] = useState(false);
    const [editingCompetitor, setEditingCompetitor] = useState(null);
    const [editingBattlecard, setEditingBattlecard] = useState(null);
    const [activeCompetitorId, setActiveCompetitorId] = useState(null);

    const compForm = useForm({
        name: '',
        strengths: '',
        weaknesses: '',
        website_url: '',
        instagram_url: '',
        tiktok_url: '',
        tier: '',
        service_type: '',
        specific_services: ''
    });

    const bcForm = useForm({
        category: '',
        objection: '',
        response: ''
    });

    const openCompetitorModal = (comp = null) => {
        setEditingCompetitor(comp);
        if (comp) {
            compForm.setData({
                name: comp.name,
                strengths: comp.strengths || '',
                weaknesses: comp.weaknesses || '',
                website_url: comp.website_url || '',
                instagram_url: comp.instagram_url || '',
                tiktok_url: comp.tiktok_url || '',
                tier: comp.tier || '',
                service_type: comp.service_type || '',
                specific_services: comp.specific_services || ''
            });
        } else {
            compForm.reset();
        }
        setIsCompetitorModalOpen(true);
    };

    const submitCompetitor = (e) => {
        e.preventDefault();
        if (editingCompetitor) {
            compForm.put(route('marketing.competitors.update', editingCompetitor.id), {
                onSuccess: () => {
                    setIsCompetitorModalOpen(false);
                    compForm.reset();
                }
            });
        } else {
            compForm.post(route('marketing.competitors.store'), {
                onSuccess: () => {
                    setIsCompetitorModalOpen(false);
                    compForm.reset();
                }
            });
        }
    };

    const deleteCompetitor = (id) => {
        if (confirm(t('Are you sure you want to delete this competitor?'))) {
            router.delete(route('marketing.competitors.destroy', id));
        }
    };

    const openBattlecardModal = (competitorId, bc = null) => {
        setActiveCompetitorId(competitorId);
        setEditingBattlecard(bc);
        if (bc) {
            bcForm.setData({
                category: bc.category || '',
                objection: bc.objection,
                response: bc.response
            });
        } else {
            bcForm.reset();
        }
        setIsBattlecardModalOpen(true);
    };

    const submitBattlecard = (e) => {
        e.preventDefault();
        if (editingBattlecard) {
            bcForm.put(route('marketing.battlecards.update', editingBattlecard.id), {
                onSuccess: () => {
                    setIsBattlecardModalOpen(false);
                    bcForm.reset();
                }
            });
        } else {
            bcForm.post(route('marketing.competitors.battlecards.store', activeCompetitorId), {
                onSuccess: () => {
                    setIsBattlecardModalOpen(false);
                    bcForm.reset();
                }
            });
        }
    };

    const deleteBattlecard = (id) => {
        if (confirm(t('Delete this battlecard?'))) {
            router.delete(route('marketing.battlecards.destroy', id));
        }
    };

    return (
        <MarketingLayout title="Competitor Research">
            <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto font-sans bg-white dark:bg-gray-900 rounded-tl-3xl border-l border-t border-gray-100 dark:border-gray-800 transition-colors duration-300 p-6 md:p-8 lg:p-10">
                
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{t('Competitors & Battlecards')}</h1>
                        <p className="text-sm text-gray-500 mt-2 max-w-2xl">
                            {t('Track competitor strengths/weaknesses and provide your sales team with quick counter-objections.')}
                        </p>
                    </div>
                    <button 
                        onClick={() => openCompetitorModal()}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                    >
                        <Plus className="w-4 h-4" /> {t('Add Competitor')}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {competitors.map(comp => (
                        <div key={comp.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        {comp.name}
                                        {comp.tier && <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold rounded uppercase tracking-wider">{comp.tier}</span>}
                                    </h3>
                                    <div className="flex gap-3 mt-2">
                                        {comp.website_url && <a href={comp.website_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" title="Website"><Globe className="w-4 h-4"/></a>}
                                        {comp.instagram_url && <a href={comp.instagram_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors" title="Instagram"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>}
                                        {comp.tiktok_url && <a href={comp.tiktok_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors" title="TikTok"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.63-1.09 5.3-3.1 7.22-1.92 1.83-4.57 2.89-7.18 2.82-2.91-.08-5.69-1.46-7.51-3.69C-1.07 19.89-1.43 15.65.98 12.63c1.76-2.22 4.67-3.41 7.5-3.16v4.09c-1.55-.17-3.17.37-4.13 1.59-.87 1.11-1.09 2.65-.63 3.99.41 1.2 1.48 2.1 2.75 2.37 1.39.31 2.92-.12 3.86-1.17.92-1.02 1.34-2.42 1.31-3.81V.02z"/></svg></a>}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => openCompetitorModal(comp)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => deleteCompetitor(comp.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            
                            {(comp.service_type || comp.specific_services) && (
                                <div className="mb-4 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800 text-sm">
                                    {comp.service_type && <p className="font-bold text-gray-900 dark:text-white text-xs uppercase mb-1">{comp.service_type}</p>}
                                    {comp.specific_services && <p className="text-gray-600 dark:text-gray-400 text-xs">{comp.specific_services}</p>}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-xl border border-green-100 dark:border-green-800/30">
                                    <p className="font-bold text-green-800 dark:text-green-500 mb-1 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5"/> {t('Strengths')}</p>
                                    <p className="text-gray-600 dark:text-gray-400 text-xs whitespace-pre-wrap">{comp.strengths || '-'}</p>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-100 dark:border-red-800/30">
                                    <p className="font-bold text-red-800 dark:text-red-500 mb-1 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5"/> {t('Weaknesses')}</p>
                                    <p className="text-gray-600 dark:text-gray-400 text-xs whitespace-pre-wrap">{comp.weaknesses || '-'}</p>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('Battlecards')} ({comp.battlecards.length})</h4>
                                    <button onClick={() => openBattlecardModal(comp.id)} className="text-[10px] font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                        + Add
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {comp.battlecards.map(bc => (
                                        <div key={bc.id} className="group relative bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl p-3">
                                            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                <button onClick={() => openBattlecardModal(comp.id, bc)} className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-700 rounded shadow-sm">
                                                    <Edit className="w-3 h-3" />
                                                </button>
                                                <button onClick={() => deleteBattlecard(bc.id)} className="p-1 text-gray-400 hover:text-red-500 bg-white dark:bg-gray-700 rounded shadow-sm">
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                            {bc.category && <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase mb-2">{bc.category}</span>}
                                            <p className="text-xs font-semibold text-gray-900 dark:text-white mb-1.5 italic">"{bc.objection}"</p>
                                            <div className="flex items-start gap-2">
                                                <p className="text-xs text-gray-600 dark:text-gray-400 flex-1">{bc.response}</p>
                                                <button onClick={() => copyToClipboard(bc.response)} className="shrink-0 p-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110" title="Copy response">
                                                    <Copy className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {comp.battlecards.length === 0 && (
                                        <p className="text-xs text-gray-400 text-center py-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">{t('No battlecards yet.')}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {competitors.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl text-gray-400">
                            <Users className="w-12 h-12 mb-4 opacity-20" />
                            <p className="font-medium text-sm">{t('No competitors added yet.')}</p>
                        </div>
                    )}
                </div>

                {/* Modals */}
                {isCompetitorModalOpen && typeof document !== 'undefined' && createPortal(
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingCompetitor ? t('Edit Competitor') : t('Add Competitor')}</h2>
                                <button onClick={() => setIsCompetitorModalOpen(false)} className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5"/></button>
                            </div>
                            <form onSubmit={submitCompetitor} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Name')}</label>
                                    <input type="text" value={compForm.data.name} onChange={e => compForm.setData('name', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Tier / Status')}</label>
                                        <select value={compForm.data.tier} onChange={e => compForm.setData('tier', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white">
                                            <option value="">{t('No Tier')}</option>
                                            <option value="Tier 1 (Direct)">Tier 1 (Direct)</option>
                                            <option value="Tier 2 (Indirect)">Tier 2 (Indirect)</option>
                                            <option value="Market Leader">Market Leader</option>
                                            <option value="Alternative">Alternative</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Website URL')}</label>
                                        <input type="url" placeholder="https://" value={compForm.data.website_url} onChange={e => compForm.setData('website_url', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Instagram URL')}</label>
                                        <input type="url" placeholder="https://instagram.com/..." value={compForm.data.instagram_url} onChange={e => compForm.setData('instagram_url', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('TikTok URL')}</label>
                                        <input type="url" placeholder="https://tiktok.com/@..." value={compForm.data.tiktok_url} onChange={e => compForm.setData('tiktok_url', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Service Type')}</label>
                                        <input type="text" placeholder="e.g. Full Service, Ads Only" value={compForm.data.service_type} onChange={e => compForm.setData('service_type', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Specific Services')}</label>
                                        <input type="text" placeholder="e.g. Meta Ads, SEO" value={compForm.data.specific_services} onChange={e => compForm.setData('specific_services', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Strengths')}</label>
                                    <textarea value={compForm.data.strengths} onChange={e => compForm.setData('strengths', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white h-24" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Weaknesses')}</label>
                                    <textarea value={compForm.data.weaknesses} onChange={e => compForm.setData('weaknesses', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white h-24" />
                                </div>
                                <button type="submit" disabled={compForm.processing} className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold text-sm mt-4 hover:opacity-90">
                                    {t('Save Competitor')}
                                </button>
                            </form>
                        </div>
                    </div>, document.body
                )}

                {isBattlecardModalOpen && typeof document !== 'undefined' && createPortal(
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingBattlecard ? t('Edit Battlecard') : t('Add Battlecard')}</h2>
                                <button onClick={() => setIsBattlecardModalOpen(false)} className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5"/></button>
                            </div>
                            <form onSubmit={submitBattlecard} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Category')} <span className="text-gray-400 font-normal">(Optional)</span></label>
                                    <input type="text" placeholder="e.g. Price, Feature" value={bcForm.data.category} onChange={e => bcForm.setData('category', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t("Client's Objection")}</label>
                                    <textarea placeholder='e.g. "But Competitor X is cheaper."' value={bcForm.data.objection} onChange={e => bcForm.setData('objection', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white h-20" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Our Response')}</label>
                                    <textarea placeholder="e.g. 'Yes, but our ROI is proven to be 3x higher because...'" value={bcForm.data.response} onChange={e => bcForm.setData('response', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white h-24" required />
                                </div>
                                <button type="submit" disabled={bcForm.processing} className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold text-sm mt-4 hover:opacity-90">
                                    {t('Save Battlecard')}
                                </button>
                            </form>
                        </div>
                    </div>, document.body
                )}
            </div>
        </MarketingLayout>
    );
}
