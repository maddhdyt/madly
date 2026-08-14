import React, { useState } from 'react';
import AccountingLayout from '../../../Layouts/AccountingLayout';
import { Head } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2, Network, FileText, Calendar } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import SchemeFormSlideOver from './SchemeFormSlideOver';
import ConfirmModal from '../../../Components/ConfirmModal';
import { router } from '@inertiajs/react';

export default function SchemesIndex({ schemes = [], projects = [], participants = [] }) {
    const { t } = useTranslations();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedScheme, setSelectedScheme] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [schemeToDelete, setSchemeToDelete] = useState(null);

    const filteredSchemes = schemes.filter(s =>
        s.scheme_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.project?.project_name && s.project.project_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleEdit = (s) => { setSelectedScheme(s); setIsFormOpen(true); };
    const handleCreate = () => { setSelectedScheme(null); setIsFormOpen(true); };
    const handleDelete = (s) => { setSchemeToDelete(s); setDeleteModalOpen(true); };
    const confirmDelete = () => {
        if (schemeToDelete) {
            router.delete(route('accounting.profit-sharing-schemes.destroy', schemeToDelete.id), { onSuccess: () => setDeleteModalOpen(false) });
        }
    };

    return (
        <AccountingLayout title={t('Profit Sharing Schemes')}>
            <Head title={t('Profit Sharing Schemes')} />

            <div className="flex flex-col h-full w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-300 relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-8 border-b border-gray-100 dark:border-gray-800">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {t('Profit Sharing Schemes')}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {t('Configure how distributable profit is divided among participants.')}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 mt-4 sm:mt-0">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t('Search schemes...')}
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
                            <span className="hidden sm:inline">{t('New Scheme')}</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-[#f8f9fa] dark:bg-black p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSchemes.length > 0 ? (
                    filteredSchemes.map((scheme) => (
                        <div key={scheme.id} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col group hover:border-gray-300 dark:hover:border-gray-700 transition-colors shadow-sm relative overflow-hidden">
                            {!scheme.is_active && (
                                <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                    {t('Inactive')}
                                </div>
                            )}

                            <div className="flex items-center gap-3 mb-4 pr-16">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                                    <Network className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{scheme.scheme_name}</h3>
                                    {scheme.project && (
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                                            <FileText className="w-3.5 h-3.5" />
                                            <span className="truncate">{scheme.project.project_name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {(scheme.effective_from || scheme.effective_until) && (
                                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>
                                        {scheme.effective_from || 'Always'} &rarr; {scheme.effective_until || 'Forever'}
                                    </span>
                                </div>
                            )}

                            <div className="flex-1 space-y-2.5">
                                {scheme.items?.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400 truncate pr-4">{item.participant?.name || 'Unknown'}</span>
                                        <span className="font-bold text-gray-900 dark:text-white shrink-0">{Number(item.share_percentage)}%</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-2">
                                <button
                                    onClick={() => handleEdit(scheme)}
                                    className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                    title={t('Edit')}
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(scheme)}
                                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title={t('Delete')}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-16 flex flex-col items-center justify-center border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-white/50 dark:bg-[#111]/50">
                        <Network className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4" />
                        <p className="text-lg font-medium text-gray-900 dark:text-white">{t('No schemes found')}</p>
                        <p className="text-sm text-gray-500">{t('Create a profit sharing scheme to get started.')}</p>
                    </div>
                )}
            </div>
            </div>
            </div>

            <SchemeFormSlideOver
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                scheme={selectedScheme}
                projects={projects}
                participants={participants}
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                title={t('Delete Scheme')}
                message={t('Are you sure you want to delete this scheme? This action cannot be undone.')}
                confirmText={t('Delete')}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                type="danger"
            />
        </AccountingLayout>
    );
}
