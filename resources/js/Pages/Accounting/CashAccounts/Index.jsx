import React, { useState } from 'react';
import AccountingLayout from '../../../Layouts/AccountingLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Search, Wallet, Building2, CircleDollarSign, Edit2, Trash2, CheckCircle2, X, Save } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';

const defaultForm = {
    account_name: '',
    type: 'bank',
    account_number: '',
    current_balance: 0,
    is_active: true,
};

export default function Index({ cashAccounts = [], summary = {} }) {
    const { t } = useTranslations();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm(defaultForm);

    const filteredAccounts = cashAccounts.filter(account =>
        account.account_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (account.account_number && account.account_number.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const typeLabels = {
        cash: t('Cash'),
        bank: t('Bank'),
        ewallet: t('E-Wallet'),
        other: t('Other'),
    };

    const typeIcons = {
        cash: Wallet,
        bank: Building2,
        ewallet: CircleDollarSign,
        other: Wallet,
    };

    const formatIDR = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value || 0);

    const openCreate = () => {
        setSelectedAccount(null);
        reset();
        setData(defaultForm);
        setIsFormOpen(true);
    };

    const openEdit = (account) => {
        setSelectedAccount(account);
        setData({
            account_name: account.account_name || '',
            type: account.type || 'bank',
            account_number: account.account_number || '',
            current_balance: account.current_balance || 0,
            is_active: !!account.is_active,
        });
        setIsFormOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedAccount) {
            put(route('accounting.cash-accounts.update', selectedAccount.id), {
                onSuccess: () => setIsFormOpen(false),
            });
            return;
        }

        post(route('accounting.cash-accounts.store'), {
            onSuccess: () => setIsFormOpen(false),
        });
    };

    const handleDelete = () => {
        if (!accountToDelete) return;

        router.delete(route('accounting.cash-accounts.destroy', accountToDelete.id), {
            onSuccess: () => setDeleteModalOpen(false),
        });
    };

    return (
        <AccountingLayout title={t('Cash Accounts')}>
            <Head title={t('Cash Accounts')} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                        {t('Cash Accounts')}
                    </h1>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('Manage cash, bank, and payment accounts used for actual revenue and expense movements.')}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('Search accounts...')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
                        />
                    </div>
                    <button
                        onClick={openCreate}
                        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-emerald-500/20 whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">{t('New Account')}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                {[
                    { label: t('Total Accounts'), value: summary.total_accounts || 0 },
                    { label: t('Active Accounts'), value: summary.active_accounts || 0 },
                    { label: t('Cash Accounts'), value: summary.cash_accounts || 0 },
                    { label: t('Total Balance'), value: formatIDR(summary.total_balance || 0) },
                ].map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">{item.label}</div>
                        <div className="text-2xl font-black text-gray-900 dark:text-white">{item.value}</div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t('Account')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t('Type')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t('Number')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white text-right">{t('Balance')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t('Status')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white text-right">{t('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredAccounts.map((account) => {
                                const Icon = typeIcons[account.type] || Wallet;

                                return (
                                    <tr key={account.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                                                    <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 dark:text-white">{account.account_name}</div>
                                                    <div className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{account.type}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{typeLabels[account.type] || account.type}</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{account.account_number || '—'}</td>
                                        <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white">{formatIDR(account.current_balance)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${account.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                                                {account.is_active ? t('Active') : t('Inactive')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openEdit(account)} className="p-1.5 text-gray-400 hover:text-emerald-500 transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => { setAccountToDelete(account); setDeleteModalOpen(true); }} className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                            {filteredAccounts.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        {t('No cash accounts found.')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div className="absolute inset-0 bg-gray-900/30 dark:bg-black/50 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
                    <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col border-l border-gray-100 dark:border-gray-800 animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {selectedAccount ? t('Edit Cash Account') : t('Add Cash Account')}
                            </h2>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">{t('Account Name')}</label>
                                <input value={data.account_name} onChange={e => setData('account_name', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white" />
                                {errors.account_name && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.account_name}</div>}
                            </div>

                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">{t('Type')}</label>
                                <select value={data.type} onChange={e => setData('type', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white">
                                    <option value="cash">{t('Cash')}</option>
                                    <option value="bank">{t('Bank')}</option>
                                    <option value="ewallet">{t('E-Wallet')}</option>
                                    <option value="other">{t('Other')}</option>
                                </select>
                                {errors.type && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.type}</div>}
                            </div>

                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">{t('Account Number')}</label>
                                <input value={data.account_number} onChange={e => setData('account_number', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white" />
                            </div>

                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">{t('Current Balance')}</label>
                                <input type="number" step="0.01" value={data.current_balance} onChange={e => setData('current_balance', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white" />
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="cash_account_is_active" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800" />
                                <label htmlFor="cash_account_is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">{t('Active')}</label>
                            </div>
                        </form>

                        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex justify-end gap-3 shrink-0">
                            <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('Cancel')}</button>
                            <button onClick={handleSubmit} disabled={processing} className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-emerald-500/20">
                                <Save className="w-4 h-4" />
                                {processing ? t('Saving...') : t('Save')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deleteModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/30 dark:bg-black/50 backdrop-blur-sm" onClick={() => setDeleteModalOpen(false)} />
                    <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center border border-rose-100 dark:border-rose-800/50">
                                <Trash2 className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('Delete Cash Account')}</h3>
                                <p className="text-sm text-gray-500">{accountToDelete?.account_name}</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                            {t('Are you sure you want to delete this cash account? This action cannot be undone.')}
                        </p>

                        <div className="flex gap-3">
                            <button onClick={() => setDeleteModalOpen(false)} className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-xl border border-gray-200 dark:border-gray-700">
                                {t('Cancel')}
                            </button>
                            <button onClick={handleDelete} className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold transition-all">
                                {t('Delete')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AccountingLayout>
    );
}