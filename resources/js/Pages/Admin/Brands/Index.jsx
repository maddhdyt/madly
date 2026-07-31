import React, { useState } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { useForm, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, ArrowLeft, AlertTriangle } from 'lucide-react';
import { createPortal } from 'react-dom';
import ConfirmModal from '../../../Components/ConfirmModal';
import BrandFormSlideOver from './BrandFormSlideOver';
import Pagination from '../../../Components/Pagination';
import useTranslations from '../../../Hooks/useTranslations';

export default function Index({ brands, showToast }) {
    const { t } = useTranslations();
    const { delete: destroy } = useForm();
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, brandId: null, count: 0, brandName: '' });
    const [deleteInput, setDeleteInput] = useState('');

    const handleDeleteClick = (brand) => {
        setDeleteModal({ isOpen: true, brandId: brand.id, brandName: brand.name });
        setDeleteInput('');
    };

    const confirmDelete = () => {
        destroy(route('admin.brands.destroy', deleteModal.brandId), {
            onSuccess: () => {
                setDeleteModal({ isOpen: false, brandId: null, brandName: '' });
                if (showToast) showToast('Brand successfully deleted.');
            },
            onError: () => {
                if (showToast) showToast('Failed to delete brand.');
            },
            preserveScroll: true
        });
    };

    const openCreateForm = () => {
        setSelectedBrand(null);
        setIsSlideOverOpen(true);
    };

    const openEditForm = (brand) => {
        setSelectedBrand(brand);
        setIsSlideOverOpen(true);
    };

    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-300 relative">
            {/* Header Area */}
            <div className="flex items-center justify-between px-8 py-8 border-b border-gray-100 dark:border-gray-800">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{t('Brand Management')}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('Manage all brands and their associated details.')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => router.visit(route('home'))}
                        className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('Back to Dashboard')}
                    </button>
                    <button 
                        onClick={openCreateForm}
                        className="px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        {t('Add Brand')}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-x-auto bg-white dark:bg-gray-900">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                    <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold border-b border-gray-200 dark:border-gray-800">
                        <tr>
                            <th className="px-8 py-4">{t('Brand Logo')}</th>
                            <th className="px-8 py-4">{t('Brand Name')}</th>
                            <th className="px-8 py-4">{t('Description')}</th>
                            <th className="px-8 py-4 text-right">{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                        {brands.data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-8 py-12 text-center text-gray-500 dark:text-gray-400">
                                    {t('No brands found. Create one to get started.')}
                                </td>
                            </tr>
                        ) : (
                            brands.data.map((brand) => (
                                <tr key={brand.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-8 py-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
                                            {brand.logo ? (
                                                <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                                            ) : (
                                                brand.name.charAt(0)
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 font-bold text-gray-900 dark:text-white">{brand.name}</td>
                                    <td className="px-8 py-4 text-gray-500 dark:text-gray-400 max-w-xs truncate">{brand.description || '-'}</td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => openEditForm(brand)}
                                                className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(brand)}
                                                className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                title="Delete Brand"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <Pagination links={brands.links} />
            </div>

            <BrandFormSlideOver 
                isOpen={isSlideOverOpen}
                onClose={() => setIsSlideOverOpen(false)}
                brand={selectedBrand}
                showToast={showToast}
            />

            {/* Confirm Delete Modal */}
            <ConfirmModal 
                isOpen={deleteModal.isOpen} 
                onClose={() => setDeleteModal({ isOpen: false, brandId: null, count: 0, brandName: '' })}
                onConfirm={confirmDelete}
                title={t('Delete Brand?')}
                message={<>Are you sure you want to delete <strong className="text-gray-900 dark:text-white">{deleteModal.brandName}</strong>? This action cannot be undone.</>}
                confirmText={t('Yes, Delete')}
                type="danger"
            />
        </div>
    );
}

Index.layout = page => <MainLayout title="Brands" children={page} />;
