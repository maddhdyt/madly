import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Head, router, useForm } from '@inertiajs/react';
import MarketingLayout from '../../../Layouts/MarketingLayout';
import useTranslations from '../../../Hooks/useTranslations';
import { Target, Plus, X, Edit, Trash2, Calendar, CheckSquare, ListTodo, MoreVertical } from 'lucide-react';
import dayjs from 'dayjs';

export default function Plans({ plans, copyToClipboard, showToast }) {
    const { t } = useTranslations();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [strategiesText, setStrategiesText] = useState('');

    const form = useForm({
        month_year: dayjs().format('YYYY-MM-01'),
        title: '',
        objective: '',
        strategies: [],
        status: 'Draft'
    });

    const openModal = (plan = null) => {
        setEditingPlan(plan);
        if (plan) {
            form.setData({
                month_year: dayjs(plan.month_year).format('YYYY-MM-DD'),
                title: plan.title,
                objective: plan.objective || '',
                strategies: plan.strategies || [],
                status: plan.status
            });
            setStrategiesText(plan.strategies ? plan.strategies.join('\n') : '');
        } else {
            form.reset();
            setStrategiesText('');
        }
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        // convert strategies text to array
        const stratArray = strategiesText.split('\n').filter(s => s.trim() !== '');
        form.transform((data) => ({
            ...data,
            strategies: stratArray
        }));

        if (editingPlan) {
            form.put(route('marketing.marketing-plans.update', editingPlan.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    showToast(t('Plan updated!'), 'success');
                }
            });
        } else {
            form.post(route('marketing.marketing-plans.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    showToast(t('Plan created!'), 'success');
                }
            });
        }
    };

    const deletePlan = (id) => {
        if (confirm(t('Delete this plan?'))) {
            router.delete(route('marketing.marketing-plans.destroy', id), {
                onSuccess: () => showToast(t('Plan deleted!'), 'success')
            });
        }
    };

    const getStatusColor = (status) => {
        if (status === 'Active') return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
        if (status === 'Completed') return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    };

    return (
        <MarketingLayout title={t('Marketing Planner')}>
            <Head title={t('Marketing Planner')} />
            
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <Target className="w-8 h-8 text-blue-500" />
                            {t('Marketing Planner')}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            {t('Plan your monthly marketing initiatives, optimizations, and experiments.')}
                        </p>
                    </div>
                    <button onClick={() => openModal()} className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4"/> {t('New Plan')}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map(plan => (
                        <div key={plan.id} className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${getStatusColor(plan.status)}`}>
                                        {plan.status}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-1">
                                        <Calendar className="w-3.5 h-3.5"/> {dayjs(plan.month_year).format('MMMM YYYY')}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => openModal(plan)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors"><Edit className="w-4 h-4"/></button>
                                    <button onClick={() => deletePlan(plan.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"><Trash2 className="w-4 h-4"/></button>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Target className="w-3.5 h-3.5"/> {t('Objective')}</h4>
                                <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">{plan.objective || '-'}</p>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><ListTodo className="w-3.5 h-3.5"/> {t('Strategies / Optimizations')}</h4>
                                {plan.strategies && plan.strategies.length > 0 ? (
                                    <ul className="space-y-2">
                                        {plan.strategies.map((strat, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                <CheckSquare className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                                <span>{strat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">{t('No strategies defined.')}</p>
                                )}
                            </div>
                        </div>
                    ))}
                    {plans.length === 0 && (
                        <div className="col-span-full bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-12 text-center border border-dashed border-gray-200 dark:border-gray-700">
                            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('No Marketing Plans Yet')}</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">{t('Break your stagnation by creating a new monthly plan to track your optimizations and experiments.')}</p>
                            <button onClick={() => openModal()} className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                                <Plus className="w-4 h-4"/> {t('Create First Plan')}
                            </button>
                        </div>
                    )}
                </div>

                {isModalOpen && typeof document !== 'undefined' && createPortal(
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-gray-100 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingPlan ? t('Edit Plan') : t('Create Marketing Plan')}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5"/></button>
                            </div>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Month & Year')}</label>
                                        <input type="date" required value={form.data.month_year} onChange={e => form.setData('month_year', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Status')}</label>
                                        <select required value={form.data.status} onChange={e => form.setData('status', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white appearance-none cursor-pointer">
                                            <option value="Draft">Draft</option>
                                            <option value="Active">Active</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Plan Title / Focus')}</label>
                                    <input type="text" required placeholder="e.g. Q3 Optimization, IG Reels Push" value={form.data.title} onChange={e => form.setData('title', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Objective')}</label>
                                    <textarea placeholder="What is the main goal?" value={form.data.objective} onChange={e => form.setData('objective', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white h-24" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">{t('Strategies / Optimizations')}</label>
                                    <p className="text-xs text-gray-500 mb-2">{t('Write each strategy on a new line')}</p>
                                    <textarea placeholder="1. Setup retargeting ads...&#10;2. A/B test creatives..." value={strategiesText} onChange={e => setStrategiesText(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white h-32 leading-relaxed" />
                                </div>
                                
                                <button type="submit" disabled={form.processing} className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors mt-4">
                                    {form.processing ? t('Saving...') : (editingPlan ? t('Update Plan') : t('Create Plan'))}
                                </button>
                            </form>
                        </div>
                    </div>, document.body
                )}
            </div>
        </MarketingLayout>
    );
}
