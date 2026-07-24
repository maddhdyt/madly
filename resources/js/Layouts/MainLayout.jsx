import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Box, Briefcase, ChevronUp, ChevronDown, Users, ShoppingBag, TrendingUp, Megaphone, Search, CheckCircle2, MessageSquare, Moon, Sun, Bell, PanelLeftClose, PanelLeftOpen, HelpCircle, FolderOpen, Calculator, Zap, BookOpen, Settings, Tag } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function MainLayout({ children, title = "Dashboard" }) {
    const { url, props } = usePage();
    const [toast, setToast] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        // Initialize dark mode from localStorage or system preference
        const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDarkMode(isDark);
        if (isDark) document.documentElement.classList.add('dark');
        
        const handleKeyDown = (e) => {
            if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                const searchInput = document.getElementById('global-search');
                if (searchInput) searchInput.focus();
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

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Tersalin!');
        }).catch(err => console.error('Failed to copy text: ', err));
    };

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

    return (
        <>
        <Head title={title} />
        <div className="flex h-screen w-full bg-[#f4f5f5] dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 selection:bg-gray-200 overflow-hidden transition-colors duration-300">
            {/* Sidebar */}
            <aside 
                className={`flex-shrink-0 relative z-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] dark:bg-gray-900 border-r border-transparent dark:border-gray-800 overflow-hidden ${
                    isSidebarOpen ? 'w-[280px] opacity-100 visible' : 'w-0 opacity-0 invisible'
                }`}
            >
                <div className="flex flex-col py-8 px-5 w-[280px] h-full">
                    {/* Logo */}
                <div className="mb-10 px-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gray-900 dark:bg-white flex items-center justify-center cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                        <svg viewBox="0 0 16 16" className="w-5 h-5 text-white dark:text-gray-900" fill="currentColor" shapeRendering="crispEdges">
                            <path d="M2 14 V2 H5 V6 H7 V4 H9 V6 H11 V2 H14 V14 H11 V8 H9 V10 H7 V8 H5 V14 Z" />
                            <rect x="7" y="12" width="2" height="2" />
                        </svg>
                    </div>
                    <span className="font-extrabold text-[22px] tracking-tighter text-gray-900 dark:text-white">Madly</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto space-y-1 px-1 mt-2 pb-4">
                    {/* GENERAL */}
                    <div className="pt-2 pb-1">
                        <p className="px-4 text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">General</p>
                    </div>
                    
                    <Link href={route('home')} className={`flex items-center gap-4 px-4 py-3 text-[15px] transition-colors rounded-xl ${url === '/' ? 'font-semibold text-white dark:text-gray-900 bg-gray-900 dark:bg-white shadow-sm' : 'font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'}`}>
                        <LayoutGrid className={`w-5 h-5 ${url === '/' ? 'text-white dark:text-gray-900' : 'text-gray-500'}`} strokeWidth={url === '/' ? 2 : 1.5} />
                        Dashboard
                    </Link>

                    <Link href={route('admin.calculator.index')} className={`flex items-center gap-4 px-4 py-3 text-[15px] transition-colors rounded-xl ${url.startsWith('/admin/calculator') ? 'font-semibold text-white dark:text-gray-900 bg-gray-900 dark:bg-white shadow-sm' : 'font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'}`}>
                        <Calculator className={`w-5 h-5 ${url.startsWith('/admin/calculator') ? 'text-white dark:text-gray-900' : 'text-gray-500'}`} strokeWidth={url.startsWith('/admin/calculator') ? 2 : 1.5} />
                        Quick Quotation
                    </Link>

                    <Link href={route('admin.chat-snippets.index')} className={`flex items-center gap-4 px-4 py-3 text-[15px] transition-colors rounded-xl ${url.startsWith('/admin/chat-snippets') ? 'font-semibold text-white dark:text-gray-900 bg-gray-900 dark:bg-white shadow-sm' : 'font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'}`}>
                        <MessageSquare className={`w-5 h-5 ${url.startsWith('/admin/chat-snippets') ? 'text-white dark:text-gray-900' : 'text-gray-500'}`} strokeWidth={url.startsWith('/admin/chat-snippets') ? 2 : 1.5} />
                        Chat Snippets
                    </Link>

                    {/* DATABASE */}
                    <div className="pt-6 pb-1">
                        <p className="px-4 text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">Database</p>
                    </div>

                    <Link href={route('admin.products.index')} className={`flex items-center gap-4 px-4 py-3 text-[15px] transition-colors rounded-xl ${url.startsWith('/admin/products') ? 'font-semibold text-white dark:text-gray-900 bg-gray-900 dark:bg-white shadow-sm' : 'font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'}`}>
                        <Box className={`w-5 h-5 ${url.startsWith('/admin/products') ? 'text-white dark:text-gray-900' : 'text-gray-500'}`} strokeWidth={url.startsWith('/admin/products') ? 2 : 1.5} />
                        Products
                    </Link>

                    <Link href={route('admin.pricelists.index')} className={`flex items-center gap-4 px-4 py-3 text-[15px] transition-colors rounded-xl ${url.startsWith('/admin/pricelists') ? 'font-semibold text-white dark:text-gray-900 bg-gray-900 dark:bg-white shadow-sm' : 'font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'}`}>
                        <BookOpen className={`w-5 h-5 ${url.startsWith('/admin/pricelists') ? 'text-white dark:text-gray-900' : 'text-gray-500'}`} strokeWidth={url.startsWith('/admin/pricelists') ? 2 : 1.5} />
                        Pricelists
                    </Link>

                    <Link href={route('admin.brochures.index')} className={`flex items-center gap-4 px-4 py-3 text-[15px] transition-colors rounded-xl ${url.startsWith('/admin/brochures') ? 'font-semibold text-white dark:text-gray-900 bg-gray-900 dark:bg-white shadow-sm' : 'font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'}`}>
                        <FolderOpen className={`w-5 h-5 ${url.startsWith('/admin/brochures') ? 'text-white dark:text-gray-900' : 'text-gray-500'}`} strokeWidth={url.startsWith('/admin/brochures') ? 2 : 1.5} />
                        Brochures
                    </Link>

                    <Link href={route('admin.brands.index')} className={`flex items-center gap-4 px-4 py-3 text-[15px] transition-colors rounded-xl ${url.startsWith('/admin/brands') ? 'font-semibold text-white dark:text-gray-900 bg-gray-900 dark:bg-white shadow-sm' : 'font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'}`}>
                        <Tag className={`w-5 h-5 ${url.startsWith('/admin/brands') ? 'text-white dark:text-gray-900' : 'text-gray-500'}`} strokeWidth={url.startsWith('/admin/brands') ? 2 : 1.5} />
                        Brands
                    </Link>

                    <Link href={route('admin.services.index')} className={`flex items-center gap-4 px-4 py-3 text-[15px] transition-colors rounded-xl ${url.startsWith('/admin/services') ? 'font-semibold text-white dark:text-gray-900 bg-gray-900 dark:bg-white shadow-sm' : 'font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'}`}>
                        <Briefcase className={`w-5 h-5 ${url.startsWith('/admin/services') ? 'text-white dark:text-gray-900' : 'text-gray-500'}`} strokeWidth={url.startsWith('/admin/services') ? 2 : 1.5} />
                        Service Types
                    </Link>

                    {/* SYSTEM */}
                    <div className="pt-6 pb-1">
                        <p className="px-4 text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">System</p>
                    </div>

                    <Link href={route('admin.settings.index')} className={`flex items-center gap-4 px-4 py-3 text-[15px] transition-colors rounded-xl ${url.startsWith('/admin/settings') ? 'font-semibold text-white dark:text-gray-900 bg-gray-900 dark:bg-white shadow-sm' : 'font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'}`}>
                        <Settings className={`w-5 h-5 ${url.startsWith('/admin/settings') ? 'text-white dark:text-gray-900' : 'text-gray-500'}`} strokeWidth={url.startsWith('/admin/settings') ? 2 : 1.5} />
                        Settings
                    </Link>
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
                <header className="mb-6 flex items-center justify-between">
                    
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
                        <h1 className={`text-[28px] font-bold text-gray-900 dark:text-white tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSidebarOpen ? 'ml-2' : 'ml-1'}`}>
                            {title}
                        </h1>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Pill */}
                        <div className="bg-white dark:bg-gray-900 rounded-full px-4 py-2.5 flex items-center gap-2.5 w-[240px] shadow-sm cursor-text focus-within:ring-2 focus-within:ring-gray-300 dark:focus-within:ring-gray-600 transition-shadow">
                            <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" strokeWidth={2.5} />
                            <input 
                                type="text" 
                                id="global-search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search anything..." 
                                className="w-full bg-transparent border-none text-sm text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 font-medium focus:outline-none focus:ring-0 p-0"
                            />
                        </div>

                        {/* Avatar (Profile/Logout placeholder) */}
                        <div className="relative ml-1">
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className={`w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600 transition-all ${isProfileOpen ? 'ring-2 ring-gray-900 dark:ring-white' : ''}`}
                            >
                                {/* Realistic placeholder avatar */}
                                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0" alt="Avatar" className="w-full h-full object-cover" />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl z-50 overflow-hidden origin-top-right animate-fade-in">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">Admin User</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">admin@madly.com</p>
                                        </div>
                                        <div className="p-1.5 flex flex-col gap-0.5">
                                            <button 
                                                onClick={() => setIsProfileOpen(false)}
                                                className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                                            >
                                                Profile Settings
                                            </button>
                                            <button 
                                                onClick={() => setIsProfileOpen(false)}
                                                className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
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
                    <div className="bg-gray-900 text-white text-[15px] px-5 py-3.5 rounded-2xl flex items-center gap-3 shadow-2xl transition-opacity duration-300">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span className="font-semibold">{toast}</span>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}
