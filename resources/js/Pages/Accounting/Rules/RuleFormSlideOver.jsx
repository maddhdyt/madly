import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, Plus, FileText, Settings, Calculator, FileSignature, CheckCircle, Percent } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import CurrencyInput from '../../../Components/CurrencyInput';

export default function RuleFormSlideOver({ isOpen, onClose, rule = null, categories = [] }) {
    const { t } = useTranslations();
    const isEdit = !!rule;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        rule_name: '',
        expense_category_id: '',
        calculation_type: 'percentage_of_revenue',
        description: '',
        is_active: true,
        add_new_version: !isEdit,
        value: '',
        effective_from: '',
        notes: '',
    });

    useEffect(() => {
        if (isOpen) {
            if (isEdit) {
                const latestVersion = rule.versions && rule.versions.length > 0 ? rule.versions[0] : null;
                setData({
                    rule_name: rule.rule_name || '',
                    expense_category_id: rule.expense_category_id || '',
                    calculation_type: rule.calculation_type || 'percentage_of_revenue',
                    description: rule.description || '',
                    is_active: rule.is_active !== undefined ? rule.is_active : true,
                    add_new_version: false,
                    value: latestVersion ? latestVersion.value : '',
                    effective_from: new Date().toISOString().split('T')[0],
                    notes: '',
                });
            } else {
                reset();
                setData(prev => ({
                    ...prev,
                    effective_from: new Date().toISOString().split('T')[0],
                    expense_category_id: categories.length > 0 ? categories[0].id : '',
                    add_new_version: true,
                }));
            }
            clearErrors();
        }
    }, [isOpen, rule]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('accounting.rules.update', rule.id), { onSuccess: () => onClose() });
        } else {
            post(route('accounting.rules.store'), { onSuccess: () => onClose() });
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
                            {isEdit ? t('Edit Rule') : t('Add Calculation Rule')}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {t('Configure rule details and versions')}
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
                    <form id="rule-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className={labelClass}>
                                        <FileSignature className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Rule Name')} <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        value={data.rule_name} 
                                        onChange={e => setData('rule_name', e.target.value)}
                                        className={inputClass}
                                        placeholder={t('e.g., Advertising Fee')} 
                                    />
                                    {errors.rule_name && <p className="text-red-500 text-xs mt-1">{errors.rule_name}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <Settings className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Expense Category')} <span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                        value={data.expense_category_id} 
                                        onChange={e => setData('expense_category_id', e.target.value)}
                                        className={`${inputClass} appearance-none`}
                                    >
                                        <option value="" disabled>{t('Select Category')}</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                    {errors.expense_category_id && <p className="text-red-500 text-xs mt-1">{errors.expense_category_id}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <Calculator className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Calculation Type')} <span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                        value={data.calculation_type} 
                                        onChange={e => setData('calculation_type', e.target.value)}
                                        className={`${inputClass} appearance-none`}
                                    >
                                        <option value="percentage_of_revenue">{t('% of Revenue')}</option>
                                        <option value="fixed_amount">{t('Fixed Amount')}</option>
                                    </select>
                                    {errors.calculation_type && <p className="text-red-500 text-xs mt-1">{errors.calculation_type}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <FileText className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Description')}
                                    </label>
                                    <textarea 
                                        value={data.description} 
                                        onChange={e => setData('description', e.target.value)} 
                                        rows={2}
                                        className={`${inputClass} resize-y min-h-[80px]`}
                                        placeholder={t('Describe the rule')}
                                    ></textarea>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 mt-2">
                                    <input 
                                        type="checkbox" 
                                        id="rule_is_active" 
                                        checked={data.is_active} 
                                        onChange={e => setData('is_active', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:checked:bg-white dark:focus:ring-white transition-colors cursor-pointer" 
                                    />
                                    <label htmlFor="rule_is_active" className="text-sm font-bold text-gray-900 dark:text-white cursor-pointer select-none">
                                        {t('Active Rule')}
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Version Section */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            {isEdit && (
                                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 mb-5">
                                    <input 
                                        type="checkbox" 
                                        id="add_new_version" 
                                        checked={data.add_new_version} 
                                        onChange={e => setData('add_new_version', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:checked:bg-white dark:focus:ring-white transition-colors cursor-pointer" 
                                    />
                                    <label htmlFor="add_new_version" className="text-sm font-bold text-gray-900 dark:text-white cursor-pointer flex items-center gap-2 select-none">
                                        <Plus className="w-4 h-4 text-gray-900 dark:text-white" /> {t('Add New Version')}
                                    </label>
                                </div>
                            )}

                            {(data.add_new_version || !isEdit) && (
                                <div className="space-y-5">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                        {isEdit ? t('New Version Details') : t('Initial Version Details')}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>
                                                {data.calculation_type === 'percentage_of_revenue' ? <Percent className="w-4 h-4 inline-block mr-1 text-gray-400" /> : <Settings className="w-4 h-4 inline-block mr-1 text-gray-400" />}
                                                {data.calculation_type === 'percentage_of_revenue' ? t('Percentage (%)') : t('Amount (IDR)')} <span className="text-red-500">*</span>
                                            </label>
                                            <CurrencyInput 
                                                value={data.value} 
                                                onChange={val => setData('value', val)}
                                                className={inputClass}
                                                prefix={data.calculation_type === 'fixed_amount' ? 'Rp' : ''}
                                                suffix={data.calculation_type === 'percentage_of_revenue' ? '%' : ''}
                                                placeholder={data.calculation_type === 'percentage_of_revenue' ? '4.00' : '500000'} 
                                            />
                                            {errors.value && <p className="text-red-500 text-xs mt-1">{errors.value}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>
                                                <Settings className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                                {t('Effective From')} <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                type="date" 
                                                value={data.effective_from} 
                                                onChange={e => setData('effective_from', e.target.value)}
                                                className={inputClass} 
                                            />
                                            {errors.effective_from && <p className="text-red-500 text-xs mt-1">{errors.effective_from}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            <FileText className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                            {t('Notes')}
                                        </label>
                                        <input 
                                            type="text" 
                                            value={data.notes} 
                                            onChange={e => setData('notes', e.target.value)}
                                            className={inputClass}
                                            placeholder={t('Version change reason...')} 
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Existing Versions (Read Only) */}
                            {isEdit && rule.versions && rule.versions.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                        <Settings className="w-4 h-4 text-gray-400" />
                                        {t('Version History')}
                                    </h3>
                                    <div className="space-y-3">
                                        {rule.versions.map((ver, idx) => (
                                            <div key={ver.id || idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
                                                <div>
                                                    <span className="font-bold text-gray-900 dark:text-white">
                                                        {rule.calculation_type === 'percentage_of_revenue' ? `${parseFloat(ver.value)}%` : `Rp ${parseFloat(ver.value).toLocaleString('id-ID')}`}
                                                    </span>
                                                    {ver.notes && <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{ver.notes}</p>}
                                                </div>
                                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 text-right">
                                                    <div>{ver.effective_from?.split('T')[0]}</div>
                                                    <div>{ver.effective_until ? `to ${ver.effective_until.split('T')[0]}` : `to ${t('now')}`}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                        form="rule-form"
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
