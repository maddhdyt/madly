import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';

export default function TagInput({ value, onChange, placeholder, className = '' }) {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    
    const tags = value ? value.split(',').map(t => t.trim()).filter(Boolean) : [];

    const addTag = (tag) => {
        const newTag = tag.trim();
        if (newTag && !tags.includes(newTag)) {
            const newTags = [...tags, newTag];
            onChange(newTags.join(', '));
        }
        setInputValue('');
    };

    const removeTag = (indexToRemove) => {
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        onChange(newTags.join(', '));
    };

    const handleKeyDown = (e) => {
        // Prevent form submission on enter
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag(inputValue);
        } else if (e.key === ',') {
            e.preventDefault();
            addTag(inputValue);
        } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    };

    // Transform focus: classes to focus-within: so the wrapper lights up
    const wrapperClass = className
        .split(' ')
        .map(c => c.startsWith('focus:') ? c.replace('focus:', 'focus-within:') : c)
        .map(c => c.startsWith('dark:focus:') ? c.replace('dark:focus:', 'dark:focus-within:') : c)
        .join(' ');

    return (
        <div 
            className={`flex flex-wrap items-center gap-2 cursor-text ${wrapperClass}`}
            onClick={() => inputRef.current?.focus()}
        >
            {tags.map((tag, index) => (
                <span 
                    key={index} 
                    className="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-xs font-bold rounded-lg shadow-sm"
                >
                    {tag}
                    <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeTag(index); }}
                        className="text-gray-400 hover:text-red-500 transition-colors ml-0.5 focus:outline-none"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </span>
            ))}
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => { if(inputValue) addTag(inputValue) }}
                placeholder={tags.length === 0 ? placeholder : ''}
                className="flex-1 min-w-[120px] bg-transparent border-none p-0 m-0 focus:ring-0 text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400"
            />
        </div>
    );
}
