# Graph Report - frontend  (2026-05-02)

## Corpus Check
- 32 files · ~149,282 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 163 nodes · 202 edges · 21 communities detected
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Module 0|Module 0]]
- [[_COMMUNITY_Module 1|Module 1]]
- [[_COMMUNITY_Module 2|Module 2]]
- [[_COMMUNITY_Module 3|Module 3]]
- [[_COMMUNITY_Module 4|Module 4]]
- [[_COMMUNITY_Module 5|Module 5]]
- [[_COMMUNITY_Module 6|Module 6]]
- [[_COMMUNITY_Module 7|Module 7]]
- [[_COMMUNITY_Module 8|Module 8]]
- [[_COMMUNITY_Module 9|Module 9]]
- [[_COMMUNITY_Module 10|Module 10]]
- [[_COMMUNITY_Module 11|Module 11]]
- [[_COMMUNITY_Module 12|Module 12]]
- [[_COMMUNITY_Module 13|Module 13]]
- [[_COMMUNITY_Module 14|Module 14]]
- [[_COMMUNITY_Module 15|Module 15]]
- [[_COMMUNITY_Module 16|Module 16]]
- [[_COMMUNITY_Module 17|Module 17]]
- [[_COMMUNITY_Module 18|Module 18]]
- [[_COMMUNITY_Module 19|Module 19]]
- [[_COMMUNITY_Module 20|Module 20]]

## God Nodes (most connected - your core abstractions)
1. `ProductsPage` - 16 edges
2. `StorageService` - 15 edges
3. `Helpers` - 11 edges
4. `Navbar` - 10 edges
5. `Validators` - 8 edges
6. `AuthService` - 7 edges
7. `OrderService` - 7 edges
8. `ProductCard` - 7 edges
9. `App` - 6 edges
10. `CartApiService` - 6 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Module 0"
Cohesion: 0.24
Nodes (1): ProductsPage

### Community 1 - "Module 1"
Cohesion: 0.22
Nodes (1): StorageService

### Community 2 - "Module 2"
Cohesion: 0.21
Nodes (1): Helpers

### Community 3 - "Module 3"
Cohesion: 0.22
Nodes (3): OrderService, getApiBaseUrl(), normalizeBaseUrl()

### Community 4 - "Module 4"
Cohesion: 0.29
Nodes (1): Navbar

### Community 5 - "Module 5"
Cohesion: 0.25
Nodes (2): Modal, OrdersPage

### Community 6 - "Module 6"
Cohesion: 0.42
Nodes (1): Validators

### Community 7 - "Module 7"
Cohesion: 0.25
Nodes (1): AuthService

### Community 8 - "Module 8"
Cohesion: 0.39
Nodes (1): ProductCard

### Community 9 - "Module 9"
Cohesion: 0.48
Nodes (1): App

### Community 10 - "Module 10"
Cohesion: 0.29
Nodes (1): CartApiService

### Community 11 - "Module 11"
Cohesion: 0.29
Nodes (1): ProductService

### Community 12 - "Module 12"
Cohesion: 0.53
Nodes (1): SearchService

### Community 13 - "Module 13"
Cohesion: 0.33
Nodes (1): AuthPage

### Community 14 - "Module 14"
Cohesion: 0.4
Nodes (1): InventoryService

### Community 15 - "Module 15"
Cohesion: 0.67
Nodes (2): resetIdleTimer(), setupIdleTracking()

### Community 16 - "Module 16"
Cohesion: 0.5
Nodes (1): PaymentService

### Community 17 - "Module 17"
Cohesion: 0.5
Nodes (1): CheckoutPage

### Community 18 - "Module 18"
Cohesion: 0.67
Nodes (1): CartItem

### Community 19 - "Module 19"
Cohesion: 0.67
Nodes (1): CartPage

### Community 20 - "Module 20"
Cohesion: 0.67
Nodes (1): PaymentSuccessPage

## Knowledge Gaps
- **Thin community `Module 0`** (17 nodes): `products.js`, `ProductsPage`, `.findProductById()`, `.getPaginatedProducts()`, `.groupProductsByCategory()`, `.render()`, `.renderAllProductsSection()`, `.renderCategoryDropdown()`, `.renderCategorySections()`, `.renderPaginatedCategory()`, `.renderPaginationControls()`, `.renderProductsGrid()`, `.renderProductsWithCategories()`, `.renderSearchResults()`, `.setupCategoryDropdownListeners()`, `.setupPaginationListeners()`, `.setupProductCardListeners()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 1`** (16 nodes): `storage.js`, `StorageService`, `.addToCart()`, `.clearCart()`, `.getCart()`, `.getToken()`, `.getUser()`, `.isLoggedIn()`, `.logout()`, `.removeFromCart()`, `.removeToken()`, `.removeUser()`, `.setCart()`, `.setToken()`, `.setUser()`, `.updateCartItem()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 2`** (12 nodes): `helpers.js`, `Helpers`, `.deepClone()`, `.delay()`, `.formatCurrency()`, `.formatDate()`, `.generateOrderId()`, `.handleApiError()`, `.showError()`, `.showLoading()`, `.showNotification()`, `.showSuccess()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 4`** (11 nodes): `Navbar`, `.attachEventListeners()`, `.fetchSuggestions()`, `.handleKeyboardNavigation()`, `.hideSuggestions()`, `.highlightSuggestion()`, `.render()`, `.showSuggestions()`, `.syncCartFromServer()`, `.updateCartCount()`, `navbar.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 5`** (11 nodes): `Modal`, `.alert()`, `.confirm()`, `.open()`, `modal.js`, `orders.js`, `OrdersPage`, `.cancelOrder()`, `.render()`, `.renderOrderCard()`, `.showOrderDetails()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 6`** (9 nodes): `validators.js`, `Validators`, `.isValidEmail()`, `.isValidName()`, `.isValidPassword()`, `.isValidPhoneNumber()`, `.validateCheckoutForm()`, `.validateLoginForm()`, `.validateSignupForm()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 7`** (8 nodes): `AuthService`, `.getCurrentUser()`, `.isLoggedIn()`, `.login()`, `.logout()`, `.signup()`, `.validateToken()`, `authService.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 8`** (8 nodes): `ProductCard`, `.getCartQuantity()`, `.handleAddToCart()`, `.render()`, `.renderHTML()`, `.updateCartQuantityBadge()`, `.updateCartQuantityForProduct()`, `productCard.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 9`** (7 nodes): `App`, `.init()`, `.navigate()`, `.renderCurrentHash()`, `.renderHome()`, `.setupRouting()`, `app.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 10`** (7 nodes): `CartApiService`, `.addToCart()`, `.clearCart()`, `.getCart()`, `.removeItem()`, `.updateItem()`, `cartService.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 11`** (7 nodes): `ProductService`, `.createProduct()`, `.deleteProduct()`, `.getAllProducts()`, `.getProductById()`, `.updateProduct()`, `productService.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 12`** (6 nodes): `SearchService`, `.getSearchSuggestions()`, `.searchByCategory()`, `.searchByPrice()`, `.searchProducts()`, `searchService.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 13`** (6 nodes): `auth.js`, `AuthPage`, `.handleLogin()`, `.handleSignup()`, `.renderLogin()`, `.renderSignup()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 14`** (5 nodes): `InventoryService`, `.getAllInventory()`, `.getInventory()`, `.updateInventory()`, `inventoryService.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 15`** (4 nodes): `idleTimeout.js`, `logoutUser()`, `resetIdleTimer()`, `setupIdleTracking()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 16`** (4 nodes): `PaymentService`, `.generatePaymentLink()`, `.openPaymentGateway()`, `paymentService.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 17`** (4 nodes): `checkout.js`, `CheckoutPage`, `.handleCheckout()`, `.render()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 18`** (3 nodes): `CartItem`, `.render()`, `cartItem.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 19`** (3 nodes): `cart.js`, `CartPage`, `.render()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module 20`** (3 nodes): `paymentSuccess.js`, `PaymentSuccessPage`, `.render()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Not enough signal to generate questions. This usually means the corpus has no AMBIGUOUS edges, no bridge nodes, no INFERRED relationships, and all communities are tightly cohesive. Add more files or run with --mode deep to extract richer edges._