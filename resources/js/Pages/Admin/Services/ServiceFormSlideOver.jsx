import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, Box, Book, Monitor, Server, TrendingUp, Plus, Trash2, GripVertical, Settings, Briefcase, Code, PenTool, Award, Shield, Globe, Camera, Palette, Database, Layers } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CustomSelect from '../../../Components/CustomSelect';
import useTranslations from '../../../Hooks/useTranslations';

function SortableField({ field, updateSchemaField, removeSchemaField }) {
    const { t } = useTranslations();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : undefined,
        opacity: isDragging ? 0.9 : 1,
        boxShadow: isDragging ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' : 'none',
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style}
            className="flex items-start gap-3 bg-[#f8f9fa] dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 relative group focus-within:z-40 hover:z-30"
        >
            <div 
                {...attributes} 
                {...listeners}
                className="mt-3 cursor-grab text-gray-300 dark:text-gray-600 hover:text-gray-500 active:cursor-grabbing"
            >
                <GripVertical className="w-4 h-4" />
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{t('Field Label (Display)')}</label>
                    <input 
                        type="text" 
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-500 outline-none"
                        placeholder={t('e.g., Kapasitas Hosting')}
                        value={field.label}
                        onChange={(e) => updateSchemaField(field.id, 'label', e.target.value)}
                        required
                    />
                </div>
                
                <div className="md:col-span-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{t('Input Type')}</label>
                    <CustomSelect 
                        className="py-2 px-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm font-normal"
                        value={field.type}
                        onChange={(e) => updateSchemaField(field.id, 'type', e.target.value)}
                        options={[
                            { value: 'text', label: t('Short Text') },
                            { value: 'textarea', label: t('Long Text') },
                            { value: 'number', label: t('Number') },
                            { value: 'url', label: t('URL / Link') },
                            { value: 'tags', label: t('Tags (Comma Separated)') },
                            { value: 'label', label: t('Label (Filterable)') }
                        ]}
                    />
                </div>

                <div className="md:col-span-3">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{t('Placeholder (Example value)')}</label>
                    <input 
                        type="text" 
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-500 outline-none"
                        placeholder={t('e.g., 5GB / Unlimited')}
                        value={field.placeholder || ''}
                        onChange={(e) => updateSchemaField(field.id, 'placeholder', e.target.value)}
                    />
                </div>
            </div>

            <button 
                type="button" 
                onClick={() => removeSchemaField(field.id)}
                className="mt-2 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                title="Remove field"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}

export default function ServiceFormSlideOver({ isOpen, onClose, service, showToast }) {
    const { t } = useTranslations();
    const isEdit = !!service;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        description: '',
        icon: 'box',
        form_config: {
            includes_label: 'Included Features (✅)',
            includes_placeholder: 'e.g., Editing Mendeley',
            promo_header_label: 'Promo Header Text',
            promo_header_placeholder: 'e.g., Pricelist Spesial Promo :',
            footer_text_label: 'Footer Text',
            footer_text_placeholder: 'e.g., Price excludes VAT',
        },
        includes: [],
        product_schema: []
    });

    const generateId = () => Math.random().toString(36).substring(2, 9);

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (service) {
                const schemaWithIds = (service.product_schema || []).map(item => ({
                    ...item,
                    id: item.id || generateId()
                }));
                
                setData({
                    name: service.name || '',
                    description: service.description || '',
                    icon: service.icon || 'box',
                    form_config: service.form_config || {
                        includes_label: 'Included Features (✅)',
                        includes_placeholder: 'e.g., Editing Mendeley',
                        promo_header_label: 'Promo Header Text',
                        promo_header_placeholder: 'e.g., Pricelist Spesial Promo :',
                        footer_text_label: 'Footer Text',
                        footer_text_placeholder: 'e.g., Price excludes VAT',
                    },
                    includes: service.includes || [],
                    product_schema: schemaWithIds
                });
            } else {
                setData({
                    name: '',
                    description: '',
                    icon: 'box',
                    form_config: {
                        includes_label: 'Included Features (✅)',
                        includes_placeholder: 'e.g., Editing Mendeley',
                        promo_header_label: 'Promo Header Text',
                        promo_header_placeholder: 'e.g., Pricelist Spesial Promo :',
                        footer_text_label: 'Footer Text',
                        footer_text_placeholder: 'e.g., Price excludes VAT',
                    },
                    includes: [],
                    product_schema: []
                });
            }
        }
    }, [isOpen, service]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.services.update', service.id), {
                onSuccess: () => {
                    onClose();
                    if (showToast) showToast(t('Service updated successfully'));
                },
                onError: (err) => {
                    const firstError = Object.values(err)[0];
                    if (showToast) showToast(firstError || t('Failed to update service'), 'error');
                }
            });
        } else {
            post(route('admin.services.store'), {
                onSuccess: () => {
                    onClose();
                    if (showToast) showToast(t('Service created successfully'));
                },
                onError: (err) => {
                    const firstError = Object.values(err)[0];
                    if (showToast) showToast(firstError || t('Failed to create service'), 'error');
                }
            });
        }
    };

    const updateConfig = (field, value) => {
        setData('form_config', { ...data.form_config, [field]: value });
    };

    // INCLUDES LOGIC
    const addInclude = () => {
        setData('includes', [...data.includes, '']);
    };

    const updateInclude = (index, value) => {
        const newIncludes = [...data.includes];
        newIncludes[index] = value;
        setData('includes', newIncludes);
    };

    const removeInclude = (index) => {
        const newIncludes = [...data.includes];
        newIncludes.splice(index, 1);
        setData('includes', newIncludes);
    };

    // FORM BUILDER LOGIC
    const addSchemaField = () => {
        setData('product_schema', [
            ...data.product_schema,
            { id: generateId(), name: '', label: '', type: 'text', placeholder: '', isNew: true }
        ]);
    };

    const updateSchemaField = (id, key, value) => {
        const index = data.product_schema.findIndex(f => f.id === id);
        if (index === -1) return;
        
        const newSchema = [...data.product_schema];
        newSchema[index][key] = value;
        
        // Auto-generate name from label only if it's a new field or name is empty
        if (key === 'label') {
            if (!newSchema[index].name || newSchema[index].isNew) {
                newSchema[index].name = value.toLowerCase().replace(/[^a-z0-9]/g, '_');
            }
        }
        
        setData('product_schema', newSchema);
    };

    const removeSchemaField = (id) => {
        const newSchema = data.product_schema.filter(f => f.id !== id);
        setData('product_schema', newSchema);
    };

    // dnd-kit logic
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = data.product_schema.findIndex(f => f.id === active.id);
            const newIndex = data.product_schema.findIndex(f => f.id === over.id);
            setData('product_schema', arrayMove(data.product_schema, oldIndex, newIndex));
        }
    };

    const labelClass = "block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 ml-1";
    const inputClass = "w-full bg-[#f4f5f5] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:bg-white dark:focus:bg-gray-800 transition-all";

    if (!isOpen || !mounted) return null;

    const availableIcons = [
        { id: 'box', icon: <Box className="w-5 h-5" />, label: 'Box' },
        { id: 'book', icon: <Book className="w-5 h-5" />, label: 'Book' },
        { id: 'monitor', icon: <Monitor className="w-5 h-5" />, label: 'Monitor' },
        { id: 'server', icon: <Server className="w-5 h-5" />, label: 'Server' },
        { id: 'trending-up', icon: <TrendingUp className="w-5 h-5" />, label: 'Trending' },
        { id: 'briefcase', icon: <Briefcase className="w-5 h-5" />, label: 'Briefcase' },
        { id: 'code', icon: <Code className="w-5 h-5" />, label: 'Code' },
        { id: 'pen-tool', icon: <PenTool className="w-5 h-5" />, label: 'Pen Tool' },
        { id: 'award', icon: <Award className="w-5 h-5" />, label: 'Award' },
        { id: 'shield', icon: <Shield className="w-5 h-5" />, label: 'Shield' },
        { id: 'globe', icon: <Globe className="w-5 h-5" />, label: 'Globe' },
        { id: 'camera', icon: <Camera className="w-5 h-5" />, label: 'Camera' },
        { id: 'palette', icon: <Palette className="w-5 h-5" />, label: 'Palette' },
        { id: 'database', icon: <Database className="w-5 h-5" />, label: 'Database' },
        { id: 'layers', icon: <Layers className="w-5 h-5" />, label: 'Layers' },
    ];

    return createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity animate-fade-in" onClick={onClose}></div>
            
            <div className="relative w-full max-w-3xl bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-full animate-slide-in">
                <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{isEdit ? t('Edit Service Type') : t('Add Service Type')}</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('Configure service template, quotation labels, and product form schema.')}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-none bg-[#f8f9fa] dark:bg-black">
                    <form id="service-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
                        
                        {/* SECTION 1: General Info */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5 border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
                                <Box className="w-4 h-4 text-gray-400" />
                                {t('General Information')}
                            </h3>
                            
                            <div className="grid grid-cols-1 gap-5">
                                <div>
                                    <label className={labelClass}>{t('Service Name')}</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder={t('e.g., Web Development')}
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>{t('Description')}</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder={t('Brief explanation of this service')}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>{t('Icon Selection')}</label>
                                    <div className="flex flex-wrap gap-3">
                                        {availableIcons.map(ic => (
                                            <button
                                                key={ic.id}
                                                type="button"
                                                onClick={() => setData('icon', ic.id)}
                                                className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all ${data.icon === ic.id ? 'bg-gray-900 dark:bg-white border-gray-900 dark:border-white text-white dark:text-gray-900 shadow-md' : 'bg-[#f4f5f5] dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                                title={ic.label}
                                            >
                                                {ic.icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 1.5: Includes Master Data */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5 border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
                                <Award className="w-4 h-4 text-gray-400" />
                                {t('Master Fasilitas & Includes')}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t('Atur daftar fasilitas yang tersedia untuk jenis layanan ini. Saat membuat Pricelist, Anda cukup mencentang dari daftar ini.')}</p>
                            
                            <div className="flex flex-col gap-3">
                                {data.includes.map((inc, idx) => (
                                    <div key={idx} className="flex gap-3">
                                        <div className="flex-1 relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✅</div>
                                            <input 
                                                type="text" 
                                                className={`${inputClass} pl-10`}
                                                placeholder={t('e.g., Editing Mendeley')}
                                                value={inc}
                                                onChange={e => updateInclude(idx, e.target.value)}
                                            />
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => removeInclude(idx)}
                                            className="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    type="button"
                                    onClick={addInclude}
                                    className="w-fit text-xs font-bold text-gray-900 dark:text-white hover:underline flex items-center gap-1 mt-2 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-lg transition-colors"
                                >
                                    <Plus className="w-3 h-3" /> {t('Tambah Fasilitas / Include')}
                                </button>
                            </div>
                        </div>

                        {/* SECTION 2: Form Builder (Product Schema) */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-5 border-b border-gray-100 dark:border-gray-700 pb-3">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Settings className="w-4 h-4 text-gray-400" />
                                    {t('Product Form Builder')}
                                </h3>
                                <button 
                                    type="button" 
                                    onClick={addSchemaField}
                                    className="text-xs font-bold bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <Plus className="w-3 h-3" /> {t('Add Field')}
                                </button>
                            </div>
                            
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t('Define the custom fields that will appear when creating a new product under this service.')}</p>

                            <div className="space-y-4">
                                {data.product_schema.length === 0 ? (
                                    <div className="text-center py-8 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('No custom fields defined yet.')}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t('Products in this service will only have basic fields (Name, HPP).')}</p>
                                    </div>
                                ) : (
                                    <DndContext 
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleDragEnd}
                                    >
                                        <SortableContext 
                                            items={data.product_schema.map(f => f.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {data.product_schema.map((field) => (
                                                <SortableField 
                                                    key={field.id}
                                                    field={field} 
                                                    updateSchemaField={updateSchemaField} 
                                                    removeSchemaField={removeSchemaField} 
                                                />
                                            ))}
                                        </SortableContext>
                                    </DndContext>
                                )}
                            </div>
                        </div>

                        {/* SECTION 3: Quotation Labels */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5 border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
                                <Book className="w-4 h-4 text-gray-400" />
                                {t('Quotation Configuration')}
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>{t('Promo Header Label')}</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={data.form_config.promo_header_label}
                                        onChange={e => updateConfig('promo_header_label', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>{t('Promo Header Placeholder')}</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={data.form_config.promo_header_placeholder}
                                        onChange={e => updateConfig('promo_header_placeholder', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>{t('Includes Label')}</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={data.form_config.includes_label}
                                        onChange={e => updateConfig('includes_label', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>{t('Includes Placeholder')}</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={data.form_config.includes_placeholder}
                                        onChange={e => updateConfig('includes_placeholder', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>{t('Footer Text Label')}</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={data.form_config.footer_text_label}
                                        onChange={e => updateConfig('footer_text_label', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>{t('Footer Text Placeholder')}</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        value={data.form_config.footer_text_placeholder}
                                        onChange={e => updateConfig('footer_text_placeholder', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

                <div className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 z-10">
                    <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                        {t('Cancel')}
                    </button>
                    <button type="submit" form="service-form" disabled={processing} className="px-8 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm disabled:opacity-70 transition-colors">
                        <Save className="w-4 h-4" /> 
                        {processing ? t('Saving...') : t('Save Service Type')}
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
