import React, { useState } from 'react';
import AccountingLayout from '../../../Layouts/AccountingLayout';
import { Head, Link } from '@inertiajs/react';
import { Plus, Search, FileText, ArrowRight, Activity, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import ProjectFormSlideOver from './ProjectFormSlideOver';
import ConfirmModal from '../../../Components/ConfirmModal';
import { router } from '@inertiajs/react';

export default function Index({ projects = [] }) {
    const { t } = useTranslations();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const filteredProjects = projects.filter(project => 
        project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleEdit = (project) => {
        setSelectedProject(project);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setSelectedProject(null);
        setIsFormOpen(true);
    };

    const handleDelete = (project) => {
        setProjectToDelete(project);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (projectToDelete) {
            router.delete(route('accounting.projects.destroy', projectToDelete.id), {
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

    return (
        <AccountingLayout title={t('Projects')}>
            <Head title={t('Projects')} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                        {t('Projects')}
                    </h1>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('Manage accounting projects and their balances.')}
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('Search projects...')}
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
                        <span className="hidden sm:inline">{t('New Project')}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow relative group">
                        
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(project)} className="p-1.5 text-gray-400 hover:text-emerald-500 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(project)} className="p-1.5 text-gray-400 hover:text-rose-500 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center border border-emerald-100 dark:border-emerald-800/50 shrink-0">
                                <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1 pr-12">
                                    {project.project_name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                        project.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' :
                                        project.status === 'completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
                                        'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400'
                                    }`}>
                                        {t(project.status)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 min-h-[40px]">
                            {project.description || t('No description provided.')}
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div>
                                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                    {t('Balance')}
                                </span>
                                <span className="font-bold text-gray-900 dark:text-white">
                                    {formatIDR(project.current_balance)}
                                </span>
                            </div>
                            <div>
                                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                    {t('Total Budget')}
                                </span>
                                <span className="font-bold text-gray-900 dark:text-white">
                                    {formatIDR(project.total_budget)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                
                {filteredProjects.length === 0 && (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 border-dashed">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t('No projects found')}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{t('Try adjusting your search or add a new project.')}</p>
                    </div>
                )}
            </div>

            <ProjectFormSlideOver 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                project={selectedProject} 
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title={t('Delete Project')}
                message={t('Are you sure you want to delete this project? This action cannot be undone.')}
                confirmText={t('Delete')}
                isDestructive={true}
            />
        </AccountingLayout>
    );
}
