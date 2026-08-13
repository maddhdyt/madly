import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import logoImg from '../../../img/pile_2.webp';
import useTranslations from '../../Hooks/useTranslations';

export default function ModuleSelector() {
    const { t } = useTranslations();
    const { props } = usePage();
    const settings = props.global_settings || {};
    const companyName = settings.company_name || 'Zeasy';

    return (
        <div className="min-h-screen bg-[#F7F7F5] dark:bg-[#191919] flex flex-col justify-center items-center p-4 lg:p-8 font-sans transition-colors duration-300">
            <Head title={t("Select Module")} />

            <div className="max-w-4xl w-full flex flex-col items-center text-center">
                
                {/* Logo */}
                <div className="w-14 h-14 mb-8 flex items-center justify-center">
                    <img src={logoImg} alt="Zeasy Logo" className="w-full h-full object-contain" />
                </div>
                
                {/* Welcome Text */}
                <h1 className="text-3xl lg:text-[44px] font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-4">
                    <span className="font-display tracking-normal">{companyName}</span> workspace
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-[15px] font-medium max-w-md leading-relaxed mb-12">
                    {t('Please select the module you want to access. Your login credentials will determine your access level.')}
                </p>

                {/* Module Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-4xl text-left">
                    
                    {/* Sales Module Card */}
                    <Link 
                        href={route('login', { module: 'sales' })}
                        className="group flex flex-col p-7 bg-white dark:bg-[#202020] rounded-[20px] border border-gray-200/80 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-none transition-all duration-300"
                    >
                        <div className="w-16 h-16 mb-5 rounded-full bg-[#F3F4F6] dark:bg-[#2A2A2A] overflow-hidden flex items-center justify-center border border-gray-100 dark:border-gray-800/50">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=f3f4f6" alt="Sales Avatar" className="w-full h-full object-cover dark:opacity-80" />
                        </div>
                        
                        <h2 className="text-[20px] font-bold text-gray-900 dark:text-white tracking-tight mb-2">
                            Sales & CRM
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-[13px] font-medium mb-8 leading-relaxed flex-1">
                            {t('Access for Administrators, Managers, and Sales Representatives.')}
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-[12px] font-bold text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors uppercase tracking-wider">
                            {t('Log in to Sales')} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                    </Link>

                    {/* Marketing Module Card */}
                    <Link 
                        href={route('login', { module: 'marketing' })}
                        className="group flex flex-col p-7 bg-white dark:bg-[#202020] rounded-[20px] border border-gray-200/80 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-none transition-all duration-300"
                    >
                        <div className="w-16 h-16 mb-5 rounded-full bg-[#EFF6FF] dark:bg-[#1E293B] overflow-hidden flex items-center justify-center border border-blue-50 dark:border-gray-800/50">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aneka&backgroundColor=EFF6FF" alt="Marketing Avatar" className="w-full h-full object-cover dark:opacity-80" />
                        </div>
                        
                        <h2 className="text-[20px] font-bold text-gray-900 dark:text-white tracking-tight mb-2">
                            Digital Marketing
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-[13px] font-medium mb-8 leading-relaxed flex-1">
                            {t('Access for Digital Marketers and Ads Specialists.')}
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-[12px] font-bold text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors uppercase tracking-wider">
                            {t('Log in to Marketing')} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                    </Link>

                    {/* Accounting Module Card */}
                    <Link 
                        href={route('login', { module: 'accounting' })}
                        className="group flex flex-col p-7 bg-white dark:bg-[#202020] rounded-[20px] border border-gray-200/80 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-none transition-all duration-300"
                    >
                        <div className="w-16 h-16 mb-5 rounded-full bg-[#ECFDF5] dark:bg-[#064E3B] overflow-hidden flex items-center justify-center border border-emerald-50 dark:border-gray-800/50">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Jack&backgroundColor=ECFDF5" alt="Accounting Avatar" className="w-full h-full object-cover dark:opacity-80" />
                        </div>
                        
                        <h2 className="text-[20px] font-bold text-gray-900 dark:text-white tracking-tight mb-2">
                            Accounting
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-[13px] font-medium mb-8 leading-relaxed flex-1">
                            {t('Access for Financial Recording, Closings, and Reporting.')}
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-[12px] font-bold text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors uppercase tracking-wider">
                            {t('Log in to Accounting')} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}
