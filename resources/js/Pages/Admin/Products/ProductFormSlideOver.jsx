import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, Image as ImageIcon, Box, Book, Monitor, Server, TrendingUp, Tag, List, Briefcase, Code, PenTool, Award, Shield, Globe, Camera, Palette, Database, Layers, Trash } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';

export default function ProductFormSlideOver({ isOpen, onClose, product, services = [], showToast }) {
    const { t } = useTranslations();
    const isEdit = !!product;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, clearErrors } = useForm({
        service_id: '',
        name: '',
        hpp: '',
        min_price: '',
        status_note: '',
        attributes: {}
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (product) {
                setData({
                    service_id: product.service_id || (services.length > 0 ? services[0].id : ''),
                    name: product.name || '',
                    hpp: product.hpp || '',
                    min_price: product.min_price || '',
                    status_note: product.status_note || '',
                    attributes: product.attributes || {}
                });
            } else {
                setData({
                    service_id: services.length > 0 ? services[0].id : '',
                    name: '',
                    hpp: '',
                    min_price: '',
                    status_note: '',
                    attributes: {}
                });
            }
        }
    }, [isOpen, product, services]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.products.update', product.id), {
                onSuccess: () => {
                    onClose();
                    if (showToast) showToast(t('Product updated successfully'));
                },
                onError: (err) => {
                    const firstError = Object.values(err)[0];
                    if (showToast) showToast(firstError || t('Failed to update product'), 'error');
                }
            });
        } else {
            post(route('admin.products.store'), {
                onSuccess: () => {
                    onClose();
                    if (showToast) showToast(t('Product created successfully'));
                },
                onError: (err) => {
                    const firstError = Object.values(err)[0];
                    if (showToast) showToast(firstError || t('Failed to create product'), 'error');
                }
            });
        }
    };

    const handleAttributeChange = (name, value) => {
        setData('attributes', {
            ...data.attributes,
            [name]: value
        });
    };

    const labelClass = "block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 ml-1";
    const inputClass = "w-full bg-[#f4f5f5] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:bg-white dark:focus:bg-gray-800 transition-all";

    if (!isOpen || !mounted) return null;

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

    const selectedService = services.find(s => s.id === data.service_id) || services[0];
    const productSchema = selectedService?.product_schema || [];

    return createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div 
                className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity animate-fade-in" 
                onClick={onClose}
            ></div>
            
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-full animate-slide-in">
                <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{isEdit ? t('Edit Product') : t('Add New Product')}</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('Configure global product properties.')}</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-none bg-[#f8f9fa] dark:bg-black">
                    <form id="product-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
                        
                        {/* SECTION: Service Type */}
                        <div>
                            <label className={`${labelClass} mb-3 block`}>{t('Select Service Type')}</label>
                            <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none snap-x">
                                {services.map(type => {
                                    const isSelected = data.service_id === type.id;
                                    return (
                                        <button 
                                            key={type.id}
                                            type="button"
                                            onClick={() => setData('service_id', type.id)}
                                            className={`flex-shrink-0 px-4 py-2.5 rounded-2xl border flex items-center gap-3 transition-all snap-start ${isSelected ? 'border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                        >
                                            <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20 dark:bg-gray-900/10 text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400'}`}>
                                                {renderIcon(type.icon)}
                                            </div>
                                            <div className="font-bold text-sm whitespace-nowrap pr-2">{type.name}</div>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.service_id && <p className="text-red-500 text-xs mt-1">{errors.service_id}</p>}
                        </div>

                        {/* SECTION: Universal Data */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                                <Box className="w-4 h-4 text-gray-400" />
                                {t('Master Data')}
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <label className={labelClass}>{t('Product Name')}</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder="e.g., Jurnal Cessie"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>{t('Base Price (HPP)')}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-gray-500 dark:text-gray-400 font-bold text-sm">Rp</span>
                                        </div>
                                        <input 
                                            type="text" 
                                            className={`${inputClass} pl-11`}
                                            placeholder="e.g., 2.500.000"
                                            value={data.hpp ? new Intl.NumberFormat('id-ID').format(data.hpp) : ''}
                                            onChange={e => {
                                                const rawValue = e.target.value.replace(/\D/g, '');
                                                setData('hpp', rawValue);
                                            }}
                                            required
                                        />
                                    </div>
                                    {errors.hpp && <p className="text-red-500 text-xs mt-1">{errors.hpp}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>{t('Min Selling Price')}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-gray-500 dark:text-gray-400 font-bold text-sm">Rp</span>
                                        </div>
                                        <input 
                                            type="text" 
                                            className={`${inputClass} pl-11`}
                                            placeholder="e.g., 3.000.000"
                                            value={data.min_price ? new Intl.NumberFormat('id-ID').format(data.min_price) : ''}
                                            onChange={e => {
                                                const rawValue = e.target.value.replace(/\D/g, '');
                                                setData('min_price', rawValue);
                                            }}
                                        />
                                    </div>
                                    {errors.min_price && <p className="text-red-500 text-xs mt-1">{errors.min_price}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className={labelClass}>{t('Status Note (Optional)')}</label>
                                    <input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder="e.g., Discontinue / Promo"
                                        value={data.status_note}
                                        onChange={e => setData('status_note', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SECTION: Dynamic Attributes (JSON Schema) */}
                        {productSchema && productSchema.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                                    <Tag className="w-4 h-4 text-gray-400" />
                                    {selectedService?.name} {t('Specifications')}
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {productSchema.map((field, index) => (
                                        <div key={index} className={(field.type === 'textarea' || field.type === 'link_builder') ? "md:col-span-2" : ""}>
                                            <label className={labelClass}>{field.label}</label>
                                            {field.type === 'textarea' ? (
                                                <textarea 
                                                    className={inputClass}
                                                    rows="2"
                                                    placeholder={`e.g., ${field.placeholder || ''}`}
                                                    value={data.attributes?.[field.name] || ''}
                                                    onChange={e => handleAttributeChange(field.name, e.target.value)}
                                                ></textarea>
                                            ) : field.type === 'tags' ? (
                                                <>
                                                    <input 
                                                        type="text"
                                                        className={inputClass}
                                                        placeholder={`e.g., ${field.placeholder || 'Tag1, Tag2'}`}
                                                        value={data.attributes?.[field.name] || ''}
                                                        onChange={e => handleAttributeChange(field.name, e.target.value)}
                                                    />
                                                    <p className="text-[10px] text-gray-500 mt-1 ml-1 font-medium">{t('Separate with commas (e.g., a, b, c)')}</p>
                                                </>
                                            ) : field.type === 'link_builder' ? (
                                                <div className="flex flex-col gap-2">
                                                    {(Array.isArray(data.attributes?.[field.name]) ? data.attributes[field.name] : []).map((linkObj, i) => (
                                                        <div key={i} className="flex gap-2 items-start">
                                                            <input 
                                                                type="text" 
                                                                placeholder={t('Label (e.g., Scopus)')} 
                                                                className={`${inputClass.replace('w-full', '')} w-1/3 text-xs`}
                                                                value={linkObj.label || ''}
                                                                onChange={e => {
                                                                    const newArr = [...(data.attributes[field.name] || [])];
                                                                    newArr[i] = {...newArr[i], label: e.target.value};
                                                                    handleAttributeChange(field.name, newArr);
                                                                }}
                                                            />
                                                            <input 
                                                                type="url" 
                                                                placeholder="URL (https://...)" 
                                                                className={`${inputClass.replace('w-full', '')} flex-1 text-xs`}
                                                                value={linkObj.url || ''}
                                                                onChange={e => {
                                                                    const newArr = [...(data.attributes[field.name] || [])];
                                                                    newArr[i] = {...newArr[i], url: e.target.value};
                                                                    handleAttributeChange(field.name, newArr);
                                                                }}
                                                            />
                                                            <button type="button" onClick={() => {
                                                                const newArr = [...data.attributes[field.name]];
                                                                newArr.splice(i, 1);
                                                                handleAttributeChange(field.name, newArr);
                                                            }} className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-800">
                                                                <Trash className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button type="button" onClick={() => {
                                                        const newArr = [...(Array.isArray(data.attributes?.[field.name]) ? data.attributes[field.name] : [])];
                                                        newArr.push({label: '', url: ''});
                                                        handleAttributeChange(field.name, newArr);
                                                    }} className="text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-xl w-fit mt-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                                        + {t('Add Link')}
                                                    </button>
                                                </div>
                                            ) : (
                                                <input 
                                                    type={field.type === 'url' ? 'url' : field.type || 'text'}
                                                    className={inputClass}
                                                    placeholder={`e.g., ${field.placeholder || ''}`}
                                                    value={data.attributes?.[field.name] || ''}
                                                    onChange={e => handleAttributeChange(field.name, e.target.value)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </form>
                </div>

                <div className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 z-10">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        {t('Cancel')}
                    </button>
                    <button 
                        type="submit" 
                        form="product-form" 
                        disabled={processing} 
                        className="px-8 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 flex items-center gap-2 shadow-sm disabled:opacity-70 transition-colors"
                    >
                        <Save className="w-4 h-4" /> 
                        {processing ? t('Saving...') : t('Save Product')}
                    </button>
                </div>
            </div>
            
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
