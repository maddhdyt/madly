<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Madly - Sales Module</title>
    <!-- Vite Assets -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    <!-- Lucide Icons (CDN) -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-white text-gray-900 font-sans antialiased h-screen overflow-hidden">
    <!-- Main Layout: CSS Grid -->
    <div class="grid grid-cols-[256px_1fr] h-full w-full">
        
        <!-- Sidebar (Left) -->
        <aside class="bg-gray-50 border-r border-gray-200 flex flex-col h-full">
            <!-- Brand / Logo -->
            <div class="px-6 py-5 border-b border-gray-200">
                <h1 class="text-lg font-semibold flex items-center gap-2">
                    <i data-lucide="package" class="w-5 h-5 text-gray-900"></i>
                    Madly
                </h1>
            </div>

            <!-- Navigation -->
            <nav class="flex-1 overflow-y-auto py-4">
                <div class="px-3 mb-6">
                    <p class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Menu</p>
                    <a href="#" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-900 rounded hover:bg-gray-200/50 transition-colors">
                        <i data-lucide="list" class="w-4 h-4 text-gray-500"></i>
                        Pricelist
                    </a>
                    <a href="#" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-900 rounded hover:bg-gray-200/50 transition-colors">
                        <i data-lucide="message-square" class="w-4 h-4 text-gray-500"></i>
                        Chat Snippets
                    </a>
                </div>

                <div class="px-3">
                    <p class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Brands</p>
                    <!-- Brand items will go here -->
                    <a href="#" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-900 rounded hover:bg-gray-200/50 transition-colors">
                        <i data-lucide="folder" class="w-4 h-4 text-gray-500"></i>
                        Brand A
                    </a>
                    <a href="#" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-900 rounded hover:bg-gray-200/50 transition-colors">
                        <i data-lucide="folder" class="w-4 h-4 text-gray-500"></i>
                        Brand B
                    </a>
                </div>
            </nav>
            
            <!-- User / Settings (Bottom) -->
            <div class="p-4 border-t border-gray-200">
                <a href="#" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-900 rounded hover:bg-gray-200/50 transition-colors">
                    <i data-lucide="settings" class="w-4 h-4 text-gray-500"></i>
                    Settings
                </a>
            </div>
        </aside>

        <!-- Main Content (Right) -->
        <main class="flex flex-col h-full bg-white">
            {{ $slot }}
        </main>
    </div>

    <!-- Initialize Lucide Icons -->
    <script>
        lucide.createIcons();
    </script>
    
    <!-- Copy Paste Engine & Toast Notification Logic -->
    <div id="toast-container" class="fixed bottom-4 right-4 z-50 flex flex-col gap-2"></div>
    <script>
        function showToast(message) {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            // Strict minimalist toast: no shadow, just border and background
            toast.className = 'bg-gray-900 text-white text-sm px-4 py-2 rounded flex items-center gap-2 transition-opacity duration-300';
            toast.innerHTML = `<i data-lucide="check-circle-2" class="w-4 h-4"></i> ${message}`;
            container.appendChild(toast);
            lucide.createIcons(); // re-init icons for the new element
            
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 2000);
        }

        document.addEventListener('click', function(e) {
            // Find closest element with data-copy attribute
            const copyElement = e.target.closest('[data-copy]');
            if (copyElement) {
                const textToCopy = copyElement.getAttribute('data-copy');
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast('Tersalin!');
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            }
        });
        
        // Setup Keyboard shortcut for search
        document.addEventListener('keydown', function(e) {
            if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                const searchInput = document.getElementById('global-search');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });
    </script>
</body>
</html>
