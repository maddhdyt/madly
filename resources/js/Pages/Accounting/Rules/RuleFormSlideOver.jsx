import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { X, Save, Plus } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';

export default function RuleFormSlideOver({ isOpen, onClose, rule = null, categories = [] }) {
    const { t } = useTranslations();
    const isEdit = !!rule;

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-gray-900/30 dark:bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col border-l border-gray-100 dark:border-gray-800 animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {isEdit ? t('Edit Rule') : t('Add Calculation Rule')}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
                    <form id="rule-form" onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                {t('Rule Name')} <span className="text-rose-500">*</span>
                            </label>
                            <input type="text" value={data.rule_name} onChange={e => setData('rule_name', e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                placeholder={t('e.g., Advertising Fee')} />
                            {errors.rule_name && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.rule_name}</div>}
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                {t('Expense Category')} <span className="text-rose-500">*</span>
                            </label>
                            <select value={data.expense_category_id} onChange={e => setData('expense_category_id', e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                                <option value="" disabled>{t('Select Category')}</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            {errors.expense_category_id && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.expense_category_id}</div>}
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                {t('Calculation Type')} <span className="text-rose-500">*</span>
                            </label>
                            <select value={data.calculation_type} onChange={e => setData('calculation_type', e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                                <option value="percentage_of_revenue">{t('% of Revenue')}</option>
                                <option value="fixed_amount">{t('Fixed Amount')}</option>
                            </select>
                            {errors.calculation_type && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.calculation_type}</div>}
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">{t('Description')}</label>
                            <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={2}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                                placeholder={t('Describe the rule')}></textarea>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="rule_is_active" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)}
                                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800" />
                            <label htmlFor="rule_is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">{t('Active')}</label>
                        </div>

                        {/* Version Section */}
                        <div className="border-t border-gray-100 dark:border-gray-800 pt-5 mt-5">
                            {isEdit && (
                                <div className="flex items-center gap-2 mb-4">
                                    <input type="checkbox" id="add_new_version" checked={data.add_new_version} onChange={e => setData('add_new_version', e.target.checked)}
                                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800" />
                                    <label htmlFor="add_new_version" className="text-sm font-bold text-gray-700 dark:text-gray-300 cursor-pointer flex items-center gap-1">
                                        <Plus className="w-4 h-4" /> {t('Add New Version')}
                                    </label>
                                </div>
                            )}

                            {(data.add_new_version || !isEdit) && (
                                <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                    <h4 className="text-[13px] font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                        {isEdit ? t('New Version') : t('Initial Version')}
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[12px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                                {data.calculation_type === 'percentage_of_revenue' ? t('Percentage (%)') : t('Amount (IDR)')} <span className="text-rose-500">*</span>
                                            </label>
                                            <input type="number" step="0.01" value={data.value} onChange={e => setData('value', e.target.value)}
                                                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                                placeholder={data.calculation_type === 'percentage_of_revenue' ? '4.00' : '500000'} />
                                            {errors.value && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.value}</div>}
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                                                {t('Effective From')} <span className="text-rose-500">*</span>
                                            </label>
                                            <input type="date" value={data.effective_from} onChange={e => setData('effective_from', e.target.value)}
                                                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                                            {errors.effective_from && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.effective_from}</div>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-bold text-gray-600 dark:text-gray-400 mb-1">{t('Notes')}</label>
                                        <input type="text" value={data.notes} onChange={e => setData('notes', e.target.value)}
                                            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                            placeholder={t('Version change reason...')} />
                                    </div>
                                </div>
                            )}

                            {/* Existing Versions (Read Only) */}
                            {isEdit && rule.versions && rule.versions.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">{t('Version History')}</h4>
                                    {rule.versions.map((ver, idx) => (
                                        <div key={ver.id || idx} className="flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 text-sm">
                                            <div>
                                                <span className="font-bold text-gray-900 dark:text-white">
                                                    {rule.calculation_type === 'percentage_of_revenue' ? `${parseFloat(ver.value)}%` : `Rp ${parseFloat(ver.value).toLocaleString('id-ID')}`}
                                                </span>
                                                {ver.notes && <span className="text-gray-400 ml-2 text-xs">— {ver.notes}</span>}
                                            </div>
                                            <div className="text-xs text-gray-400 whitespace-nowrap">
                                                {ver.effective_from?.split('T')[0]}
                                                {ver.effective_until ? ` → ${ver.effective_until.split('T')[0]}` : ` → ${t('now')}`}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex justify-end gap-3 shrink-0">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('Cancel')}</button>
                    <button type="submit" form="rule-form" disabled={processing}
                        className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-emerald-500/20">
                        <Save className="w-4 h-4" />
                        {processing ? t('Saving...') : t('Save')}
                    </button>
                </div>
            </div>
        </div>
    );
}
