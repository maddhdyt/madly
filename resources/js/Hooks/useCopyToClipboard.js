import { useState, useCallback } from 'react';

export default function useCopyToClipboard(showToast) {
    const [copiedText, setCopiedText] = useState(null);

    const copy = useCallback((text, successMessage = 'Tersalin!') => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported');
            return false;
        }

        try {
            navigator.clipboard.writeText(text).then(() => {
                setCopiedText(text);
                if (showToast) {
                    showToast(successMessage, 'success');
                }
            });
            return true;
        } catch (error) {
            console.warn('Copy failed', error);
            setCopiedText(null);
            return false;
        }
    }, [showToast]);

    return [copiedText, copy];
}
