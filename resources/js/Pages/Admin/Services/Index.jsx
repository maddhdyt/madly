import React, { useState } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { useForm, router, Head } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Box, Book, Monitor, Server, TrendingUp } from 'lucide-react';
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
            'trending-up': <TrendingUp className="w-5 h-5" />
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
                <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service.id} className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all group bg-white dark:bg-gray-800/50">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex items-center justify-center border border-transparent dark:border-gray-700">
                                        {renderIcon(service.icon)}
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleEditService(service)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(service.id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 dark:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{service.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 flex-1">
                                    {service.description || 'No description provided.'}
                                </p>
                                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500">
                                    <span className="bg-gray-100 dark:bg-gray-900 px-2.5 py-1 rounded-md text-gray-600 dark:text-gray-400">ID: {service.id}</span>
                                    <span>•</span>
                                    <span>{service.slug}</span>
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
