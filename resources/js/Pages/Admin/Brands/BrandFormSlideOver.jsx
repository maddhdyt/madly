import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, UploadCloud } from 'lucide-react';

export default function BrandFormSlideOver({ isOpen, onClose, brand, showToast }) {
    const isEdit = !!brand;
    const [mounted, setMounted] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        description: '',
        logo: null,
        _method: isEdit ? 'put' : 'post'
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (brand) {
                setData({
                    name: brand.name || '',
                    description: brand.description || '',
                    logo: null,
                    _method: 'put'
                });
            } else {
                setData({
                    name: '',
                    description: '',
                    logo: null,
                    _method: 'post'
                });
            }
        }
    }, [isOpen, brand]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route('admin.brands.update', brand.id), {
                preserveScroll: true,
                onSuccess: () => {
                    if (showToast) showToast('Brand updated successfully!');
                    onClose();
                },
                onError: () => {
                    if (showToast) showToast('Failed to update brand. Please check the inputs.');
                },
                forceFormData: true,
            });
        } else {
            post(route('admin.brands.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    if (showToast) showToast('Brand created successfully!');
                    onClose();
                },
                onError: () => {
                    if (showToast) showToast('Failed to create brand. Please check the inputs.');
                },
                forceFormData: true,
            });
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setData('logo', e.dataTransfer.files[0]);
        }
    };

    const labelClass = "block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 ml-1";
    const inputClass = "w-full bg-[#f4f5f5] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:bg-white dark:focus:bg-gray-800 transition-all";

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity animate-fade-in" 
                onClick={onClose}
            ></div>
            
            {/* Panel */}
            <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-full animate-slide-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{isEdit ? 'Edit Brand' : 'Add New Brand'}</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Configure brand details.</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-none bg-[#f8f9fa] dark:bg-black">
                    <form id="brand-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                        
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className={labelClass}>Brand Name</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder="e.g., Turnitin"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Description</label>
                                    <textarea 
                                        className={inputClass}
                                        placeholder="Short description about the brand..."
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows="3"
                                    ></textarea>
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Brand Logo</label>
                                    
                                    {data.logo || (isEdit && brand.logo) ? (
                                        <div 
                                            className={`mt-1 relative group w-full h-56 rounded-2xl overflow-hidden border-2 transition-all ${isDragging ? 'border-gray-900 dark:border-white scale-[0.98]' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 flex items-center justify-center`}
                                            onDragEnter={handleDragEnter}
                                            onDragLeave={handleDragLeave}
                                            onDragOver={handleDragOver}
                                            onDrop={handleDrop}
                                        >
                                            <img 
                                                src={data.logo ? URL.createObjectURL(data.logo) : brand.logo} 
                                                alt="Logo preview" 
                                                className="w-full h-full object-contain p-2"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center backdrop-blur-[2px]">
                                                <label htmlFor="file-upload" className="cursor-pointer px-5 py-2.5 bg-white text-gray-900 rounded-xl font-bold text-sm shadow-xl hover:scale-105 hover:bg-gray-50 transition-all flex items-center gap-2">
                                                    <UploadCloud className="w-4 h-4" strokeWidth={2.5} />
                                                    Change Image
                                                    <input id="file-upload" type="file" className="sr-only" onChange={e => setData('logo', e.target.files[0])} accept="image/*" />
                                                </label>
                                                <p className="text-white/80 text-xs mt-3 font-medium">or drag a new file here</p>
                                            </div>
                                            
                                            {/* Dragging Overlay */}
                                            {isDragging && (
                                                <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center backdrop-blur-sm z-10">
                                                    <div className="text-center">
                                                        <UploadCloud className="w-10 h-10 text-white mx-auto mb-2 animate-bounce" />
                                                        <p className="text-white font-bold text-sm">Drop to replace!</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div 
                                            className={`mt-1 flex justify-center px-6 py-10 border-2 border-dashed rounded-2xl transition-all ${isDragging ? 'border-gray-900 dark:border-white bg-gray-100 dark:bg-gray-700 scale-[0.98]' : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-800'}`}
                                            onDragEnter={handleDragEnter}
                                            onDragLeave={handleDragLeave}
                                            onDragOver={handleDragOver}
                                            onDrop={handleDrop}
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className="w-14 h-14 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-transform group-hover:scale-110">
                                                    <UploadCloud className={`h-6 w-6 transition-colors ${isDragging ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`} strokeWidth={2} />
                                                </div>
                                                <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center items-center">
                                                    <label htmlFor="file-upload-empty" className="relative cursor-pointer rounded-md font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                                                        <span>Click to upload</span>
                                                        <input id="file-upload-empty" type="file" className="sr-only" onChange={e => setData('logo', e.target.files[0])} accept="image/*" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mt-2">PNG, JPG, SVG (Max. 2MB)</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {errors.logo && <p className="text-red-500 text-xs mt-2 font-medium">{errors.logo}</p>}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 z-10">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        form="brand-form" 
                        disabled={processing} 
                        className="px-8 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm disabled:opacity-70 transition-colors"
                    >
                        <Save className="w-4 h-4" /> 
                        {processing ? 'Saving...' : 'Save Brand'}
                    </button>
                </div>
            </div>
            
            {/* Custom Animation CSS inline for simplicity */}
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-slide-in {
                    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-fade-in {
                    animation: fadeIn 0.2s ease-out forwards;
                }
            `}</style>
        </div>,
        document.body
    );
}
