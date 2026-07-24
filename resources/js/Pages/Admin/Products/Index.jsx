import React, { useState } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { useForm, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, ArrowLeft, Filter, Eye, X, Tag } from 'lucide-react';
import { createPortal } from 'react-dom';
import ProductFormSlideOver from './ProductFormSlideOver';

// Specs Modal Component
const SpecsModal = ({ isOpen, onClose, product, service }) => {
    if (!isOpen || !product) return null;

    const attributes = product.attributes || {};
    const hasAttributes = Object.keys(attributes).length > 0;
    
    // We use the service schema to order and label things if available
    const schema = service?.product_schema || [];

    const renderValue = (val, type) => {
        if (!val) return null;
        
        if (type === 'url') {
            return (
                <a 
                    href={val.startsWith('http') ? val : `https://${val}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1.5 text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 font-bold transition-colors underline-offset-4 underline hover:no-underline break-words"
                >
                    {val}
                    <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
            );
        }
        
        if (type === 'tags') {
            const tags = val.split(',').map(t => t.trim()).filter(t => t);
            if (tags.length === 0) return val;
            
            return (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            );
        }
        
        return (
            <span className="text-sm font-semibold text-gray-900 dark:text-white break-words leading-relaxed whitespace-pre-wrap">
                {val}
            </span>
        );
    };

    return createPortal(
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-fade-in" onClick={onClose}></div>
            
            <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <Tag className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                Product Specifications
                            </h3>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">{product.name}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-0 max-h-[60vh] overflow-y-auto scrollbar-none">
                    {!hasAttributes ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400 italic text-sm">
                            No custom specifications for this product.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {/* Priority render based on Schema */}
                            {schema.length > 0 ? (
                                schema.map(field => {
                                    const val = attributes[field.name];
                                    if (!val) return null;
                                    return (
                                        <div key={field.name} className="flex flex-col gap-2 px-8 py-5 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                                            <span className="font-bold text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                                {field.label}
                                            </span>
                                            {renderValue(val, field.type)}
                                        </div>
                                    );
                                })
                            ) : (
                                /* Fallback if no schema is defined but attributes exist */
                                Object.entries(attributes).map(([key, val]) => {
                                    if (!val) return null;
                                    const formattedKey = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                                    return (
                                        <div key={key} className="flex flex-col gap-2 px-8 py-5 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                                            <span className="font-bold text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                                {formattedKey}
                                            </span>
                                            {renderValue(val, 'text')}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>
                
                <div className="px-8 py-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2.5 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 transition-colors">
                        Close
                    </button>
                </div>
            </div>
            
            <style>{`
                @keyframes scaleIn { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-scale-in { animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
            `}</style>
        </div>,
        document.body
    );
};

export default function Index({ products, services, showToast }) {
    const { delete: destroy } = useForm();
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedServiceFilter, setSelectedServiceFilter] = useState('all');
    
    // Modal state
    const [isSpecsModalOpen, setIsSpecsModalOpen] = useState(false);
    const [viewSpecsProduct, setViewSpecsProduct] = useState(null);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            destroy(route('admin.products.destroy', id), {
                onSuccess: () => {
                    if (showToast) showToast('Product deleted successfully');
                },
                onError: (errors) => {
                    if (showToast) showToast(errors.error || 'Failed to delete product', 'error');
                }
            });
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

    const openSpecsModal = (product) => {
        setViewSpecsProduct(product);
        setIsSpecsModalOpen(true);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const filteredProducts = selectedServiceFilter === 'all' 
        ? products 
        : products.filter(p => p.service_id == selectedServiceFilter);

    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-300">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-8 py-8 border-b border-gray-100 dark:border-gray-800 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Product Management (Master Data)</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage global product catalog and their base HPP.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button 
                        onClick={() => router.visit(route('home'))}
                        className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    
                    {/* Dropdown Filter replacing Tabs */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="w-4 h-4 text-gray-400" />
                        </div>
                        <select
                            value={selectedServiceFilter}
                            onChange={(e) => setSelectedServiceFilter(e.target.value)}
                            className="appearance-none pl-9 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 cursor-pointer transition-colors"
                        >
                            <option value="all">All Services</option>
                            {services.map(service => (
                                <option key={service.id} value={service.id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    <button 
                        onClick={openCreateForm}
                        className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-x-auto bg-white dark:bg-gray-900">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    <thead className="bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-500 text-[11px] uppercase tracking-widest font-extrabold border-b border-gray-100 dark:border-gray-800">
                        <tr>
                            <th className="px-8 py-5">Service Category</th>
                            <th className="px-8 py-5">Product Name</th>
                            <th className="px-8 py-5">Base HPP</th>
                            <th className="px-8 py-5">Status</th>
                            <th className="px-8 py-5 text-center">Specifications</th>
                            <th className="px-8 py-5 text-right sticky right-0 bg-white dark:bg-gray-900 z-10">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="100%" className="px-8 py-16 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <Box className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                                        <p className="text-gray-500 dark:text-gray-400 font-medium">No products found in this category.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border border-transparent dark:border-gray-700">
                                            {product.service?.name || '-'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 font-bold text-gray-900 dark:text-white">
                                        {product.name}
                                    </td>
                                    <td className="px-8 py-5 font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(product.hpp)}
                                    </td>
                                    <td className="px-8 py-5">
                                        {product.status_note ? (
                                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                                                {product.status_note}
                                            </span>
                                        ) : '-'}
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <button 
                                            onClick={() => openSpecsModal(product)}
                                            className="inline-flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 rounded-lg transition-colors border border-transparent group-hover:border-gray-200 dark:group-hover:border-gray-700 shadow-sm"
                                            title="View Specifications"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                    <td className="px-8 py-5 text-right sticky right-0 bg-white dark:bg-gray-900 group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50 transition-colors">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => openEditForm(product)}
                                                className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                title="Edit Product"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                title="Delete Product"
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
                services={services}
                showToast={showToast}
            />

            <SpecsModal 
                isOpen={isSpecsModalOpen}
                onClose={() => setIsSpecsModalOpen(false)}
                product={viewSpecsProduct}
                service={viewSpecsProduct ? services.find(s => s.id === viewSpecsProduct.service_id) : null}
            />
        </div>
    );
}

Index.layout = page => <MainLayout children={page} />;
