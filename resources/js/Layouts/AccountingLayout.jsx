import React, { useState, useEffect } from 'react';
import { Link, usePage, Head, router } from '@inertiajs/react';
import {
    LayoutGrid,
    Moon,
    Sun,
    PanelLeftClose,
    PanelLeftOpen,
    Search,
    CheckCircle2,
    ArrowRightLeft,
    Percent,
    PiggyBank,
    History,
    LockKeyhole,
    FileText,
    Wallet,
    ChevronDown,
    Users,
    Network,
    Calendar,
    Layers,
    Tag,
    Route,
} from 'lucide-react';
import GlobalSearchModal from '../Components/GlobalSearchModal';
import ProfileModal from '../Components/ProfileModal';
import ConfirmModal from '../Components/ConfirmModal';
import logoImg from '../../img/pile_2.webp';
import useTranslations from '../Hooks/useTranslations';
import Sidebar from '../Components/Sidebar';
export default function AccountingLayout({ children, title = 'Accounting' }) {
    const { t, locale } = useTranslations();
    const { url, props } = usePage();
    const user = props.auth?.user || { name: 'Guest', role: 'accounting' };
    const [toast, setToast] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

    const menuGroups = [
        {
            title: 'General',
            items: [
                { name: t('Dashboard'), icon: LayoutGrid, href: route('accounting.home'), active: url === '/accounting' || url === '/accounting/dashboard' },
            ],
        },
        {
            title: 'Operations',
            items: [
                { name: t('Projects'), icon: FileText, href: route('accounting.projects.index'), active: url.startsWith('/accounting/projects') },
                { name: t('Revenues'), icon: PiggyBank, href: route('accounting.revenues.index'), active: url.startsWith('/accounting/revenues') },
                { name: t('Expenses'), icon: ArrowRightLeft, href: route('accounting.expenses.index'), active: url.startsWith('/accounting/expenses') },
            ],
        },
        {
            title: 'Finance & Settings',
            items: [
                { name: t('Cash Accounts'), icon: Wallet, href: route('accounting.cash-accounts.index'), active: url.startsWith('/accounting/cash-accounts') },
                { name: t('Expense Categories'), icon: Tag, href: route('accounting.expense-categories.index'), active: url.startsWith('/accounting/expense-categories') },
                { name: t('Calculation Rules'), icon: Percent, href: route('accounting.rules.index'), active: url.startsWith('/accounting/rules') },
                { name: t('Allocation Rules'), icon: Route, href: route('accounting.allocation-rules.index'), active: url.startsWith('/accounting/allocation-rules') },
                { name: t('Participants'), icon: Users, href: route('accounting.profit-participants.index'), active: url.startsWith('/accounting/profit-participants') },
                { name: t('Profit Sharing'), icon: Network, href: route('accounting.profit-sharing-schemes.index'), active: url.startsWith('/accounting/profit-sharing-schemes') },
            ],
        },
        {
            title: 'Closing & Reports',
            items: [
                { name: t('Daily Closing'), icon: LockKeyhole, href: route('accounting.closing.index'), active: url.startsWith('/accounting/closing') && !url.startsWith('/accounting/period-closings') },
                { name: t('Period Closing'), icon: Calendar, href: route('accounting.period-closings.index'), active: url.startsWith('/accounting/period-closings') },
                { name: t('Reports'), icon: History, href: route('accounting.reports.index'), active: url.startsWith('/accounting/reports') },
            ],
        },
    ];


    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        const handleKeyDown = (e) => {
            if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                setIsSearchModalOpen(true);
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        const handleThemeEvent = (e) => {
            setIsDarkMode(e.detail.isDark);
        };
        window.addEventListener('theme-toggle', handleThemeEvent);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('theme-toggle', handleThemeEvent);
        };
    }, []);

    useEffect(() => {
        if (props.flash?.success) showToast(props.flash.success);
        if (props.flash?.error) showToast(props.flash.error);
    }, [props.flash]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    }, [url]);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const toggleDark = (val, e) => {
        if (val === isDarkMode) return;

        const updateTheme = () => {
            setIsDarkMode(val);
            if (val) {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
            }
        };

        if (!document.startViewTransition || !e) {
            updateTheme();
            return;
        }

        const x = e.clientX || window.innerWidth / 2;
        const y = e.clientY || window.innerHeight / 2;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(updateTheme);

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ];

            document.documentElement.animate(
                {
                    clipPath: val ? clipPath : [...clipPath].reverse(),
                },
                {
                    duration: 500,
                    easing: 'ease-out',
                    pseudoElement: val ? '::view-transition-new(root)' : '::view-transition-old(root)',
                }
            );
        });
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return t('Good morning');
        if (hour < 18) return t('Good afternoon');
        return t('Good evening');
    };

    return (
        <>
            <Head title={title} />
            <div
                className="flex h-screen w-full bg-[#f4f5f5] dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 selection:bg-gray-200 overflow-hidden transition-colors duration-300 relative"
            >
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-gray-900/50 dark:bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar Component */}
                <Sidebar 
                    menuGroups={menuGroups}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    settings={{ company_name: 'Zeasy' }}
                    isDarkMode={isDarkMode}
                    toggleDark={toggleDark}
                />

                <main className="flex-1 flex flex-col h-full overflow-hidden p-6 md:p-8 lg:px-10 relative z-[60] dark:bg-gray-950">
                    <header className="mb-6 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2.5 rounded-xl text-gray-500 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-300 shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700 bg-gray-100/50 dark:bg-gray-900/50 group"
                                title="Toggle Sidebar"
                            >
                                {isSidebarOpen ? (
                                    <PanelLeftClose className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                                ) : (
                                    <PanelLeftOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                                )}
                            </button>

                            <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSidebarOpen ? 'ml-2' : 'ml-1'}`}>
                                <h1 className="text-xl md:text-[28px] font-bold font-display text-gray-900 dark:text-white tracking-tight leading-tight">
                                    {t(title)}
                                </h1>
                                <div className="flex flex-wrap items-center gap-1 md:gap-2 mt-0.5 text-[11px] md:text-[13px] font-semibold text-gray-500 dark:text-gray-400">
                                    <span>{getGreeting()}, {user.name.split(' ')[0]} 👋</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsSearchModalOpen(true)}
                                className="hidden sm:flex items-center gap-2 px-3 lg:px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all shadow-sm focus:outline-none group"
                            >
                                <Search className="w-4 h-4 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
                                <span className="text-sm font-medium mr-2 lg:mr-8 hidden lg:block">{t('Search...')}</span>
                                <span className="hidden sm:flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700 shadow-sm tracking-widest">
                                    Ctrl K
                                </span>
                            </button>

                            <button
                                onClick={() => setIsSearchModalOpen(true)}
                                className="sm:hidden p-2.5 rounded-xl text-gray-500 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            <div className="relative bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 flex items-center shadow-inner overflow-hidden border border-gray-200/50 dark:border-gray-700/50 h-10">
                                <div
                                    className={`absolute left-1 top-1 bottom-1 w-9 bg-white dark:bg-gray-700 rounded-lg shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${locale === 'id' ? 'translate-x-9' : 'translate-x-0'}`}
                                />

                                <button
                                    onClick={() => locale !== 'en' && router.post(route('language.switch'), { locale: 'en' }, { preserveScroll: true })}
                                    className={`relative z-10 w-9 flex justify-center items-center text-[11px] font-bold tracking-wider transition-colors duration-300 ${locale === 'en' ? 'text-gray-900 dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => locale !== 'id' && router.post(route('language.switch'), { locale: 'id' }, { preserveScroll: true })}
                                    className={`relative z-10 w-9 flex justify-center items-center text-[11px] font-bold tracking-wider transition-colors duration-300 ${locale === 'id' ? 'text-gray-900 dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                >
                                    ID
                                </button>
                            </div>

                            <div className="relative ml-1">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600 transition-all focus:outline-none flex items-center justify-center text-gray-900 dark:text-white"
                                >
                                    <span className="font-bold text-sm">{user.name.charAt(0)}</span>
                                </button>

                                {isProfileOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#111] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                            <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate capitalize">{user.role}</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setIsProfileOpen(false);
                                                    setIsProfileModalOpen(true);
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors border-b border-gray-100 dark:border-gray-800"
                                            >
                                                {t('My Profile')}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsProfileOpen(false);
                                                    setIsLogoutConfirmOpen(true);
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors"
                                            >
                                                {t('Sign out')}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 w-full overflow-y-auto pb-10">
                        {React.Children.map(children, child => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, { showToast });
                            }
                            return child;
                        })}
                    </div>
                </main>

                <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
                    {toast && (
                        <div className="bg-gray-900 text-white text-sm px-5 py-3.5 rounded-2xl flex items-center gap-3 shadow-2xl transition-opacity duration-300">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="font-semibold">{toast}</span>
                        </div>
                    )}
                </div>

                <GlobalSearchModal
                    isOpen={isSearchModalOpen}
                    onClose={() => setIsSearchModalOpen(false)}
                />

                <ProfileModal
                    isOpen={isProfileModalOpen}
                    onClose={() => setIsProfileModalOpen(false)}
                />

                <ConfirmModal
                    isOpen={isLogoutConfirmOpen}
                    title={t('Sign out')}
                    message={t('Are you sure you want to sign out of your account?')}
                    confirmText={t('Sign out')}
                    onClose={() => setIsLogoutConfirmOpen(false)}
                    onConfirm={() => {
                        setIsLogoutConfirmOpen(false);
                        router.post(route('logout'));
                    }}
                    type="danger"
                />
            </div>
        </>
    );
}
