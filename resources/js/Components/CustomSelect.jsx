import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';
import useTranslations from '../Hooks/useTranslations';

export default function CustomSelect({ 
    value, 
    onChange, 
    options = [], 
    className = '',
    icon = null,
    placeholder = 'Select an option',
    searchable = null
}) {
    const { t } = useTranslations();
    const isSearchable = searchable !== null ? searchable : options.length > 5;
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef(null);
    const dropdownRef = useRef(null);
    const [dropdownStyle, setDropdownStyle] = useState({});

    const selectedOption = options.find(opt => opt.value == value) || null;

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                containerRef.current && !containerRef.current.contains(event.target) &&
                (!dropdownRef.current || !dropdownRef.current.contains(event.target))
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isOpen && containerRef.current) {
            const updatePosition = () => {
                const rect = containerRef.current.getBoundingClientRect();
                setDropdownStyle({
                    position: 'absolute',
                    top: rect.bottom + window.scrollY + 8,
                    left: rect.left + window.scrollX,
                    width: rect.width,
                    zIndex: 99999
                });
            };
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        } else {
            setSearchQuery('');
        }
    }, [isOpen]);

    const filteredOptions = isSearchable && searchQuery
        ? options.filter(opt => opt.label.toString().toLowerCase().includes(searchQuery.toLowerCase()))
        : options;

    const handleSelect = (val) => {
        onChange({ target: { value: val } });
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between gap-3 w-full appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 cursor-pointer transition-colors pr-4 ${className}`}
            >
                <div className="flex items-center gap-2 truncate">
                    {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
                    <span className="truncate">
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && createPortal(
                <div ref={dropdownRef} style={dropdownStyle} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden animate-fade-in-up origin-top flex flex-col">
                    {isSearchable && (
                        <div className="p-2 border-b border-gray-100 dark:border-gray-800">
                            <input 
                                type="text"
                                placeholder={t("Search...")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-sm font-medium bg-gray-50 dark:bg-gray-800 border-none rounded-lg px-3 py-2 outline-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400"
                                autoFocus
                            />
                        </div>
                    )}
                    <ul className="max-h-60 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 flex-1">
                        {filteredOptions.map((option, index) => (
                            <li key={index}>
                                <button
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full text-left px-4 py-2.5 text-sm font-bold flex items-center justify-between transition-colors
                                        ${value == option.value 
                                            ? 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white' 
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                        }
                                    `}
                                >
                                    <span className="truncate">{option.label}</span>
                                    {value == option.value && <Check className="w-4 h-4 text-gray-900 dark:text-white shrink-0 ml-2" />}
                                </button>
                            </li>
                        ))}
                        {filteredOptions.length === 0 && (
                            <li className="px-4 py-3 text-sm font-medium text-gray-500 text-center italic">
                                {t("No results found")}
                            </li>
                        )}
                    </ul>
                </div>,
                document.body
            )}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(-4px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.15s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
