document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Strict check for admin access
    if (!currentUser || currentUser.username !== 'hoa2995' || currentUser.role !== 'admin') {
        alert('Bạn không có quyền truy cập trang này!');
        window.location.href = 'login.html';
        return;
    }

    const userList = document.getElementById('userList');
    const logoutBtn = document.getElementById('logoutBtn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const userPanel = document.getElementById('users-panel');
    const productsPanel = document.getElementById('products-panel');
    const productModal = document.getElementById('productModal');
    const productForm = document.getElementById('productForm');
    const addProductBtn = document.getElementById('addProductBtn');
    let editingProductId = null;

    function displayUsers() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        userList.innerHTML = users.map(user => `
            <div class="user-item">
                <span>${user.username} (${user.role})</span>
                <button onclick="deleteUser('${user.username}')">Xóa</button>
            </div>
        `).join('');
    }

    window.deleteUser = (username) => {
        if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const filtered = users.filter(user => user.username !== username);
            localStorage.setItem('users', JSON.stringify(filtered));
            displayUsers();
        }
    };

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (btn.dataset.tab === 'users') {
                userPanel.style.display = 'block';
                productsPanel.style.display = 'none';
            } else {
                userPanel.style.display = 'none';
                productsPanel.style.display = 'block';
            }
        });
    });

    // Product management
    function displayProducts() {
        const allProducts = [];
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        users.forEach(user => {
            if (user.role === 'seller') {
                const sellerProducts = JSON.parse(localStorage.getItem(`products_${user.username}`) || '[]');
                sellerProducts.forEach(product => {
                    allProducts.push({ ...product, seller: user.username });
                });
            }
        });

        const productList = document.getElementById('productList');
        productList.innerHTML = allProducts.map((product, index) => `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>Giá: ${product.price.toLocaleString('vi-VN')}₫</p>
                    <p>Người bán: ${product.seller}</p>
                </div>
                <div class="product-actions">
                    <button onclick="editProduct(${index})" class="edit-btn">Sửa</button>
                    <button onclick="deleteProduct(${index})" class="delete-btn">Xóa</button>
                </div>
            </div>
        `).join('');
    }

    // Initialize seller dropdown
    function initializeSellersDropdown() {
        const sellerSelect = document.getElementById('sellerId');
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const sellers = users.filter(user => user.role === 'seller');
        
        sellerSelect.innerHTML = sellers.map(seller => 
            `<option value="${seller.username}">${seller.username}</option>`
        ).join('');
    }

    // Display initial data
    displayUsers();
    displayProducts();
    initializeSellersDropdown();

    // Event listeners
    addProductBtn.addEventListener('click', () => {
        editingProductId = null;
        productForm.reset();
        productModal.style.display = 'block';
    });

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sellerId = document.getElementById('sellerId').value;
        const productData = {
            name: document.getElementById('productName').value,
            price: Number(document.getElementById('productPrice').value),
            image: document.getElementById('productImage').value,
            description: document.getElementById('productDescription').value
        };

        let sellerProducts = JSON.parse(localStorage.getItem(`products_${sellerId}`) || '[]');
        
        if (editingProductId !== null) {
            sellerProducts[editingProductId] = productData;
        } else {
            sellerProducts.push(productData);
        }

        localStorage.setItem(`products_${sellerId}`, JSON.stringify(sellerProducts));
        productModal.style.display = 'none';
        displayProducts();
    });

    // Close modal on cancel
    document.querySelector('.cancel-btn').addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.style.display = 'none';
        }
    });
});
