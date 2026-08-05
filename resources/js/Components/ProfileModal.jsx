import React, { useRef, useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { X, User as UserIcon, Camera, KeyRound, Check, AlertCircle } from 'lucide-react';
import useTranslations from '../Hooks/useTranslations';

export default function ProfileModal({ isOpen, onClose }) {
    const { t } = useTranslations();
    const { props } = usePage();
    const user = props.auth?.user || {};
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isPasswordMode, setIsPasswordMode] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        name: user.name || '',
        email: user.email || '',
        avatar: null,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (isOpen) {
            setData({
                name: user.name || '',
                email: user.email || '',
                avatar: null,
                current_password: '',
                password: '',
                password_confirmation: '',
            });
            setPreviewUrl(user.avatar ? `/storage/${user.avatar}` : null);
            setIsPasswordMode(false);
            clearErrors();
            setStatusMessage({ type: '', text: '' });
        }
    }, [isOpen, user]);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        setStatusMessage({ type: '', text: '' });
        
        post(route('profile.update'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setStatusMessage({ type: 'success', text: t('Profile updated successfully.') });
                if (isPasswordMode) {
                    reset('current_password', 'password', 'password_confirmation');
                    setIsPasswordMode(false);
                }
                setTimeout(() => onClose(), 1500);
            },
            onError: () => {
                setStatusMessage({ type: 'error', text: t('Please check the form for errors.') });
            }
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white dark:bg-[#111] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 fade-in duration-200">
                
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/20">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display">
                        {t('My Profile')}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 -mr-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-6 py-6 overflow-y-auto max-h-[80vh]">
                    {/* Mode Tabs */}
                    <div className="flex p-1 mb-6 bg-gray-100 dark:bg-gray-800/80 rounded-xl">
                        <button
                            type="button"
                            onClick={() => { setIsPasswordMode(false); clearErrors(); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-all ${!isPasswordMode ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            <UserIcon className="w-4 h-4" />
                            {t('General')}
                        </button>
                        <button
                            type="button"
                            onClick={() => { setIsPasswordMode(true); clearErrors(); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-all ${isPasswordMode ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            <KeyRound className="w-4 h-4" />
                            {t('Password')}
                        </button>
                    </div>

                    {statusMessage.text && (
                        <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${statusMessage.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
                            {statusMessage.type === 'success' ? <Check className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                            <p className="text-sm font-medium leading-relaxed">{statusMessage.text}</p>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        
                        {!isPasswordMode ? (
                            <>
                                {/* Avatar */}
                                <div className="flex flex-col items-center mb-6">
                                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                        <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden transition-all group-hover:border-gray-400 dark:group-hover:border-gray-500">
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <UserIcon className="w-10 h-10 text-gray-400" />
                                            )}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            ref={fileInputRef} 
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-3">{t('Click to change avatar')}</p>
                                    {errors.avatar && <p className="text-xs text-red-500 mt-1">{errors.avatar}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">{t('Name')}</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                                    />
                                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">{t('Email Address')}</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                                    />
                                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">{t('Current Password')}</label>
                                    <input
                                        type="password"
                                        value={data.current_password}
                                        onChange={e => setData('current_password', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors ${errors.current_password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                                    />
                                    {errors.current_password && <p className="text-xs text-red-500 mt-1">{errors.current_password}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">{t('New Password')}</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                                    />
                                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">{t('Confirm New Password')}</label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors ${errors.password_confirmation ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                                    />
                                </div>
                            </>
                        )}

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 mt-8">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                            >
                                {t('Cancel')}
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                                {processing ? t('Saving...') : t('Save Changes')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
