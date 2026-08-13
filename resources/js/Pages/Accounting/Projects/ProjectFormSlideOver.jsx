import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { X, Save } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';

export default function ProjectFormSlideOver({ isOpen, onClose, project = null }) {
    const { t } = useTranslations();
    const isEdit = !!project;

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        project_name: '',
        description: '',
        start_date: '',
        end_date: '',
        total_budget: '',
        status: 'active',
        is_profit_sharing_enabled: false,
    });

    useEffect(() => {
        if (isOpen) {
            if (isEdit) {
                setData({
                    project_name: project.project_name || '',
                    description: project.description || '',
                    start_date: project.start_date ? project.start_date.split('T')[0] : '',
                    end_date: project.end_date ? project.end_date.split('T')[0] : '',
                    total_budget: project.total_budget || '',
                    status: project.status || 'active',
                    is_profit_sharing_enabled: !!project.is_profit_sharing_enabled,
                });
            } else {
                reset();
                setData({
                    ...data,
                    start_date: new Date().toISOString().split('T')[0],
                });
            }
            clearErrors();
        }
    }, [isOpen, project]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEdit) {
            put(route('accounting.projects.update', project.id), {
                onSuccess: () => onClose(),
            });
        } else {
            post(route('accounting.projects.store'), {
                onSuccess: () => onClose(),
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div 
                className="absolute inset-0 bg-gray-900/30 dark:bg-black/50 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            ></div>
            
            <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col border-l border-gray-100 dark:border-gray-800 animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {isEdit ? t('Edit Project') : t('Add Project')}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
                    <form id="project-form" onSubmit={handleSubmit} className="space-y-5">
                        
                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                {t('Project Name')} <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.project_name}
                                onChange={e => setData('project_name', e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                placeholder={t('Enter project name')}
                            />
                            {errors.project_name && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.project_name}</div>}
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                {t('Description')}
                            </label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                                placeholder={t('Enter project description')}
                            ></textarea>
                            {errors.description && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.description}</div>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                    {t('Start Date')} <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={e => setData('start_date', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                />
                                {errors.start_date && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.start_date}</div>}
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                    {t('End Date')}
                                </label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={e => setData('end_date', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                />
                                {errors.end_date && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.end_date}</div>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                {t('Total Budget')}
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.total_budget}
                                onChange={e => setData('total_budget', e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                placeholder={t('Enter budget (optional)')}
                            />
                            {errors.total_budget && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.total_budget}</div>}
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                {t('Status')} <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            >
                                <option value="active">{t('Active')}</option>
                                <option value="completed">{t('Completed')}</option>
                                <option value="on_hold">{t('On Hold')}</option>
                            </select>
                            {errors.status && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.status}</div>}
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="is_profit_sharing_enabled"
                                checked={data.is_profit_sharing_enabled}
                                onChange={e => setData('is_profit_sharing_enabled', e.target.checked)}
                                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                            />
                            <label htmlFor="is_profit_sharing_enabled" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                                {t('Enable Profit Sharing for this Project')}
                            </label>
                            {errors.is_profit_sharing_enabled && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.is_profit_sharing_enabled}</div>}
                        </div>
                    </form>
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex justify-end gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        {t('Cancel')}
                    </button>
                    <button
                        type="submit"
                        form="project-form"
                        disabled={processing}
                        className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-emerald-500/20"
                    >
                        <Save className="w-4 h-4" />
                        {processing ? t('Saving...') : t('Save')}
                    </button>
                </div>
            </div>
        </div>
    );
}
