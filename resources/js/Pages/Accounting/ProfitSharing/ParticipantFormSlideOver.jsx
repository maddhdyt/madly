import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, Users, Type, Phone, FileText } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';

export default function ParticipantFormSlideOver({ isOpen, onClose, participant }) {
    const { t } = useTranslations();
    const isEditing = !!participant;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        type: 'Company', // Company, Partner, Employee, Other
        contact_info: '',
        notes: '',
        is_active: true,
    });

    useEffect(() => {
        if (isOpen) {
            if (isEditing) {
                setData({
                    name: participant.name,
                    type: participant.type,
                    contact_info: participant.contact_info || '',
                    notes: participant.notes || '',
                    is_active: participant.is_active,
                });
            } else {
                reset();
            }
            clearErrors();
        }
    }, [isOpen, participant]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const options = {
            onSuccess: () => {
                onClose();
                reset();
            },
            preserveScroll: true
        };

        if (isEditing) {
            put(route('accounting.profit-participants.update', participant.id), options);
        } else {
            post(route('accounting.profit-participants.store'), options);
        }
    };

    const labelClass = "block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 ml-1";
    const inputClass = "w-full bg-[#f4f5f5] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:bg-white dark:focus:bg-gray-800 transition-all";

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity animate-fade-in" 
                onClick={onClose}
            ></div>
            
            {/* Panel */}
            <div className="relative w-full max-w-sm md:max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-full animate-slide-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {isEditing ? t('Edit Participant') : t('New Participant')}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {t('Configure profit sharing recipient details')}
                        </p>
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
                    <form id="participant-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className={labelClass}>
                                        <Users className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Participant Name')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={inputClass}
                                        placeholder={t('e.g., CV Aksara Nusa Meditama')}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <Type className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Type')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value)}
                                        className={`${inputClass} appearance-none`}
                                    >
                                        <option value="Company">Company</option>
                                        <option value="Partner">Partner</option>
                                        <option value="Employee">Employee</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <Phone className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Contact Info')}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.contact_info}
                                        onChange={e => setData('contact_info', e.target.value)}
                                        className={inputClass}
                                        placeholder={t('Phone, Email, etc.')}
                                    />
                                    {errors.contact_info && <p className="text-red-500 text-xs mt-1">{errors.contact_info}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <FileText className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Notes')}
                                    </label>
                                    <textarea
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                        className={`${inputClass} min-h-[100px] resize-y`}
                                        placeholder={t('Optional notes about this participant...')}
                                    />
                                    {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes}</p>}
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 mt-2">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:checked:bg-white dark:focus:ring-white transition-colors cursor-pointer"
                                    />
                                    <label htmlFor="is_active" className="text-sm font-bold text-gray-900 dark:text-white cursor-pointer select-none">
                                        {t('Active Participant')}
                                        <p className="text-xs font-normal text-gray-500 mt-0.5">
                                            {t('Inactive participants cannot be added to new schemes')}
                                        </p>
                                    </label>
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
                        className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        {t('Cancel')}
                    </button>
                    <button
                        type="submit"
                        form="participant-form"
                        disabled={processing}
                        className="px-8 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm disabled:opacity-70 transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        {processing ? t('Saving...') : t('Save Participant')}
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
