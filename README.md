<div align="center">

# Soni Traders 🌾

### Everyday groceries from our Indore family store—made easy to browse and order.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel&logoColor=white)](https://sonitraders.vercel.app/)

**[Visit the live store](https://sonitraders.vercel.app/)** · **[View the GitHub repository](https://github.com/sonikrish920-rgb/sonitraders)**

</div>

Soni Traders is a family-run grocery business in Indore, Madhya Pradesh, India. This lightweight storefront helps local customers browse pantry staples, build a cart, and prepare an order to confirm with the shop on WhatsApp.

> **Local delivery:** Indore, Madhya Pradesh · **Payment:** Cash on delivery

## 🛒 Features

- 🫘 Browse daal, rice, poha, sabudana, dana, and other grains.
- 🗂️ Filter products by category or search by name.
- ⚖️ Choose a pack size and add products to your cart.
- 🧺 Update quantities, remove items, and see the calculated total.
- 💾 Keep cart contents between visits with browser `localStorage`.
- 📲 Enter delivery details and open a pre-filled WhatsApp order message.
- ▶️ Open the order-help video from the homepage; the YouTube player loads only when requested.
- 🖼️ Load product photos from the local `Images/` folder, with a fallback if an image is unavailable.
- 📱 Use a responsive layout on desktop, tablet, and mobile.

### Order-help video

The compact green play button labeled **“Order kaise karein?”** appears in the homepage banner alongside the ordering hint. On desktop, both actions share a centered Flexbox row with vertical alignment; on small screens they stack with consistent spacing. A separate, non-clickable `👈🏻` hand immediately to the help button's right is vertically centered and gently moves side to side; its movement is disabled when `prefers-reduced-motion` is enabled. The button opens an accessible, responsive modal with the unlisted YouTube video `SP9hEAox3HY`. The iframe is created only after the visitor clicks the button; no video iframe, thumbnail, or player is loaded on initial page load. Playback does not start automatically. Closing the dialog with its close button, Escape, or the backdrop removes the iframe and returns keyboard focus to the help button.

## 🛠️ Tech Stack

<p>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js" alt="HTML, CSS, and JavaScript">
  </a>
</p>

- **HTML5** for page structure
- **CSS3** for responsive styling
- **Vanilla JavaScript** for storefront interactions
- **Browser `localStorage`** for cart persistence

No framework, build step, database, or server-side application is required.

## 🚀 Getting Started

### Run locally

1. Clone or download the repository.
2. Open `index.html` in a browser, or serve the project root with any static file server.
3. Browse products and try the category filters, search, cart, and checkout form.

The storefront uses relative paths for its CSS, JavaScript, and images, so it can be hosted from a GitHub Pages project subpath.

### Deploy with GitHub Pages

1. Push the project files to the root of the `sonitraders` repository.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the branch containing the site and the `/ (root)` folder, then save.
5. GitHub will show the published site URL in the Pages settings after deployment.

There is no build command. Preserve the exact capitalization of `Images/` and its filenames: GitHub Pages and other Linux-based hosts use case-sensitive paths.

## 📱 WhatsApp Ordering

At checkout, the customer enters a name, an Indian mobile number, and a delivery address. The storefront prepares a WhatsApp message containing those details, the cart items, and the total, then opens it in a chat with Soni Traders.

**The customer must send the pre-filled message in WhatsApp to confirm the order.** Submitting the checkout form does not automatically place or charge for an order. The shop confirms product availability, delivery, and payment directly with the customer. Cash on delivery is available for local delivery in Indore.

## 📸 Screenshots

Screenshots have not been added yet. To include them later, capture desktop and/or mobile views, add the image files to the repository, and replace this note with Markdown image links that use their actual relative paths.

## 📁 Project Structure

```text
sonitraders/
├── Images/                 # Local product photos
├── index.html              # Storefront markup
├── script.js               # Product data and storefront interactions
├── styles.css              # Responsive layout and visual styles
└── README.md               # Project documentation
```

## 🎨 Customize the Store

### Products, prices, and images

Edit the `products` array near the top of `script.js`. Each product has a unique numeric ID, a name, a category, a price per kilogram in Indian rupees, and an image path. Categories used by the filters are `daal`, `rice`, `dana`, `anaj`, and `poha`.

Add product photos to `Images/` and update each product's relative `image` path. Match the folder and filename capitalization exactly.

### WhatsApp and phone numbers

Update `WHATSAPP_NUMBER` and `BUSINESS_PHONE` near the top of `script.js`:

- `WHATSAPP_NUMBER` uses the international country code and digits only, such as `91` followed by the Indian mobile number.
- `BUSINESS_PHONE` is used by the call links and displayed in the footer.

## ⚠️ Known Limitations

- This is a frontend-only project with no database, backend, inventory system, or order-management dashboard.
- Client-side validation and browser-stored cart data are not server-side security controls. Server-side validation, rate limiting, authoritative order processing, and protected secrets require a backend; do not put private credentials in frontend files.
- Cart data is stored in the customer's browser and is not shared between devices.
- WhatsApp opens a pre-filled message; the customer must send it and the shop must confirm the order.
- Product prices and availability are maintained manually in `script.js`.
- Online payment and automatic delivery-fee calculation are not available.

## 🔮 Future Improvements

- Connect orders and inventory to a secure backend.
- Add an order-management workflow and availability updates.
- Support online payment and delivery-fee calculation.
- Add product descriptions, stock status, and richer search.
- Add storefront screenshots and automated interaction tests.
