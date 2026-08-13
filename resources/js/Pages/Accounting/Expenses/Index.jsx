import React, { useState } from 'react';
import AccountingLayout from '../../../Layouts/AccountingLayout';
import { Head } from '@inertiajs/react';
import { Plus, Search, CreditCard, Edit2, Trash2, ArrowDownRight } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import ExpenseFormSlideOver from './ExpenseFormSlideOver';
import ConfirmModal from '../../../Components/ConfirmModal';
import { router } from '@inertiajs/react';

export default function Index({ expenses = [], projects = [], cashAccounts = [], categories = [] }) {
    const { t } = useTranslations();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);

    const filteredExpenses = expenses.filter(expense => 
        (expense.description && expense.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (expense.reference_number && expense.reference_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (expense.project?.project_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (expense.expense_category?.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleEdit = (expense) => {
        setSelectedExpense(expense);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setSelectedExpense(null);
        setIsFormOpen(true);
    };

    const handleDelete = (expense) => {
        setExpenseToDelete(expense);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (expenseToDelete) {
            router.delete(route('accounting.expenses.destroy', expenseToDelete.id), {
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
        <AccountingLayout title={t('Expenses')}>
            <Head title={t('Expenses')} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                        {t('Expenses')}
                    </h1>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('Record money actually spent (Actual Money Spent).')}
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('Search expenses...')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
                        />
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-rose-500/20 whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">{t('Record Expense')}</span>
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t('Date')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t('Project / Category')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t('Type')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white text-right">{t('Amount')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t('Status')}</th>
                                <th className="px-6 py-4 font-bold text-gray-900 dark:text-white text-right">{t('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredExpenses.map((expense) => (
                                <tr key={expense.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                        {formatDate(expense.transaction_date)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 dark:text-white">{expense.project?.project_name}</span>
                                            <span className="text-xs font-medium text-gray-500 mt-0.5">{expense.expense_category?.name}</span>
                                            {expense.description && (
                                                <span className="text-xs text-gray-400 max-w-[200px] truncate mt-1">{expense.description}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center">
                                                <CreditCard className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                                            </div>
                                            <span className="text-gray-600 dark:text-gray-400 uppercase text-[11px] font-bold tracking-wider">{expense.expense_type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 font-bold text-gray-900 dark:text-white">
                                            <ArrowDownRight className="w-3.5 h-3.5 text-rose-500" />
                                            {formatIDR(expense.amount)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                            expense.status === 'posted' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' :
                                            expense.status === 'voided' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400' :
                                            'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400'
                                        }`}>
                                            {t(expense.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {expense.expense_type !== 'rule_based' && (
                                                <button onClick={() => handleEdit(expense)} className="p-1.5 text-gray-400 hover:text-emerald-500 transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            )}
                                            {expense.status !== 'voided' && (
                                                <button onClick={() => handleDelete(expense)} className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors" title={t('Void Expense')}>
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredExpenses.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        {t('No expenses found.')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ExpenseFormSlideOver 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                expense={selectedExpense}
                projects={projects}
                cashAccounts={cashAccounts}
                categories={categories}
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title={t('Void Expense')}
                message={t('Are you sure you want to void this transaction? This will reverse the balances.')}
                confirmText={t('Void')}
                isDestructive={true}
            />
        </AccountingLayout>
    );
}
