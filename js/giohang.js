document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Vui lòng đăng nhập để xem giỏ hàng!');
        window.location.href = 'login.html';
        return;
    }

    // Update cart count in header
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const cartItems = JSON.parse(localStorage.getItem(`cart_${currentUser.username}`) || '[]');
        cartCount.textContent = cartItems.length;
    }

    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.getElementById('total-amount');

    function renderCart() {
        const cartData = JSON.parse(localStorage.getItem(`cart_${currentUser.username}`) || '[]');
        
        if (cartData.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
            return;
        }

        cartItems.innerHTML = cartData.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>${item.price.toLocaleString('vi-VN')}₫</p>
                    <div class="quantity">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button onclick="removeItem(${index})" class="remove-btn">×</button>
            </div>
        `).join('');

        const total = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalAmount.textContent = total.toLocaleString('vi-VN') + '₫';
    }

    window.updateQuantity = (index, change) => {
        const cartData = JSON.parse(localStorage.getItem(`cart_${currentUser.username}`) || '[]');
        if (cartData[index]) {
            cartData[index].quantity = Math.max(1, cartData[index].quantity + change);
            localStorage.setItem(`cart_${currentUser.username}`, JSON.stringify(cartData));
            renderCart();
        }
    };

    window.removeItem = (index) => {
        const cartData = JSON.parse(localStorage.getItem(`cart_${currentUser.username}`) || '[]');
        cartData.splice(index, 1);
        localStorage.setItem(`cart_${currentUser.username}`, JSON.stringify(cartData));
        renderCart();
    };

    updateCartCount();
    renderCart();
});
