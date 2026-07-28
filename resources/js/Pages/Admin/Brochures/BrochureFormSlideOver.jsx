import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, UploadCloud } from 'lucide-react';
import CustomSelect from '../../../Components/CustomSelect';

export default function BrochureFormSlideOver({ isOpen, onClose, brochure, brands = [], showToast }) {
    const isEdit = !!brochure;
    const [mounted, setMounted] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, processing, errors, reset, clearErrors, progress } = useForm({
        title: '',
        brand_id: '',
        file: null,
        _method: 'POST'
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (brochure) {
                setData({
                    title: brochure.title || '',
                    brand_id: brochure.brand_id || '',
                    file: null, // Don't pre-populate file input
                    _method: 'PUT' // Use PUT override for forms with files in Laravel
                });
            } else {
                reset();
                setData('_method', 'POST');
            }
        }
    }, [isOpen, brochure]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Laravel cannot handle PUT requests with multipart/form-data natively without method spoofing.
        if (isEdit) {
            post(route('admin.brochures.update', brochure.id), {
                forceFormData: true,
                onSuccess: () => {
                    onClose();
                    if (showToast) showToast('Brochure updated successfully');
                },
                onError: (err) => {
                    const firstError = Object.values(err)[0];
                    if (showToast) showToast(firstError || 'Failed to update brochure', 'error');
                }
            });
        } else {
            post(route('admin.brochures.store'), {
                forceFormData: true,
                onSuccess: () => {
                    onClose();
                    if (showToast) showToast('Brochure uploaded successfully');
                },
                onError: (err) => {
                    const firstError = Object.values(err)[0];
                    if (showToast) showToast(firstError || 'Failed to upload brochure', 'error');
                }
            });
        }
    };

    const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1";
    const inputClass = "w-full bg-[#f4f5f5] border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all";

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity animate-fade-in" onClick={onClose}></div>
            
            <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in">
                <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-gray-100 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{isEdit ? 'Edit Brochure' : 'Upload Brochure'}</h2>
                        <p className="text-xs text-gray-500 mt-1">Upload PDF or Image pricelist.</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-none bg-[#f8f9fa]">
                    <form id="brochure-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <div className="grid grid-cols-1 gap-5">
                                
                                <div>
                                    <label className={labelClass}>File (PDF / Image)</label>
                                    <div 
                                        className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-[#f4f5f5] hover:bg-gray-100 transition-colors cursor-pointer"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                        <span className="text-sm font-bold text-gray-600">
                                            {data.file ? data.file.name : (isEdit ? 'Click to replace file (Optional)' : 'Click to select file')}
                                        </span>
                                        <span className="text-xs text-gray-400 mt-1">Max size: 10MB</span>
                                        <input 
                                            ref={fileInputRef}
                                            type="file" 
                                            className="hidden" 
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={e => setData('file', e.target.files[0])}
                                            required={!isEdit}
                                        />
                                    </div>
                                    {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                                    {progress && (
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                            <div className="bg-gray-900 h-2 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className={labelClass}>Title / Name</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder="e.g., Pricelist 2026 v1"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        required
                                    />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Associated Brand (Optional)</label>
                                    <CustomSelect 
                                        className="py-3 px-4 bg-[#f4f5f5] dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm font-medium"
                                        value={data.brand_id}
                                        onChange={e => setData('brand_id', e.target.value)}
                                        options={[
                                            { value: '', label: 'General (No Brand)' },
                                            ...brands.map(b => ({ value: b.id, label: b.name }))
                                        ]}
                                    />
                                    {errors.brand_id && <p className="text-red-500 text-xs mt-1">{errors.brand_id}</p>}
                                </div>
                                
                            </div>
                        </div>
                    </form>
                </div>

                <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-3 z-10">
                    <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" form="brochure-form" disabled={processing} className="px-8 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black flex items-center gap-2 shadow-sm disabled:opacity-70">
                        <Save className="w-4 h-4" /> 
                        {processing ? 'Uploading...' : 'Save Brochure'}
                    </button>
                </div>
            </div>
            
            <style>{`
                @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-slide-in { animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
            `}</style>
        </div>,
        document.body
    );
}
