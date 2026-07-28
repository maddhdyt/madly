import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, title = 'Confirm Action', message = 'Are you sure you want to proceed?', onConfirm, onClose, confirmText = 'Confirm', type = 'danger' }) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const isDanger = type === 'danger';

    return createPortal(
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-fade-in" 
                onClick={onClose}
            ></div>
            
            <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
                <div className="p-6 sm:p-8 flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${isDanger ? 'bg-red-50 dark:bg-red-900/30 text-red-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'}`}>
                        {isDanger ? <AlertTriangle className="w-7 h-7" /> : <X className="w-7 h-7" />}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {title}
                    </h3>
                    
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {message}
                    </p>
                </div>
                
                <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                    <button 
                        onClick={onClose} 
                        className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                            isDanger 
                                ? 'bg-red-500 hover:bg-red-600 text-white shadow-sm' 
                                : 'bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-gray-900 shadow-sm'
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
            
            <style>{`
                @keyframes scaleIn { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-scale-in { animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
            `}</style>
        </div>,
        document.body
    );
}
