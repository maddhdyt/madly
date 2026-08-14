import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useForm, router } from '@inertiajs/react';
import { X, Save, Network, FileText, Calendar, Plus, Trash2, AlertCircle, Percent } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';
import CurrencyInput from '../../../Components/CurrencyInput';

export default function SchemeFormSlideOver({ isOpen, onClose, scheme, projects = [], participants = [] }) {
    const { t } = useTranslations();
    const isEditing = !!scheme;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        scheme_name: '',
        accounting_project_id: '',
        effective_from: '',
        effective_until: '',
        is_active: true,
        notes: '',
        items: [] // { profit_participant_id: '', share_percentage: 0 }
    });

    useEffect(() => {
        if (isOpen) {
            if (isEditing) {
                setData({
                    scheme_name: scheme.scheme_name,
                    accounting_project_id: scheme.accounting_project_id || '',
                    effective_from: scheme.effective_from ? scheme.effective_from.split('T')[0] : '',
                    effective_until: scheme.effective_until ? scheme.effective_until.split('T')[0] : '',
                    is_active: scheme.is_active,
                    notes: scheme.notes || '',
                    items: scheme.items?.map(i => ({
                        profit_participant_id: i.profit_participant_id,
                        share_percentage: Number(i.share_percentage)
                    })) || []
                });
            } else {
                reset();
                setData('items', [{ profit_participant_id: '', share_percentage: 100 }]); // Default empty item
            }
            clearErrors();
        }
    }, [isOpen, scheme]);

    const totalPercentage = data.items.reduce((sum, item) => sum + Number(item.share_percentage || 0), 0);
    const isTotalValid = Math.abs(totalPercentage - 100) < 0.01;

    const addItem = () => {
        setData('items', [...data.items, { profit_participant_id: '', share_percentage: 0 }]);
    };

    const removeItem = (index) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData('items', newItems);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;
        setData('items', newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isTotalValid) {
            alert(t('Total percentage must equal exactly 100%'));
            return;
        }

        const options = {
            onSuccess: () => {
                onClose();
                reset();
            },
            preserveScroll: true
        };

        if (isEditing) {
            put(route('accounting.profit-sharing-schemes.update', scheme.id), options);
        } else {
            post(route('accounting.profit-sharing-schemes.store'), options);
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
            <div className="relative w-full max-w-sm md:max-w-xl bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-full animate-slide-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {isEditing ? t('Edit Scheme') : t('New Scheme')}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {t('Configure profit sharing distribution')}
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
                    <form id="scheme-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className={labelClass}>
                                        <Network className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Scheme Name')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.scheme_name}
                                        onChange={e => setData('scheme_name', e.target.value)}
                                        className={inputClass}
                                        placeholder={t('e.g., Default 60-40 Split')}
                                    />
                                    {errors.scheme_name && <p className="text-red-500 text-xs mt-1">{errors.scheme_name}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        <FileText className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                        {t('Project (Optional)')}
                                    </label>
                                    <select
                                        value={data.accounting_project_id}
                                        onChange={e => setData('accounting_project_id', e.target.value)}
                                        className={`${inputClass} appearance-none`}
                                    >
                                        <option value="">{t('Global (All Projects)')}</option>
                                        {projects.map(p => (
                                            <option key={p.id} value={p.id}>{p.project_name}</option>
                                        ))}
                                    </select>
                                    {errors.accounting_project_id && <p className="text-red-500 text-xs mt-1">{errors.accounting_project_id}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>
                                            <Calendar className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                            {t('Effective From')}
                                        </label>
                                        <input
                                            type="date"
                                            value={data.effective_from}
                                            onChange={e => setData('effective_from', e.target.value)}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            <Calendar className="w-4 h-4 inline-block mr-1 text-gray-400" />
                                            {t('Effective Until')}
                                        </label>
                                        <input
                                            type="date"
                                            value={data.effective_until}
                                            onChange={e => setData('effective_until', e.target.value)}
                                            className={inputClass}
                                        />
                                    </div>
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
                                        {t('Active Scheme')}
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Distribution Items */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-bold text-gray-900 dark:text-white">{t('Distribution Percentages')}</h3>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="text-xs font-bold text-gray-900 dark:text-white hover:underline flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" /> {t('Add')}
                                </button>
                            </div>

                            <div className="space-y-4 mb-5">
                                {data.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <select
                                                value={item.profit_participant_id}
                                                onChange={e => updateItem(idx, 'profit_participant_id', e.target.value)}
                                                className={`${inputClass} appearance-none`}
                                                required
                                            >
                                                <option value="">{t('Select Participant...')}</option>
                                                {participants.map(p => (
                                                    <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="w-32 relative">
                                            <CurrencyInput
                                                value={item.share_percentage}
                                                onChange={val => updateItem(idx, 'share_percentage', val)}
                                                className={`${inputClass} text-right font-bold`}
                                                suffix="%"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(idx)}
                                            className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className={`flex items-center justify-between p-4 rounded-xl border ${isTotalValid ? 'bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/50'}`}>
                                <div className="flex items-center gap-2">
                                    {!isTotalValid && <AlertCircle className="w-5 h-5 text-red-500" />}
                                    <span className={`font-bold text-sm ${isTotalValid ? 'text-gray-900 dark:text-white' : 'text-red-700 dark:text-red-400'}`}>
                                        {t('Total Distribution')}
                                    </span>
                                </div>
                                <span className={`text-xl font-black ${isTotalValid ? 'text-gray-900 dark:text-white' : 'text-red-700 dark:text-red-400'}`}>
                                    {totalPercentage.toFixed(2)}%
                                </span>
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
                        form="scheme-form"
                        disabled={processing || !isTotalValid || data.items.length === 0}
                        className="px-8 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm disabled:opacity-70 transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        {processing ? t('Saving...') : t('Save Scheme')}
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
