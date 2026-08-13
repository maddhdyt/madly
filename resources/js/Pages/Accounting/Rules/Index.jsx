import React, { useState } from 'react';
import AccountingLayout from '../../../Layouts/AccountingLayout';
import { Head } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2, Percent, DollarSign, History, ToggleLeft, ToggleRight } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import RuleFormSlideOver from './RuleFormSlideOver';
import ConfirmModal from '../../../Components/ConfirmModal';
import { router } from '@inertiajs/react';

export default function Index({ rules = [], categories = [] }) {
    const { t } = useTranslations();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [ruleToDelete, setRuleToDelete] = useState(null);

    const filteredRules = rules.filter(rule =>
        rule.rule_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (rule.expense_category?.name && rule.expense_category.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleEdit = (rule) => { setSelectedRule(rule); setIsFormOpen(true); };
    const handleCreate = () => { setSelectedRule(null); setIsFormOpen(true); };
    const handleDelete = (rule) => { setRuleToDelete(rule); setDeleteModalOpen(true); };
    const confirmDelete = () => {
        if (ruleToDelete) {
            router.delete(route('accounting.rules.destroy', ruleToDelete.id), { onSuccess: () => setDeleteModalOpen(false) });
        }
    };

    const getCurrentValue = (rule) => {
        if (!rule.versions || rule.versions.length === 0) return null;
        // versions are sorted desc by effective_from from backend
        const today = new Date().toISOString().split('T')[0];
        const active = rule.versions.find(v => {
            const from = v.effective_from?.split('T')[0];
            const until = v.effective_until?.split('T')[0];
            return from <= today && (!until || until >= today);
        });
        return active || rule.versions[0];
    };

    return (
        <AccountingLayout title={t('Calculation Rules')}>
            <Head title={t('Calculation Rules')} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                        {t('Calculation Rules')}
                    </h1>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('Manage dynamic expense rules like Advertising %, Bonus %, etc.')}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder={t('Search rules...')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white" />
                    </div>
                    <button onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-emerald-500/20 whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">{t('New Rule')}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRules.map((rule) => {
                    const currentVersion = getCurrentValue(rule);
                    const isPercentage = rule.calculation_type === 'percentage_of_revenue';
                    
                    return (
                        <div key={rule.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow relative group">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(rule)} className="p-1.5 text-gray-400 hover:text-emerald-500 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(rule)} className="p-1.5 text-gray-400 hover:text-rose-500 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-start gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${
                                    isPercentage 
                                        ? 'bg-violet-50 dark:bg-violet-900/30 border-violet-100 dark:border-violet-800/50' 
                                        : 'bg-amber-50 dark:bg-amber-900/30 border-amber-100 dark:border-amber-800/50'
                                }`}>
                                    {isPercentage 
                                        ? <Percent className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                                        : <DollarSign className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                    }
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1 pr-16 truncate">
                                        {rule.rule_name}
                                    </h3>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                            {rule.expense_category?.name || 'N/A'}
                                        </span>
                                        {rule.is_active ? (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                                <ToggleRight className="w-3.5 h-3.5" /> {t('Active')}
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                                                <ToggleLeft className="w-3.5 h-3.5" /> {t('Inactive')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {rule.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{rule.description}</p>
                            )}

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{t('Current Value')}</span>
                                        <span className="text-2xl font-black text-gray-900 dark:text-white">
                                            {currentVersion
                                                ? (isPercentage ? `${parseFloat(currentVersion.value)}%` : `Rp ${parseFloat(currentVersion.value).toLocaleString('id-ID')}`)
                                                : '—'
                                            }
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                                        <History className="w-3.5 h-3.5" />
                                        {rule.versions ? rule.versions.length : 0} {t('versions')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {filteredRules.length === 0 && (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 border-dashed">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <Percent className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t('No rules found')}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{t('Create your first calculation rule to get started.')}</p>
                    </div>
                )}
            </div>

            <RuleFormSlideOver isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} rule={selectedRule} categories={categories} />

            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title={t('Delete Rule')}
                message={t('Are you sure you want to delete this calculation rule? This action cannot be undone.')}
                confirmText={t('Delete')}
                isDestructive={true}
            />
        </AccountingLayout>
    );
}
