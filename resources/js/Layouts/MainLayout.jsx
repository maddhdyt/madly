import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Box, Briefcase, ChevronUp, ChevronDown, Users, ShoppingBag, TrendingUp, Megaphone, Search, CheckCircle2, MessageSquare, Moon, Sun, Bell, PanelLeftClose, PanelLeftOpen, HelpCircle, FolderOpen, Calculator, Zap, BookOpen, Settings, Tag } from 'lucide-react';
import { Head, router } from '@inertiajs/react';
import useCopyToClipboard from '../Hooks/useCopyToClipboard';
import GlobalSearchModal from '../Components/GlobalSearchModal';

export default function MainLayout({ children, title = "Dashboard" }) {
    const { url, props } = usePage();
    const user = props.auth?.user || { name: 'Guest', role: 'sales' };
    const settings = props.global_settings || {};
    const [toast, setToast] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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
            title: 'GENERAL',
            items: [
                { name: 'Dashboard', icon: LayoutGrid, href: route('home'), active: url === '/' },
                { name: 'Quick Quotation', icon: Calculator, href: route('admin.calculator.index'), active: url.startsWith('/admin/calculator') },
                { name: 'Chat Snippets', icon: MessageSquare, href: route('admin.chat-snippets.index'), active: url.startsWith('/admin/chat-snippets') },
            ]
        },
        ...(user.role === 'admin' || user.role === 'manager' ? [{
            title: 'DATABASE',
            items: [
                { name: 'Products', icon: Box, href: route('admin.products.index'), active: url.startsWith('/admin/products') },
                { name: 'Pricelists', icon: BookOpen, href: route('admin.pricelists.index'), active: url.startsWith('/admin/pricelists') },
                { name: 'Brochures', icon: FolderOpen, href: route('admin.brochures.index'), active: url.startsWith('/admin/brochures') },
                { name: 'Brands', icon: Tag, href: route('admin.brands.index'), active: url.startsWith('/admin/brands') },
                { name: 'Service Types', icon: Briefcase, href: route('admin.services.index'), active: url.startsWith('/admin/services') },
            ]
        }] : []),
        ...(user.role === 'admin' ? [{
            title: 'SYSTEM',
            items: [
                { name: 'Users', icon: Users, href: route('admin.users.index'), active: url.startsWith('/admin/users') },
                { name: 'Settings', icon: Settings, href: route('admin.settings.index'), active: url.startsWith('/admin/settings') },
            ]
        }] : [])
    ];

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
                    <span className="font-extrabold text-[22px] tracking-tighter text-gray-900 dark:text-white">{settings.company_name || 'Madly'}</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto space-y-1 px-1 mt-2 pb-4">
                    {menuGroups.map((group, idx) => (
                        <div key={idx}>
                            <div className="pt-6 pb-1 first:pt-0">
                                <p className="px-4 text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">{group.title}</p>
                            </div>
                            {group.items.map((item, itemIdx) => (
                                <Link key={itemIdx} href={item.href} className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded-xl ${item.active ? 'font-semibold text-white dark:text-gray-900 bg-gray-900 dark:bg-white shadow-sm' : 'font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'}`}>
                                    <item.icon className={`w-5 h-5 ${item.active ? 'text-white dark:text-gray-900' : 'text-gray-500'}`} strokeWidth={item.active ? 2 : 1.5} />
                                    {item.name}
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
                        <div className="bg-white dark:bg-gray-900 rounded-xl px-4 py-2.5 flex items-center gap-2.5 w-[240px] shadow-sm cursor-text focus-within:ring-2 focus-within:ring-gray-300 dark:focus-within:ring-gray-600 transition-shadow">
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
                                            onClick={() => router.post(route('logout'))}
                                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors"
                                        >
                                            Sign out
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
        </div>
        </>
    );
}
