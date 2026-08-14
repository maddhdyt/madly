import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, FolderOpen, FileText, Calendar, DollarSign, CheckCircle } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import CurrencyInput from '../../../Components/CurrencyInput';

export default function ProjectFormSlideOver({ isOpen, onClose, project = null }) {
    const { t } = useTranslations();
    const isEdit = !!project;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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

    const labelClass = "block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 ml-1";
    const inputClass = "w-full bg-[#f4f5f5] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:bg-white dark:focus:bg-gray-800 transition-all";

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity animate-fade-in" 
                onClick={onClose}
            ></div>
            
            {/* Panel */}
            <div className="relative w-full max-w-sm md:max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-full animate-slide-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {isEdit ? t('Edit Project') : t('Add Project')}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {t('Configure project details')}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-none bg-[#f8f9fa] dark:bg-black">
                    <form id="project-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className={labelClass}>
                                        <FolderOpen className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Project Name')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.project_name}
                                        onChange={e => setData('project_name', e.target.value)}
                                        className={inputClass}
                                        placeholder={t('Enter project name')}
                                    />
                                    {errors.project_name && <p className="text-red-500 text-xs mt-1">{errors.project_name}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <FileText className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Description')}
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows={3}
                                        className={`${inputClass} resize-y min-h-[100px]`}
                                        placeholder={t('Enter project description')}
                                    ></textarea>
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            <Calendar className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                            {t('Start Date')} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={data.start_date}
                                            onChange={e => setData('start_date', e.target.value)}
                                            className={inputClass}
                                        />
                                        {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            <Calendar className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                            {t('End Date')}
                                        </label>
                                        <input
                                            type="date"
                                            value={data.end_date}
                                            onChange={e => setData('end_date', e.target.value)}
                                            className={inputClass}
                                        />
                                        {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <DollarSign className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Total Budget')}
                                    </label>
                                    <CurrencyInput
                                        value={data.total_budget}
                                        onChange={val => setData('total_budget', val)}
                                        className={inputClass}
                                        prefix="Rp"
                                        placeholder="0"
                                    />
                                    {errors.total_budget && <p className="text-red-500 text-xs mt-1">{errors.total_budget}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <CheckCircle className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Status')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className={`${inputClass} appearance-none`}
                                    >
                                        <option value="active">{t('Active')}</option>
                                        <option value="completed">{t('Completed')}</option>
                                        <option value="on_hold">{t('On Hold')}</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 mt-2">
                                    <input
                                        type="checkbox"
                                        id="is_profit_sharing_enabled"
                                        checked={data.is_profit_sharing_enabled}
                                        onChange={e => setData('is_profit_sharing_enabled', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:checked:bg-white dark:focus:ring-white transition-colors cursor-pointer"
                                    />
                                    <label htmlFor="is_profit_sharing_enabled" className="text-sm font-bold text-gray-900 dark:text-white cursor-pointer select-none">
                                        {t('Enable Profit Sharing')}
                                    </label>
                                    {errors.is_profit_sharing_enabled && <p className="text-red-500 text-xs mt-1">{errors.is_profit_sharing_enabled}</p>}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 z-10">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        {t('Cancel')}
                    </button>
                    <button
                        type="submit"
                        form="project-form"
                        disabled={processing}
                        className="px-8 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm disabled:opacity-70 transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        {processing ? t('Saving...') : t('Save')}
                    </button>
                </div>
            </div>

            {/* Custom Animation CSS inline for simplicity */}
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-slide-in {
                    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-fade-in {
                    animation: fadeIn 0.2s ease-out forwards;
                }
            `}</style>
        </div>,
        document.body
    );
}
