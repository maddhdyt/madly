import React, { useState } from 'react';
import AccountingLayout from '../../../Layouts/AccountingLayout';
import { Head } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2, Route, Building2, Tag, Calendar } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import AllocationRuleFormSlideOver from './AllocationRuleFormSlideOver';
import ConfirmModal from '../../../Components/ConfirmModal';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function Index({ rules = [], categories = [], projects = [] }) {
    const { t } = useTranslations();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [ruleToDelete, setRuleToDelete] = useState(null);

    const filteredRules = rules.filter(r => 
        r.expense_category?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.project?.project_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (r) => { setSelectedRule(r); setIsFormOpen(true); };
    const handleCreate = () => { setSelectedRule(null); setIsFormOpen(true); };
    const handleDelete = (r) => { setRuleToDelete(r); setDeleteModalOpen(true); };
    const confirmDelete = () => {
        if (ruleToDelete) {
            router.delete(route('accounting.allocation-rules.destroy', ruleToDelete.id), { onSuccess: () => setDeleteModalOpen(false) });
        }
    };

    return (
        <AccountingLayout title={t('Allocation Rules')}>
            <Head title={t('Allocation Rules')} />

            <div className="flex flex-col h-full w-full bg-[#f8f9fa] dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-300 relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 gap-4 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {t('Allocation Rules')}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {t('Map how shared expenses are distributed among projects.')}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 mt-4 sm:mt-0">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t('Search rules...')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-all dark:text-white"
                            />
                        </div>
                        <button
                            onClick={handleCreate}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-bold shadow-sm hover:bg-black dark:hover:bg-gray-200 transition-colors whitespace-nowrap"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">{t('New Rule')}</span>
                        </button>
                    </div>
                </div>

            <div className="flex-1 overflow-x-auto bg-white dark:bg-gray-900">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    <thead className="bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-500 text-[11px] uppercase tracking-widest font-extrabold border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
                        <tr>
                                <th className="px-8 py-4">{t('Category')}</th>
                                <th className="px-8 py-4">{t('Allocated To Project')}</th>
                                <th className="px-8 py-4">{t('Value')}</th>
                                <th className="px-8 py-4">{t('Effective Dates')}</th>
                                <th className="px-8 py-4 text-right">{t('Actions')}</th>
                            </tr>
                        </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                            {filteredRules.length > 0 ? (
                                filteredRules.map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white">
                                                    <Tag className="w-4 h-4" />
                                                </div>
                                                <div className="font-bold text-gray-900 dark:text-white">
                                                    {r.expense_category?.name || 'Unknown'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                <Building2 className="w-4 h-4 text-gray-400" />
                                                {r.project?.project_name || 'All Projects'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="font-bold text-gray-900 dark:text-white">
                                                {r.allocation_method === 'percentage' 
                                                    ? `${Number(r.allocation_value)}%` 
                                                    : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(r.allocation_value)}
                                            </div>
                                            <div className="text-xs text-gray-500 capitalize">{r.allocation_method}</div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3" />
                                                    {r.effective_from ? dayjs(r.effective_from).format('DD MMM YYYY') : t('Always')}
                                                    {' - '}
                                                    {r.effective_until ? dayjs(r.effective_until).format('DD MMM YYYY') : t('Ongoing')}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(r)}
                                                    className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                                    title={t('Edit')}
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(r)}
                                                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title={t('Delete')}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-col items-center justify-center">
                                            <Route className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4" />
                                            <p className="text-lg font-medium">{t('No allocation rules found')}</p>
                                            <p className="text-sm">{t('Create rules to automatically divide shared expenses.')}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                </table>
            </div>

            <AllocationRuleFormSlideOver
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                rule={selectedRule}
                categories={categories}
                projects={projects}
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                title={t('Delete Rule')}
                message={t('Are you sure you want to delete this allocation rule? This action cannot be undone.')}
                confirmText={t('Delete')}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                type="danger"
            />
        </div>
        </AccountingLayout>
    );
}
