import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, Tag, Percent, Calendar, Building2, Calculator } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import CurrencyInput from '../../../Components/CurrencyInput';

export default function AllocationRuleFormSlideOver({ isOpen, onClose, rule, categories = [], projects = [] }) {
    const { t } = useTranslations();
    const isEditing = !!rule;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        expense_category_id: '',
        accounting_project_id: '',
        allocation_method: 'percentage',
        allocation_value: '',
        effective_from: '',
        effective_until: '',
    });

    useEffect(() => {
        if (isOpen) {
            if (isEditing) {
                setData({
                    expense_category_id: rule.expense_category_id,
                    accounting_project_id: rule.accounting_project_id,
                    allocation_method: rule.allocation_method,
                    allocation_value: rule.allocation_value,
                    effective_from: rule.effective_from || '',
                    effective_until: rule.effective_until || '',
                });
            } else {
                reset();
            }
            clearErrors();
        }
    }, [isOpen, rule]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const options = {
            onSuccess: () => {
                onClose();
                reset();
            },
            preserveScroll: true
        };

        if (isEditing) {
            put(route('accounting.allocation-rules.update', rule.id), options);
        } else {
            post(route('accounting.allocation-rules.store'), options);
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
                            {isEditing ? t('Edit Allocation Rule') : t('New Allocation Rule')}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {t('Configure how shared expenses are distributed')}
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
                    <form id="allocation-rule-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className={labelClass}>
                                        <Tag className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Expense Category')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.expense_category_id}
                                        onChange={e => setData('expense_category_id', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">{t('Select Category (Shared Only)')}</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    {errors.expense_category_id && <p className="text-red-500 text-xs mt-1">{errors.expense_category_id}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <Building2 className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Allocated To Project')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.accounting_project_id}
                                        onChange={e => setData('accounting_project_id', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">{t('Select Project')}</option>
                                        {projects.map(p => (
                                            <option key={p.id} value={p.id}>{p.project_name}</option>
                                        ))}
                                    </select>
                                    {errors.accounting_project_id && <p className="text-red-500 text-xs mt-1">{errors.accounting_project_id}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            <Calculator className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                            {t('Method')} <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.allocation_method}
                                            onChange={e => setData('allocation_method', e.target.value)}
                                            className={inputClass}
                                        >
                                            <option value="percentage">{t('Percentage (%)')}</option>
                                            <option value="fixed">{t('Fixed Amount')}</option>
                                        </select>
                                        {errors.allocation_method && <p className="text-red-500 text-xs mt-1">{errors.allocation_method}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            <Percent className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                            {t('Value')} <span className="text-red-500">*</span>
                                        </label>
                                        <CurrencyInput
                                            value={data.allocation_value}
                                            onChange={val => setData('allocation_value', val)}
                                            className={inputClass}
                                            prefix={data.allocation_method === 'fixed_amount' ? 'Rp' : ''}
                                            suffix={data.allocation_method === 'percentage' ? '%' : ''}
                                            placeholder="0"
                                        />
                                        {errors.allocation_value && <p className="text-red-500 text-xs mt-1">{errors.allocation_value}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            <Calendar className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                            {t('Effective From')}
                                        </label>
                                        <input
                                            type="date"
                                            value={data.effective_from}
                                            onChange={e => setData('effective_from', e.target.value)}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            <Calendar className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                            {t('Effective Until')}
                                        </label>
                                        <input
                                            type="date"
                                            value={data.effective_until}
                                            onChange={e => setData('effective_until', e.target.value)}
                                            className={inputClass}
                                        />
                                    </div>
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
                        form="allocation-rule-form" 
                        disabled={processing} 
                        className="px-8 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm disabled:opacity-70 transition-colors"
                    >
                        <Save className="w-4 h-4" /> 
                        {processing ? t('Saving...') : t('Save Rule')}
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
