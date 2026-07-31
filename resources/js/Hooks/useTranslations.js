import { usePage } from '@inertiajs/react';

export default function useTranslations() {
    const { translations, locale } = usePage().props;

    const t = (key, replace = {}) => {
        let translation = translations?.[key] || key;

        Object.keys(replace).forEach(replaceKey => {
            translation = translation.replace(new RegExp(':' + replaceKey, 'g'), replace[replaceKey]);
        });

        return translation;
    };

    return { t, locale };
}
