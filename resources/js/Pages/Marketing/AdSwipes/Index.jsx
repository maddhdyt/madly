import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Head, router, useForm } from '@inertiajs/react';
import MarketingLayout from '../../../Layouts/MarketingLayout';
import useTranslations from '../../../Hooks/useTranslations';
import { LayoutGrid, Plus, X, Edit, Trash2, ExternalLink, Image as ImageIcon } from 'lucide-react';

export default function AdSwipes({ swipes, brands }) {
    const { t } = useTranslations();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSwipe, setEditingSwipe] = useState(null);
    const fileInputRef = useRef(null);

    const form = useForm({
        marketing_brand_id: '',
        title: '',
        platform: '',
        url: '',
        angle: '',
        notes: '',
        image: null
    });

    const openModal = (swipe = null) => {
        setEditingSwipe(swipe);
        if (swipe) {
            form.setData({
                marketing_brand_id: swipe.marketing_brand_id || '',
                title: swipe.title,
                platform: swipe.platform || '',
                url: swipe.url || '',
                angle: swipe.angle || '',
                notes: swipe.notes || '',
                image: null
            });
        } else {
            form.reset();
        }
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        
        // Since we have file upload, if we are putting, Laravel requires _method=PUT in a POST request for multipart forms
        if (editingSwipe) {
            router.post(route('marketing.ad-swipes.update', editingSwipe.id), {
                _method: 'put',
                ...form.data,
                image: form.data.image // keep file intact
            }, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                }
            });
        } else {
            form.post(route('marketing.ad-swipes.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                }
            });
        }
    };

    const deleteSwipe = (id) => {
        if (confirm(t('Are you sure you want to delete this Ad Swipe?'))) {
            router.delete(route('marketing.ad-swipes.destroy', id));
        }
    };

    return (
        <>
            <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto font-sans bg-white dark:bg-gray-900 rounded-tl-3xl border-l border-t border-gray-100 dark:border-gray-800 transition-colors duration-300 p-6 md:p-8 lg:p-10">
                
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{t('Ad Swipe File')}</h1>
                        <p className="text-sm text-gray-500 mt-2 max-w-2xl">
                            {t('Curate winning ads from competitors and industry leaders as inspiration for your next campaigns.')}
                        </p>
                    </div>
                    <button 
                        onClick={() => openModal()}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                    >
                        <Plus className="w-4 h-4" /> {t('Add Swipe')}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {swipes.map(swipe => (
                        <div key={swipe.id} className="group flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
                            
                            {/* Image Placeholder / Display */}
                            <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 relative flex items-center justify-center overflow-hidden">
                                {swipe.image_path ? (
                                    <img src={`/storage/${swipe.image_path}`} alt={swipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="text-gray-300 dark:text-gray-700 flex flex-col items-center">
                                        <ImageIcon className="w-10 h-10 mb-2" />
                                        <span className="text-xs font-bold uppercase tracking-widest">{t('No Image')}</span>
                                    </div>
                                )}

                                {/* Action overlay */}
                                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openModal(swipe)} className="p-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 rounded-lg shadow-sm hover:bg-white dark:hover:bg-black transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => deleteSwipe(swipe.id)} className="p-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-red-500 rounded-lg shadow-sm hover:bg-white dark:hover:bg-black transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex gap-2 mb-3 flex-wrap">
                                    {swipe.platform && <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold rounded uppercase tracking-wider">{swipe.platform}</span>}
                                    {swipe.angle && <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded uppercase tracking-wider">{swipe.angle}</span>}
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-snug">{swipe.title}</h3>
                                {swipe.notes && <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{swipe.notes}</p>}
                                
                                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
                                    <span className="text-[10px] font-semibold text-gray-400 truncate max-w-[120px]">
                                        {swipe.marketing_brand?.name || t('General')}
                                    </span>
                                    {swipe.url && (
                                        <a href={swipe.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[11px] font-bold text-gray-900 dark:text-white hover:underline">
                                            {t('View Ad')} <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {swipes.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl text-gray-400">
                            <LayoutGrid className="w-12 h-12 mb-4 opacity-20" />
                            <p className="font-medium text-sm">{t('No ad swipes collected yet.')}</p>
                        </div>
                    )}
                </div>

                {/* Modal */}
                {isModalOpen && typeof document !== 'undefined' && createPortal(
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-gray-100 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingSwipe ? t('Edit Ad Swipe') : t('Add Ad Swipe')}</h2>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5"/></button>
                            </div>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Title / Description')}</label>
                                    <input type="text" value={form.data.title} onChange={e => form.setData('title', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Brand (Optional)')}</label>
                                        <select value={form.data.marketing_brand_id} onChange={e => form.setData('marketing_brand_id', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white">
                                            <option value="">{t('General / Not Specific')}</option>
                                            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Platform')}</label>
                                        <select value={form.data.platform} onChange={e => form.setData('platform', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white">
                                            <option value="">{t('Select Platform')}</option>
                                            <option value="Meta Ads">Meta Ads</option>
                                            <option value="TikTok Ads">TikTok Ads</option>
                                            <option value="Google Ads">Google Ads</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Ad URL / Link')}</label>
                                    <input type="url" placeholder="https://..." value={form.data.url} onChange={e => form.setData('url', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Angle / Approach')}</label>
                                    <input type="text" placeholder="e.g. Price Comparison, FOMO, Testimonial" value={form.data.angle} onChange={e => form.setData('angle', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Notes / Key Takeaways')}</label>
                                    <textarea value={form.data.notes} onChange={e => form.setData('notes', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white h-20" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Screenshot (Optional)')}</label>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={e => form.setData('image', e.target.files[0])} 
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 dark:file:bg-gray-800 dark:file:text-gray-300"
                                    />
                                    {form.progress && (
                                        <progress value={form.progress.percentage} max="100" className="w-full mt-2">
                                            {form.progress.percentage}%
                                        </progress>
                                    )}
                                </div>
                                <button type="submit" disabled={form.processing} className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold text-sm mt-4 hover:opacity-90">
                                    {t('Save Swipe')}
                                </button>
                            </form>
                        </div>
                    </div>, document.body
                )}
            </div>
        </>
    );
}

AdSwipes.layout = page => <MarketingLayout title="Ad Swipe File">{page}</MarketingLayout>;
