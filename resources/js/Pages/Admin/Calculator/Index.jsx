import React, { useState, useMemo } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Search, Plus, Minus, Trash2, Save, ShoppingCart, User, Receipt, Filter, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import CustomSelect from '../../../Components/CustomSelect';

export default function Calculator({ products, brands, services }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeService, setActiveService] = useState('all');
    const [activeBrand, setActiveBrand] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [actionType, setActionType] = useState('copy'); // 'copy' or 'pdf'
    const ITEMS_PER_PAGE = 12;

    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        client_name: '',
        client_email: '',
        client_phone: '',
        discount: 0,
        notes: '',
        items: []
    });

    // Filtering Products
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchService = activeService === 'all' || p.service_id === activeService;
            const matchBrand = activeBrand === 'all' || p.brand_id === activeBrand;
            return matchSearch && matchService && matchBrand;
        });
    }, [products, searchQuery, activeService, activeBrand]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    // Reset page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeService, activeBrand]);

    const [showToast, setShowToast] = useState(false);

    // Cart Actions
    const addToCart = (product, pricePackage) => {
        const existingItemIndex = data.items.findIndex(
            item => item.product_id === product.id && item.product_price_id === pricePackage.id
        );

        let newItems = [...data.items];

        if (existingItemIndex >= 0) {
            newItems[existingItemIndex].quantity += 1;
            newItems[existingItemIndex].subtotal = newItems[existingItemIndex].quantity * newItems[existingItemIndex].unit_price;
        } else {
            const unitPrice = pricePackage.promo_price ? parseFloat(pricePackage.promo_price) : parseFloat(pricePackage.normal_price);
            newItems.push({
                product_id: product.id,
                product_price_id: pricePackage.id,
                item_name: product.name,
                package_name: pricePackage.package_name,
                quantity: 1,
                unit_price: unitPrice,
                subtotal: unitPrice,
                // Extra fields for copy format
                category: product.category,
                promoHeader: product.promo_header,
                footerText: product.footer_text,
                includes: product.includes || [],
                notes: pricePackage.notes
            });
        }
        setData('items', newItems);
    };

    const updateQuantity = (index, delta) => {
        let newItems = [...data.items];
        newItems[index].quantity += delta;
        if (newItems[index].quantity <= 0) {
            newItems.splice(index, 1);
        } else {
            newItems[index].subtotal = newItems[index].quantity * newItems[index].unit_price;
        }
        setData('items', newItems);
    };

    const removeItem = (index) => {
        let newItems = [...data.items];
        newItems.splice(index, 1);
        setData('items', newItems);
    };

    // Computations
    const subtotal = data.items.reduce((acc, item) => acc + item.subtotal, 0);
    const total = Math.max(0, subtotal - parseFloat(data.discount || 0));

    const generateCopyText = () => {
        const productsMap = {};
        data.items.forEach(item => {
            if (!productsMap[item.item_name]) {
                productsMap[item.item_name] = {
                    promoHeader: item.promoHeader,
                    category: item.category,
                    includes: item.includes,
                    footerText: item.footerText,
                    packages: []
                };
            }
            productsMap[item.item_name].packages.push(item);
        });

        let text = "";
        
        Object.keys(productsMap).forEach((prodName, index) => {
            const prod = productsMap[prodName];
            
            if (prod.promoHeader) text += `${prod.promoHeader}\n`;
            text += `${prodName}\n\n`;
            
            if (prod.category) text += `Bidang:  ${prod.category}\n`;
            
            prod.packages.forEach(pkg => {
                text += `- ${pkg.quantity}x ${pkg.package_name} : Rp. ${pkg.unit_price.toLocaleString('id-ID')}`;
                if (pkg.notes) text += ` (${pkg.notes})`;
                text += "\n";
            });
            
            if (prod.includes && prod.includes.length > 0) {
                text += "\nInclude: \n";
                prod.includes.forEach(inc => {
                    text += `✅${inc}\n`;
                });
            }
            
            if (prod.footerText) text += `\n${prod.footerText}\n`;
            
            if (index < Object.keys(productsMap).length - 1) text += "\n---\n\n";
        });
        
        if (data.discount > 0) {
            text += `\n---\nExtra Discount: - Rp. ${parseFloat(data.discount).toLocaleString('id-ID')}`;
        }
        text += `\n\n*Total Tagihan: Rp. ${total.toLocaleString('id-ID')}*`;
        
        return text;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (actionType === 'copy') {
            const textToCopy = generateCopyText();
            navigator.clipboard.writeText(textToCopy).catch(err => console.error("Failed to copy", err));
        }
        
        post(route('admin.calculator.store'), {
            onSuccess: (page) => {
                const quotationId = page.props.flash.quotation_id;
                reset();
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                
                if (actionType === 'pdf' && quotationId) {
                    window.open(route('admin.quotations.pdf', quotationId), '_blank');
                }
            }
        });
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
    };

    return (
        <MainLayout title="Quick Quotation">
            <Head title="Calculator" />

            {/* Custom Toast Notification */}
            <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
                <div className="bg-gray-900 border border-gray-700 shadow-2xl rounded-2xl p-4 flex items-center gap-3 w-80">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm tracking-tight">Success!</h4>
                        <p className="text-gray-400 text-xs font-medium">Copied to clipboard & saved.</p>
                    </div>
                </div>
            </div>

            <div className="flex h-full w-full gap-6 overflow-hidden">
                
                {/* LEFT PANEL: Catalog */}
                <div className="flex-1 flex flex-col bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden h-full">
                    <div className="p-5 border-b border-gray-100 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Product Catalog</h2>
                            <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{filteredProducts.length} Items</span>
                        </div>
                        
                        {/* Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search products..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <CustomSelect 
                                    className="bg-gray-50 border-gray-200 py-2 pl-3 text-sm font-medium text-gray-700"
                                    value={activeService}
                                    onChange={(e) => setActiveService(e.target.value)}
                                    options={[
                                        { value: 'all', label: 'All Services' },
                                        ...services.map(s => ({ value: s.id, label: s.name }))
                                    ]}
                                    icon={<Filter className="w-4 h-4 text-gray-400" />}
                                />
                            </div>
                            <div className="w-full">
                                <CustomSelect 
                                    className="bg-gray-50 border-gray-200 py-2 pl-3 text-sm font-medium text-gray-700"
                                    value={activeBrand}
                                    onChange={(e) => setActiveBrand(e.target.value)}
                                    options={[
                                        { value: 'all', label: 'All Brands' },
                                        ...brands.map(b => ({ value: b.id, label: b.name }))
                                    ]}
                                    icon={<Filter className="w-4 h-4 text-gray-400" />}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 bg-[#f8f9fa] flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 content-start flex-1">
                            {paginatedProducts.map(product => (
                                <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-3 hover:border-gray-300 transition-colors shadow-sm flex flex-col justify-between">
                                    <div className="mb-2">
                                        <h3 className="font-bold text-gray-900 text-sm line-clamp-1" title={product.name}>{product.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            {product.brand && <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-bold">{product.brand.name}</span>}
                                            {product.service && <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-bold">{product.service.name}</span>}
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 mt-auto">
                                        {product.prices && product.prices.length > 0 ? (
                                            product.prices.map(price => (
                                                <button 
                                                    key={price.id}
                                                    onClick={() => addToCart(product, price)}
                                                    className="w-full flex items-center justify-between p-2 rounded-lg border border-gray-100 hover:border-blue-500 hover:bg-blue-50 group transition-all text-left bg-gray-50/50"
                                                    title={price.notes}
                                                >
                                                    <div className="min-w-0 pr-2">
                                                        <p className="text-[11px] font-bold text-gray-800 group-hover:text-blue-700 truncate">{price.package_name}</p>
                                                    </div>
                                                    <div className="text-right flex items-center gap-2 shrink-0">
                                                        <div className="flex flex-col items-end leading-none">
                                                            {price.promo_price ? (
                                                                <>
                                                                    <span className="text-[9px] text-gray-400 line-through mb-0.5">{formatRupiah(price.normal_price)}</span>
                                                                    <span className="text-xs font-bold text-gray-900 group-hover:text-blue-700">{formatRupiah(price.promo_price)}</span>
                                                                </>
                                                            ) : (
                                                                <span className="text-xs font-bold text-gray-900 group-hover:text-blue-700">{formatRupiah(price.normal_price)}</span>
                                                            )}
                                                        </div>
                                                        <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600" />
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <p className="text-[10px] text-gray-400 italic text-center py-1">No packages</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {filteredProducts.length === 0 && (
                                <div className="col-span-full py-10 flex flex-col items-center justify-center text-gray-400">
                                    <Search className="w-8 h-8 mb-2 opacity-50" />
                                    <span className="text-sm font-medium">No products found.</span>
                                </div>
                            )}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="mt-4 flex items-center justify-between bg-white border border-gray-200 rounded-xl p-2 px-4 shadow-sm shrink-0">
                                <span className="text-xs font-bold text-gray-500">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <div className="flex gap-1">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                                                    currentPage === i + 1 
                                                    ? 'bg-gray-900 text-white' 
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL: Calculator/Cart */}
                <div className="w-[420px] shrink-0 bg-white rounded-3xl border border-gray-200 shadow-xl flex flex-col overflow-hidden h-full">
                    <form onSubmit={handleSubmit} className="flex flex-col h-full">
                        {/* Draft Header */}
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Receipt className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Draft Quotation</h2>
                                    <p className="text-xs font-medium text-gray-500">Create instant quote</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Client Name (Optional)" 
                                        className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        value={data.client_name}
                                        onChange={e => setData('client_name', e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        value={data.client_email}
                                        onChange={e => setData('client_email', e.target.value)}
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Phone Number" 
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        value={data.client_phone}
                                        onChange={e => setData('client_phone', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
                            {data.items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                                    <ShoppingCart className="w-16 h-16 text-gray-200 mb-4" />
                                    <p className="font-bold text-gray-500">Quotation is empty</p>
                                    <p className="text-xs text-gray-400 mt-1">Select packages from the catalog on the left to add them here.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {data.items.map((item, index) => (
                                        <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-gray-900 text-sm truncate" title={item.item_name}>{item.item_name}</h4>
                                                <p className="text-[11px] font-semibold text-gray-500 mt-0.5 truncate" title={item.package_name}>{item.package_name}</p>
                                                <p className="text-sm font-bold text-gray-900 mt-2">{formatRupiah(item.unit_price)}</p>
                                            </div>
                                            <div className="flex flex-col items-end justify-between shrink-0">
                                                <button 
                                                    type="button"
                                                    onClick={() => removeItem(index)}
                                                    className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1 shadow-sm mt-2">
                                                    <button type="button" onClick={() => updateQuantity(index, -1)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                    <button type="button" onClick={() => updateQuantity(index, 1)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {errors.items && <p className="text-red-500 text-xs mt-4 text-center font-bold">{errors.items}</p>}
                        </div>

                        {/* Summary & Checkout */}
                        <div className="bg-gray-900 p-6 rounded-t-3xl mt-auto relative z-10 text-white shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)]">
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm text-gray-400 font-medium">
                                    <span>Subtotal</span>
                                    <span className="text-white">{formatRupiah(subtotal)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400 font-medium">Extra Discount</span>
                                    <div className="relative w-32">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rp</span>
                                        <input 
                                            type="number" 
                                            className="w-full bg-gray-800 border-none rounded-lg pl-9 pr-3 py-1.5 text-right text-sm font-bold text-white focus:ring-1 focus:ring-white"
                                            value={data.discount}
                                            onChange={e => setData('discount', e.target.value)}
                                            min="0"
                                        />
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-gray-700 flex justify-between items-end">
                                    <span className="font-bold text-gray-300">Total</span>
                                    <span className="text-2xl font-black text-white tracking-tight">{formatRupiah(total)}</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    type="submit" 
                                    onClick={() => setActionType('copy')}
                                    disabled={processing || data.items.length === 0}
                                    className="w-full bg-transparent border-2 border-white/20 text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-white/10 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-4 h-4" />
                                    {processing && actionType === 'copy' ? 'Saving...' : 'Copy Format'}
                                </button>
                                <button 
                                    type="submit" 
                                    onClick={() => setActionType('pdf')}
                                    disabled={processing || data.items.length === 0}
                                    className="w-full bg-white text-gray-900 py-3.5 rounded-xl font-extrabold text-[14px] hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FileText className="w-4 h-4" />
                                    {processing && actionType === 'pdf' ? 'Generating...' : 'Download PDF'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </MainLayout>
    );
}
