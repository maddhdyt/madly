import React, { useState } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { useForm, router, Head } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Box, Book, Monitor, Server, TrendingUp, Briefcase, Code, PenTool, Award, Shield, Globe, Camera, Palette, Database, Layers } from 'lucide-react';
import ServiceFormSlideOver from './ServiceFormSlideOver';

export default function Index({ services }) {
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const handleAddService = () => {
        setSelectedService(null);
        setIsSlideOverOpen(true);
    };

    const handleEditService = (service) => {
        setSelectedService(service);
        setIsSlideOverOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this service type? Products connected to it will lose their type association.')) {
            router.delete(route('admin.services.destroy', id));
        }
    };

    const renderIcon = (iconName) => {
        const icons = {
            'book': <Book className="w-5 h-5" />,
            'monitor': <Monitor className="w-5 h-5" />,
            'server': <Server className="w-5 h-5" />,
            'trending-up': <TrendingUp className="w-5 h-5" />,
            'briefcase': <Briefcase className="w-5 h-5" />,
            'code': <Code className="w-5 h-5" />,
            'pen-tool': <PenTool className="w-5 h-5" />,
            'award': <Award className="w-5 h-5" />,
            'shield': <Shield className="w-5 h-5" />,
            'globe': <Globe className="w-5 h-5" />,
            'camera': <Camera className="w-5 h-5" />,
            'palette': <Palette className="w-5 h-5" />,
            'database': <Database className="w-5 h-5" />,
            'layers': <Layers className="w-5 h-5" />
        };
        return icons[iconName] || <Box className="w-5 h-5" />;
    };

    return (
        <MainLayout title="Service Types">
            <Head title="Service Types" />
            <div className="flex flex-col h-full w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-300">
                {/* Header Area */}
                <div className="flex items-center justify-between px-8 py-8 border-b border-gray-100 dark:border-gray-800">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Service Types</h1>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
                            Manage the templates and configurations for your product offerings.
                        </p>
                    </div>
                    
                    <button 
                        onClick={handleAddService}
                        className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-full font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Service Type
                    </button>
                </div>

                {/* Body Area */}
                <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
                    <div className="flex flex-col">
                        {services.map((service, idx) => (
                            <div 
                                key={service.id} 
                                className={`flex items-center justify-between p-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all group ${idx !== services.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                            >
                                <div className="flex items-center gap-5 flex-1 min-w-0">
                                    <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 flex items-center justify-center border border-gray-200/50 dark:border-gray-800">
                                        {renderIcon(service.icon)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-[15px] font-bold text-gray-900 dark:text-white truncate">{service.name}</h3>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate pr-4">
                                            {service.description || 'No description provided.'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 ml-4">
                                    <button 
                                        onClick={() => handleEditService(service)}
                                        className="p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 transition-colors shadow-sm"
                                        title="Edit Service"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(service.id)}
                                        className="p-2.5 bg-white dark:bg-gray-800 border border-red-100 dark:border-red-900/50 rounded-xl hover:border-red-300 dark:hover:border-red-700 text-red-500 dark:text-red-400 transition-colors shadow-sm"
                                        title="Delete Service"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {services.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Box className="w-16 h-16 text-gray-200 dark:text-gray-700 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No service types found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Create your first service type to start selling.</p>
                        </div>
                    )}
                </div>
            </div>

            <ServiceFormSlideOver 
                isOpen={isSlideOverOpen} 
                onClose={() => setIsSlideOverOpen(false)} 
                service={selectedService} 
            />
        </MainLayout>
    );
}
