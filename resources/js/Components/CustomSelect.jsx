import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({ 
    value, 
    onChange, 
    options = [], 
    className = '',
    icon = null,
    placeholder = 'Select an option'
}) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const selectedOption = options.find(opt => opt.value == value) || null;

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (val) => {
        // Mock an event object to maintain compatibility if the parent expects e.target.value
        // But since we control the rewrite, we can just call onChange(val) or onChange({target: {value: val}})
        // We'll pass a mock event to be safe.
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

            {isOpen && (
                <div className="absolute z-[100] w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden animate-fade-in-up origin-top">
                    <ul className="max-h-60 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                        {options.map((option, index) => (
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
                        {options.length === 0 && (
                            <li className="px-4 py-2.5 text-sm text-gray-500 text-center italic">
                                No options available
                            </li>
                        )}
                    </ul>
                </div>
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
