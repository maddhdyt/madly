import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Loader2, Star } from 'lucide-react';
import logoImg from '../../../img/pile_2.webp';
import useTranslations from '../../Hooks/useTranslations';

export default function Login() {
    const { t } = useTranslations();
    const { props } = usePage();
    const settings = props.global_settings || {};
    const companyName = settings.company_name || 'MADLY';

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
                        <img src={logoImg} alt="Madly Logo" className="w-full h-full object-contain" />
                    </div>
                    
                    {/* Welcome Text */}
                    <div>
                        <h1 className="text-4xl lg:text-11 font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                            {t('Welcome back to')}<br/><span className="font-display tracking-normal text-5xl lg:text-13">{companyName}</span>!
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-5 text-[15px] font-medium max-w-md leading-relaxed">
                            {t('Thank you for continuing your experience with us and always trusting the expertise of our team.')}
                        </p>
                    </div>

                    {/* Rating */}
                    <div className="pt-2">
                        <p className="text-[13px] font-bold text-gray-900 dark:text-white mb-2">{t('Rate your experience')}</p>
                        <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} className="w-5 h-5 text-gray-900 dark:text-white fill-gray-900 dark:fill-white" />
                            ))}
                        </div>
                    </div>

                    {/* Social Proof */}
                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800 max-w-sm flex items-center gap-4">
                        <div className="flex -space-x-3">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 object-cover" />
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aneka&backgroundColor=e2e8f0" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 object-cover" />
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=John&backgroundColor=e2e8f0" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 object-cover" />
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=e2e8f0" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 object-cover" />
                            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] font-bold flex items-center justify-center">
                                +15
                            </div>
                        </div>
                        <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 leading-tight">
                            {t('Join our growing network of')}<br/>{t('professionals today.')}
                        </p>
                    </div>
                </div>

                {/* Right Side (Login Form) */}
                <div className="w-full lg:w-115 shrink-0 bg-white dark:bg-gray-900 p-10 lg:p-12 rounded-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-transparent dark:border-gray-800 transition-colors">
                    <div className="mb-10 text-left">
                        <h2 className="text-[26px] font-black text-gray-900 dark:text-white tracking-tight">{t('Log In')}</h2>
                        <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400 mt-1.5">{t('Please enter your details to access your dashboard.')}</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-3 font-bold text-gray-700 dark:text-gray-300 mb-2">{t('Enter your email')}</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => {
                                    setData('email', e.target.value);
                                    clearErrors('email');
                                }}
                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 focus:border-gray-300 dark:focus:border-gray-600 focus:ring-0 rounded-2xl px-5 py-3 text-[13px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"
                                placeholder="Ex: admin@madly.com"
                                required
                                autoFocus
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-2 font-medium">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-3 font-bold text-gray-700 dark:text-gray-300">{t('Password')}</label>
                                <a href="#" onClick={e => e.preventDefault()} className="text-[11px] font-bold text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">{t('Forgot password?')}</a>
                            </div>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => {
                                    setData('password', e.target.value);
                                    clearErrors('password');
                                }}
                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 focus:border-gray-300 dark:focus:border-gray-600 focus:ring-0 rounded-2xl px-5 py-3 text-[13px] font-semibold text-gray-900 dark:text-white placeholder-gray-400 transition-all outline-none"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-2 font-medium">{errors.password}</p>}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-black dark:bg-white text-white dark:text-gray-900 py-3 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-black/10 dark:shadow-white/5"
                            >
                                {processing ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    t('Log In')
                                )}
                            </button>
                        </div>
                        
                        <div className="pt-4">
                            <p className="text-3 font-medium text-gray-500 dark:text-gray-400 text-center">
                                {t('New to the platform?')} <a href="#" onClick={(e) => {e.preventDefault(); alert('Please ask your Manager to create an account for you.')}} className="text-gray-900 dark:text-white font-bold hover:underline transition-all">{t('Create an account')}</a>
                            </p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
