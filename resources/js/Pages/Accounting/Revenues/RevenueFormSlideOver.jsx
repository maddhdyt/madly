import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, FolderOpen, Wallet, Calendar, DollarSign, FileText, Hash, CheckCircle } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import CurrencyInput from '../../../Components/CurrencyInput';

export default function RevenueFormSlideOver({ isOpen, onClose, revenue = null, projects = [], cashAccounts = [] }) {
    const { t } = useTranslations();
    const isEdit = !!revenue;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        accounting_project_id: '',
        cash_account_id: '',
        transaction_date: '',
        amount: '',
        description: '',
        reference_number: '',
        status: 'posted',
    });

    useEffect(() => {
        if (isOpen) {
            if (isEdit) {
                setData({
                    accounting_project_id: revenue.accounting_project_id || '',
                    cash_account_id: revenue.cash_account_id || '',
                    transaction_date: revenue.transaction_date ? revenue.transaction_date.split('T')[0] : '',
                    amount: revenue.amount || '',
                    description: revenue.description || '',
                    reference_number: revenue.reference_number || '',
                    status: revenue.status || 'posted',
                });
            } else {
                reset();
                setData({
                    ...data,
                    transaction_date: new Date().toISOString().split('T')[0],
                    accounting_project_id: projects.length > 0 ? projects[0].id : '',
                    cash_account_id: cashAccounts.length > 0 ? cashAccounts[0].id : '',
                });
            }
            clearErrors();
        }
    }, [isOpen, revenue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEdit) {
            put(route('accounting.revenues.update', revenue.id), {
                onSuccess: () => onClose(),
            });
        } else {
            post(route('accounting.revenues.store'), {
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
                            {isEdit ? t('Edit Revenue') : t('Record Revenue')}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {t('Configure revenue details')}
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
                    <form id="revenue-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className={labelClass}>
                                        <FolderOpen className="w-4 h-4 inline-block mr-1 text-gray-400" />
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
                                    {errors.accounting_project_id && <p className="text-red-500 text-xs mt-1">{errors.accounting_project_id}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <Wallet className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Cash Account')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.cash_account_id}
                                        onChange={e => setData('cash_account_id', e.target.value)}
                                        className={`${inputClass} appearance-none`}
                                    >
                                        <option value="" disabled>{t('Select Cash Account')}</option>
                                        {cashAccounts.map(c => (
                                            <option key={c.id} value={c.id}>{c.account_name} ({c.account_number})</option>
                                        ))}
                                    </select>
                                    {errors.cash_account_id && <p className="text-red-500 text-xs mt-1">{errors.cash_account_id}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            <Calendar className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                            {t('Transaction Date')} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={data.transaction_date}
                                            onChange={e => setData('transaction_date', e.target.value)}
                                            className={inputClass}
                                        />
                                        {errors.transaction_date && <p className="text-red-500 text-xs mt-1">{errors.transaction_date}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            <DollarSign className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                            {t('Amount')} <span className="text-red-500">*</span>
                                        </label>
                                        <CurrencyInput
                                            value={data.amount}
                                            onChange={val => setData('amount', val)}
                                            className={inputClass}
                                            prefix="Rp"
                                            placeholder="0"
                                        />
                                        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                                    </div>
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
                                        placeholder={t('Enter description')}
                                    ></textarea>
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <Hash className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Reference Number')}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.reference_number}
                                        onChange={e => setData('reference_number', e.target.value)}
                                        className={inputClass}
                                        placeholder={t('e.g., INV-001')}
                                    />
                                    {errors.reference_number && <p className="text-red-500 text-xs mt-1">{errors.reference_number}</p>}
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
                                        <option value="draft">{t('Draft')}</option>
                                        <option value="posted">{t('Posted')}</option>
                                        <option value="voided">{t('Voided')}</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
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
                        form="revenue-form"
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
