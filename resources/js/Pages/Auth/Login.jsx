import React, { useState } from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { Loader2, Star, Check, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import logoImg from '../../../img/pile_2.webp';
import useTranslations from '../../Hooks/useTranslations';

export default function Login() {
    const { t } = useTranslations();
    const { props } = usePage();
    const settings = props.global_settings || {};
    const companyName = settings.company_name || 'Zeasy';
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4 lg:p-8 font-sans transition-colors duration-300">
            <Head title={t("Log in")} />

            <div className="max-w-6xl w-full p-8 lg:p-16 flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
                
                {/* Left Side (Branding & Trust) */}
                <div className="flex-1 space-y-8 w-full">
                    {/* Logo */}
                    <div className="w-14 h-14 flex items-center justify-center">
                        <img src={logoImg} alt="Zeasy Logo" className="w-full h-full object-contain" />
                    </div>
                    
                    {/* Welcome Text */}
                    <div>
                        <h1 className="text-4xl lg:text-[44px] font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                            {t('Welcome back to')}<br/><span className="font-display tracking-normal text-5xl lg:text-[52px]">{companyName}</span>!
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-5 text-[15px] font-medium max-w-md leading-relaxed">
                            {t('Thank you for continuing your experience with us and always trusting the expertise of our team.')}
                        </p>

                        <div className="mt-12 pt-10 border-t border-gray-100 dark:border-gray-800">
                            <p className="text-[11px] font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{t('Rate your experience')}</p>
                            <div className="flex gap-1.5">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star key={star} className="w-5 h-5 text-gray-900 dark:text-white fill-current" />
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 flex items-center gap-4">
                            <div className="flex -space-x-3">
                                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 overflow-hidden flex items-center justify-center">
                                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=f3f4f6" alt="User 1" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 overflow-hidden flex items-center justify-center">
                                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aneka&backgroundColor=f3f4f6" alt="User 2" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 overflow-hidden flex items-center justify-center">
                                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Jack&backgroundColor=f3f4f6" alt="User 3" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-900 flex items-center justify-center text-[10px] font-bold text-white shadow-sm z-10">
                                    +15
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-tight max-w-[120px]">
                                {t('Join our growing network of professionals today.')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side (Login Form) */}
                <div className="w-full lg:w-115 shrink-0 bg-white dark:bg-gray-900 p-10 lg:p-12 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-transparent dark:border-gray-800 transition-colors">
                    <div className="mb-10 text-left">
                        <Link href={route('login')} className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-6 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t('Back to Module Selection')}
                        </Link>
                        <h2 className="text-[26px] font-black text-gray-900 dark:text-white tracking-tight">{t('Log In')}</h2>
                        <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400 mt-1.5">{t('Please enter your details to access your dashboard.')}</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-[12px] font-bold text-gray-700 dark:text-gray-300 mb-2">{t('Enter your email')}</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className={`w-full px-5 py-3.5 rounded-[16px] bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-[14px] font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                                placeholder="Ex: admin@zeasy.com"
                            />
                            {errors.email && <p className="text-[12px] text-red-500 mt-2 font-medium">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-[12px] font-bold text-gray-700 dark:text-gray-300">{t('Password')}</label>
                                <a href="#" onClick={e => e.preventDefault()} className="text-[11px] font-bold text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">{t('Forgot password?')}</a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className={`w-full px-5 py-3.5 pr-12 rounded-[16px] bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-[14px] font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-[12px] text-red-500 mt-2 font-medium">{errors.password}</p>}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-all duration-200 ${
                                        data.remember 
                                        ? 'bg-gray-900 border-gray-900 dark:bg-white dark:border-white' 
                                        : 'bg-transparent border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500'
                                    }`}>
                                        <Check className={`w-3.5 h-3.5 text-white dark:text-gray-900 transition-transform duration-300 ${
                                            data.remember ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                                        }`} strokeWidth={3} />
                                    </div>
                                </div>
                                <span className="text-[13px] font-bold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{t('Keep me logged in')}</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-4 bg-black dark:bg-white text-white dark:text-black py-4 px-6 rounded-[16px] font-bold text-[14px] hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-black/10 dark:shadow-white/10 disabled:opacity-50"
                        >
                            {processing ? t('Signing in...') : t('Log In')}
                        </button>
                        
                        <div className="pt-4">
                            <p className="text-[12px] font-medium text-gray-500 dark:text-gray-400 text-center">
                                {t('New to the platform?')} <a href="#" onClick={(e) => {e.preventDefault(); alert('Please ask your Manager to create an account for you.')}} className="text-gray-900 dark:text-white font-bold hover:underline transition-all">{t('Create an account')}</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
