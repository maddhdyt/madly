import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';
import { X, Save, Lock, Mail, User, Shield } from 'lucide-react';
import CustomSelect from '../../../Components/CustomSelect';
import useTranslations from '../../../Hooks/useTranslations';

export default function UserFormSlideOver({ isOpen, onClose, user, showToast }) {
    const { t } = useTranslations();
    const isEdit = !!user;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, setData, post, put, processing, errors, clearErrors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: user?.role || 'sales'
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (isEdit && user) {
                setData({
                    name: user.name || '',
                    email: user.email || '',
                    password: '',
                    password_confirmation: '',
                    role: user.role || 'sales',
                });
            } else {
                reset();
                setData('role', 'sales');
            }
        }
    }, [isOpen, user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEdit) {
            put(route('admin.users.update', user.id), {
                onSuccess: () => {
                    onClose();
                    if (showToast) showToast(t('User updated successfully!'));
                },
                onError: (err) => {
                    const firstError = Object.values(err)[0];
                    if (showToast) showToast(firstError || t('Failed to update user.'), 'error');
                }
            });
        } else {
            post(route('admin.users.store'), {
                onSuccess: () => {
                    onClose();
                    reset();
                    if (showToast) showToast(t('User created successfully!'));
                },
                onError: (err) => {
                    const firstError = Object.values(err)[0];
                    if (showToast) showToast(firstError || t('Failed to create user.'), 'error');
                }
            });
        }
    };

    if (!mounted) return null;

    const inputClass = "w-full bg-[#f4f5f5] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:bg-white dark:focus:bg-gray-800 transition-all";
    const labelClass = "block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2";

    return createPortal(
        <div className={`fixed inset-0 z-100 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm" onClick={onClose}></div>
            
            <div className={`absolute top-0 right-0 h-full w-full sm:w-[450px] bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                <User className="w-4 h-4" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                                {isEdit ? t('Edit User') : t('New User')}
                            </h2>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                        <div className="p-6 space-y-6">
                            
                            <div>
                                <label className={labelClass}>{t('Full Name')}</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input 
                                        type="text" 
                                        className={`${inputClass} pl-10`}
                                        placeholder={t('e.g. John Doe')}
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>{t('Email Address')}</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input 
                                        type="email" 
                                        className={`${inputClass} pl-10`}
                                        placeholder={t('e.g. john@madly.com')}
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        required
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div className="z-20">
                                <label className={labelClass}>{t('Role')}</label>
                                <CustomSelect
                                    value={data.role}
                                    onChange={e => setData('role', e.target.value)}
                                    options={[
                                        { value: 'sales', label: 'Sales' },
                                        { value: 'marketing', label: 'Marketing' },
                                        { value: 'manager', label: 'Manager' },
                                        { value: 'admin', label: 'Admin' }
                                    ]}
                                    icon={<Shield className="w-4 h-4" />}
                                    className="px-4 py-2.5 bg-[#f4f5f5] dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 hover:bg-white dark:hover:bg-gray-800"
                                />
                                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <label className={labelClass}>
                                    {isEdit ? t('New Password (leave blank to keep current)') : t('Password')}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input 
                                        type="password" 
                                        className={`${inputClass} pl-10`}
                                        placeholder={isEdit ? t("Leave blank to keep current") : t("Min. 8 characters")}
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        required={!isEdit}
                                    />
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                        </div>
                    </form>

                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                        <button 
                            type="button"
                            onClick={handleSubmit}
                            disabled={processing}
                            className="flex items-center justify-center w-full gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-sm disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {processing ? t('Saving...') : t('Save User')}
                        </button>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
}
