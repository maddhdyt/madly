import React, { useState } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { useForm, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import ProductFormSlideOver from './ProductFormSlideOver';

export default function Index({ products, brands }) {
    const { delete: destroy } = useForm();
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            destroy(route('admin.products.destroy', id));
        }
    };

    const openCreateForm = () => {
        setSelectedProduct(null);
        setIsSlideOverOpen(true);
    };

    const openEditForm = (product) => {
        setSelectedProduct(product);
        setIsSlideOverOpen(true);
    };

    return (
        <div className="flex flex-col h-full w-full bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header Area */}
            <div className="flex items-center justify-between px-8 py-8 border-b border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Product Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all your products, packages, and pricing.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => router.visit(route('home'))}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </button>
                    <button 
                        onClick={openCreateForm}
                        className="px-4 py-2 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black flex items-center gap-2 shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Content Area (Flat, Full-width Table) */}
            <div className="flex-1 overflow-x-auto bg-white">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider font-bold border-b border-gray-200">
                        <tr>
                            <th className="px-8 py-4">Brand</th>
                            <th className="px-8 py-4">Product Name</th>
                            <th className="px-8 py-4">Category</th>
                            <th className="px-8 py-4">Packages</th>
                            <th className="px-8 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-8 py-12 text-center text-gray-500">
                                    No products found. Create one to get started.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-8 py-4 font-bold text-gray-900">{product.brand.name}</td>
                                    <td className="px-8 py-4 font-bold text-gray-900">{product.name}</td>
                                    <td className="px-8 py-4">
                                        <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                                            {product.category || '-'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-4 font-medium">{product.prices.length} pkgs</td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => openEditForm(product)}
                                                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

            <ProductFormSlideOver 
                isOpen={isSlideOverOpen}
                onClose={() => setIsSlideOverOpen(false)}
                product={selectedProduct}
                brands={brands}
            />
        </div>
    );
}

Index.layout = page => <MainLayout children={page} />;
