document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    function getAllProducts() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const allProducts = [];
        
        users.forEach(user => {
            if (user.role === 'seller') {
                const sellerProducts = JSON.parse(localStorage.getItem(`products_${user.username}`) || '[]');
                sellerProducts.forEach(product => {
                    allProducts.push({
                        ...product,
                        seller: user.username
                    });
                });
            }
        });

        return allProducts;
    }

    function renderProducts() {
        const products = getAllProducts();
        productGrid.innerHTML = products.map((product, index) => `
            <div class="product-card">
                <a href="sanpham.html?id=${index}&seller=${product.seller}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                </a>
                <p class="price">${product.price.toLocaleString('vi-VN')}₫</p>
                <p class="seller">Người bán: ${product.seller}</p>
                <button class="add-to-cart" onclick="addToCart(${index})">Thêm vào giỏ</button>
            </div>
        `).join('');
    }

    window.addToCart = (productIndex) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
            window.location.href = 'login.html';
            return;
        }

        const products = getAllProducts();
        const product = products[productIndex];
        
        let cartItems = JSON.parse(localStorage.getItem(`cart_${currentUser.username}`) || '[]');
        
        cartItems.push({
            ...product,
            quantity: 1
        });
        
        localStorage.setItem(`cart_${currentUser.username}`, JSON.stringify(cartItems));
        updateCartCount();
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
    };

    function updateCartCount() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const cartItems = JSON.parse(localStorage.getItem(`cart_${currentUser.username}`) || '[]');
            cartCount.textContent = cartItems.length;
        }
    }

    updateCartCount();
    renderProducts();
});
