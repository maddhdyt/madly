import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Box, ChevronUp, ChevronDown, Users, ShoppingBag, TrendingUp, Megaphone, Search, CheckCircle2, MessageSquare, Moon, Sun, Bell, Menu } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function MainLayout({ children, title = "Dashboard" }) {
    const { url } = usePage();
    const [toast, setToast] = useState(null);
    const [isProductOpen, setIsProductOpen] = useState(url.startsWith('/admin/products'));
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                const searchInput = document.getElementById('global-search');
                if (searchInput) searchInput.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setToast('Tersalin!');
            setTimeout(() => setToast(null), 2000);
        }).catch(err => console.error('Failed to copy text: ', err));
    };

    return (
        <div className="flex h-screen w-full bg-[#f4f5f5] font-sans text-gray-800 selection:bg-gray-200 overflow-hidden">
            {/* Sidebar */}
            <aside 
                className={`flex-shrink-0 flex flex-col py-8 px-5 relative z-20 transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? 'w-[280px] translate-x-0' : 'w-0 -translate-x-full px-0 opacity-0'
                }`}
            >
                {/* Logo */}
                <div className="mb-10 px-3 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center shadow-sm overflow-hidden relative border border-gray-300/50 cursor-pointer">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                            <circle cx="20" cy="20" r="20" fill="transparent" />
                            <path d="M20 0V40M0 20H40" stroke="#1f2937" strokeWidth="1.5" />
                        </svg>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto space-y-1 px-1">
                    {/* Dashboard */}
                    <Link href={route('home')} className={`flex items-center gap-4 px-3 py-3 text-[15px] transition-colors rounded-xl ${url === '/' ? 'font-semibold text-white bg-gray-900 shadow-sm' : 'font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'}`}>
                        <LayoutGrid className={`w-5 h-5 ${url === '/' ? 'text-white' : 'text-gray-500'}`} strokeWidth={url === '/' ? 2 : 1.5} />
                        Dashboard
                    </Link>

                    {/* Products (Expandable) */}
                    <div className="pt-2">
                        <button 
                            onClick={() => setIsProductOpen(!isProductOpen)}
                            className={`w-full flex items-center justify-between px-3 py-3 text-[15px] transition-colors rounded-xl ${url.startsWith('/admin/products') ? 'bg-gray-900 text-white shadow-sm' : 'font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'}`}
                        >
                            <div className="flex items-center gap-4">
                                <Box className={`w-5 h-5 ${url.startsWith('/admin/products') ? 'text-white' : 'text-gray-500'}`} strokeWidth={url.startsWith('/admin/products') ? 2 : 1.5} />
                                <span className={url.startsWith('/admin/products') ? 'font-semibold' : ''}>Products</span>
                            </div>
                            {isProductOpen ? (
                                <ChevronUp className={`w-4 h-4 ${url.startsWith('/admin/products') ? 'text-gray-400' : 'text-gray-500'}`} strokeWidth={2} />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" strokeWidth={2} />
                            )}
                        </button>
                        
                        {/* Sub-menu with curved connecting lines */}
                        {isProductOpen && (
                            <div className="relative ml-[22px] mt-1 pl-4 flex flex-col gap-1 border-l-[1.5px] border-gray-300/80 pb-3">
                                
                                <div className="relative py-1">
                                    <div className="absolute top-1/2 -left-4 w-4 h-[1.5px] bg-gray-300/80"></div>
                                    <Link href={route('admin.products.index')} className={`relative flex items-center justify-between px-4 py-2.5 text-[15px] transition-colors w-full ml-1 rounded-2xl ${url.startsWith('/admin/products') ? 'font-bold text-gray-900 bg-gray-200/60' : 'font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'}`}>
                                        Overview
                                    </Link>
                                </div>
                                
                                <div className="relative py-1">
                                    <div className="absolute top-1/2 -left-4 w-4 h-[1.5px] bg-gray-300/80"></div>
                                    <a href="#" className="relative flex items-center justify-between px-4 py-2.5 text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors w-full ml-1 rounded-2xl hover:bg-gray-200/50">
                                        Drafts
                                        <span className="bg-[#ffccbc] text-[#c75535] text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                                    </a>
                                </div>

                                <div className="relative py-1">
                                    <div className="absolute top-1/2 -left-4 w-4 h-[1.5px] bg-gray-300/80"></div>
                                    <a href="#" className="relative flex items-center justify-between px-4 py-2.5 text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors w-full ml-1 rounded-2xl hover:bg-gray-200/50">
                                        Released
                                    </a>
                                </div>

                                <div className="relative py-1">
                                    <div className="absolute top-1/2 -left-4 w-4 h-[1.5px] bg-gray-300/80"></div>
                                    <a href="#" className="relative flex items-center justify-between px-4 py-2.5 text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors w-full ml-1 rounded-2xl hover:bg-gray-200/50">
                                        Comments
                                    </a>
                                </div>

                                <div className="relative py-1">
                                    {/* Curved bottom corner for the last item */}
                                    <div className="absolute -bottom-[2px] -left-[17px] w-4 h-6 border-l-[1.5px] border-b-[1.5px] border-gray-300/80 rounded-bl-xl bg-[#f4f5f5] z-0"></div>
                                    <a href="#" className="relative flex items-center justify-between px-4 py-2.5 text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors w-full ml-1 rounded-2xl hover:bg-gray-200/50 z-10">
                                        Scheduled
                                        <span className="bg-[#bce6d0] text-[#2c7a52] text-xs font-bold px-2 py-0.5 rounded-full">8</span>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Services */}
                    <Link href={route('admin.services.index')} className={`flex items-center gap-4 px-3 py-3 text-[15px] transition-colors rounded-xl ${url.startsWith('/admin/services') ? 'font-semibold text-white bg-gray-900 shadow-sm' : 'font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'}`}>
                        <Box className={`w-5 h-5 ${url.startsWith('/admin/services') ? 'text-white' : 'text-gray-500'}`} strokeWidth={url.startsWith('/admin/services') ? 2 : 1.5} />
                        Service Types
                    </Link>

                    {/* Customers */}
                    <a href="#" className="flex items-center justify-between px-3 py-3 text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors rounded-xl hover:bg-gray-200/50">
                        <div className="flex items-center gap-4">
                            <Users className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                            Customers
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </a>

                    {/* Shop */}
                    <a href="#" className="flex items-center gap-4 px-3 py-3 text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors rounded-xl hover:bg-gray-200/50">
                        <ShoppingBag className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                        Shop
                    </a>

                    {/* Income */}
                    <a href="#" className="flex items-center justify-between px-3 py-3 text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors rounded-xl hover:bg-gray-200/50">
                        <div className="flex items-center gap-4">
                            <TrendingUp className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                            Income
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </a>

                    {/* Promote */}
                    <a href="#" className="flex items-center gap-4 px-3 py-3 text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors rounded-xl hover:bg-gray-200/50">
                        <Megaphone className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                        Promote
                    </a>
                </nav>

                {/* Bottom Left Floating Settings Pill */}
                <div className="mt-auto pt-6 px-3">
                    <div className="bg-[#e4e5e4] rounded-full flex flex-col items-center gap-1.5 p-1.5 w-fit">
                        <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200/50 transition-colors">
                            <MessageSquare className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200/50 transition-colors">
                            <Moon className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-900 transition-colors">
                            <Sun className="w-5 h-5" strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden p-6 pl-0 relative z-10">
                
                {/* Navbar (Top Header) matching reference */}
                <header className="mb-6 flex items-center justify-between">
                    
                    {/* Left: Title & Toggle */}
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded-xl text-gray-500 hover:bg-gray-200/50 hover:text-gray-900 transition-colors"
                            title="Toggle Sidebar"
                        >
                            <Menu className="w-6 h-6" strokeWidth={2} />
                        </button>
                        <h1 className={`text-[28px] font-bold text-gray-900 tracking-tight transition-all duration-300 ${isSidebarOpen ? 'ml-2' : 'ml-0'}`}>
                            {title}
                        </h1>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Pill */}
                        <div className="bg-white rounded-full px-4 py-2.5 flex items-center gap-2.5 w-[240px] shadow-sm cursor-text focus-within:ring-2 focus-within:ring-gray-300 transition-shadow">
                            <Search className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
                            <input 
                                type="text" 
                                id="global-search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search anything..." 
                                className="w-full bg-transparent border-none text-sm text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-0 p-0"
                            />
                        </div>

                        {/* Create Button */}
                        <button className="bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm ml-2">
                            Create
                        </button>

                        {/* Icons */}
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:text-gray-900 transition-colors">
                            <Bell className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:text-gray-900 transition-colors">
                            <MessageSquare className="w-4 h-4" strokeWidth={2} />
                        </button>

                        {/* Avatar */}
                        <button className="w-10 h-10 bg-gray-200 rounded-full border border-gray-200 shadow-sm overflow-hidden ml-1">
                            {/* Realistic placeholder avatar */}
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0" alt="Avatar" className="w-full h-full object-cover" />
                        </button>
                    </div>
                </header>

                <div className="flex-1 w-full overflow-y-auto pb-10">
                    {/* Render children and pass down the copy function and search query */}
                    {React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, { copyToClipboard, searchQuery });
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
    );
}
