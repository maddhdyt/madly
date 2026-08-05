import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, AlertCircle, Briefcase } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import MarketingLayout from '../../../Layouts/MarketingLayout';
import BrandFormSlideOver from './BrandFormSlideOver';

export default function Index({ brands, showToast }) {
    const { t } = useTranslations();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const handleDelete = (id) => {
        if (confirm(t('Are you sure you want to delete this Brand?'))) {
            router.delete(route('marketing.brands.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    if (showToast) showToast(t('Brand deleted successfully.'));
                }
            });
        }
    };

    const openForm = (brand = null) => {
        setSelectedBrand(brand);
        setIsFormOpen(true);
    };

    return (
        <>
            <Head title={t('Marketing Brands')} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('Marketing Brands')}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('Manage brands specifically for marketing campaigns.')}</p>
                </div>
                <button
                    onClick={() => openForm()}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold text-sm hover:bg-black dark:hover:bg-gray-100 transition-colors shadow-sm shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    <span>{t('New Brand')}</span>
                </button>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                        <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">
                            <tr>
                                <th className="px-6 py-4">{t('Brand Name')}</th>
                                <th className="px-6 py-4 text-center">{t('Status')}</th>
                                <th className="px-6 py-4 text-right">{t('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                            {brands.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                                            <AlertCircle className="w-8 h-8 mb-3 opacity-50" />
                                            <p className="font-bold text-sm">{t('No brands recorded yet.')}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                brands.map((brand) => (
                                    <tr key={brand.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors group">
                                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                <Briefcase className="w-4 h-4 text-gray-500" />
                                            </div>
                                            {brand.name}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                                brand.is_active 
                                                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' 
                                                : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                                            }`}>
                                                {brand.is_active ? t('Active') : t('Inactive')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openForm(brand)}
                                                    className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(brand.id)}
                                                    className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
                </div>
            </div>

            <BrandFormSlideOver 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                brand={selectedBrand}
                showToast={showToast}
            />
        </>
    );
}

Index.layout = page => <MarketingLayout title="Brands">{page}</MarketingLayout>;
