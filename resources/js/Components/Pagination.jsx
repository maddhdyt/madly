import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null; // Only Previous, Next, and no pages

    return (
        <div className="flex flex-wrap justify-end gap-1 mt-6 px-6 pb-6">
            {links.map((link, key) => {
                const isActive = link.active;
                const isPrevious = link.label.includes('Previous');
                const isNext = link.label.includes('Next');
                let label = link.label;

                if (isPrevious) {
                    label = <ChevronLeft className="w-4 h-4" />;
                } else if (isNext) {
                    label = <ChevronRight className="w-4 h-4" />;
                }

                if (link.url === null) {
                    return (
                        <div
                            key={key}
                            className="flex items-center justify-center px-3 py-2 text-sm text-gray-400 bg-transparent rounded-lg cursor-not-allowed"
                            dangerouslySetInnerHTML={isPrevious || isNext ? undefined : { __html: label }}
                        >
                            {isPrevious || isNext ? label : null}
                        </div>
                    );
                }

                return (
                    <Link
                        key={key}
                        href={link.url}
                        className={`flex items-center justify-center min-w-[36px] px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            isActive
                                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm'
                                : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                        }`}
                        dangerouslySetInnerHTML={isPrevious || isNext ? undefined : { __html: label }}
                    >
                        {isPrevious || isNext ? label : null}
                    </Link>
                );
            })}
        </div>
    );
}
