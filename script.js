const WHATSAPP_NUMBER = '919009412418';
const BUSINESS_PHONE = '9009412418';

const products = [
    { id: 1, name: 'Toor Daal', category: 'daal', pricePerKg: 160, image: 'Images/toor-dal.jpg' },
    { id: 2, name: 'Arhar Daal', category: 'daal', pricePerKg: 150, image: 'Images/arhar-dal.jpg' },
    { id: 3, name: 'Nimadi Daal', category: 'daal', pricePerKg: 140, image: 'Images/Nimadi-toor-dal.webp' },
    { id: 4, name: 'Moong Daal', category: 'daal', pricePerKg: 120, image: 'Images/moong-dal.jpg' },
    { id: 5, name: 'Masoor Daal', category: 'daal', pricePerKg: 100, image: 'Images/masoor-daal.jpg' },
    { id: 6, name: 'Chana Daal', category: 'daal', pricePerKg: 100, image: 'Images/chana-daal.jpg' },
    { id: 7, name: 'Kali-Urad Daal', category: 'daal', pricePerKg: 120, image: 'Images/kali-urad-daal.webp' },
    { id: 8, name: 'Chawla Daal', category: 'daal', pricePerKg: 120, image: 'Images/chawla-dal.jpg' },
    { id: 9, name: 'Moong Mogar', category: 'daal', pricePerKg: 140, image: 'Images/moong-mogar.webp' },
    { id: 10, name: 'Urad Mogar', category: 'daal', pricePerKg: 140, image: 'Images/urad-mogar.jpeg' },
    { id: 11, name: 'Basmati Rice', category: 'rice', pricePerKg: 120, image: 'Images/basmati-rice.png' },
    { id: 12, name: 'Ponni Rice', category: 'rice', pricePerKg: 70, image: 'Images/ponni-rice.webp' },
    { id: 13, name: 'Tukdi Rice', category: 'rice', pricePerKg: 60, image: 'Images/tukdi-rice.avif' },
    { id: 14, name: 'Sabudana', category: 'dana', pricePerKg: 80, image: 'Images/sabudana.jpg' },
    { id: 15, name: 'Mungfali Dana', category: 'dana', pricePerKg: 160, image: 'Images/Mungfali-dana.jpg' },
    { id: 16, name: 'Poha', category: 'poha', pricePerKg: 90, image: 'Images/poha.jpg' },
    { id: 17, name: 'Khada Moong', category: 'anaj', pricePerKg: 120, image: 'Images/khada-moong.webp' },
    { id: 18, name: 'Moth', category: 'anaj', pricePerKg: 120, image: 'Images/moth.jpg' },
    { id: 19, name: 'Chawli', category: 'anaj', pricePerKg: 120, image: 'Images/chawli.jpeg' },
    { id: 20, name: 'Kabuli Chana', category: 'anaj', pricePerKg: 140, image: 'Images/kabuli-chana.jpg' },
    { id: 21, name: 'Desi Chana', category: 'anaj', pricePerKg: 100, image: 'Images/desi-chana.jpg' }
];
const productAliases = new Map([
    [1, ['tur', 'toor dal', 'tur dal', 'pigeon pea']],
    [2, ['arhar dal', 'tur dal', 'pigeon pea']],
    [3, ['nimadi tur dal']],
    [4, ['mung dal', 'mung bean', 'green gram']],
    [5, ['red lentil']],
    [6, ['split chickpea', 'bengal gram']],
    [7, ['black urad', 'whole urad', 'black gram']],
    [8, ['chawli', 'cowpea', 'lobia']],
    [9, ['split moong', 'yellow moong dal']],
    [10, ['split urad', 'white urad dal']],
    [13, ['broken rice']],
    [14, ['sago', 'tapioca pearls']],
    [15, ['peanut', 'groundnut', 'ground nut']],
    [16, ['flattened rice']],
    [17, ['whole moong', 'whole mung', 'green gram']],
    [18, ['matki', 'moth bean']],
    [19, ['black eyed peas', 'cowpea', 'lobia']],
    [20, ['chickpea', 'garbanzo']],
    [21, ['kala chana', 'black chickpea', 'brown chickpea']]
]);

const categoryAliases = new Map([
    ['daal', ['dal', 'lentils', 'pulses']],
    ['rice', ['chawal', 'chaawal']],
    ['dana', ['seeds']],
    ['anaj', ['grains', 'beans', 'legumes']],
    ['poha', ['flattened rice']]
]);

function normalizeSearchText(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, ' ')
        .trim()
        .replace(/\s+/g, ' ');
}

function getSearchFields(product) {
    return [
        { value: normalizeSearchText(product.name), rank: 0 },
        ...(productAliases.get(product.id) || []).map(alias => ({
            value: normalizeSearchText(alias),
            rank: 1
        })),
        { value: normalizeSearchText(product.category), rank: 2 },
        ...(categoryAliases.get(product.category) || []).map(alias => ({
            value: normalizeSearchText(alias),
            rank: 2
        }))
    ].filter(field => field.value);
}

function editDistance(first, second) {
    if (first === second) return 0;
    if (Math.abs(first.length - second.length) > 2) return Infinity;

    let previousRow = Array.from({ length: second.length + 1 }, (_, index) => index);
    let previousPreviousRow = null;

    for (let row = 1; row <= first.length; row += 1) {
        const currentRow = [row];
        let rowMinimum = row;

        for (let column = 1; column <= second.length; column += 1) {
            const substitutionCost = first[row - 1] === second[column - 1] ? 0 : 1;
            let distance = Math.min(
                previousRow[column] + 1,
                currentRow[column - 1] + 1,
                previousRow[column - 1] + substitutionCost
            );

            if (
                previousPreviousRow &&
                row > 1 &&
                column > 1 &&
                first[row - 1] === second[column - 2] &&
                first[row - 2] === second[column - 1]
            ) {
                distance = Math.min(distance, previousPreviousRow[column - 2] + 1);
            }

            currentRow[column] = distance;
            rowMinimum = Math.min(rowMinimum, distance);
        }

        if (rowMinimum > 2) return Infinity;
        previousPreviousRow = previousRow;
        previousRow = currentRow;
    }

    return previousRow[second.length];
}

function getProductSearchScore(product, query) {
    const fields = getSearchFields(product);
    const normalizedProductName = fields[0].value;
    const exactField = fields.find(field => field.value === query);
    if (exactField) return exactField.rank;
    if (query.length < 3) return Infinity;

    const partialField = fields.find(field => field.value.includes(query));
    if (partialField) return 10 + partialField.rank;

    const queryTokens = query.split(' ');
    const productTokens = [...new Set(fields.flatMap(field => field.value.split(' ')))];
    let fuzzyScore = 0;

    for (const queryToken of queryTokens) {
        let bestTokenScore = Infinity;
        for (const productToken of productTokens) {
            if (productToken === queryToken) {
                bestTokenScore = Math.min(bestTokenScore, 20);
                continue;
            }

            if (queryToken.length >= 2 && productToken.startsWith(queryToken)) {
                bestTokenScore = Math.min(bestTokenScore, 25);
                continue;
            }

            if (queryToken.length < 4 || productToken.length < 4) continue;
            const allowedDistance = queryToken.length >= 8 ? 2 : 1;
            const distance = editDistance(queryToken, productToken);
            if (distance <= allowedDistance) {
                bestTokenScore = Math.min(bestTokenScore, 40 + distance);
            }
        }

        if (!Number.isFinite(bestTokenScore)) return Infinity;
        fuzzyScore += bestTokenScore;
    }

    return 30 + fuzzyScore + (fields.find(field => field.value === normalizedProductName)?.rank || 0);
}

function getExactSearchCategory(query) {
    for (const [category, aliases] of categoryAliases) {
        if ([category, ...aliases].some(alias => normalizeSearchText(alias) === query)) {
            return category;
        }
    }
    return null;
}

const productById = new Map(products.map(product => [product.id, product]));
const productGrid = document.getElementById('product-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search');
const themeToggle = document.getElementById('theme-toggle');
const cartIcon = document.getElementById('cart-icon');
const cartPanel = document.getElementById('cart-panel');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutButton = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutForm = document.getElementById('checkout-form');
const appStatus = document.getElementById('app-status');

let currentFilter = 'all';
let searchTerm = '';
let lastCartFocus = cartIcon;
let lastModalFocus = checkoutButton;
let cart = loadCart();

document.getElementById('whatsapp-link').href = `https://wa.me/${WHATSAPP_NUMBER}`;
document.getElementById('call-link').href = `tel:${BUSINESS_PHONE}`;
document.getElementById('footer-phone').href = `tel:${BUSINESS_PHONE}`;
document.getElementById('footer-phone').textContent = BUSINESS_PHONE;

function setTheme(theme, persist = false) {
    const selectedTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = selectedTheme;
    themeToggle.setAttribute('aria-pressed', String(selectedTheme === 'dark'));
    themeToggle.setAttribute(
        'aria-label',
        selectedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
    document.querySelector('meta[name="theme-color"]').content =
        selectedTheme === 'dark' ? '#14221a' : '#245b3a';

    if (persist) {
        try {
            localStorage.setItem('theme', selectedTheme);
        } catch (error) {
            console.error('Unable to save the selected theme.', error);
            showStatus('Your theme changed, but this browser could not save the preference.');
        }
    }
}

setTheme(document.documentElement.dataset.theme);
themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme, true);
});

renderProducts();
updateCartDisplay();

function showStatus(message) {
    appStatus.textContent = message;
    appStatus.hidden = false;
}

function clearStatus() {
    appStatus.textContent = '';
    appStatus.hidden = true;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
    }).format(amount);
}

function loadCart() {
    let savedCart;
    try {
        savedCart = localStorage.getItem('cart');
    } catch (error) {
        console.error('Unable to read the saved cart from local storage.', error);
        showStatus('Your saved cart is unavailable in this browser. You can still shop for this visit.');
        return [];
    }

    if (!savedCart) {
        return [];
    }

    try {
        const parsedCart = JSON.parse(savedCart);
        if (!Array.isArray(parsedCart)) {
            throw new TypeError('Saved cart must be a list of items.');
        }

        const validItems = [];
        parsedCart.forEach(item => {
            if (!item || typeof item !== 'object') return;
            const product = productById.get(Number(item.id));
            const quantity = Number(item.quantity);
            const count = Number(item.qty);
            if (product && Number.isFinite(quantity) && quantity > 0 && Number.isInteger(count) && count > 0) {
                validItems.push({ id: product.id, quantity, qty: count });
            }
        });
        return validItems;
    } catch (error) {
        console.error('Unable to parse the saved cart.', error);
        showStatus('Your saved cart could not be read. You can start a new cart.');
        return [];
    }
}

function renderProducts() {
    const normalizedQuery = normalizeSearchText(searchTerm);
    const exactSearchCategory = normalizedQuery ? getExactSearchCategory(normalizedQuery) : null;
    const filteredProducts = products
        .map((product, index) => ({
            product,
            index,
            score: normalizedQuery ? getProductSearchScore(product, normalizedQuery) : 0
        }))
        .filter(({ product, score }) =>
            (currentFilter === 'all' || product.category === currentFilter) &&
            (!exactSearchCategory || product.category === exactSearchCategory) &&
            (!normalizedQuery || Number.isFinite(score))
        )
        .sort((first, second) => first.score - second.score || first.index - second.index)
        .map(({ product }) => product);

    productGrid.replaceChildren();
    if (filteredProducts.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-state product-empty';
        emptyMessage.textContent = 'No products found. Try another search or category.';
        productGrid.appendChild(emptyMessage);
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';

        const image = document.createElement('img');
        image.className = 'product-image';
        image.src = product.image;
        image.alt = product.name;
        image.loading = 'lazy';
        image.addEventListener('error', () => {
            image.src = `data:image/svg+xml,${encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420"><rect width="640" height="420" fill="#edf2e9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#55745d" font-family="Arial,sans-serif" font-size="26">Image unavailable</text></svg>'
            )}`;
            image.alt = `Image unavailable for ${product.name}`;
        }, { once: true });

        const info = document.createElement('div');
        info.className = 'product-info';
        const name = document.createElement('h3');
        name.className = 'product-name';
        name.textContent = product.name;
        const price = document.createElement('p');
        price.className = 'product-price';
        price.textContent = `${formatCurrency(product.pricePerKg)} / kg`;

        const quantityGroup = document.createElement('div');
        quantityGroup.className = 'quantity-selector';
        const quantityLabel = document.createElement('label');
        quantityLabel.htmlFor = `quantity-${product.id}`;
        quantityLabel.textContent = 'Pack size';
        const quantitySelect = document.createElement('select');
        quantitySelect.className = 'quantity-select';
        quantitySelect.id = `quantity-${product.id}`;
        [
            ['0.5', '500 g'],
            ['1', '1 kg'],
            ['5', '5 kg'],
            ['10', '10 kg'],
            ['30', '30 kg']
        ].forEach(([value, label]) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = label;
            if (value === '1') option.selected = true;
            quantitySelect.appendChild(option);
        });
        quantityGroup.append(quantityLabel, quantitySelect);

        const addButton = document.createElement('button');
        addButton.className = 'add-to-cart primary-button';
        addButton.type = 'button';
        addButton.dataset.id = String(product.id);
        addButton.textContent = 'Add to cart';

        info.append(name, price, quantityGroup, addButton);
        card.append(image, info);
        productGrid.appendChild(card);
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentFilter = button.dataset.category;
        filterButtons.forEach(filterButton => {
            const isActive = filterButton === button;
            filterButton.classList.toggle('active', isActive);
            filterButton.setAttribute('aria-pressed', String(isActive));
        });
        renderProducts();
    });
});

searchInput.addEventListener('input', event => {
    searchTerm = event.target.value.trim();
    renderProducts();
});

productGrid.addEventListener('click', event => {
    const button = event.target.closest('.add-to-cart');
    if (!button) return;

    const product = productById.get(Number(button.dataset.id));
    const quantity = Number(button.closest('.product-info').querySelector('.quantity-select').value);
    if (!product || !Number.isFinite(quantity) || quantity <= 0) return;

    const existingItem = cart.find(item => item.id === product.id && item.quantity === quantity);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ id: product.id, quantity, qty: 1 });
    }
    clearStatus();
    saveCart();
    updateCartDisplay();
});

function updateCartDisplay() {
    const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = String(itemCount);
    cartIcon.setAttribute('aria-label', `Open cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`);
    cartItems.replaceChildren();

    if (cart.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-state cart-empty';
        emptyMessage.textContent = 'Your cart is empty. Add a few pantry favorites to get started.';
        cartItems.appendChild(emptyMessage);
    }

    let total = 0;
    cart.forEach((item, index) => {
        const product = productById.get(item.id);
        if (!product) return;
        const itemTotal = product.pricePerKg * item.quantity * item.qty;
        total += itemTotal;

        const row = document.createElement('article');
        row.className = 'cart-item';
        const details = document.createElement('div');
        details.className = 'cart-item-info';
        const name = document.createElement('h3');
        name.className = 'cart-item-name';
        name.textContent = product.name;
        const description = document.createElement('p');
        description.className = 'cart-item-details';
        description.textContent = `${item.quantity} kg × ${item.qty} = ${formatCurrency(itemTotal)}`;
        details.append(name, description);

        const controls = document.createElement('div');
        controls.className = 'cart-item-controls';
        const quantityLabel = document.createElement('label');
        quantityLabel.className = 'visually-hidden';
        quantityLabel.htmlFor = `cart-quantity-${index}`;
        quantityLabel.textContent = `Quantity of ${product.name}`;
        const quantityInput = document.createElement('input');
        quantityInput.id = `cart-quantity-${index}`;
        quantityInput.type = 'number';
        quantityInput.min = '1';
        quantityInput.step = '1';
        quantityInput.value = String(item.qty);
        quantityInput.dataset.index = String(index);
        quantityInput.inputMode = 'numeric';
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-item';
        removeButton.type = 'button';
        removeButton.dataset.index = String(index);
        removeButton.textContent = 'Remove';
        controls.append(quantityLabel, quantityInput, removeButton);
        row.append(details, controls);
        cartItems.appendChild(row);
    });

    cartTotal.textContent = formatCurrency(total);
}

cartItems.addEventListener('change', event => {
    if (!event.target.matches('.cart-item input')) return;
    const index = Number(event.target.dataset.index);
    const newQuantity = Number(event.target.value);
    if (!Number.isInteger(newQuantity) || newQuantity < 1 || !cart[index]) {
        showStatus('Cart quantities must be a whole number of 1 or more.');
        updateCartDisplay();
        return;
    }
    cart[index].qty = newQuantity;
    saveCart();
    updateCartDisplay();
});

cartItems.addEventListener('click', event => {
    const button = event.target.closest('.remove-item');
    if (!button) return;
    const index = Number(button.dataset.index);
    if (!Number.isInteger(index) || !cart[index]) return;
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
});

function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        return true;
    } catch (error) {
        console.error('Unable to save the cart to local storage.', error);
        showStatus('Your cart could not be saved in this browser. Keep this tab open while you shop.');
        return false;
    }
}

function openCart() {
    lastCartFocus = document.activeElement instanceof HTMLElement ? document.activeElement : cartIcon;
    cartPanel.inert = false;
    cartPanel.setAttribute('aria-hidden', 'false');
    cartPanel.classList.add('open');
    cartBackdrop.classList.add('visible');
    cartIcon.setAttribute('aria-expanded', 'true');
    document.body.classList.add('cart-open');
    document.getElementById('close-cart').focus();
}

function closeCartPanel() {
    cartPanel.classList.remove('open');
    cartBackdrop.classList.remove('visible');
    cartPanel.setAttribute('aria-hidden', 'true');
    cartPanel.inert = true;
    cartIcon.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('cart-open');
    if (lastCartFocus instanceof HTMLElement) lastCartFocus.focus();
}

cartIcon.addEventListener('click', openCart);
document.getElementById('close-cart').addEventListener('click', closeCartPanel);
cartBackdrop.addEventListener('click', closeCartPanel);

checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        showStatus('Your cart is empty. Add products before checkout.');
        closeCartPanel();
        return;
    }
    lastModalFocus = cartIcon;
    closeCartPanel();
    checkoutModal.classList.add('visible');
    checkoutModal.setAttribute('aria-hidden', 'false');
    document.getElementById('customer-name').focus();
});

function closeCheckoutModal() {
    checkoutModal.classList.remove('visible');
    checkoutModal.setAttribute('aria-hidden', 'true');
    if (lastModalFocus instanceof HTMLElement) lastModalFocus.focus();
}

document.getElementById('close-checkout').addEventListener('click', closeCheckoutModal);
checkoutModal.addEventListener('click', event => {
    if (event.target === checkoutModal) closeCheckoutModal();
});

document.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
        const activeDialog = checkoutModal.classList.contains('visible')
            ? checkoutModal.querySelector('[role="dialog"]')
            : cartPanel.classList.contains('open') ? cartPanel : null;
        if (activeDialog) {
            const focusableElements = activeDialog.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            } else if (!activeDialog.contains(document.activeElement)) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }
    if (event.key === 'Escape') {
        if (checkoutModal.classList.contains('visible')) {
            closeCheckoutModal();
        } else if (cartPanel.classList.contains('open')) {
            closeCartPanel();
        }
    }
});

checkoutForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('customer-name').value.trim();
    const phoneInput = document.getElementById('customer-phone');
    const phone = phoneInput.value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const normalizedPhone = phone.replace(/[\s-]/g, '');

    phoneInput.setCustomValidity('');
    if (!/^(?:\+?91)?[6-9]\d{9}$/.test(normalizedPhone)) {
        phoneInput.setCustomValidity('Enter a valid 10-digit Indian mobile number, optionally with +91.');
        phoneInput.reportValidity();
        return;
    }
    if (!name || !address || cart.length === 0) {
        showStatus(cart.length === 0 ? 'Your cart is empty. Add products before checkout.' : 'Please complete all checkout fields.');
        return;
    }

    let orderSummary = `New order from ${name}\nPhone: ${phone}\nAddress: ${address}\n\nItems:\n`;
    let total = 0;
    cart.forEach(item => {
        const product = productById.get(item.id);
        if (!product) return;
        const itemTotal = product.pricePerKg * item.quantity * item.qty;
        total += itemTotal;
        orderSummary += `${product.name} - ${item.quantity} kg x ${item.qty} = ${formatCurrency(itemTotal)}\n`;
    });
    orderSummary += `\nTotal: ${formatCurrency(total)}\n\nCash on delivery`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderSummary)}`;
    const whatsappWindow = window.open(whatsappUrl, '_blank');
    if (!whatsappWindow) {
        showStatus('WhatsApp could not be opened. Allow pop-ups for this site and submit your order again.');
        return;
    }
    whatsappWindow.opener = null;
    cart = [];
    const cartSaved = saveCart();
    updateCartDisplay();
    closeCheckoutModal();
    checkoutForm.reset();
    showStatus(cartSaved
        ? 'Your order is ready in WhatsApp. Send the message there to confirm it with Soni Traders.'
        : 'Your order is ready in WhatsApp, but this browser could not clear the saved cart. Send the message to confirm your order.');
});
