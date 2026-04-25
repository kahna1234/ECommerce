// ============================================
// PRODUCT CARD COMPONENT - ES6 Module
// ============================================

import { StorageService } from '../utils/storage.js';
import { CartApiService } from '../api/cartService.js';
import { Helpers } from '../utils/helpers.js';
import { Navbar } from './navbar.js';

export class ProductCard {
    static render(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        // List of available images in your js/image folder
        const availableImages = [
            'iphone13.jpg',
            'iphone14.jpg'
        ];

        // Pick a consistent image based on product id
        const randomImageName = availableImages[(product.id || 0) % availableImages.length];
        const imagePath = `js/image/${randomImageName}`;

        // Inventory stock badge
        const qty = product.inventoryQuantity;
        const inStock = qty === undefined || qty === null || qty > 0;
        const stockBadge = qty === undefined || qty === null
            ? ''
            : qty > 0
                ? `<span class="stock-badge in-stock">In Stock (${qty})</span>`
                : `<span class="stock-badge out-of-stock">Out of Stock</span>`;
        const cartQuantity = this.getCartQuantity(product.id);

        card.innerHTML = `
            <div class="product-image">
                <img src="${imagePath}" alt="${product.title || product.name || 'Product'}">
                <span class="cart-quantity-badge ${cartQuantity > 0 ? 'visible' : ''}" data-cart-quantity>
                    +${cartQuantity}
                </span>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title || product.name || 'Product'}</h3>
                <p class="product-description">${product.description || ''}</p>
                <div class="product-footer" style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="product-price" style="font-weight: bold; font-size: 1.1em;">${Helpers.formatCurrency(product.price)}</span>
                        ${stockBadge}
                    </div>
                    <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}"
                        style="width: 100%;" ${!inStock ? 'disabled' : ''}>
                        ${inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        `;

        const addBtn = card.querySelector('.add-to-cart-btn');
        if (inStock) {
            addBtn.addEventListener('click', async () => {
                const cartItem = {
                    id: product.id,
                    title: product.title || product.name || 'Product',
                    price: product.price,
                    image: imagePath,
                    quantity: 1
                };

                // Always add to localStorage (works for anonymous users too)
                StorageService.addToCart(cartItem);
                this.updateCartQuantityBadge(card, product.id);
                Navbar.updateCartCount();

                // Also sync to server-side CartService if user is logged in
                const user = StorageService.getUser();
                if (user && user.id) {
                    CartApiService.addToCart(user.id, {
                        productId: product.id,
                        productName: product.title || product.name || 'Product',
                        price: product.price,
                        quantity: 1,
                        imageUrl: imagePath
                    }).catch(err => console.warn('[ProductCard] Server cart sync failed:', err));
                }

                Helpers.showSuccess(`${product.title || product.name || 'Product'} added to cart!`);
            });
        }

        return card;
    }

    static getCartQuantity(productId) {
        const item = StorageService.getCart().find(cartItem => cartItem.id === productId);
        return item ? item.quantity : 0;
    }

    static updateCartQuantityBadge(card, productId) {
        const badge = card.querySelector('[data-cart-quantity]');
        const quantity = this.getCartQuantity(productId);

        if (!badge) {
            return;
        }

        badge.textContent = `+${quantity}`;
        badge.classList.toggle('visible', quantity > 0);
    }
}
