// Products Database
const products = [
    {
        id: 1,
        name: "RAF Fan qızdırıcı 3000W — Model R.1407",
        code: "EL-HT001",
        category: "heaters",
        price: 49.99,
        currency: "AZN",
        stock: 3,
        visible: true,
        image: "./static/images/RAF qizdirici main.png",
        images: [
            "./static/images/raf fan dayan.png",
            "./static/images/raf fan guc.png",
            "./static/images/Raf fan ust.png",
            "./static/images/raf fan.png"
        ],
        description: "RAF R.1407 3000W fan qızdırıcı geniş məkanların daha sürətli isidilməsi üçün nəzərdə tutulmuş güclü elektrik qızdırıcıdır. Qaraj, usta otağı, anbar və böyük iş sahələrində qısa müddətdə istilik yaratmaq üçün uyğundur.",
        specifications: [
            { label: "Brend", value: "RAF" },
            { label: "Model", value: "R.1407" },
            { label: "Güc", value: "3000W" },
            { label: "Zəmanət", value: "1 il" }
        ]
    },
    {
        id: 2,
        name: "Xiaomi TV Box S (3-cü nəsil) — 4K Ultra-HD (Google TV)",
        code: "EL-TVB002",
        category: "tv-box",
        price: 149.99,
        currency: "AZN",
        stock: 18,
        visible: true,
        image: "./static/images/xiaotv0.png",
        images: [
            "./static/images/xiaotv1.png",
            "./static/images/xiaotv2.png"
        ],
        description: "Xiaomi TV Box S adi televizoru daha funksional smart sistemə çevirir. Google TV platforması üzərindən film və serial izləmək, tətbiqlərdən istifadə etmək və media kontentə rahat çıxış mümkündür.",
        specifications: [
            { label: "Brend", value: "Xiaomi" },
            { label: "Nəsil", value: "3-cü nəsil" },
            { label: "Görüntü", value: "4K Ultra-HD" },
            { label: "Zəmanət", value: "1 il" }
        ]
    },
    {
        id: 3,
        name: "Mini simsiz klaviatura + touchpad (Backlit) — Mini Keyboard",
        code: "EL-ACC003",
        category: "accessories",
        price: 13.99,
        currency: "AZN",
        stock: 35,
        visible: true,
        image: "./static/images/kb0.png",
        images: [
            "./static/images/kb1.png"
        ],
        description: "Bu mini simsiz klaviatura TV Box, Smart TV və PC üçün rahat uzaqdan idarəetmə imkanı yaradır. Daxili touchpad kursor idarəsini sürətləndirir.",
        specifications: [
            { label: "Tip", value: "Simsiz klaviatura" },
            { label: "İşıqlandırma", value: "Backlit" },
            { label: "Zəmanət", value: "6 ay" }
        ]
    }
];

// Translations
const translations = {
    az: {
        nav_products: "Məhsullar",
        nav_about: "Haqqımızda",
        nav_contact: "Əlaqə",
        nav_warranty: "Zəmanət",
        nav_faq: "FAQ",
        hero_title: "Premium Texnologiya Məhsulları",
        hero_subtitle: "TV Box, Qızdırıcılar və daha çox məhsullar",
        hero_cta: "Bütün Çeşidlər",
        section_categories: "Kateqoriyalar",
        section_featured: "Seçilmiş Məhsullar",
        section_services: "Xidmətlərimiz",
        section_how: "Necə sifariş edim?",
        cat_heaters: "Portativ Qızdırıcılar",
        cat_accessories: "Aksesuarlar",
        cat_all: "Hamısı",
        btn_order: "Sifariş et",
        btn_cart: "Səbətə",
        page_products: "Məhsullar",
        search_placeholder: "Məhsul axtar...",
        filter_all: "Hamısı",
        back_products: "Məhsullara qayıt",
        cart_empty: "Səbətiniz boşdur",
        cart_total: "Cəm:",
        send_order: "Sifariş et",
        footer_desc: "Premium texnologiya məhsulları",
        footer_contact: "Əlaqə",
        footer_links: "Keçidlər",
        footer_social: "Sosial Media",
        footer_rights: "Bütün hüquqlar qorunur"
    },
    tr: {
        nav_products: "Ürünler",
        nav_about: "Hakkımızda",
        nav_contact: "İletişim",
        hero_title: "Premium Teknoloji Ürünler",
        hero_subtitle: "TV Box, Isıtıcılar ve daha fazlası",
        btn_order: "Sipariş et",
        btn_cart: "Sepete"
    },
    ru: {
        nav_products: "Продукты",
        nav_about: "О нас",
        nav_contact: "Контакты",
        hero_title: "Премиум технологические продукты",
        hero_subtitle: "TV Box, обогреватели и многое другое",
        btn_order: "Заказать",
        btn_cart: "В корзину"
    }
};

// Router
class Router {
    constructor() {
        this.routes = {
            '': this.renderHome,
            'products': this.renderProducts,
            'product': this.renderProductDetail,
            'cart': this.renderCart,
            'about': this.renderAbout,
            'contact': this.renderContact,
            'warranty': this.renderWarranty,
            'faq': this.renderFAQ
        };
        
        this.init();
    }
    
    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
        this.initTheme();
        this.initLanguage();
        this.initMobileMenu();
        this.initLanguageDropdown();
        this.updateCartBadge();
    }
    
    handleRoute() {
        const hash = window.location.hash.slice(1) || '';
        const [route, param] = hash.split('/');
        
        const handler = this.routes[route] || this.renderHome;
        handler.call(this, param);
        
        // Close mobile menu
        document.getElementById('mobileMenu').classList.remove('active');
        document.querySelector('.mobile-menu-toggle i').className = 'fas fa-bars';
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    renderHome() {
        document.getElementById('app').innerHTML = `
            <section class="hero">
                <div class="container">
                    <div class="hero-content">
                        <h1 data-i18n="hero_title">Premium Texnologiya Məhsulları</h1>
                        <p data-i18n="hero_subtitle">TV Box, Qızdırıcılar və daha çox məhsullar</p>
                        <a href="#products" class="btn btn-primary" data-i18n="hero_cta">Bütün Çeşidlər</a>
                    </div>
                    <div class="hero-animation">
                        <div class="animated-box box-1"></div>
                        <div class="animated-box box-2"></div>
                        <div class="animated-box box-3"></div>
                        <div class="animated-box box-4"></div>
                    </div>
                </div>
            </section>

            <section class="categories">
                <div class="container">
                    <h2 data-i18n="section_categories">Kateqoriyalar</h2>
                    <div class="category-grid">
                        <a href="#products?category=tv-box" class="category-card">
                            <i class="fas fa-tv"></i>
                            <h3>TV Box</h3>
                        </a>
                        <a href="#products?category=heaters" class="category-card">
                            <i class="fas fa-fire"></i>
                            <h3 data-i18n="cat_heaters">Portativ Qızdırıcılar</h3>
                        </a>
                        <a href="#products?category=accessories" class="category-card">
                            <i class="fas fa-keyboard"></i>
                            <h3 data-i18n="cat_accessories">Aksesuarlar</h3>
                        </a>
                        <a href="#products" class="category-card">
                            <i class="fas fa-th"></i>
                            <h3 data-i18n="cat_all">Hamısı</h3>
                        </a>
                    </div>
                </div>
            </section>

            <section class="featured-products">
                <div class="container">
                    <h2 data-i18n="section_featured">Seçilmiş Məhsullar</h2>
                    <div class="products-grid" id="featuredProducts"></div>
                </div>
            </section>

            <section class="how-to-order">
                <div class="container">
                    <h2 data-i18n="section_how">Necə sifariş edim?</h2>
                    <div class="steps">
                        <div class="step">
                            <div class="step-number">1</div>
                            <h3>Məhsulu bəyənin</h3>
                            <p>Kataloqdan seçin</p>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <h3>Sifariş et click edin</h3>
                            <p>WhatsApp-a keçid</p>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <h3>Sifarişiniz bizdədir 😁</h3>
                            <p>Tezliklə çatdırırıq</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        this.loadFeaturedProducts();
        this.applyTranslations();
    }
    
    loadFeaturedProducts() {
        const container = document.getElementById('featuredProducts');
        if (!container) return;
        
        container.innerHTML = '';
        products.slice(0, 6).forEach(product => {
            container.appendChild(this.createProductCard(product));
        });
    }
    
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='./static/images/placeholder.png'">
            <h3>${product.name}</h3>
            <p class="product-code">${product.code}</p>
            <p class="product-price">${product.price} ${product.currency}</p>
            <div class="product-actions">
                <button class="btn btn-primary btn-sm" onclick="orderNow('${product.code}', '${product.name}', 1)">
                    <i class="fab fa-whatsapp"></i> <span data-i18n="btn_order">Sifariş et</span>
                </button>
                <button class="btn btn-secondary btn-sm" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> <span data-i18n="btn_cart">Səbətə</span>
                </button>
            </div>
        `;
        card.onclick = (e) => {
            if (!e.target.closest('button')) {
                window.location.hash = `product/${product.id}`;
            }
        };
        return card;
    }
    
    renderProducts() {
        document.getElementById('app').innerHTML = `
            <section class="products-page">
                <div class="container">
                    <h1 data-i18n="page_products">Məhsullar</h1>
                    
                    <div class="filters">
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" id="searchInput" placeholder="Məhsul axtar..." data-i18n-placeholder="search_placeholder">
                        </div>
                        
                        <div class="filter-buttons">
                            <button class="filter-btn active" data-category="all">
                                <span data-i18n="filter_all">Hamısı</span>
                            </button>
                            <button class="filter-btn" data-category="tv-box">TV Box</button>
                            <button class="filter-btn" data-category="heaters">
                                <span data-i18n="cat_heaters">Qızdırıcılar</span>
                            </button>
                            <button class="filter-btn" data-category="accessories">
                                <span data-i18n="cat_accessories">Aksesuarlar</span>
                            </button>
                        </div>
                    </div>

                    <div class="products-grid" id="productsGrid"></div>
                </div>
            </section>
        `;
        
        this.initProductsPage();
        this.applyTranslations();
    }
    
    initProductsPage() {
        let currentCategory = 'all';
        
        const displayProducts = () => {
            const grid = document.getElementById('productsGrid');
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            
            let filtered = products;
            
            if (currentCategory !== 'all') {
                filtered = filtered.filter(p => p.category === currentCategory);
            }
            
            if (searchTerm) {
                filtered = filtered.filter(p => 
                    p.name.toLowerCase().includes(searchTerm) ||
                    p.code.toLowerCase().includes(searchTerm)
                );
            }
            
            grid.innerHTML = '';
            
            if (filtered.length === 0) {
                grid.innerHTML = '<p class="no-products">Məhsul tapılmadı</p>';
                return;
            }
            
            filtered.forEach(product => {
                grid.appendChild(this.createProductCard(product));
            });
        };
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.dataset.category;
                displayProducts();
            });
        });
        
        document.getElementById('searchInput').addEventListener('input', displayProducts);
        
        displayProducts();
    }
    
    renderProductDetail(productId) {
        const product = products.find(p => p.id == productId);
        
        if (!product) {
            document.getElementById('app').innerHTML = '<div class="container"><p>Məhsul tapılmadı</p></div>';
            return;
        }
        
        document.getElementById('app').innerHTML = `
            <section class="product-detail">
                <div class="container">
                    <a href="#products" class="back-link">
                        <i class="fas fa-arrow-left"></i> <span data-i18n="back_products">Məhsullara qayıt</span>
                    </a>
                    
                    <div class="product-detail-content">
                        <div class="product-images">
                            <div class="main-image">
                                <img src="${product.image}" alt="${product.name}" id="mainImage" onerror="this.src='./static/images/placeholder.png'">
                            </div>
                            <div class="image-gallery">
                                <img src="${product.image}" alt="${product.name}" class="gallery-img active" onclick="changeImage('${product.image}')">
                                ${product.images.map(img => `
                                    <img src="${img}" alt="${product.name}" class="gallery-img" onclick="changeImage('${img}')" onerror="this.style.display='none'">
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="product-info">
                            <h1>${product.name}</h1>
                            <p class="product-code">Kod: ${product.code}</p>
                            <p class="product-price">${product.price} ${product.currency}</p>
                            
                            <div class="quantity-selector">
                                <label>Miqdar:</label>
                                <div class="quantity-controls">
                                    <button onclick="decreaseQty()"><i class="fas fa-minus"></i></button>
                                    <input type="number" id="quantity" value="1" min="1" max="${product.stock}">
                                    <button onclick="increaseQty()"><i class="fas fa-plus"></i></button>
                                </div>
                            </div>
                            
                            <div class="product-actions-detail">
                                <button class="btn btn-primary" onclick="orderNowDetail(${product.id})">
                                    <i class="fab fa-whatsapp"></i> <span data-i18n="btn_order">Sifariş et</span>
                                </button>
                                <button class="btn btn-secondary" onclick="addToCartDetail(${product.id})">
                                    <i class="fas fa-cart-plus"></i> Səbətə
                                </button>
                            </div>
                            
                            <div class="product-description">
                                <h3>Təsvir</h3>
                                <p>${product.description}</p>
                            </div>
                            
                            <div class="product-specs">
                                <h3>Xüsusiyyətlər</h3>
                                <ul>
                                    ${product.specifications.map(spec => `
                                        <li><strong>${spec.label}:</strong> ${spec.value}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        this.applyTranslations();
    }
    
    renderCart() {
        document.getElementById('app').innerHTML = `
            <section class="cart-page">
                <div class="container">
                    <h1 data-i18n="page_cart">Səbət</h1>
                    
                    <div class="cart-content" id="cartContent"></div>
                    
                    <div class="cart-empty" id="cartEmpty" style="display:none;">
                        <i class="fas fa-shopping-cart"></i>
                        <p data-i18n="cart_empty">Səbətiniz boşdur</p>
                        <a href="#products" class="btn btn-primary">Məhsullara bax</a>
                    </div>
                </div>
            </section>
        `;
        
        this.loadCart();
        this.applyTranslations();
    }
    
    loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartContent = document.getElementById('cartContent');
        const cartEmpty = document.getElementById('cartEmpty');
        
        if (cart.length === 0) {
            cartContent.style.display = 'none';
            cartEmpty.style.display = 'block';
            return;
        }
        
        cartContent.style.display = 'block';
        cartEmpty.style.display = 'none';
        
        let total = 0;
        let html = '<div class="cart-items">';
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            html += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p class="cart-item-code">${item.code}</p>
                        <p class="cart-item-price">${item.price} AZN</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="cart-item-total">
                        ${itemTotal.toFixed(2)} AZN
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        
        html += '</div>';
        html += `
            <div class="cart-summary">
                <div class="cart-total">
                    <span data-i18n="cart_total">Cəm:</span>
                    <span class="total-amount">${total.toFixed(2)} AZN</span>
                </div>
                <div class="cart-actions">
                    <a href="#products" class="btn btn-secondary">
                        <i class="fas fa-arrow-left"></i> Məhsullara qayıt
                    </a>
                    <button class="btn btn-primary" onclick="sendCartToWhatsApp()">
                        <i class="fab fa-whatsapp"></i> <span data-i18n="send_order">Sifariş et</span>
                    </button>
                </div>
            </div>
        `;
        
        cartContent.innerHTML = html;
    }
    
    renderAbout() {
        document.getElementById('app').innerHTML = `
            <section class="page-content">
                <div class="container">
                    <h1>Haqqımızda</h1>
                    <div class="content-box">
                        <p>ElectroLink.az - keyfiyyətli texnologiya məhsulları üzrə etibarlı kataloq saytıdır.</p>
                        <p>Biz müştərilərimizə TV Box, qızdırıcılar və digər elektron məhsullar təqdim edirik.</p>
                        <p>Məqsədimiz: sərfəli qiymətlərlə keyfiyyətli məhsullar və peşəkar xidmət.</p>
                    </div>
                </div>
            </section>
        `;
        this.applyTranslations();
    }
    
    renderContact() {
        document.getElementById('app').innerHTML = `
            <section class="page-content">
                <div class="container">
                    <h1>Əlaqə</h1>
                    <div class="contact-grid">
                        <div class="contact-info">
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <div>
                                    <h3>Telefon</h3>
                                    <p>+994 10 505 16 15</p>
                                </div>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <h3>Email</h3>
                                    <p>info@electrolink.az</p>
                                </div>
                            </div>
                            <div class="social-links-contact">
                                <a href="https://www.instagram.com/electrolink.az/" target="_blank">
                                    <i class="fab fa-instagram"></i> Instagram
                                </a>
                                <a href="https://www.tiktok.com/@electrolink.az" target="_blank">
                                    <i class="fab fa-tiktok"></i> TikTok
                                </a>
                                <a href="https://wa.me/994105051615" target="_blank">
                                    <i class="fab fa-whatsapp"></i> WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        this.applyTranslations();
    }
    
    renderWarranty() {
        document.getElementById('app').innerHTML = `
            <section class="page-content">
                <div class="container">
                    <h1>Zəmanət və Qaytarma</h1>
                    <div class="content-box">
                        <h2>Zəmanət Şərtləri</h2>
                        <ul>
                            <li>Bütün məhsullara 6 aydan 1 ilə qədər zəmanət verilir</li>
                            <li>Zəmanət müddəti məhsulun növündən asılıdır</li>
                            <li>Zəmanət istifadəçi xətası olmadıqda keçərlidir</li>
                        </ul>
                        
                        <h2>Qaytarma Qaydaları</h2>
                        <ul>
                            <li>Məhsul 7 gün ərzində qaytarıla bilər</li>
                            <li>Məhsul orijinal qablaşdırmasında olmalıdır</li>
                            <li>Qaytarma üçün bizimlə əlaqə saxlayın</li>
                        </ul>
                    </div>
                </div>
            </section>
        `;
        this.applyTranslations();
    }
    
    renderFAQ() {
        document.getElementById('app').innerHTML = `
            <section class="page-content">
                <div class="container">
                    <h1>Tez-tez verilən suallar</h1>
                    <div class="faq-list">
                        <div class="faq-item">
                            <h3>Online ödəniş mümkündürmü?</h3>
                            <p>Xeyr, saytda online ödəniş yoxdur. Sifariş yalnız WhatsApp vasitəsilə həyata keçirilir.</p>
                        </div>
                        <div class="faq-item">
                            <h3>Necə sifariş edə bilərəm?</h3>
                            <p>Məhsulu seçin və "Sifariş et" düyməsinə basın. Avtomatik olaraq WhatsApp-a yönləndiriləcəksiniz.</p>
                        </div>
                        <div class="faq-item">
                            <h3>Çatdırılma nə qədər çəkir?</h3>
                            <p>Bakı daxilində 1-2 gün, regionlara 2-3 gün ərzində çatdırılma həyata keçirilir.</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
        this.applyTranslations();
    }
    
    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', function() {
            let theme = document.documentElement.getAttribute('data-theme');
            
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }
    
    initLanguage() {
        const currentLang = localStorage.getItem('language') || 'az';
        this.setLanguage(currentLang);
    }
    
    initLanguageDropdown() {
        const langBtn = document.getElementById('langBtn');
        const langDropdown = document.getElementById('langDropdown');
        
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', () => {
            langDropdown.classList.remove('active');
        });
        
        langDropdown.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.setLanguage(lang);
                langDropdown.classList.remove('active');
            });
        });
    }
    
    setLanguage(lang) {
        localStorage.setItem('language', lang);
        document.getElementById('currentLang').textContent = lang.toUpperCase();
        this.applyTranslations();
    }
    
    applyTranslations() {
        const lang = localStorage.getItem('language') || 'az';
        const t = translations[lang];
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                el.textContent = t[key];
            }
        });
    }

}