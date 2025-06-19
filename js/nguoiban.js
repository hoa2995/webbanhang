document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'seller') {
        window.location.href = 'login.html';
        return;
    }

    const productList = document.getElementById('productList');
    const addProductBtn = document.getElementById('addProductBtn');
    const productModal = document.getElementById('productModal');
    const productForm = document.getElementById('productForm');
    const closeModal = document.getElementById('closeModal');
    const logoutBtn = document.getElementById('logoutBtn');

    let products = JSON.parse(localStorage.getItem(`products_${currentUser.username}`) || '[]');
    let editingProductId = null;

    function renderProducts() {
        productList.innerHTML = products.map((product, index) => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price.toLocaleString('vi-VN')}₫</p>
                <div class="product-actions">
                    <button onclick="editProduct(${index})" class="edit-btn">Sửa</button>
                    <button onclick="deleteProduct(${index})" class="delete-btn">Xóa</button>
                </div>
            </div>
        `).join('');
    }

    window.editProduct = (index) => {
        const product = products[index];
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productImage').value = product.image;
        document.getElementById('productDescription').value = product.description;
        editingProductId = index;
        productModal.style.display = 'block';
    };

    window.deleteProduct = (index) => {
        if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            products.splice(index, 1);
            localStorage.setItem(`products_${currentUser.username}`, JSON.stringify(products));
            renderProducts();
        }
    };

    addProductBtn.addEventListener('click', () => {
        productForm.reset();
        editingProductId = null;
        productModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productData = {
            name: document.getElementById('productName').value,
            price: Number(document.getElementById('productPrice').value),
            image: document.getElementById('productImage').value,
            description: document.getElementById('productDescription').value
        };

        if (editingProductId !== null) {
            products[editingProductId] = productData;
        } else {
            products.push(productData);
        }

        localStorage.setItem(`products_${currentUser.username}`, JSON.stringify(products));
        productModal.style.display = 'none';
        renderProducts();
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.style.display = 'none';
        }
    });

    renderProducts();
});
