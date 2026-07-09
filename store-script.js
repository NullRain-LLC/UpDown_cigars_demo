const products = [
    {
        id: 1,
        name: 'Casa Grande Robusto',
        category: 'cigars',
        price: 24.99,
        description: 'A smooth Nicaraguan blend with cocoa and toasted spice.',
        emoji: '🥃',
        image: 'https://mikescigars.com/media/catalog/product/cache/f53037fc3c65647151fe69c020226582/image/122035f39/bauza-casa-grande.jpg?auto=format&fit=crop&w=900&q=80',
        badge: 'Best Seller'
    },
    {
        id: 2,
        name: 'Midnight Reserve Toro',
        category: 'cigars',
        price: 29.5,
        description: 'Full-bodied and rich with espresso and cedar notes.',
        emoji: '🌿',
        image: 'https://mikescigars.com/media/catalog/product/cache/ae23a9278cf4f78b64d1861644b560fc/image/343173ca7/romeo-y-julieta-reserva-real-nicaragua-midnight-twist-twisted-toro-natural-box-of-25.jpg?auto=format&fit=crop&w=900&q=80',
        badge: 'Limited'
    },
    {
        id: 3,
        name: 'Cedar Travel Case',
        category: 'accessories',
        price: 39.0,
        description: 'Protect your favorites with a premium cedar travel case.',
        emoji: '🧳',
        image: 'https://images.thdstatic.com/productImages/5e18a5f594c04bbfba01e78b5b7f9e07/svn/multi-colored-humidors-sa1059b263-64_600.jpg?auto=format&fit=crop&w=900&q=80',
        badge: 'New'
    },
    {
        id: 4,
        name: 'Lounge Humidor',
        category: 'humidors',
        price: 149.0,
        description: 'A polished humidor designed to keep cigars at their best.',
        emoji: '📦',
        image: 'https://m.media-amazon.com/images/I/71Hq2gNYD4L.jpg?auto=format&fit=crop&w=900&q=80',
        badge: 'Featured'
    },
    {
        id: 5,
        name: 'Velvet Cutter',
        category: 'accessories',
        price: 18.75,
        description: 'A clean-cut stainless steel cutter for a precise finish.',
        emoji: '✂️',
        image: 'https://www.iguanasell.com/cdn/shop/files/SDP-003462-01_0615bbb5-1378-4195-ac33-fe96047fc83b.jpg?v=1687426272?auto=format&fit=crop&w=900&q=80',
        badge: 'Customer Favorite'
    },
    {
        id: 6,
        name: 'Golden Hour Churchill',
        category: 'cigars',
        price: 31.25,
        description: 'A mellow smoke with creamy vanilla and toasted almond.',
        emoji: '✨',
        image: 'https://www.holts.com/media//categoryimage//thumb/270x270/s/a/san-cristobal-golden-hour-bonito.png?auto=format&fit=crop&w=900&q=80',
        badge: 'Featured'
    }
];

let cart = [];
let activeFilter = 'all';

function initStore() {
    const productGrid = document.getElementById('productGrid');
    const cartItems = document.getElementById('cartItems');
    const cartCountText = document.getElementById('cartCountText');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    document.querySelectorAll('.filter-btn').forEach((button) => {
        button.addEventListener('click', () => {
            activeFilter = button.dataset.filter;
            document.querySelectorAll('.filter-btn').forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            renderProducts();
        });
    });

    checkoutBtn.addEventListener('click', () => {
        if (!cart.length) {
            alert('Add a few items to see a demo checkout.');
            return;
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        alert(`Demo checkout complete. Your order total is $${total.toFixed(2)}. We will contact you shortly.`);
        cart = [];
        renderCart();
    });

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    document.getElementById('eventForm').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thanks for reserving a tasting spot. We will be in touch soon.');
        document.getElementById('eventModal').classList.remove('active');
        event.currentTarget.reset();
    });

    document.getElementById('newsletterForm').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thanks for subscribing. Your next recommendation is on the way.');
        document.getElementById('newsletterModal').classList.remove('active');
        event.currentTarget.reset();
    });

    const storeNewsletterForm = document.getElementById('storeNewsletterForm');
    if (storeNewsletterForm) {
        storeNewsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Thanks for subscribing. We will send your next update soon.');
            storeNewsletterForm.reset();
        });
    }

    renderProducts();
    renderCart();

    window.openEventModal = () => document.getElementById('eventModal').classList.add('active');
    window.closeEventModal = () => document.getElementById('eventModal').classList.remove('active');
    window.closeNewsletter = () => document.getElementById('newsletterModal').classList.remove('active');
    window.closeModal = () => document.getElementById('ageVerificationModal').classList.remove('active');

    window.allowAccess = () => {
        document.getElementById('ageVerificationModal').classList.remove('active');
    };

    window.blockAccess = () => {
        alert('Sorry, you must be 21+ to access this store.');
    };

    window.toggleMenu = () => {
        navLinks.classList.toggle('active');
    };

    if (!document.getElementById('yes21') || !document.getElementById('no21')) {
        return;
    }
}

function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    const filteredProducts = activeFilter === 'all'
        ? products
        : products.filter((product) => product.category === activeFilter);

    productGrid.innerHTML = filteredProducts.map((product) => `
        <article class="product-card">
            <div class="product-image">
                ${product.image ? `<img src="${product.image}" alt="${product.name}" loading="lazy">` : `<span>${product.emoji}</span>`}
            </div>
            <div class="product-content">
                <span class="product-badge">${product.badge}</span>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-meta">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="add-btn" data-id="${product.id}">Add</button>
                </div>
            </div>
        </article>
    `).join('');

    document.querySelectorAll('.add-btn').forEach((button) => {
        button.addEventListener('click', () => {
            addToCart(Number(button.dataset.id));
        });
    });
}

function addToCart(productId) {
    const foundProduct = products.find((product) => product.id === productId);

    if (!foundProduct) {
        return;
    }

    const existingItem = cart.find((item) => item.id === foundProduct.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...foundProduct, quantity: 1 });
    }

    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCountText = document.getElementById('cartCountText');
    const cartTotal = document.getElementById('cartTotal');

    if (!cart.length) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. Add a few favorites to get started.</p>';
        cartCountText.textContent = '0 items selected';
        cartTotal.textContent = '$0.00';
        return;
    }

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartCountText.textContent = `${itemCount} item${itemCount > 1 ? 's' : ''} selected`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartItems.innerHTML = cart.map((item) => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong>
                <p>${item.quantity} × $${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>
    `).join('');

    document.querySelectorAll('.remove-btn').forEach((button) => {
        button.addEventListener('click', () => {
            cart = cart.filter((item) => item.id !== Number(button.dataset.id));
            renderCart();
        });
    });
}

document.addEventListener('DOMContentLoaded', initStore);