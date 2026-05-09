// ============================================
// CATEGORY SERVICE - ES6 Module
// ============================================

import { API_CONFIG } from '../config.js';

export class CategoryService {
    static async getAllCategories() {
        try {
            console.log('Fetching categories from:', `${API_CONFIG.PRODUCT_SERVICE}/categories`);

            const response = await fetch(`${API_CONFIG.PRODUCT_SERVICE}/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || 'Failed to fetch categories';
                throw new Error(errorMessage);
            }

            const categories = await response.json();
            console.log('Categories fetched successfully:', categories);
            return { success: true, categories };

        } catch (error) {
            console.error('Error fetching categories:', error);
            return { success: false, error: error.message };
        }
    }

    static async getCategoryById(id) {
        try {
            console.log('Fetching category by ID:', id);

            const response = await fetch(`${API_CONFIG.PRODUCT_SERVICE}/categories/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || 'Category not found';
                throw new Error(errorMessage);
            }

            const category = await response.json();
            console.log('Category fetched:', category);
            return { success: true, category };

        } catch (error) {
            console.error('Error fetching category:', error);
            return { success: false, error: error.message };
        }
    }

    static async getProductsByCategory(categoryId) {
        try {
            console.log('Fetching products for category:', categoryId);

            const response = await fetch(`${API_CONFIG.PRODUCT_SERVICE}/category/${categoryId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || 'Failed to fetch products by category';
                throw new Error(errorMessage);
            }

            const products = await response.json();
            console.log('Products by category fetched successfully:', products);
            return { success: true, products };

        } catch (error) {
            console.error('Error fetching products by category:', error);
            return { success: false, error: error.message };
        }
    }
}
