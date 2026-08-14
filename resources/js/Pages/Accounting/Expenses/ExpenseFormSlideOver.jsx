import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import CurrencyInput from '../../../Components/CurrencyInput';

export default function ExpenseFormSlideOver({ isOpen, onClose, expense = null, projects = [], cashAccounts = [], categories = [] }) {
    const { t } = useTranslations();
    const isEdit = !!expense;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        accounting_project_id: '',
        cash_account_id: '',
        expense_category_id: '',
        transaction_date: '',
        amount: '',
        description: '',
        reference_number: '',
        expense_type: 'direct',
        status: 'posted',
    });

    useEffect(() => {
        if (isOpen) {
            if (isEdit) {
                setData({
                    accounting_project_id: expense.accounting_project_id || '',
                    cash_account_id: expense.cash_account_id || '',
                    expense_category_id: expense.expense_category_id || '',
                    transaction_date: expense.transaction_date ? expense.transaction_date.split('T')[0] : '',
                    amount: expense.amount || '',
                    description: expense.description || '',
                    reference_number: expense.reference_number || '',
                    expense_type: expense.expense_type || 'direct',
                    status: expense.status || 'posted',
                });
            } else {
                reset();
                setData({
                    ...data,
                    transaction_date: new Date().toISOString().split('T')[0],
                    accounting_project_id: projects.length > 0 ? projects[0].id : '',
                    cash_account_id: cashAccounts.length > 0 ? cashAccounts[0].id : '',
                    expense_category_id: categories.length > 0 ? categories[0].id : '',
                });
            }
            clearErrors();
        }
    }, [isOpen, expense]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEdit) {
            put(route('accounting.expenses.update', expense.id), {
                onSuccess: () => onClose(),
            });
        } else {
            post(route('accounting.expenses.store'), {
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
                            {isEdit ? t('Edit Expense') : t('Record Expense')}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {t('Configure expense details')}
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
                    <form id="expense-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <div className="flex flex-col gap-5">
                                
                                <div>
                                    <label className={labelClass}>
                                        {t('Project')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.accounting_project_id}
                                        onChange={e => setData('accounting_project_id', e.target.value)}
                                        className={`${inputClass} appearance-none`}
                                    >
                                        <option value="" disabled>{t('Select Project')}</option>
                                        {projects.map(p => (
                                            <option key={p.id} value={p.id}>{p.project_name}</option>
                                        ))}
                                    </select>
                                    {errors.accounting_project_id && <div className="text-red-500 text-xs mt-1 font-medium">{errors.accounting_project_id}</div>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            {t('Cash Account')} <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.cash_account_id}
                                            onChange={e => setData('cash_account_id', e.target.value)}
                                            className={`${inputClass} appearance-none`}
                                        >
                                            <option value="" disabled>{t('Select Account')}</option>
                                            {cashAccounts.map(c => (
                                                <option key={c.id} value={c.id}>{c.account_name}</option>
                                            ))}
                                        </select>
                                        {errors.cash_account_id && <div className="text-red-500 text-xs mt-1 font-medium">{errors.cash_account_id}</div>}
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            {t('Category')} <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.expense_category_id}
                                            onChange={e => setData('expense_category_id', e.target.value)}
                                            className={`${inputClass} appearance-none`}
                                        >
                                            <option value="" disabled>{t('Select Category')}</option>
                                            {categories.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                        {errors.expense_category_id && <div className="text-red-500 text-xs mt-1 font-medium">{errors.expense_category_id}</div>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            {t('Transaction Date')} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={data.transaction_date}
                                            onChange={e => setData('transaction_date', e.target.value)}
                                            className={inputClass}
                                        />
                                        {errors.transaction_date && <div className="text-red-500 text-xs mt-1 font-medium">{errors.transaction_date}</div>}
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            {t('Amount')} <span className="text-red-500">*</span>
                                        </label>
                                        <CurrencyInput
                                            value={data.amount}
                                            onChange={val => setData('amount', val)}
                                            className={inputClass}
                                            prefix="Rp"
                                            placeholder="0"
                                        />
                                        {errors.amount && <div className="text-red-500 text-xs mt-1 font-medium">{errors.amount}</div>}
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        {t('Description')}
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows={2}
                                        className={`${inputClass} resize-none`}
                                        placeholder={t('Enter description')}
                                    ></textarea>
                                    {errors.description && <div className="text-red-500 text-xs mt-1 font-medium">{errors.description}</div>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            {t('Expense Type')} <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.expense_type}
                                            onChange={e => setData('expense_type', e.target.value)}
                                            className={`${inputClass} appearance-none`}
                                        >
                                            <option value="direct">{t('Direct')}</option>
                                            <option value="shared">{t('Shared')}</option>
                                            <option value="rule_based" disabled>{t('Rule Based (Auto)')}</option>
                                        </select>
                                        {errors.expense_type && <div className="text-red-500 text-xs mt-1 font-medium">{errors.expense_type}</div>}
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            {t('Status')} <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={e => setData('status', e.target.value)}
                                            className={`${inputClass} appearance-none`}
                                        >
                                            <option value="draft">{t('Draft')}</option>
                                            <option value="posted">{t('Posted')}</option>
                                            <option value="voided">{t('Voided')}</option>
                                        </select>
                                        {errors.status && <div className="text-red-500 text-xs mt-1 font-medium">{errors.status}</div>}
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        {t('Reference Number')}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.reference_number}
                                        onChange={e => setData('reference_number', e.target.value)}
                                        className={inputClass}
                                        placeholder={t('e.g., RCPT-001')}
                                    />
                                    {errors.reference_number && <div className="text-red-500 text-xs mt-1 font-medium">{errors.reference_number}</div>}
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
                        form="expense-form"
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
