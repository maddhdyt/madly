import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Box, Briefcase, ChevronUp, ChevronDown, Users, ShoppingBag, TrendingUp, Megaphone, Search, CheckCircle2, MessageSquare, Moon, Sun, Bell, PanelLeftClose, PanelLeftOpen, HelpCircle, FolderOpen, Calculator, Zap, BookOpen, Settings, Tag } from 'lucide-react';
import { Head, router } from '@inertiajs/react';
import useCopyToClipboard from '../Hooks/useCopyToClipboard';
import GlobalSearchModal from '../Components/GlobalSearchModal';
import ProfileModal from '../Components/ProfileModal';
import ConfirmModal from '../Components/ConfirmModal';
import logoImg from '../../img/pile_2.webp';
import useTranslations from '../Hooks/useTranslations';

export default function MainLayout({ children, title = "Dashboard" }) {
    const { t, locale } = useTranslations();
    const { url, props } = usePage();
    const user = props.auth?.user || { name: 'Guest', role: 'sales' };
    const settings = props.global_settings || {};
    const [toast, setToast] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
    
    // Magic indicator states
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
        
        // Double rAF ensures the DOM is fully painted and positioned before measuring
        requestAnimationFrame(() => {
            requestAnimationFrame(updateIndicator);
        });
        
        // Close sidebar on mobile after navigation
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
        // Initialize dark mode from localStorage or system preference
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

    const toggleDark = (dark) => {
        setIsDarkMode(dark);
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const menuGroups = [
        {
            title: t('GENERAL'),
            items: [
                { name: t('Dashboard'), icon: LayoutGrid, href: route('home'), active: url === '/' },
                { name: t('Quick Quotation'), icon: Calculator, href: route('admin.calculator.index'), active: url.startsWith('/admin/calculator') },
                { name: t('Chat Snippets'), icon: MessageSquare, href: route('admin.chat-snippets.index'), active: url.startsWith('/admin/chat-snippets') },
            ]
        },
        ...(user.role === 'admin' || user.role === 'manager' ? [{
            title: t('DATABASE'),
            items: [
                { name: t('Products'), icon: Box, href: route('admin.products.index'), active: url.startsWith('/admin/products') },
                { name: t('Pricelists'), icon: BookOpen, href: route('admin.pricelists.index'), active: url.startsWith('/admin/pricelists') },
                { name: t('Brochures'), icon: FolderOpen, href: route('admin.brochures.index'), active: url.startsWith('/admin/brochures') },
                { name: t('Brands'), icon: Tag, href: route('admin.brands.index'), active: url.startsWith('/admin/brands') },
                { name: t('Service Types'), icon: Briefcase, href: route('admin.services.index'), active: url.startsWith('/admin/services') },
            ]
        }] : []),
        ...(user.role === 'admin' ? [{
            title: t('SYSTEM'),
            items: [
                { name: t('Users'), icon: Users, href: route('admin.users.index'), active: url.startsWith('/admin/users') },
                { name: t('Settings'), icon: Settings, href: route('admin.settings.index'), active: url.startsWith('/admin/settings') },
            ]
        }] : [])
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
            
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/50 dark:bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 md:relative z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white dark:bg-gray-900 border-r border-transparent dark:border-gray-800 overflow-hidden ${
                    isSidebarOpen ? 'translate-x-0 w-70 opacity-100 shadow-2xl md:shadow-none' : '-translate-x-full md:translate-x-0 md:w-0 opacity-0 md:invisible'
                }`}
            >
                <div className="flex flex-col py-8 px-5 w-70 h-full">
                    {/* Logo */}
                <div className="mb-10 px-3 flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center cursor-pointer transition-transform hover:scale-105">
                        <img src={logoImg} alt="Madly Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-display font-extrabold text-[26px] tracking-normal text-gray-900 dark:text-white">{settings.company_name || 'Madly'}</span>
                </div>

                {/* Navigation */}
                <nav ref={navRef} className="flex-1 overflow-y-auto relative space-y-1 px-1 mt-2 pb-4">
                    {/* The magical sliding indicator */}
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

                    {/* Bottom Left Floating Settings Pill */}
                    <div className="mt-auto pt-6 px-3">
                        <div className="relative bg-[#e4e5e4] dark:bg-gray-800 rounded-full flex flex-col items-center gap-1.5 p-1.5 w-fit transition-colors">
                            {/* Sliding active indicator */}
                            <div 
                                className={`absolute left-1.5 right-1.5 top-1.5 h-10 rounded-full bg-white dark:bg-gray-700 shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isDarkMode ? 'translate-y-0' : 'translate-y-[46px]'}`}
                            ></div>

                            <button 
                                onClick={() => toggleDark(true)}
                                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${isDarkMode ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                title="Dark Mode"
                            >
                                <Moon className={`w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isDarkMode ? '-rotate-12 scale-110' : 'rotate-0 scale-100'}`} strokeWidth={isDarkMode ? 2 : 1.5} />
                            </button>
                            <button 
                                onClick={() => toggleDark(false)}
                                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${!isDarkMode ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                title="Light Mode"
                            >
                                <Sun className={`w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${!isDarkMode ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`} strokeWidth={!isDarkMode ? 2 : 1.5} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden p-6 md:p-8 lg:px-10 relative z-10 dark:bg-gray-950">
                
                {/* Navbar (Top Header) matching reference */}
                <header className="mb-6 flex items-center justify-between shrink-0">
                    
                    {/* Left: Title & Toggle */}
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

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Trigger */}
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
                        
                        {/* Mobile Search Icon */}
                        <button 
                            onClick={() => setIsSearchModalOpen(true)}
                            className="sm:hidden p-2.5 rounded-xl text-gray-500 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Language Toggle */}
                        <div className="relative bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 flex items-center shadow-inner overflow-hidden border border-gray-200/50 dark:border-gray-700/50 h-10">
                            {/* Sliding Indicator */}
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

                        {/* Avatar (Profile/Logout placeholder) */}
                        <div className="relative ml-1">
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600 transition-all focus:outline-none flex items-center justify-center text-gray-900 dark:text-white"
                            >
                                <span className="font-bold text-sm">{user.name.charAt(0)}</span>
                            </button>

                            {/* Profile Dropdown */}
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
                    {/* Render children and pass down the copy function and search query */}
                    {React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, { copyToClipboard, showToast, searchQuery });
                        }
                        return child;
                    })}
                </div>
            </main>

            {/* Toast Notification */}
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

            {/* Profile Modal */}
            <ProfileModal 
                isOpen={isProfileModalOpen} 
                onClose={() => setIsProfileModalOpen(false)} 
            />

            {/* Logout Confirm Modal */}
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
