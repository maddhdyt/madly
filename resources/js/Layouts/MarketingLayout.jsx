import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Moon, Sun, PanelLeftClose, PanelLeftOpen, Search, CheckCircle2, TrendingUp, Link as LinkIcon, Calculator, Zap, Users, Megaphone, Briefcase } from 'lucide-react';
import { Head, router } from '@inertiajs/react';
import useCopyToClipboard from '../Hooks/useCopyToClipboard';
import GlobalSearchModal from '../Components/GlobalSearchModal';
import ProfileModal from '../Components/ProfileModal';
import ConfirmModal from '../Components/ConfirmModal';
import logoImg from '../../img/pile_2.webp';
import useTranslations from '../Hooks/useTranslations';

export default function MarketingLayout({ children, title = "Digital Marketing" }) {
    const { t, locale } = useTranslations();
    const { url, props } = usePage();
    const user = props.auth?.user || { name: 'Guest', role: 'digital_marketing' };
    const settings = props.global_settings || {};
    const [toast, setToast] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

    const activeLinkRef = React.useRef(null);
    const navRef = React.useRef(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ transform: 'translateY(0)', height: 0, opacity: 0 });

    useEffect(() => {
        const updateIndicator = () => {
            if (activeLinkRef.current && navRef.current) {
                setIndicatorStyle({
                    transform: `translateY(${activeLinkRef.current.offsetTop}px)`,
                    height: activeLinkRef.current.offsetHeight,
                    opacity: 1
                });
            }
        };

        requestAnimationFrame(() => {
            requestAnimationFrame(updateIndicator);
        });

        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }

        window.addEventListener('resize', updateIndicator);

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', updateIndicator);
            window.removeEventListener('resize', handleResize);
        };
    }, [url]);

    useEffect(() => {
        const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDarkMode(isDark);
        if (isDark) document.documentElement.classList.add('dark');

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

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    useEffect(() => {
        if (props.flash?.success) showToast(props.flash.success);
        if (props.flash?.error) showToast(props.flash.error);
    }, [props.flash]);

    const [copiedText, copyToClipboard] = useCopyToClipboard(showToast);

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

    const menuGroups = [
        {
            title: t('GENERAL'),
            items: [
                { name: t('Dashboard'), icon: LayoutGrid, href: route('marketing.home'), active: url === '/marketing' || url === '/marketing/dashboard' },
                { name: t('Power Rank'), icon: TrendingUp, href: route('marketing.power-rank.index'), active: url.startsWith('/marketing/power-rank') },
            ]
        },
        {
            title: t('DATA & METRICS'),
            items: [
                { name: t('Ad Identities'), icon: Megaphone, href: route('marketing.ad-identities.index'), active: url.startsWith('/marketing/ad-identities') },
                { name: t('Brands Setup'), icon: Briefcase, href: route('marketing.brands.index'), active: url.startsWith('/marketing/brands') },
            ]
        },
        {
            title: t('MARKETING TOOLS'),
            items: [
                { name: t('ROAS Calculator'), icon: Calculator, href: route('marketing.roas-calculator.index'), active: url.startsWith('/marketing/roas-calculator') },
                { name: t('UTM Builder'), icon: LinkIcon, href: route('marketing.utm-builder.index'), active: url.startsWith('/marketing/utm-builder') },
                { name: t('Budget Allocator'), icon: Zap, href: route('marketing.budget-allocator.index'), active: url.startsWith('/marketing/budget-allocator') },
            ]
        }
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return t('Good morning');
        if (hour < 18) return t('Good afternoon');
        return t('Good evening');
    };

    return (
        <>
            <Head title={title} />
            <div className="flex h-screen w-full bg-[#f4f5f5] dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 selection:bg-gray-200 overflow-hidden transition-colors duration-300 relative">

                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-gray-900/50 dark:bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                <aside
                    className={`fixed inset-y-0 left-0 md:relative z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white dark:bg-gray-900 border-r border-transparent dark:border-gray-800 overflow-hidden ${isSidebarOpen ? 'translate-x-0 w-70 opacity-100 shadow-2xl md:shadow-none' : '-translate-x-full md:translate-x-0 md:w-0 opacity-0 md:invisible'
                        }`}
                >
                    <div className="flex flex-col py-8 px-5 w-70 h-full">
                        <div className="mb-10 px-3 flex items-center gap-3">
                            <div className="w-9 h-9 flex items-center justify-center cursor-pointer transition-transform hover:scale-105">
                                <img src={logoImg} alt="Madly Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="font-display font-extrabold text-[26px] tracking-normal text-gray-900 dark:text-white">Marketing</span>
                        </div>

                        <nav ref={navRef} className="flex-1 overflow-y-auto relative space-y-1 px-1 mt-2 pb-4">
                            <div
                                className="absolute left-1 right-1 rounded-xl bg-gray-900 dark:bg-white shadow-md z-0 pointer-events-none"
                                style={{
                                    ...indicatorStyle,
                                    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease',
                                    willChange: 'transform, height'
                                }}
                            ></div>

                            {menuGroups.map((group, idx) => (
                                <div key={idx} className="z-10">
                                    <div className="pt-6 pb-1 first:pt-0 relative z-10">
                                        <p className="px-4 text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">{group.title}</p>
                                    </div>
                                    {group.items.map((item, itemIdx) => (
                                        <Link
                                            key={itemIdx}
                                            href={item.href}
                                            ref={item.active ? activeLinkRef : null}
                                            className={`relative z-10 flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-300 rounded-xl ${item.active ? 'font-semibold text-white dark:text-gray-900' : 'font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'}`}
                                        >
                                            <item.icon className={`w-5 h-5 relative z-10 transition-colors duration-300 ${item.active ? 'text-white dark:text-gray-900' : 'text-gray-500'}`} strokeWidth={item.active ? 2 : 1.5} />
                                            <span className="relative z-10">{item.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </nav>

                        <div className="mt-auto pt-6 px-3">
                            <div className="relative bg-[#e4e5e4] dark:bg-gray-800 rounded-full flex flex-col items-center gap-1.5 p-1.5 w-fit transition-colors">
                                <div
                                    className={`absolute left-1.5 right-1.5 top-1.5 h-10 rounded-full bg-white dark:bg-gray-700 shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isDarkMode ? 'translate-y-0' : 'translate-y-11.5'}`}
                                ></div>

                                <button
                                    onClick={(e) => toggleDark(true, e)}
                                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${isDarkMode ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                    title="Dark Mode"
                                >
                                    <Moon className={`w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isDarkMode ? '-rotate-12 scale-110' : 'rotate-0 scale-100'}`} strokeWidth={isDarkMode ? 2 : 1.5} />
                                </button>
                                <button
                                    onClick={(e) => toggleDark(false, e)}
                                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${!isDarkMode ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                    title="Light Mode"
                                >
                                    <Sun className={`w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${!isDarkMode ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`} strokeWidth={!isDarkMode ? 2 : 1.5} />
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 flex flex-col h-full overflow-hidden p-6 md:p-8 lg:px-10 relative z-10 dark:bg-gray-950">

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
                                ></div>

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
                                        <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
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
                                return React.cloneElement(child, { copyToClipboard, showToast, searchQuery });
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
