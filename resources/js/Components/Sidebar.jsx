import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import logoImg from '../../img/pile_2.webp';

export default function Sidebar({
    menuGroups,
    isSidebarOpen,
    setIsSidebarOpen,
    settings = {},
    isDarkMode,
    toggleDark
}) {
    const { url } = usePage();
    const activeLinkRef = React.useRef(null);
    const navRef = React.useRef(null);
    const indicatorRef = React.useRef(null);
    const prevUrlRef = React.useRef(url);
    const prevOpenGroupsRef = React.useRef(null);

    const [openGroups, setOpenGroups] = useState(() => {
        const initialActiveGroupIdx = menuGroups.findIndex(group => group.items.some(item => item.active));
        return initialActiveGroupIdx !== -1 ? [initialActiveGroupIdx] : [0];
    });

    const toggleGroup = (idx) => {
        setOpenGroups(prev => 
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    useEffect(() => {
        const isRouteChange = prevUrlRef.current !== url;
        const isOpenGroupsChange = prevOpenGroupsRef.current !== null && prevOpenGroupsRef.current !== openGroups;
        
        prevUrlRef.current = url;
        prevOpenGroupsRef.current = openGroups;

        let frameId;
        let timeoutId;

        const updateIndicatorPosition = () => {
            if (activeLinkRef.current && indicatorRef.current && navRef.current) {
                let offsetTop = 0;
                let el = activeLinkRef.current;
                while (el && el !== navRef.current) {
                    offsetTop += el.offsetTop;
                    el = el.offsetParent;
                }
                indicatorRef.current.style.transform = `translateY(${offsetTop}px)`;
                indicatorRef.current.style.height = `${activeLinkRef.current.offsetHeight}px`;
                indicatorRef.current.style.opacity = '1';
            }
        };

        if (isOpenGroupsChange) {
            // Disable CSS transition to prevent fighting with requestAnimationFrame
            if (indicatorRef.current) {
                indicatorRef.current.style.transition = 'none';
            }
            
            const trackAnimation = () => {
                updateIndicatorPosition();
                frameId = requestAnimationFrame(trackAnimation);
            };
            trackAnimation();
            
            // Re-enable transition after layout animation (300ms) completes
            timeoutId = setTimeout(() => {
                cancelAnimationFrame(frameId);
                if (indicatorRef.current) {
                    indicatorRef.current.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease';
                }
            }, 350);
        } else {
            // Route change or window resize or mount: use smooth CSS transition
            if (indicatorRef.current) {
                indicatorRef.current.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease';
            }
            updateIndicatorPosition();
        }

        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }

        const handleResize = () => {
            if (indicatorRef.current) {
                indicatorRef.current.style.transition = 'none';
            }
            updateIndicatorPosition();
            
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
            
            setTimeout(() => {
                if (indicatorRef.current) {
                    indicatorRef.current.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease';
                }
            }, 50);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            clearTimeout(timeoutId);
        };
    }, [url, setIsSidebarOpen, openGroups]);

    return (
        <aside
            className={`fixed inset-y-0 left-0 md:relative z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white dark:bg-gray-900 border-r border-transparent dark:border-gray-800 overflow-hidden ${isSidebarOpen ? 'translate-x-0 w-70 opacity-100 shadow-2xl md:shadow-none' : '-translate-x-full md:translate-x-0 md:w-0 opacity-0 md:invisible'}`}
        >
            <div className="flex flex-col py-8 px-5 w-70 h-full">
                {/* Logo */}
                <div className="mb-10 px-3 flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center cursor-pointer transition-transform hover:scale-105">
                        <img src={logoImg} alt="Zeasy Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-display font-extrabold text-[26px] tracking-normal text-gray-900 dark:text-white">{settings.company_name || 'Zeasy'}</span>
                </div>

                {/* Navigation */}
                <nav ref={navRef} className="flex-1 overflow-y-auto relative space-y-1 px-1 mt-2 pb-4">
                    <div
                        ref={indicatorRef}
                        className="absolute left-1 right-1 rounded-xl bg-gray-900 dark:bg-white shadow-md z-0 pointer-events-none"
                        style={{
                            transition: 'opacity 0.3s ease',
                            willChange: 'transform, height'
                        }}
                    ></div>

                    {menuGroups.map((group, idx) => {
                        const isOpen = openGroups.includes(idx);
                        return (
                        <div key={idx} className="z-10">
                            <button 
                                ref={group.items.some(i => i.active) ? activeLinkRef : null}
                                onClick={() => toggleGroup(idx)}
                                className={`relative z-10 w-full flex items-center justify-between py-2.5 px-4 group focus:outline-none rounded-xl transition-colors ${group.items.some(i => i.active) ? '' : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/30'}`}
                            >
                                <p className={`relative z-10 text-[11px] font-bold tracking-wider uppercase transition-colors ${group.items.some(i => i.active) ? 'text-white dark:text-gray-900' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>{group.title}</p>
                                <ChevronDown className={`relative z-10 w-4 h-4 transition-transform duration-300 ${group.items.some(i => i.active) ? 'text-white dark:text-gray-900' : 'text-gray-400 dark:text-gray-500'} ${isOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <div className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                <div className="overflow-hidden">
                                    <div className="pt-0 pb-1 flex flex-col relative">
                                        {/* Connect to header */}
                                        <div className="absolute left-[26px] top-0 h-1 w-[2px] bg-gray-200 dark:bg-gray-800"></div>

                                        {group.items.map((item, itemIdx) => (
                                            <Link
                                                key={itemIdx}
                                                href={item.href}
                                                className={`relative z-10 flex items-center py-1.5 pl-[48px] pr-4 text-[13.5px] transition-colors duration-300 rounded-xl group/item ${item.active ? 'font-semibold text-gray-900 dark:text-white' : 'font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
                                            >
                                                {/* L-Curve for this item */}
                                                <div className={`absolute left-[26px] top-0 w-[12px] h-1/2 border-l-[2px] border-b-[2px] rounded-bl-lg bg-transparent transition-colors ${item.active ? 'border-gray-900 dark:border-white' : 'border-gray-200 dark:border-gray-800 group-hover/item:border-gray-300 dark:group-hover/item:border-gray-700'}`}></div>

                                                {/* Line connecting to the next item */}
                                                {itemIdx < group.items.length - 1 && (
                                                    <div className="absolute left-[26px] top-1/2 bottom-0 w-[2px] transition-colors bg-gray-200 dark:bg-gray-800 group-hover/item:bg-gray-300 dark:group-hover/item:bg-gray-700"></div>
                                                )}

                                                <span className="relative z-10">{item.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                </nav>

                {/* Bottom Left Floating Settings Pill */}
                <div className="mt-auto pt-6 px-3">
                    <div className="relative bg-[#e4e5e4] dark:bg-gray-800 rounded-full flex flex-col items-center gap-1.5 p-1.5 w-fit transition-colors">
                        {/* Sliding active indicator */}
                        <div
                            className={`absolute left-1.5 right-1.5 top-1.5 h-10 rounded-full bg-white dark:bg-gray-700 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isDarkMode ? 'translate-y-0' : 'translate-y-[46px]'}`}
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
    );
}
