// Product data
const products = [
    { id: 1, name: 'Toor Daal', category: 'daal', pricePerKg: 150, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/toor-dal.jpg' },
    { id: 2, name: 'Arhar Daal', category: 'daal', pricePerKg: 140, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/arhar-dal.jpg' },
    { id: 3, name: 'Nimadi Daal', category: 'daal', pricePerKg: 140, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/Nimadi-toor-dal.webp' },
    { id: 3, name: 'Moong Daal', category: 'daal', pricePerKg: 120, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/moong-dal.jpg' },
    { id: 4, name: 'Masoor Daal', category: 'daal', pricePerKg: 100, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/masoor-daal.jpg' },
    { id: 5, name: 'Chana Daal', category: 'daal', pricePerKg: 100, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/chana-daal.jpg' },
    { id: 6, name: 'Kali-Urad Daal', category: 'daal', pricePerKg: 120, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/kali-urad-daal.webp' },
    { id: 7, name: 'Chawla Daal', category: 'daal', pricePerKg: 120, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/chawla-dal.jpg' },
    { id: 8, name: 'Moong Mogar', category: 'daal', pricePerKg: 140, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/moong-mogar.webp' },
    { id: 9, name: 'Urad Mogar', category: 'daal', pricePerKg: 140, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/urad-mogar.jpeg' },
    { id: 10, name: 'Basmati Rice', category: 'rice', pricePerKg: 120, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/basmati-rice.png' },
    { id: 11, name: 'Ponni Rice', category: 'rice', pricePerKg: 70, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/ponni-rice.webp' },
    { id: 12, name: 'Tukdi Rice', category: 'rice', pricePerKg: 60, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/tukdi-rice.avif' },
    { id: 13, name: 'Sabudana', category: 'dana', pricePerKg: 80, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/sabudana.jpg' },
    { id: 14, name: 'Mungfali Dana', category: 'dana', pricePerKg: 160, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/Mungfali-dana.jpg' },
    { id: 15, name: 'Poha', category: 'poha', pricePerKg: 70, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/poha.jpg' },
    { id: 16, name: 'Khada Moong', category: 'anaj', pricePerKg: 120, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/khada-moong.webp' },
    { id: 17, name: 'Moth', category: 'anaj', pricePerKg: 120, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/moth.jpg' },
    { id: 18, name: 'Chawli', category: 'anaj', pricePerKg: 120, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/chawli.jpeg' },
    { id: 19, name: 'Kabuli Chana', category: 'anaj', pricePerKg: 130, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/kabuli-chana.jpg' },
    { id: 20, name: 'Desi Chana', category: 'anaj', pricePerKg: 100, image: 'https://sonikrish920-rgb.github.io/sonitraders/Images/desi-chana.jpg' }

    
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';
let searchTerm = '';

// DOM elements
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search');
const cartIcon = document.getElementById('cart-icon');
const cartPanel = document.getElementById('cart-panel');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutForm = document.getElementById('checkout-form');
const closeModal = document.querySelector('.close');

// Initialize
renderProducts();
updateCartDisplay();

// Render products
function renderProducts() {
    const filteredProducts = products.filter(product => {
        const matchesFilter = currentFilter === 'all' || product.category === currentFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    productGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">₹${product.pricePerKg}/kg</div>
                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <select class="quantity-select">
                        <option value="0.5">500g</option>
                        <option value="1" selected>1kg</option>
                        <option value="5">5kg</option>
                        <option value="10">10kg</option>
                        <option value="30">30kg</option>
                    </select>
                </div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// Filter products
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.category;
        renderProducts();
    });
});

// Search products
searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderProducts();
});

// Add to cart
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const quantitySelect = e.target.previousElementSibling.querySelector('.quantity-select');
    const quantity = parseFloat(quantitySelect.value);
    const product = products.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId && item.quantity === quantity);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            pricePerKg: product.pricePerKg,
            quantity: quantity,
            qty: 1
        });
    }

    saveCart();
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.pricePerKg * item.quantity * item.qty;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-details">${item.quantity}kg × ${item.qty} = ₹${itemTotal}</div>
            </div>
            <div class="cart-item-controls">
                <input type="number" min="1" value="${item.qty}" data-index="${index}">
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total;

    // Add event listeners
    document.querySelectorAll('.cart-item input').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
}

// Update quantity
function updateQuantity(e) {
    const index = parseInt(e.target.dataset.index);
    const newQty = parseInt(e.target.value);
    if (newQty > 0) {
        cart[index].qty = newQty;
        saveCart();
        updateCartDisplay();
    }
}

// Remove item
function removeItem(e) {
    const index = parseInt(e.target.dataset.index);
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cart panel toggle
cartIcon.addEventListener('click', () => {
    cartPanel.classList.toggle('open');
});

closeCart.addEventListener('click', () => {
    cartPanel.classList.remove('open');
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    checkoutModal.style.display = 'block';
    cartPanel.classList.remove('open');
});

closeModal.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
});

// Checkout form submit
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;

    let orderSummary = `New Order from ${name}\nPhone: ${phone}\nAddress: ${address}\n\nItems:\n`;
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.pricePerKg * item.quantity * item.qty;
        total += itemTotal;
        orderSummary += `${item.name} - ${item.quantity}kg × ${item.qty} = ₹${itemTotal}\n`;
    });

    orderSummary += `\nTotal: ₹${total}\n\nCash on Delivery`;

    const whatsappUrl = `https://wa.me/919009412418?text=${encodeURIComponent(orderSummary)}`;
    window.open(whatsappUrl, '_blank');

    // Clear cart
    cart = [];
    saveCart();
    updateCartDisplay();
    checkoutModal.style.display = 'none';
    alert('Order placed successfully! You will be redirected to WhatsApp.');
});
