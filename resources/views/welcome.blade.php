<x-layout>
    <!-- Sticky Search Bar -->
    <header class="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
        <i data-lucide="search" class="w-5 h-5 text-gray-400"></i>
        <input 
            type="text" 
            id="global-search"
            placeholder="Search products, prices, or snippets... (Press / to search)" 
            class="w-full bg-transparent border-none text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 p-0"
        >
        <kbd class="hidden md:inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded">
            /
        </kbd>
    </header>

    <!-- Data View: List Bertingkat -->
    <div class="flex-1 overflow-y-auto p-6">
        
        <div class="mb-8">
            <h2 class="text-sm font-semibold text-gray-900 mb-4 tracking-tight">BRAND A - PRODUCTS</h2>
            
            <div class="flex flex-col border-t border-gray-200">
                
                <!-- Item 1 -->
                <div class="flex flex-col sm:flex-row sm:items-start justify-between py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors group px-2 -mx-2 rounded-sm cursor-pointer" data-copy="Produk A - Paket Basic - Rp150.000">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                            <h3 class="text-sm font-medium text-gray-900">Produk A</h3>
                            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">Paket Basic</span>
                        </div>
                        <p class="text-sm text-gray-500 line-clamp-2">Deskripsi singkat produk A untuk paket basic. Memberikan akses ke fitur-fitur dasar.</p>
                    </div>
                    <div class="mt-2 sm:mt-0 text-right flex flex-col items-end gap-1">
                        <span class="text-sm font-medium text-gray-900">Rp150.000</span>
                        <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-gray-500">
                            <i data-lucide="copy" class="w-3 h-3"></i> Click to copy
                        </div>
                    </div>
                </div>

                <!-- Item 2 -->
                <div class="flex flex-col sm:flex-row sm:items-start justify-between py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors group px-2 -mx-2 rounded-sm cursor-pointer" data-copy="Produk A - Paket Pro - Rp350.000">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                            <h3 class="text-sm font-medium text-gray-900">Produk A</h3>
                            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">Paket Pro</span>
                        </div>
                        <p class="text-sm text-gray-500 line-clamp-2">Deskripsi singkat produk A untuk paket pro. Akses tak terbatas ke semua fitur.</p>
                    </div>
                    <div class="mt-2 sm:mt-0 text-right flex flex-col items-end gap-1">
                        <span class="text-sm font-medium text-gray-900">Rp350.000</span>
                        <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-gray-500">
                            <i data-lucide="copy" class="w-3 h-3"></i> Click to copy
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="mb-8">
            <h2 class="text-sm font-semibold text-gray-900 mb-4 tracking-tight">CHAT SNIPPETS</h2>
            
            <div class="flex flex-col border-t border-gray-200">
                
                <!-- Snippet 1 -->
                <div class="flex flex-col sm:flex-row sm:items-start justify-between py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors group px-2 -mx-2 rounded-sm cursor-pointer" data-copy="Halo kak! Ada yang bisa kami bantu terkait produk kami?">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                            <h3 class="text-sm font-medium text-gray-900">Salam Pembuka</h3>
                            <code class="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600 font-mono">/salam</code>
                        </div>
                        <p class="text-sm text-gray-500 font-mono bg-gray-50 p-2 mt-2 border border-gray-200 rounded-sm">
                            Halo kak! Ada yang bisa kami bantu terkait produk kami?
                        </p>
                    </div>
                    <div class="mt-2 sm:mt-0 ml-4 flex items-center justify-end h-full pt-2">
                        <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-gray-500">
                            <i data-lucide="copy" class="w-3 h-3"></i> Click to copy
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</x-layout>
