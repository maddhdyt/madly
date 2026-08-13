import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { X, Save } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';

export default function RevenueFormSlideOver({ isOpen, onClose, revenue = null, projects = [], cashAccounts = [] }) {
    const { t } = useTranslations();
    const isEdit = !!revenue;

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
                        {isEdit ? t('Edit Revenue') : t('Record Revenue')}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
                    <form id="revenue-form" onSubmit={handleSubmit} className="space-y-5">
                        
                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                {t('Project')} <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={data.accounting_project_id}
                                onChange={e => setData('accounting_project_id', e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            >
                                <option value="" disabled>{t('Select Project')}</option>
                                {projects.map(p => (
                                    <option key={p.id} value={p.id}>{p.project_name}</option>
                                ))}
                            </select>
                            {errors.accounting_project_id && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.accounting_project_id}</div>}
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                {t('Cash Account')} <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={data.cash_account_id}
                                onChange={e => setData('cash_account_id', e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            >
                                <option value="" disabled>{t('Select Cash Account')}</option>
                                {cashAccounts.map(c => (
                                    <option key={c.id} value={c.id}>{c.account_name} ({c.account_number})</option>
                                ))}
                            </select>
                            {errors.cash_account_id && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.cash_account_id}</div>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                    {t('Transaction Date')} <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.transaction_date}
                                    onChange={e => setData('transaction_date', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                />
                                {errors.transaction_date && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.transaction_date}</div>}
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                    {t('Amount')} <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.amount}
                                    onChange={e => setData('amount', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                    placeholder="0.00"
                                />
                                {errors.amount && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.amount}</div>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                {t('Description')}
                            </label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                                placeholder={t('Enter description')}
                            ></textarea>
                            {errors.description && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.description}</div>}
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                {t('Reference Number')}
                            </label>
                            <input
                                type="text"
                                value={data.reference_number}
                                onChange={e => setData('reference_number', e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                placeholder={t('e.g., INV-001')}
                            />
                            {errors.reference_number && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.reference_number}</div>}
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
                                <option value="draft">{t('Draft')}</option>
                                <option value="posted">{t('Posted')}</option>
                                <option value="voided">{t('Voided')}</option>
                            </select>
                            {errors.status && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.status}</div>}
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
                        form="revenue-form"
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
