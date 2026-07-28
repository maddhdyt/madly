import React, { useState, useEffect } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { Save, Building2, User, Moon, Sun, Monitor, Bell, Shield, MapPin, Mail, Phone, FileText } from 'lucide-react';

export default function Settings({ settings, showToast }) {
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

    // Mock user since there is no auth system yet
    const user = {
        name: 'Administrator',
        email: 'admin@madly.com'
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
        { id: 'profile', label: 'My Profile', icon: User, desc: 'Your personal account details' },
        { id: 'quotation', label: 'Quotation Settings', icon: FileText, desc: 'PDF and document defaults' },
        { id: 'preferences', label: 'Preferences', icon: Monitor, desc: 'Theme and system settings' },
    ];

    const inputClass = "w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 dark:text-white transition-all";
    const labelClass = "block text-xs font-bold text-gray-900 dark:text-gray-100 mb-2 uppercase tracking-wide";

    return (
        <div className="flex flex-col h-full w-full bg-transparent">
            <Head title="Account Settings" />

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Manage your account settings and set email preferences.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start h-full pb-10">
                {/* Left Sidebar Tabs */}
                <div className="w-full md:w-72 flex-shrink-0 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm p-3 sticky top-4">
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
                <div className="flex-1 w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden min-h-[500px]">
                    
                    {/* PROFILE TAB */}
                    {activeTab === 'profile' && (
                        <div className="p-8 md:p-10 animate-fade-in">
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Profile</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This information will be displayed publicly so be careful what you share.</p>
                            </div>
                            
                            <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-100 dark:border-gray-800">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 flex items-center justify-center text-3xl text-white dark:text-gray-900 font-bold shadow-lg">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{user.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{user.email}</p>
                                    <button className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        Change Avatar
                                    </button>
                                </div>
                            </div>

                            <form className="max-w-2xl space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClass}>Full Name</label>
                                        <input type="text" className={inputClass} defaultValue={user.name} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Email Address</label>
                                        <input type="email" className={inputClass} defaultValue={user.email} />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button type="button" className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-sm">
                                        Update Profile
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
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quotation Settings</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure the default texts and branding used when generating PDF Quotations.</p>
                                </div>
                                <button 
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-sm flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClass}>Brand Name (Header)</label>
                                        <input type="text" value={data.company_name} onChange={e => setData('company_name', e.target.value)} className={inputClass} placeholder="MADLY" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Tagline (Sub-Header)</label>
                                        <input type="text" value={data.company_tagline} onChange={e => setData('company_tagline', e.target.value)} className={inputClass} placeholder="Digital Solutions" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Default Terms & Conditions</label>
                                        <textarea value={data.quotation_terms} onChange={e => setData('quotation_terms', e.target.value)} rows="4" className={inputClass}></textarea>
                                        <p className="text-xs text-gray-500 mt-2">This text will be printed in the Notes section at the bottom of the PDF.</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Global Footer Notice</label>
                                        <input type="text" value={data.quotation_footer} onChange={e => setData('quotation_footer', e.target.value)} className={inputClass} placeholder="e.g. Thank you for choosing us!" />
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
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">App Preferences</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customize your workspace experience.</p>
                                </div>
                                <button 
                                    onClick={() => showToast ? showToast('Preferences saved successfully!') : null}
                                    className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-sm flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> Save Preferences
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
                                                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                                            </h3>
                                            <p className="text-sm text-gray-500">Toggle between light and dark theme.</p>
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
                                <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-between hover:border-gray-300 transition-colors opacity-50 cursor-not-allowed">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-900 dark:text-white">
                                            <Bell className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">Email Notifications</h3>
                                            <p className="text-sm text-gray-500">Receive alerts for new quotations (Coming soon).</p>
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

Settings.layout = page => <MainLayout children={page} />;
