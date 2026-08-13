import React, { useState } from 'react';
import AccountingLayout from '../../../Layouts/AccountingLayout';
import { Head } from '@inertiajs/react';
import { Plus, Search, PiggyBank, Edit2, Trash2, ArrowUpRight } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import RevenueFormSlideOver from './RevenueFormSlideOver';
import ConfirmModal from '../../../Components/ConfirmModal';
import { router } from '@inertiajs/react';

export default function Index({ revenues = [], projects = [], cashAccounts = [] }) {
    const { t } = useTranslations();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRevenue, setSelectedRevenue] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [revenueToDelete, setRevenueToDelete] = useState(null);

    const filteredRevenues = revenues.filter(revenue => 
        (revenue.description && revenue.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (revenue.reference_number && revenue.reference_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (revenue.project?.project_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleEdit = (revenue) => {
        setSelectedRevenue(revenue);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setSelectedRevenue(null);
        setIsFormOpen(true);
    };

    const handleDelete = (revenue) => {
        setRevenueToDelete(revenue);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (revenueToDelete) {
            router.delete(route('accounting.revenues.destroy', revenueToDelete.id), {
                onSuccess: () => setDeleteModalOpen(false)
            });
        }
    };

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value || 0);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(new Date(dateString));
    };

    return (
        <AccountingLayout title={t('Revenues')}>
            <Head title={t('Revenues')} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                        {t('Revenues')}
                    </h1>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('Record money actually received (Actual Money Received).')}
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('Search revenues...')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
                        />
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-emerald-500/20 whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">{t('Record Revenue')}</span>
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t('Date')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t('Project')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t('Account')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white text-right">{t('Amount')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t('Status')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white text-right">{t('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredRevenues.map((revenue) => (
                                <tr key={revenue.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                        {formatDate(revenue.transaction_date)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 dark:text-white">{revenue.project?.project_name}</span>
                                            {revenue.description && (
                                                <span className="text-xs text-gray-500 max-w-[200px] truncate">{revenue.description}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                                                <PiggyBank className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <span className="text-gray-600 dark:text-gray-400">{revenue.cash_account?.account_name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 font-bold text-gray-900 dark:text-white">
                                            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                                            {formatIDR(revenue.amount)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                            revenue.status === 'posted' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' :
                                            revenue.status === 'voided' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400' :
                                            'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400'
                                        }`}>
                                            {t(revenue.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(revenue)} className="p-1.5 text-gray-400 hover:text-emerald-500 transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            {revenue.status !== 'voided' && (
                                                <button onClick={() => handleDelete(revenue)} className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors" title={t('Void Revenue')}>
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredRevenues.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        {t('No revenues found.')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <RevenueFormSlideOver 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                revenue={selectedRevenue}
                projects={projects}
                cashAccounts={cashAccounts}
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title={t('Void Revenue')}
                message={t('Are you sure you want to void this transaction? This will reverse the balances.')}
                confirmText={t('Void')}
                isDestructive={true}
            />
        </AccountingLayout>
    );
}
