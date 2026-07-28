import React, { useState } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { useForm, router, Head } from '@inertiajs/react';
import { Plus, Edit2, Trash2, FileText, Image as ImageIcon, ExternalLink, Download } from 'lucide-react';
import BrochureFormSlideOver from './BrochureFormSlideOver';
import ConfirmModal from '../../../Components/ConfirmModal';
import Pagination from '../../../Components/Pagination';
import useCopyToClipboard from '../../../Hooks/useCopyToClipboard';

export default function Index({ brochures, brands, showToast }) {
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
    const [selectedBrochure, setSelectedBrochure] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [brochureToDelete, setBrochureToDelete] = useState(null);

    const handleAddBrochure = () => {
        setSelectedBrochure(null);
        setIsSlideOverOpen(true);
    };

    const handleEditBrochure = (brochure) => {
        setSelectedBrochure(brochure);
        setIsSlideOverOpen(true);
    };

    const handleDelete = (id) => {
        setBrochureToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = () => {
        if (brochureToDelete) {
            router.delete(route('admin.brochures.destroy', brochureToDelete), {
                onSuccess: () => {
                    setIsConfirmModalOpen(false);
                    setBrochureToDelete(null);
                    if (showToast) showToast('Brochure deleted successfully');
                },
                onError: () => {
                    setIsConfirmModalOpen(false);
                    if (showToast) showToast('Failed to delete brochure', 'error');
                }
            });
        }
    };

    const [copiedText, copyToClipboard] = useCopyToClipboard(showToast);

    return (
        <MainLayout title="Brochures / Pricelists">
            <Head title="Brochures" />
            <div className="flex flex-col h-full w-full bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-8 border-b border-gray-100">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Brochures / Pricelists</h1>
                        <p className="text-sm font-medium text-gray-500 mt-2">
                            Manage PDF or Image files for pricelists to share with clients.
                        </p>
                    </div>
                    
                    <button 
                        onClick={handleAddBrochure}
                        className="bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Upload File
                    </button>
                </div>

                {/* Body Area */}
                <div className="flex-1 overflow-y-auto bg-white p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {brochures.data.map((item) => (
                            <div key={item.id} className="border border-gray-200 rounded-2xl p-5 flex flex-col hover:border-gray-300 hover:shadow-md transition-all group bg-white">
                                <div className="w-full h-32 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400 overflow-hidden relative">
                                    {item.file_type === 'image' ? (
                                        <img src={`/storage/${item.file_path}`} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <FileText className="w-10 h-10" />
                                    )}
                                    <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                        <a href={`/storage/${item.file_path}`} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:scale-110 transition-transform">
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                                <h3 className="text-md font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                                <p className="text-xs font-medium text-gray-500 mt-1 mb-4 flex-1">
                                    {item.brand ? `Brand: ${item.brand.name}` : 'General'}
                                </p>
                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleEditBrochure(item)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item.id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => copyToClipboard(`${window.location.origin}/storage/${item.file_path}`)}
                                        className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                        Copy Link
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {brochures.data.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <FileText className="w-16 h-16 text-gray-200 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900">No brochures uploaded</h3>
                            <p className="text-gray-500 mt-2">Upload your first PDF or image pricelist.</p>
                        </div>
                    )}
                    <Pagination links={brochures.links} />
                </div>
            </div>

            <BrochureFormSlideOver 
                isOpen={isSlideOverOpen} 
                onClose={() => setIsSlideOverOpen(false)} 
                brochure={selectedBrochure}
                brands={brands}
                showToast={showToast}
            />

            <ConfirmModal 
                isOpen={isConfirmModalOpen} 
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Brochure"
                message="Are you sure you want to delete this brochure? The file will be permanently removed."
                confirmText="Delete"
            />
        </MainLayout>
    );
}
