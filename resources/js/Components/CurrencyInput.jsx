import React, { useState, useEffect } from 'react';

export default function CurrencyInput({ 
    value, 
    onChange, 
    className = '', 
    placeholder = '0',
    prefix = '',
    suffix = '',
    ...props 
}) {
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        // Parse the incoming value to string and remove non-digits
        const numValue = value === null || value === undefined ? '' : String(value);
        // Only formatting if it's different to avoid cursor jumps
        const currentNum = displayValue.replace(/\D/g, '');
        
        if (numValue.replace(/\D/g, '') !== currentNum) {
            setDisplayValue(formatNumber(numValue));
        }
    }, [value]);

    const formatNumber = (numStr) => {
        if (!numStr) return '';
        const clean = numStr.replace(/\D/g, '');
        if (!clean) return '';
        return clean.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setDisplayValue(formatNumber(rawValue));
        onChange(rawValue ? parseInt(rawValue, 10) : null);
    };

    return (
        <div className="relative">
            {prefix && (
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 font-medium sm:text-sm">{prefix}</span>
                </div>
            )}
            <input
                type="text"
                inputMode="numeric"
                value={displayValue}
                onChange={handleChange}
                className={`${className} ${prefix ? 'pl-10' : ''} ${suffix ? 'pr-10' : ''}`}
                placeholder={placeholder}
                {...props}
            />
            {suffix && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 font-medium sm:text-sm">{suffix}</span>
                </div>
            )}
        </div>
    );
}
