import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { Save, Building2, User, Moon, Sun, Monitor, Bell, Shield, MapPin, Mail, Phone, FileText } from 'lucide-react';
import useTranslations from '../../../Hooks/useTranslations';

export default function Settings({ settings, showToast }) {
    const { t } = useTranslations();
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('profile');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
    }, []);

    const handleThemeToggle = () => {
        const newDark = !isDarkMode;
        setIsDarkMode(newDark);
        if (newDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        window.dispatchEvent(new CustomEvent('theme-toggle', { detail: { isDark: newDark } }));
    };

    const user = auth.user;
    const avatarInput = useRef(null);
    const [avatarPreview, setAvatarPreview] = useState(user.avatar ? `/storage/${user.avatar}` : null);

    const { data: profileData, setData: setProfileData, post: postProfile, processing: profileProcessing, errors: profileErrors } = useForm({
        name: user.name || '',
        email: user.email || '',
        avatar: null,
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        postProfile(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                if (showToast) showToast(t('Profile updated successfully!'));
            }
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData('avatar', file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    // Currently we only have settings for the company, but we can mock or structure it for Profile/Preferences
    const { data, setData, post, processing, errors } = useForm({
        company_name: settings?.company_name || '',
        company_tagline: settings?.company_tagline || '',
        company_address: settings?.company_address || '',
        company_email: settings?.company_email || '',
        company_phone: settings?.company_phone || '',
        quotation_footer: settings?.quotation_footer || '',
        quotation_terms: settings?.quotation_terms || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.store'), {
            preserveScroll: true,
            onSuccess: () => {
                if (showToast) showToast('Settings saved successfully!');
            }
        });
    };

    const tabs = [
        { id: 'profile', label: t('My Profile'), icon: User, desc: t('Your personal account details') },
        { id: 'quotation', label: t('Message Settings'), icon: FileText, desc: t('WA snippet & brand defaults') },
        { id: 'preferences', label: t('Preferences'), icon: Monitor, desc: t('Theme and system settings') },
    ];

    const inputClass = "w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 dark:text-white transition-all";
    const labelClass = "block text-xs font-bold text-gray-900 dark:text-gray-100 mb-2 uppercase tracking-wide";

    return (
        <div className="flex flex-col h-full w-full bg-transparent">
            <Head title={t('Account Settings')} />

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{t('Settings')}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{t('Manage your account settings and set email preferences.')}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start h-full pb-10">
                {/* Left Sidebar Tabs */}
                <div className="w-full md:w-72 shrink-0 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm p-3 sticky top-4">
                    <nav className="flex flex-col gap-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all ${
                                    activeTab === tab.id 
                                    ? 'bg-gray-900 text-white shadow-md scale-[1.02]' 
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                <div className={`p-2 rounded-xl ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                                    <tab.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">{tab.label}</h3>
                                    <p className={`text-[11px] ${activeTab === tab.id ? 'text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>{tab.desc}</p>
                                </div>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden min-h-125">
                    
                    {/* PROFILE TAB */}
                    {activeTab === 'profile' && (
                        <div className="p-8 md:p-10 animate-fade-in">
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('My Profile')}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('This information will be displayed publicly so be careful what you share.')}</p>
                            </div>
                            
                            <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-100 dark:border-gray-800">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar" className="w-24 h-24 rounded-full object-cover shadow-lg border border-gray-200 dark:border-gray-700" />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-linear-to-tr from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 flex items-center justify-center text-3xl text-white dark:text-gray-900 font-bold shadow-lg">
                                        {user.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{user.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{user.email}</p>
                                    <input type="file" ref={avatarInput} className="hidden" accept="image/*" onChange={handleAvatarChange} />
                                    <button onClick={() => avatarInput.current.click()} className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white">
                                        {t('Change Avatar')}
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleProfileSubmit} className="max-w-2xl space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClass}>{t('Full Name')}</label>
                                        <input type="text" value={profileData.name} onChange={e => setProfileData('name', e.target.value)} className={inputClass} />
                                        {profileErrors.name && <p className="text-red-500 text-xs mt-1">{profileErrors.name}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClass}>{t('Email Address')}</label>
                                        <input type="email" value={profileData.email} onChange={e => setProfileData('email', e.target.value)} className={inputClass} />
                                        {profileErrors.email && <p className="text-red-500 text-xs mt-1">{profileErrors.email}</p>}
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button type="submit" disabled={profileProcessing} className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-sm disabled:opacity-50">
                                        {profileProcessing ? t('Updating...') : t('Update Profile')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* QUOTATION SETTINGS TAB */}
                    {activeTab === 'quotation' && (
                        <div className="p-8 md:p-10 animate-fade-in">
                            <div className="mb-8 flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('Message & Brand Settings')}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('Configure your brand details and default text used when generating WhatsApp snippets.')}</p>
                                </div>
                                <button 
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-sm flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> {t('Save Changes')}
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClass}>{t('Brand Name')}</label>
                                        <input type="text" value={data.company_name} onChange={e => setData('company_name', e.target.value)} className={inputClass} placeholder="MADLY" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>{t('Tagline (Optional)')}</label>
                                        <input type="text" value={data.company_tagline} onChange={e => setData('company_tagline', e.target.value)} className={inputClass} placeholder="Digital Solutions" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>{t('Default Terms & Conditions')}</label>
                                        <textarea value={data.quotation_terms} onChange={e => setData('quotation_terms', e.target.value)} rows="4" className={inputClass} placeholder="e.g. Harga belum termasuk pajak..."></textarea>
                                        <p className="text-xs text-gray-500 mt-2">{t('This text will be included at the bottom of generated WhatsApp snippets.')}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>{t('Default WA Footer / Closing')}</label>
                                        <input type="text" value={data.quotation_footer} onChange={e => setData('quotation_footer', e.target.value)} className={inputClass} placeholder="e.g. Terima kasih, ditunggu kabarnya kak!" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* PREFERENCES TAB */}
                    {activeTab === 'preferences' && (
                        <div className="p-8 md:p-10 animate-fade-in">
                            <div className="mb-8 flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('App Preferences')}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('Customize your workspace experience.')}</p>
                                </div>
                                <button 
                                    onClick={() => showToast ? showToast(t('Preferences saved successfully!')) : null}
                                    className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-sm flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> {t('Save Preferences')}
                                </button>
                            </div>

                            <div className="max-w-2xl space-y-6">
                                <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-between hover:border-gray-300 dark:hover:border-gray-700 transition-colors cursor-pointer" onClick={handleThemeToggle}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-900 dark:text-white transition-colors duration-300">
                                            {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">
                                                {isDarkMode ? t('Dark Mode') : t('Light Mode')}
                                            </h3>
                                            <p className="text-sm text-gray-500">{t('Toggle between light and dark theme.')}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleThemeToggle();
                                        }}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isDarkMode ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-900 transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                                <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-between hover:border-gray-300 dark:hover:border-gray-700 transition-colors opacity-50 cursor-not-allowed">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-900 dark:text-white">
                                            <Bell className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">{t('Email Notifications')}</h3>
                                            <p className="text-sm text-gray-500">{t('Receive alerts for new quotations (Coming soon).')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
}

Settings.layout = page => <MainLayout title="System Settings" children={page} />;
