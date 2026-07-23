export const PRODUCT_TYPES = {
    journal_publication: {
        id: 'journal_publication',
        label: 'Journal Publication',
        description: 'Layanan pendampingan dan publikasi jurnal (Sinta, Scopus, dll)',
        icon: 'book',
        config: {
            includes_label: 'Includes / Fasilitas (✅)',
            includes_placeholder: 'e.g., Editing Mendeley',
            promo_header_label: 'Promo Header Text',
            promo_header_placeholder: 'e.g., Pricelist Spesial Promo Sinta :',
            footer_text_label: 'Footer Text',
            footer_text_placeholder: 'e.g., Terimakasih \\n ✨Nusa Education✨',
        }
    },
    web_development: {
        id: 'web_development',
        label: 'Web Development',
        description: 'Jasa pembuatan website company profile, e-commerce, dll',
        icon: 'monitor',
        config: {
            includes_label: 'Features / Spesifikasi Web (✅)',
            includes_placeholder: 'e.g., Gratis Domain & Hosting 1 Tahun',
            promo_header_label: 'Web Dev Quotation Header',
            promo_header_placeholder: 'e.g., Penawaran Pembuatan Website :',
            footer_text_label: 'Footer Text',
            footer_text_placeholder: 'e.g., Harga belum termasuk PPN \\n ✨Nusa Education✨',
        }
    },
    ojs_maintenance: {
        id: 'ojs_maintenance',
        label: 'OJS Maintenance',
        description: 'Layanan instalasi, upgrade, dan perawatan Open Journal Systems',
        icon: 'server',
        config: {
            includes_label: 'Layanan / Fitur OJS (✅)',
            includes_placeholder: 'e.g., Setup DOI, Custom Theme',
            promo_header_label: 'OJS Quotation Header',
            promo_header_placeholder: 'e.g., Paket Layanan OJS :',
            footer_text_label: 'Footer Text',
            footer_text_placeholder: 'e.g., Estimasi pengerjaan 7 hari kerja',
        }
    },
    digital_marketing: {
        id: 'digital_marketing',
        label: 'Digital Marketing',
        description: 'Jasa optimasi SEO, Google Ads, dan Social Media',
        icon: 'trending-up',
        config: {
            includes_label: 'Services / Deliverables (✅)',
            includes_placeholder: 'e.g., Riset Keyword, 10 Post Instagram',
            promo_header_label: 'Marketing Plan Header',
            promo_header_placeholder: 'e.g., Paket Digital Marketing :',
            footer_text_label: 'Footer Text',
            footer_text_placeholder: 'e.g., Kontrak minimal 3 bulan',
        }
    }
};

export const PRODUCT_TYPE_LIST = Object.values(PRODUCT_TYPES);
