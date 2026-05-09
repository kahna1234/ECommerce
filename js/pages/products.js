// ============================================
// PRODUCTS PAGE - ES6 Module
// ============================================

import { ProductService } from '../api/productService.js';
import { SearchService } from '../api/searchService.js';
import { CategoryService } from '../api/categoryService.js';
import { ProductCard } from '../components/productCard.js';
import { Helpers } from '../utils/helpers.js';

export class ProductsPage {
    static categories = {};
    static categoryIcons = {
        'Electronics': '📱',
        'Clothing': '👔',
        'Home & Garden': '🏠',
        'Sports & Outdoors': '🏸',
        'Books & Media': '📚',
        'Toys & Games': '🧸',
        'Health & Beauty': '💄',
        'Food & Beverages': '🍔',
        'Automotive': '🚗',
        'Office Supplies': '📝',
        'Pet Supplies': '🐕',
        'Baby Products': '👶',
        'Jewelry & Accessories': '💎'
    };

    static allProducts = [];
    static currentPage = 1;
    static itemsPerPage = 12;
    static currentCategory = 'all';
    
    // Cache for temporary storage
    static cache = {
        categories: null,
        products: null,
        categoriesTimestamp: null,
        productsTimestamp: null,
        CACHE_DURATION: 5 * 60 * 1000 // 5 minutes
    };

    static isCacheValid(timestamp) {
        return timestamp && (Date.now() - timestamp) < this.cache.CACHE_DURATION;
    }

    static async getCachedCategories() {
        if (this.isCacheValid(this.cache.categoriesTimestamp)) {
            return this.cache.categories;
        }
        
        const categoriesResult = await CategoryService.getAllCategories();
        if (categoriesResult.success) {
            const categories = {};
            categoriesResult.categories.forEach(category => {
                categories[category.id] = {
                    name: category.name,
                    description: category.description,
                    icon: this.categoryIcons[category.name] || '📦'
                };
            });
            this.cache.categories = categories;
            this.cache.categoriesTimestamp = Date.now();
            return categories;
        }
        return {};
    }

    static async getCachedProducts() {
        if (this.isCacheValid(this.cache.productsTimestamp)) {
            return this.cache.products;
        }
        
        const result = await ProductService.getAllProducts();
        if (result.success) {
            const products = result.products || result.results || [];
            this.cache.products = Array.isArray(products) ? products : (products.content || []);
            this.cache.productsTimestamp = Date.now();
            return this.cache.products;
        }
        return [];
    }

    static async render(searchQuery = '') {
        const container = document.getElementById('app-container');
        Helpers.showLoading(container);

        // Get categories from cache or fetch
        this.categories = await this.getCachedCategories();

        let result;
        if (searchQuery) {
            result = await SearchService.searchProducts(searchQuery);
        } else {
            const products = await this.getCachedProducts();
            result = { success: true, products: products };
        }

        if (!result.success) {
            container.innerHTML = `<div class="error">${result.error}</div>`;
            return;
        }

        const products = result.products || result.results || [];
        
        // Handle different response structures
        this.allProducts = Array.isArray(products) ? products : (products.content || []);

        if (searchQuery) {
            // For search results, show simple grid without categories
            this.renderSearchResults(this.allProducts, searchQuery);
        } else {
            // For main products page, show categories
            this.renderProductsWithCategories();
        }
    }

    static renderProductsGrid(products) {
        if (!products || products.length === 0) {
            return '<div class="no-products"><p>No products found</p></div>';
        }

        const productCards = products.map(product => ProductCard.renderHTML(product)).join('');
        return `<div class="products-grid">${productCards}</div>`;
    }

    static renderSearchResults(products, searchQuery) {
        const container = document.getElementById('app-container');
        
        if (!container) {
            return;
        }
        
        // Clear container
        container.innerHTML = '';
        
        // Extract products with multiple fallback methods
        let searchProducts = [];
        if (Array.isArray(products)) {
            searchProducts = products;
        } else if (products && typeof products === 'object') {
            searchProducts = products.content || products.results || products.data || [];
        }
        
        if (!searchProducts || searchProducts.length === 0) {
            container.innerHTML = `
                <div class="products-container">
                    <div class="products-header">
                        <h2>Search Results for "${searchQuery}"</h2>
                    </div>
                    <div class="no-products"><p>No products found for your search.</p></div>
                </div>
            `;
            return;
        }
        
        // Simple deduplication by ID
        const uniqueProducts = [];
        const seenIds = new Set();
        
        searchProducts.forEach((product) => {
            if (product && product.id && !seenIds.has(product.id)) {
                seenIds.add(product.id);
                uniqueProducts.push(product);
            }
        });
        
        // Generate ProductCard HTML for each unique product
        const productCards = uniqueProducts.map((product) => {
            return ProductCard.renderHTML(product);
        });
        
        // Create proper HTML structure
        const html = `
            <div class="products-container">
                <div class="products-header">
                    <h2>Search Results for "${searchQuery}"</h2>
                    <p style="color: #6c757d; margin-top: 0.5rem;">Found ${uniqueProducts.length} product${uniqueProducts.length !== 1 ? 's' : ''}</p>
                </div>
                <div class="products-grid">
                    ${productCards.join('')}
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Setup event listeners
        this.setupProductCardListeners();
    }

    static renderProductsWithCategories() {
        const container = document.getElementById('app-container');
        
        const productsByCategory = this.groupProductsByCategory(this.allProducts);

        container.innerHTML = `
            <div class="products-container">
                <div class="products-header">
                    <h2>Our Products</h2>
                    ${this.renderCategoryDropdown()}
                </div>
                ${this.renderAllProductsSection()}
                ${this.renderCategorySections(productsByCategory)}
            </div>
        `;

        this.setupCategoryDropdownListeners();
        this.setupPaginationListeners();
        this.setupProductCardListeners();
    }

    static renderCategoryDropdown() {
        const productsByCategory = this.groupProductsByCategory(this.allProducts);
        
        const options = Object.entries(this.categories).map(([id, category]) => {
            const count = productsByCategory[id] ? productsByCategory[id].length : 0;
            return `
                <div class="category-dropdown-item" data-category="${id}">
                    <div class="category-dropdown-content">
                        <span class="category-icon">${category.icon}</span>
                        <span class="category-name">${category.name}</span>
                        <span class="category-count">${count}</span>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="category-dropdown">
                <button class="category-dropdown-btn" id="category-dropdown-btn">
                    <span class="dropdown-text">All Categories</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                <div class="category-dropdown-menu" id="category-dropdown-menu">
                    <div class="category-dropdown-item active" data-category="all">
                        <div class="category-dropdown-content">
                            <span class="category-icon">🛍️</span>
                            <span class="category-name">All Products</span>
                            <span class="category-count">${this.allProducts.length}</span>
                        </div>
                    </div>
                    ${options}
                </div>
            </div>
        `;
    }

    static renderAllProductsSection() {
        const paginatedProducts = this.getPaginatedProducts(this.allProducts);
        const totalPages = Math.ceil(this.allProducts.length / this.itemsPerPage);
        
        return `
            <div class="category-section" id="category-all" style="display: block;">
                <div class="products-grid" id="products-all">
                    ${paginatedProducts.map(product => ProductCard.renderHTML(product)).join('')}
                </div>
                ${this.renderPaginationControls(totalPages, 'all')}
            </div>
        `;
    }

    static renderCategorySections(productsByCategory) {
        let html = '';
        
        Object.entries(this.categories).forEach(([categoryId, category]) => {
            const categoryProducts = productsByCategory[categoryId] || [];
            const paginatedProducts = this.getPaginatedProducts(categoryProducts);
            const totalPages = Math.ceil(categoryProducts.length / this.itemsPerPage);
            
            html += `
                <div class="category-section" id="category-${categoryId}" style="display: none;">
                    ${categoryProducts.length > 0 ? `
                        <div class="products-grid" id="products-${categoryId}">
                            ${paginatedProducts.map(product => ProductCard.renderHTML(product)).join('')}
                        </div>
                        ${this.renderPaginationControls(totalPages, categoryId)}
                    ` : `
                        <div class="no-products">
                            <p>No products found in ${category.name}</p>
                        </div>
                    `}
                </div>
            `;
        });

        return html;
    }

    static groupProductsByCategory(products) {
        const grouped = {};
        
        products.forEach(product => {
            // Use category.id from the category object, or fallback to category_id, or default to 1
            const categoryId = (product.category && product.category.id) || product.category_id || 1;
            if (!grouped[categoryId]) {
                grouped[categoryId] = [];
            }
            grouped[categoryId].push(product);
        });

        return grouped;
    }

    static setupCategoryDropdownListeners() {
        const dropdownBtn = document.getElementById('category-dropdown-btn');
        const dropdownMenu = document.getElementById('category-dropdown-menu');
        const dropdownItems = document.querySelectorAll('.category-dropdown-item');
        const allProductsSection = document.getElementById('category-all');
        const categorySections = document.querySelectorAll('.category-section');

        // Toggle dropdown menu
        if (dropdownBtn) {
            dropdownBtn.addEventListener('click', () => {
                dropdownMenu.classList.toggle('show');
                const arrow = dropdownBtn.querySelector('.dropdown-arrow');
                arrow.textContent = dropdownMenu.classList.contains('show') ? '▲' : '▼';
            });
        }

        // Handle category selection
        dropdownItems.forEach(item => {
            item.addEventListener('click', async () => {
                const category = item.dataset.category;
                
                // Reset page when switching categories
                this.currentPage = 1;
                this.currentCategory = category;
                
                // Update active item
                dropdownItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Update dropdown button text
                const dropdownText = dropdownBtn.querySelector('.dropdown-text');
                const categoryName = item.querySelector('.category-name').textContent;
                dropdownText.textContent = categoryName;

                // Close dropdown
                dropdownMenu.classList.remove('show');
                const arrow = dropdownBtn.querySelector('.dropdown-arrow');
                arrow.textContent = '▼';

                // Show/hide sections based on category
                if (category === 'all') {
                    // Show all products section and hide all category sections
                    if (allProductsSection) {
                        allProductsSection.style.display = 'block';
                    }
                    categorySections.forEach(section => {
                        if (section.id !== 'category-all') {
                            section.style.display = 'none';
                        }
                    });
                } else {
                    // Use cached products and filter by category
                    const container = document.getElementById('app-container');
                    Helpers.showLoading(container);
                    
                    // Get all cached products and filter by category
                    const allCachedProducts = await this.getCachedProducts();
                    const categoryProducts = allCachedProducts.filter(product => {
                        const categoryId = (product.category && product.category.id) || product.category_id || 1;
                        return categoryId == category;
                    });
                    
                    // Merge into allProducts so they can be found by findProductById
                    categoryProducts.forEach(p => {
                        if (!this.allProducts.find(existing => existing.id === p.id)) {
                            this.allProducts.push(p);
                        }
                    });
                    
                    this.renderCategoryProducts(category, categoryProducts);
                }
                
                // Setup product card listeners for newly visible products
                this.setupProductCardListeners();
                
                // Setup pagination listeners
                this.setupPaginationListeners();
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.category-dropdown')) {
                dropdownMenu.classList.remove('show');
                const arrow = dropdownBtn.querySelector('.dropdown-arrow');
                if (arrow) arrow.textContent = '▼';
            }
        });
    }

    static async renderCategoryProducts(categoryId, products) {
        const container = document.getElementById('app-container');
        const categoryName = this.categories[categoryId]?.name || 'Category';
        
        if (!products || products.length === 0) {
            container.innerHTML = `
                <div class="products-container">
                    <div class="products-header">
                        <h2>${categoryName}</h2>
                        <button class="back-to-all-btn" id="back-to-all-btn">Back to All Products</button>
                    </div>
                    <div class="no-products"><p>No products found in ${categoryName}</p></div>
                </div>
            `;
            
            const backBtn = container.querySelector('#back-to-all-btn');
            if (backBtn) {
                backBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    ProductsPage.currentCategory = 'all';
                    ProductsPage.currentPage = 1;
                    ProductsPage.renderProductsWithCategories();
                });
            }
            return;
        }

        const paginatedProducts = this.getPaginatedProducts(products);
        const totalPages = Math.ceil(products.length / this.itemsPerPage);

        container.innerHTML = `
            <div class="products-container">
                <div class="products-header">
                    <h2>${categoryName}</h2>
                    <p style="color: #6c757d; margin-top: 0.5rem;">Found ${products.length} product${products.length !== 1 ? 's' : ''}</p>
                    <button class="back-to-all-btn" id="back-to-all-btn">Back to All Products</button>
                </div>
                <div class="products-grid">
                    ${paginatedProducts.map(product => ProductCard.renderHTML(product)).join('')}
                </div>
                ${this.renderPaginationControls(totalPages, categoryId)}
            </div>
        `;

        this.setupProductCardListeners();
        this.setupPaginationListeners();
        
        const backBtn = container.querySelector('#back-to-all-btn');
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                ProductsPage.currentCategory = 'all';
                ProductsPage.currentPage = 1;
                ProductsPage.renderProductsWithCategories();
            });
        }
    }

    static setupProductCardListeners() {
        const addButtons = document.querySelectorAll('.add-to-cart-btn');
        addButtons.forEach(button => {
            if (!button.hasAttribute('data-listener-added')) {
                button.setAttribute('data-listener-added', 'true');
                button.addEventListener('click', async (e) => {
                    const productId = button.getAttribute('data-product-id');
                    const product = this.findProductById(productId);
                    
                    if (product) {
                        await ProductCard.handleAddToCart(product);
                    }
                });
            }
        });
    }

    static findProductById(productId) {
        return this.allProducts.find(p => p.id == productId);
    }

    static getPaginatedProducts(products) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return products.slice(startIndex, endIndex);
    }

    static renderPaginationControls(totalPages, category) {
        if (totalPages <= 1) return '';
        
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(`
                <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" 
                        data-page="${i}" 
                        data-category="${category}">
                    ${i}
                </button>
            `);
        }

        return `
            <div class="pagination-controls" id="pagination-${category}">
                <button class="pagination-btn prev-btn" 
                        data-page="${this.currentPage - 1}" 
                        data-category="${category}"
                        ${this.currentPage === 1 ? 'disabled' : ''}>
                    Previous
                </button>
                ${pages.join('')}
                <button class="pagination-btn next-btn" 
                        data-page="${this.currentPage + 1}" 
                        data-category="${category}"
                        ${this.currentPage === totalPages ? 'disabled' : ''}>
                    Next
                </button>
            </div>
        `;
    }

    static setupPaginationListeners() {
        const paginationButtons = document.querySelectorAll('.pagination-btn');
        
        paginationButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const page = parseInt(e.target.dataset.page);
                const category = e.target.dataset.category;
                
                if (page < 1) return;
                
                this.currentPage = page;
                this.currentCategory = category;
                
                // Re-render the specific category section
                this.renderPaginatedCategory(category);
                
                // Setup event listeners for new products
                this.setupProductCardListeners();
            });
        });
    }

    static renderPaginatedCategory(category) {
        const productsByCategory = this.groupProductsByCategory(this.allProducts);
        let products = category === 'all' ? this.allProducts : (productsByCategory[category] || []);
        
        const paginatedProducts = this.getPaginatedProducts(products);
        const totalPages = Math.ceil(products.length / this.itemsPerPage);
        
        const gridId = category === 'all' ? 'products-all' : `products-${category}`;
        const gridElement = document.getElementById(gridId);
        const paginationElement = document.getElementById(`pagination-${category}`);
        
        if (gridElement) {
            gridElement.innerHTML = paginatedProducts.map(product => ProductCard.renderHTML(product)).join('');
        }
        
        if (paginationElement) {
            paginationElement.outerHTML = this.renderPaginationControls(totalPages, category);
        }
        
        // Re-setup pagination listeners
        this.setupPaginationListeners();
    }
}
