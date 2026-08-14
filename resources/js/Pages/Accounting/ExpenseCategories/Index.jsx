import React, { useState } from 'react';
import AccountingLayout from '../../../Layouts/AccountingLayout';
import { Head } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2, Tag, Layers } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import ExpenseCategoryFormSlideOver from './ExpenseCategoryFormSlideOver';
import ConfirmModal from '../../../Components/ConfirmModal';
import { router } from '@inertiajs/react';

export default function Index({ categories = [] }) {
    const { t } = useTranslations();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const filteredCategories = categories.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (c) => { setSelectedCategory(c); setIsFormOpen(true); };
    const handleCreate = () => { setSelectedCategory(null); setIsFormOpen(true); };
    const handleDelete = (c) => { setCategoryToDelete(c); setDeleteModalOpen(true); };
    const confirmDelete = () => {
        if (categoryToDelete) {
            router.delete(route('accounting.expense-categories.destroy', categoryToDelete.id), { onSuccess: () => setDeleteModalOpen(false) });
        }
    };

    return (
        <AccountingLayout title={t('Expense Categories')}>
            <Head title={t('Expense Categories')} />

            <div className="flex flex-col h-full w-full bg-[#f8f9fa] dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-300 relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 gap-4 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {t('Expense Categories')}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {t('Manage expense types: direct, shared, and rule-based.')}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-4 sm:mt-0">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t('Search categories...')}
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
                            <span className="hidden sm:inline">{t('New Category')}</span>
                        </button>
                    </div>
                </div>

            <div className="flex-1 overflow-x-auto bg-white dark:bg-gray-900">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    <thead className="bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-500 text-[11px] uppercase tracking-widest font-extrabold border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
                        <tr>
                                <th className="px-8 py-4">{t('Category Name')}</th>
                                <th className="px-8 py-4">{t('Type')}</th>
                                <th className="px-8 py-4">{t('Description')}</th>
                                <th className="px-8 py-4">{t('Status')}</th>
                                <th className="px-8 py-4 text-right">{t('Actions')}</th>
                            </tr>
                        </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((c) => (
                                    <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                                    <Tag className="w-4 h-4" />
                                                </div>
                                                <div className="font-bold text-gray-900 dark:text-white">{c.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider ${
                                                c.type === 'direct' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' :
                                                c.type === 'shared' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' :
                                                'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                                            }`}>
                                                {c.type.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                                                {c.description || '-'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider ${
                                                c.is_active
                                                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                                {c.is_active ? t('Active') : t('Inactive')}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(c)}
                                                    className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                                    title={t('Edit')}
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(c)}
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
                                            <Layers className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4" />
                                            <p className="text-lg font-medium">{t('No categories found')}</p>
                                            <p className="text-sm">{t('Create your first expense category to get started.')}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                </table>
            </div>

            <ExpenseCategoryFormSlideOver
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                category={selectedCategory}
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                title={t('Delete Category')}
                message={t('Are you sure you want to delete this category? This action cannot be undone.')}
                confirmText={t('Delete')}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                type="danger"
            />
        </div>
        </AccountingLayout>
    );
}
