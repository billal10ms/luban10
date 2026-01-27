// --- DATA ---
const HERO_IMAGES = {
    main: "https://picsum.photos/id/431/800/800",
    topRight: "https://picsum.photos/id/364/800/400",
    bottomRight1: "https://picsum.photos/id/1060/400/400",
    bottomRight2: "https://picsum.photos/id/250/400/400",
};

const PRODUCTS = [
    { id: 1, name: "Royal Oudh Intense", price: 450, maxPrice: 950, image: "https://picsum.photos/id/225/400/500", category: "Best Perfume", isPopular: true },
    { id: 2, name: "Simple Aura", price: 1200, image: "https://picsum.photos/id/312/400/500", category: "Signature", isPopular: true },
    { id: 3, name: "Cherry Musk", price: 850, originalPrice: 1050, image: "https://picsum.photos/id/326/400/500", category: "Sweet Floral" },
    { id: 4, name: "Golden Amber", price: 2100, image: "https://picsum.photos/id/56/400/500", category: "Musk & Amber", isPopular: true },
    { id: 5, name: "Midnight Frankincense", price: 3500, image: "https://picsum.photos/id/21/400/500", category: "Frankincense" },
    { id: 6, name: "Velvet Rose", price: 650, maxPrice: 1250, image: "https://picsum.photos/id/360/400/500", category: "Sweet Floral" },
    { id: 7, name: "Oceanic Breeze", price: 900, image: "https://picsum.photos/id/38/400/500", category: "Signature" },
    { id: 8, name: "Spiced Saffron", price: 4500, image: "https://picsum.photos/id/835/400/500", category: "Best Perfume" },
    { id: 9, name: "White Musk", price: 550, image: "https://picsum.photos/id/102/400/500", category: "Musk & Amber" }
];

const CATEGORIES = {
    "Sweet Type": PRODUCTS.filter(p => p.category === "Sweet Floral"),
    "Perfume Type": PRODUCTS.filter(p => p.category === "Signature"),
    "Traditional": PRODUCTS.filter(p => p.category === "Best Perfume" || p.category === "Frankincense")
};

const BANNER_IMAGES = {
    Sweet: "https://picsum.photos/id/120/600/800",
    Perfume: "https://picsum.photos/id/486/600/800",
    Traditional: "https://picsum.photos/id/204/600/800",
};

// --- STATE ---
const state = {
    page: 'home', // 'home' | 'shop'
    cart: [], // Array of { ...product, quantity }
    isCartOpen: false,
    isMobileMenuOpen: false,
    shop: {
        view: 'grid', // 'grid' | 'list'
        sort: 'featured', // 'featured' | 'price-low' | 'price-high' | 'newest'
        showFilters: false
    }
};

// --- RENDER FUNCTIONS ---

function formatPrice(price) {
    return '৳' + price.toLocaleString();
}

function renderNavbar() {
    const cartCount = state.cart.reduce((a, c) => a + c.quantity, 0);
    
    return `
    <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between gap-4">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
                <a href="#" data-action="nav-home" class="font-serif text-2xl md:text-3xl font-bold text-luban-green tracking-wide">
                    LUBAN <span class="text-luban-gold text-lg md:text-xl font-normal pointer-events-none">Perfume</span>
                </a>
            </div>

            <!-- Desktop Nav -->
            <div class="hidden lg:flex items-center space-x-8 text-luban-green font-medium text-sm tracking-wider uppercase">
                <a href="#" data-action="nav-home" class="hover:text-luban-gold transition-colors ${state.page === 'home' ? 'text-luban-gold border-b border-luban-gold' : ''}">Home</a>
                <a href="#" data-action="nav-shop" class="hover:text-luban-gold transition-colors ${state.page === 'shop' ? 'text-luban-gold border-b border-luban-gold' : ''}">Shop</a>
                <a href="#about" class="hover:text-luban-gold transition-colors">About</a>
                <a href="#contact" class="hover:text-luban-gold transition-colors">Contact</a>
            </div>

            <!-- Search -->
            <div class="hidden md:flex flex-1 max-w-xs mx-4 relative group">
                <input type="text" placeholder="Search fragrances..." class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-luban-gold transition-all" />
                <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>

            <!-- Icons -->
            <div class="flex items-center space-x-3 md:space-x-5">
                <button class="text-luban-green hover:text-luban-gold"><i data-lucide="user" class="w-5 h-5"></i></button>
                <button class="text-luban-green hover:text-luban-gold hidden sm:block"><i data-lucide="heart" class="w-5 h-5"></i></button>
                <button data-action="toggle-cart" class="relative text-luban-green hover:text-luban-gold">
                    <i data-lucide="shopping-cart" class="w-5 h-5 pointer-events-none"></i>
                    ${cartCount > 0 ? `<span class="absolute -top-2 -right-2 bg-luban-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center pointer-events-none">${cartCount}</span>` : ''}
                </button>
                <button data-action="toggle-mobile-menu" class="lg:hidden text-luban-green"><i data-lucide="menu" class="w-6 h-6"></i></button>
            </div>
        </div>
    </div>`;
}

function renderMobileMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    if (state.isMobileMenuOpen) {
        overlay.classList.remove('hidden', 'translate-x-full');
        overlay.classList.add('translate-x-0');
    } else {
        overlay.classList.add('translate-x-full');
    }

    return `
    <div class="p-6 h-full flex flex-col">
        <div class="flex justify-between items-center mb-10">
            <h2 class="font-serif text-2xl font-bold text-white">Menu</h2>
            <button data-action="toggle-mobile-menu" class="text-white"><i data-lucide="x" class="w-8 h-8"></i></button>
        </div>
        <div class="flex flex-col space-y-6 text-white text-xl font-serif">
            <a href="#" data-action="nav-home" class="border-b border-white/20 pb-2">Home</a>
            <a href="#" data-action="nav-shop" class="border-b border-white/20 pb-2">Shop</a>
            <a href="#" class="border-b border-white/20 pb-2">Wishlist</a>
            <a href="#" class="border-b border-white/20 pb-2">Contact Us</a>
        </div>
    </div>`;
}

function renderProductCard(product) {
    const priceDisplay = product.maxPrice 
        ? `${formatPrice(product.price)} - ${formatPrice(product.maxPrice)}`
        : `<span class="flex items-center gap-2 justify-center">
             <span>${formatPrice(product.price)}</span>
             ${product.originalPrice ? `<span class="text-gray-400 text-sm line-through font-normal">${formatPrice(product.originalPrice)}</span>` : ''}
           </span>`;

    return `
    <div class="group relative bg-white border border-transparent hover:border-gray-100 hover:shadow-xl rounded-lg overflow-hidden transition-all duration-300">
        <div class="relative aspect-[3/4] overflow-hidden bg-luban-cream/30 flex items-end justify-center">
            <div class="absolute bottom-0 w-3/4 h-4 bg-radial from-luban-gold/20 to-transparent blur-md"></div>
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
            
            ${product.originalPrice ? '<div class="absolute top-3 left-3"><span class="bg-red-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-sm tracking-wider">Sale</span></div>' : ''}

            <div class="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 backdrop-blur-[2px]">
                <button title="Quick View" class="bg-white text-luban-green p-3 rounded-full hover:bg-luban-green hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300">
                    <i data-lucide="eye" class="w-5 h-5"></i>
                </button>
                <button title="Add to Cart" data-action="add-to-cart" data-id="${product.id}" class="bg-luban-gold text-white p-3 rounded-full hover:bg-white hover:text-luban-gold transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                    <i data-lucide="shopping-cart" class="w-5 h-5 pointer-events-none"></i>
                </button>
            </div>
        </div>
        <div class="p-4 text-center">
            <h3 class="font-serif text-lg font-medium text-luban-green mb-1 group-hover:text-luban-gold transition-colors">${product.name}</h3>
            <p class="text-gray-500 text-xs uppercase tracking-widest mb-2 font-medium">${product.category}</p>
            <div class="flex flex-col items-center gap-2">
                <div class="font-medium text-gray-900">${priceDisplay}</div>
                <button class="text-gray-400 hover:text-red-500 transition-colors mt-1 group/heart">
                    <i data-lucide="heart" class="w-4 h-4 group-hover/heart:fill-current"></i>
                </button>
            </div>
        </div>
    </div>`;
}

function renderHero() {
    return `
    <section class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto lg:h-[600px]">
            <div class="relative group overflow-hidden rounded-2xl h-[400px] lg:h-full bg-luban-green">
                <img src="${HERO_IMAGES.main}" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div class="absolute inset-0 bg-gradient-to-t from-luban-green/90 via-transparent to-transparent"></div>
                <div class="absolute bottom-0 left-0 p-8 md:p-12">
                    <span class="inline-block bg-luban-gold text-white text-xs px-3 py-1 rounded-full mb-3 uppercase tracking-widest font-bold">Leading Brand</span>
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 leading-tight">Best Perfume <br/> <span class="text-luban-gold italic">Collection</span></h1>
                    <p class="text-gray-200 mb-6 max-w-md text-sm md:text-base">Discover the essence of heritage with our premium oil blends.</p>
                    <button data-action="nav-shop" class="bg-white/10 backdrop-blur-sm border border-white/40 text-white px-6 py-3 rounded-full hover:bg-luban-gold hover:border-luban-gold transition-all duration-300 flex items-center gap-2">
                        Explore Collection <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
            <div class="grid grid-rows-2 gap-4 h-full">
                <div class="relative overflow-hidden rounded-2xl h-[250px] lg:h-auto bg-luban-cream">
                    <img src="${HERO_IMAGES.topRight}" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div class="text-center bg-white/90 p-6 rounded-lg shadow-lg max-w-xs mx-auto backdrop-blur-sm">
                            <h3 class="font-serif text-luban-green text-2xl mb-2">Frankincense Specials</h3>
                            <p class="text-gray-600 text-sm italic">Where style meets tradition</p>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="relative overflow-hidden rounded-2xl group cursor-pointer">
                        <img src="${HERO_IMAGES.bottomRight1}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                        <div class="absolute inset-0 bg-gradient-to-t from-luban-green/80 to-transparent flex items-end p-4"><span class="text-white font-serif text-lg">New Arrivals</span></div>
                    </div>
                    <div class="relative overflow-hidden rounded-2xl group cursor-pointer">
                        <img src="${HERO_IMAGES.bottomRight2}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                        <div class="absolute inset-0 bg-gradient-to-t from-luban-green/80 to-transparent flex items-end p-4"><span class="text-white font-serif text-lg">Gift Sets</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

function renderFeatures() {
    return `
    <section class="bg-white py-12 border-t border-gray-100">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                    <i data-lucide="truck" class="w-10 h-10 text-luban-green"></i>
                    <div>
                        <h4 class="font-bold text-luban-green">Free Delivery</h4>
                        <p class="text-xs text-gray-500">When ordering from 2000 TK</p>
                    </div>
                </div>
                <div class="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                    <i data-lucide="shield-check" class="w-10 h-10 text-luban-green"></i>
                    <div>
                        <h4 class="font-bold text-luban-green">Quick Payment</h4>
                        <p class="text-xs text-gray-500">100% secure payment</p>
                    </div>
                </div>
                <div class="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                    <i data-lucide="gift" class="w-10 h-10 text-luban-green"></i>
                    <div>
                        <h4 class="font-bold text-luban-green">Gift Certificate</h4>
                        <p class="text-xs text-gray-500">Buy now 1500 to 2500</p>
                    </div>
                </div>
                <div class="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                    <i data-lucide="headphones" class="w-10 h-10 text-luban-green"></i>
                    <div>
                        <h4 class="font-bold text-luban-green">8 Hours Support</h4>
                        <p class="text-xs text-gray-500">11 AM - 7 PM</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

function renderCategoryRow(title, products, reverse = false) {
    const bannerImg = BANNER_IMAGES[title.replace(' Type', '').replace(' Collection', '')] || BANNER_IMAGES['Sweet'];
    const gridHTML = products.map(p => renderProductCard(p)).join('');

    return `
    <section class="container mx-auto px-4 py-16">
        <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl md:text-4xl font-serif text-luban-green relative pl-4">
                <span class="absolute left-0 top-1 bottom-1 w-1 bg-luban-gold rounded-full"></span>${title}
            </h2>
            <a href="#" data-action="nav-shop" class="text-luban-gold hover:text-luban-green text-sm font-bold border-b border-luban-gold/50 pb-0.5 transition-colors">View Collection</a>
        </div>
        <div class="flex flex-col lg:flex-row gap-8 ${reverse ? 'lg:flex-row-reverse' : ''}">
            <div class="w-full lg:w-1/3 xl:w-1/4 flex-shrink-0">
                <div class="relative h-[400px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden group shadow-lg">
                    <img src="${bannerImg}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-gradient-to-t from-luban-green/90 via-luban-green/20 to-transparent flex flex-col justify-end p-8">
                        <h3 class="text-white font-serif text-3xl mb-2">${title}</h3>
                        <p class="text-white/80 text-sm mb-6">Discover the unique notes and lingering aura.</p>
                        <button data-action="nav-shop" class="bg-white text-luban-green px-6 py-3 rounded-lg font-bold text-sm hover:bg-luban-gold hover:text-white transition-colors self-start">Explore Now</button>
                    </div>
                </div>
            </div>
            <div class="w-full lg:w-2/3 xl:w-3/4">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${gridHTML}</div>
            </div>
        </div>
    </section>`;
}

function renderHome() {
    const popularHTML = PRODUCTS.filter(p => p.isPopular).slice(0, 4).map(p => renderProductCard(p)).join('');
    
    return `
    ${renderHero()}
    <section class="container mx-auto px-4 py-16">
        <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-serif text-luban-green mb-4">Currently Popular Items</h2>
            <div class="inline-block border-b-2 border-luban-gold pb-1 text-luban-gold font-bold text-sm tracking-widest uppercase">Best Seller</div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">${popularHTML}</div>
    </section>
    ${renderCategoryRow("Sweet Type", CATEGORIES["Sweet Type"])}
    ${renderCategoryRow("Perfume Type", CATEGORIES["Perfume Type"], true)}
    
    <!-- Testimonials -->
    <section class="bg-luban-cream/30 py-20 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-64 h-64 bg-luban-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div class="container mx-auto px-4 text-center relative z-10">
            <h2 class="text-3xl font-serif text-luban-green mb-12">Our Customers Say</h2>
            <div class="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-luban-green/5">
                <div class="flex justify-center mb-6 text-luban-gold gap-1"><i data-lucide="star" class="fill-current w-5 h-5"></i><i data-lucide="star" class="fill-current w-5 h-5"></i><i data-lucide="star" class="fill-current w-5 h-5"></i><i data-lucide="star" class="fill-current w-5 h-5"></i><i data-lucide="star" class="fill-current w-5 h-5"></i></div>
                <p class="text-gray-600 text-lg md:text-xl italic mb-8 font-light">"Delivery and behavior 10 out of 10. Their products are so good, amazing fragrance and long lasting."</p>
                <div class="flex items-center justify-center gap-4"><div class="h-px w-10 bg-gray-300"></div><span class="font-serif font-bold text-luban-green">Konok Shuvom</span><div class="h-px w-10 bg-gray-300"></div></div>
            </div>
        </div>
    </section>
    
    ${renderCategoryRow("Traditional", CATEGORIES["Traditional"], true)}
    ${renderFeatures()}
    `;
}

function renderShop() {
    let sortedProducts = [...PRODUCTS];
    if (state.shop.sort === 'price-low') sortedProducts.sort((a,b) => a.price - b.price);
    else if (state.shop.sort === 'price-high') sortedProducts.sort((a,b) => b.price - a.price);

    const gridClass = state.shop.view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1';
    
    return `
    <div class="container mx-auto px-4 py-8">
        <div class="mb-8 text-center md:text-left">
            <h1 class="font-serif text-3xl md:text-4xl text-luban-green mb-2">Shop All Fragrances</h1>
            <p class="text-gray-500 text-sm">Home / <span class="text-luban-gold">Shop</span></p>
        </div>
        <div class="flex flex-col lg:flex-row gap-8">
            <!-- Filters -->
            <aside class="lg:w-1/4 hidden lg:block">
                <div class="bg-white p-6 rounded-lg border border-gray-100 shadow-sm sticky top-24">
                    <h3 class="font-serif text-xl text-luban-green mb-6">Filters</h3>
                    <div class="mb-8">
                        <h4 class="font-medium mb-3 text-sm uppercase tracking-wider text-gray-900">Categories</h4>
                        <ul class="space-y-2 text-sm text-gray-600">
                            ${['Best Perfume', 'Frankincense', 'Sweet Floral', 'Musk & Amber'].map(c => `
                                <li class="flex items-center gap-2 cursor-pointer hover:text-luban-gold"><input type="checkbox" class="accent-luban-gold" /><span>${c}</span></li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </aside>
            
            <!-- Main Shop -->
            <div class="flex-1">
                <div class="bg-white p-4 rounded-lg border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <button data-action="view-grid" class="p-2 rounded ${state.shop.view === 'grid' ? 'bg-luban-green text-white' : 'text-gray-500 hover:bg-gray-100'}"><i data-lucide="grid" class="w-4 h-4 pointer-events-none"></i></button>
                        <button data-action="view-list" class="p-2 rounded ${state.shop.view === 'list' ? 'bg-luban-green text-white' : 'text-gray-500 hover:bg-gray-100'}"><i data-lucide="list" class="w-4 h-4 pointer-events-none"></i></button>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-500">Sort by:</span>
                        <select id="shop-sort" class="bg-transparent border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-luban-gold">
                            <option value="featured" ${state.shop.sort === 'featured' ? 'selected' : ''}>Featured</option>
                            <option value="price-low" ${state.shop.sort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                            <option value="price-high" ${state.shop.sort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                        </select>
                    </div>
                </div>
                <div class="grid gap-6 ${gridClass}">
                    ${sortedProducts.map(p => renderProductCard(p)).join('')}
                </div>
            </div>
        </div>
    </div>`;
}

function renderCart() {
    const container = document.getElementById('cart-sidebar-container');
    const subtotal = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    const overlayClass = state.isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none';
    const sidebarClass = state.isCartOpen ? 'translate-x-0' : 'translate-x-full';

    const itemsHTML = state.cart.length === 0 
        ? `<div class="h-full flex flex-col items-center justify-center text-gray-400"><p class="text-lg">Your cart is empty</p><button data-action="toggle-cart" class="mt-4 text-luban-gold underline font-bold">Start Shopping</button></div>`
        : state.cart.map(item => `
            <div class="flex gap-4">
                <div class="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                    <img src="${item.image}" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 flex flex-col justify-between">
                    <div><h3 class="font-serif font-bold text-luban-green text-sm">${item.name}</h3></div>
                    <div class="flex items-center justify-between mt-2">
                        <div class="flex items-center border border-gray-300 rounded-md">
                            <button data-action="qty-dec" data-id="${item.id}" class="p-1 hover:bg-gray-100 text-gray-600"><i data-lucide="minus" class="w-3 h-3 pointer-events-none"></i></button>
                            <span class="px-2 text-sm font-medium">${item.quantity}</span>
                            <button data-action="qty-inc" data-id="${item.id}" class="p-1 hover:bg-gray-100 text-gray-600"><i data-lucide="plus" class="w-3 h-3 pointer-events-none"></i></button>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-luban-green">${formatPrice(item.price * item.quantity)}</p>
                            <button data-action="remove-item" data-id="${item.id}" class="text-red-400 text-xs flex items-center gap-1 hover:text-red-600 mt-1"><i data-lucide="trash-2" class="w-3 h-3 pointer-events-none"></i> Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

    container.innerHTML = `
        <div data-action="toggle-cart" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] transition-opacity duration-300 ${overlayClass}"></div>
        <div class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[80] shadow-2xl transform transition-transform duration-300 ease-in-out ${sidebarClass} flex flex-col">
            <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-luban-green text-white">
                <h2 class="font-serif text-xl font-bold">Your Cart (${state.cart.reduce((a,c) => a + c.quantity, 0)})</h2>
                <button data-action="toggle-cart" class="hover:text-luban-gold"><i data-lucide="x" class="w-6 h-6"></i></button>
            </div>
            <div class="flex-1 overflow-y-auto p-5 space-y-6">${itemsHTML}</div>
            ${state.cart.length > 0 ? `
            <div class="p-5 border-t border-gray-100 bg-gray-50">
                <div class="flex justify-between items-center mb-4"><span class="text-gray-600">Subtotal:</span><span class="text-xl font-serif font-bold text-luban-green">${formatPrice(subtotal)}</span></div>
                <button data-action="checkout" class="w-full bg-luban-green text-white py-3.5 rounded-lg font-bold hover:bg-luban-gold transition-colors shadow-lg">Proceed To Checkout</button>
            </div>` : ''}
        </div>
    `;
    lucide.createIcons();
}

function renderFooter() {
    return `
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
                <h3 class="font-serif text-2xl font-bold mb-6 text-luban-gold">LUBAN PERFUME</h3>
                <div class="flex items-start gap-3 mb-4 text-gray-400 text-sm leading-relaxed">
                    <i data-lucide="map-pin" class="w-5 h-5 text-luban-gold flex-shrink-0 mt-1"></i>
                    <p>Dhaka, Bangladesh.</p>
                </div>
                <div class="flex space-x-4 mt-6">
                    <a href="#" class="bg-white/10 p-2 rounded-full hover:bg-luban-gold"><i data-lucide="facebook" class="w-4 h-4"></i></a>
                    <a href="#" class="bg-white/10 p-2 rounded-full hover:bg-luban-gold"><i data-lucide="instagram" class="w-4 h-4"></i></a>
                </div>
            </div>
            <div>
                <h4 class="font-serif font-bold mb-6 text-lg">Contact Us</h4>
                <div class="space-y-4 text-gray-400 text-sm">
                    <div class="flex items-center gap-3"><i data-lucide="mail" class="w-5 h-5 text-luban-gold"></i><span>contact@lubanperfume.com</span></div>
                    <div class="mt-6"><p class="text-xs text-gray-500 mb-1">Call Us 11 AM - 7 PM</p><a href="tel:)01935322213" class="text-2xl font-serif text-white font-bold block hover:text-luban-gold">01-93-53-222-13</a></div>
                    <button class="bg-green-700 hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2 mt-4 w-fit text-sm font-bold"><i data-lucide="phone" class="w-4 h-4"></i> WhatsApp Us</button>
                </div>
            </div>
        </div>
        <div class="border-t border-white/10 pt-8 text-center md:text-left"><p class="text-gray-500 text-xs">Copyright © 2025 <span class="text-luban-gold">Luban Perfume</span>. All Rights Reserved.</p></div>
    </div>`;
}

function render() {
    document.getElementById('navbar-container').innerHTML = renderNavbar();
    document.getElementById('mobile-menu-overlay').innerHTML = renderMobileMenu();
    
    const main = document.getElementById('main-content');
    if (state.page === 'home') main.innerHTML = renderHome();
    else if (state.page === 'shop') main.innerHTML = renderShop();

    document.getElementById('footer-container').innerHTML = renderFooter();
    renderCart(); // Independent render
    lucide.createIcons();

    // Re-attach specific listeners if needed, though delegation handles most
    if(state.page === 'shop') {
        const sortSelect = document.getElementById('shop-sort');
        if(sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                state.shop.sort = e.target.value;
                render();
            });
        }
    }
}

// --- ACTIONS ---
document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    const id = parseInt(target.dataset.id);

    if (action === 'nav-home') { 
        e.preventDefault(); 
        state.page = 'home'; 
        state.isMobileMenuOpen = false; 
        render(); 
    }
    if (action === 'nav-shop') { 
        e.preventDefault(); 
        state.page = 'shop'; 
        state.isMobileMenuOpen = false; 
        render(); 
    }
    
    if (action === 'toggle-cart') { 
        state.isCartOpen = !state.isCartOpen; 
        renderCart(); 
    }

    if (action === 'toggle-mobile-menu') {
        state.isMobileMenuOpen = !state.isMobileMenuOpen;
        // Re-rendering Navbar or just toggling class on overlay
        document.getElementById('mobile-menu-overlay').innerHTML = renderMobileMenu(); 
    }

    if (action === 'add-to-cart') {
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
            const existing = state.cart.find(item => item.id === id);
            if (existing) existing.quantity++;
            else state.cart.push({ ...product, quantity: 1 });
            state.isCartOpen = true;
            render(); // Update Navbar count and Cart
        }
    }

    if (action === 'qty-inc') {
        const item = state.cart.find(i => i.id === id);
        if (item) { item.quantity++; renderCart(); renderNavbar(); }
    }

    if (action === 'qty-dec') {
        const item = state.cart.find(i => i.id === id);
        if (item) { 
            item.quantity--; 
            if (item.quantity <= 0) state.cart = state.cart.filter(i => i.id !== id);
            renderCart(); renderNavbar();
        }
    }

    if (action === 'remove-item') {
        state.cart = state.cart.filter(i => i.id !== id);
        renderCart(); renderNavbar();
    }

    if (action === 'view-grid') { state.shop.view = 'grid'; render(); }
    if (action === 'view-list') { state.shop.view = 'list'; render(); }

    if (action === 'checkout') {
        alert("Proceeding to checkout with " + state.cart.reduce((a,c) => a+c.quantity, 0) + " items!");
    }
});

// Init
render();
