import React, { useState } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { useForm, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import PricelistFormSlideOver from './PricelistFormSlideOver';

export default function Index({ prices, products }) {
    const { delete: destroy } = useForm();
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState(null);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this price package?')) {
            destroy(route('admin.pricelists.destroy', id));
        }
    };

    const openCreateForm = () => {
        setSelectedPrice(null);
        setIsSlideOverOpen(true);
    };

    const openEditForm = (price) => {
        setSelectedPrice(price);
        setIsSlideOverOpen(true);
    };

    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-300">
            {/* Header Area */}
            <div className="flex items-center justify-between px-8 py-8 border-b border-gray-100 dark:border-gray-800">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Pricelist Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage individual pricing packages across all products.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => router.visit(route('home'))}
                        className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </button>
                    <button 
                        onClick={openCreateForm}
                        className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Package
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-x-auto bg-white dark:bg-gray-900">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                    <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold border-b border-gray-200 dark:border-gray-800">
                        <tr>
                            <th className="px-8 py-4">Brand</th>
                            <th className="px-8 py-4">Product Name</th>
                            <th className="px-8 py-4">Package Name</th>
                            <th className="px-8 py-4">Normal Price</th>
                            <th className="px-8 py-4">Promo Price</th>
                            <th className="px-8 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                        {prices.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-8 py-12 text-center text-gray-500 dark:text-gray-400">
                                    No price packages found. Create one to get started.
                                </td>
                            </tr>
                        ) : (
                            prices.map((price) => (
                                <tr key={price.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-8 py-4 font-bold text-gray-900 dark:text-white">{price.product?.brand?.name || '-'}</td>
                                    <td className="px-8 py-4 font-bold text-gray-900 dark:text-white">{price.product?.name || '-'}</td>
                                    <td className="px-8 py-4 font-medium">{price.package_name}</td>
                                    <td className="px-8 py-4">Rp {parseInt(price.normal_price).toLocaleString('id-ID')}</td>
                                    <td className="px-8 py-4">
                                        {price.promo_price ? (
                                            <span className="text-red-600 dark:text-red-400 font-bold">
                                                Rp {parseInt(price.promo_price).toLocaleString('id-ID')}
                                            </span>
                                        ) : '-'}
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => openEditForm(price)}
                                                className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(price.id)}
                                                className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
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

            <PricelistFormSlideOver 
                isOpen={isSlideOverOpen}
                onClose={() => setIsSlideOverOpen(false)}
                price={selectedPrice}
                products={products}
            />
        </div>
    );
}

Index.layout = page => <MainLayout children={page} />;
