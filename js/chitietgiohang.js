document.addEventListener('DOMContentLoaded', () => {
    const orderItems = document.getElementById('order-items');
    const finalTotal = document.getElementById('final-total');
    const shippingForm = document.getElementById('shipping-form');

    // Mock order data - replace with actual data from cart
    const orderData = [
        { name: 'Sản phẩm 1', price: 500000, quantity: 1 },
        { name: 'Sản phẩm 2', price: 750000, quantity: 1 }
    ];

    function renderOrder() {
        orderItems.innerHTML = orderData.map(item => `
            <div class="order-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString('vi-VN')}₫</span>
            </div>
        `).join('');

        const total = orderData.reduce((sum, item) => sum + item.price * item.quantity, 0);
        finalTotal.textContent = total.toLocaleString('vi-VN') + '₫';
    }

    shippingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        };
        
        // Process order
        alert('Đặt hàng thành công!');
        window.location.href = 'index.html';
    });

    renderOrder();
});
