document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const sellerUsername = urlParams.get('seller');

    // Get product details from seller's products
    const sellerProducts = JSON.parse(localStorage.getItem(`products_${sellerUsername}`) || '[]');
    const product = sellerProducts[productId] || {
        name: 'Sản phẩm không tồn tại',
        price: 0,
        image: 'https://via.placeholder.com/400',
        description: 'Không tìm thấy thông tin sản phẩm'
    };

    // Display product details
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price.toLocaleString('vi-VN') + '₫';
    document.getElementById('productImage').src = product.image;
    document.getElementById('productDescription').textContent = product.description;

    // Add seller information
    document.getElementById('sellerName').textContent = sellerUsername;

    // Handle contact seller button
    document.getElementById('contactSeller').addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Vui lòng đăng nhập để liên hệ với người bán!');
            window.location.href = 'login.html';
            return;
        }
        
        // You can implement your contact functionality here
        // For example, open a chat window or email client
        window.location.href = `mailto:${seller.email}?subject=Hỏi về sản phẩm: ${product.name}`;
    });

    // Handle star rating input
    const starRating = document.querySelector('.star-rating');
    let selectedRating = 0;

    starRating.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'I') {
            const rating = e.target.dataset.rating;
            updateStars(rating);
        }
    });

    starRating.addEventListener('click', (e) => {
        if (e.target.tagName === 'I') {
            selectedRating = e.target.dataset.rating;
        }
    });

    starRating.addEventListener('mouseleave', () => {
        updateStars(selectedRating);
    });

    function updateStars(rating) {
        const stars = starRating.children;
        for (let i = 0; i < stars.length; i++) {
            stars[i].className = i < rating ? 'fas fa-star' : 'far fa-star';
        }
    }

    // Handle review submission
    document.getElementById('submitReview').addEventListener('click', () => {
        const reviewText = document.getElementById('reviewText').value;
        if (!reviewText || !selectedRating) {
            alert('Vui lòng nhập đánh giá và chọn số sao');
            return;
        }

        const review = {
            text: reviewText,
            rating: selectedRating,
            date: new Date().toLocaleDateString(),
            user: 'Khách hàng'
        };

        // Save review to localStorage
        const reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
        reviews.push(review);
        localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));

        // Display new review
        displayReviews(reviews);
        
        // Reset form
        document.getElementById('reviewText').value = '';
        selectedRating = 0;
        updateStars(0);
    });

    function displayReviews(reviews) {
        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span>${review.user} - ${review.date}</span>
                    <div class="review-rating">
                        ${('★').repeat(review.rating)}${('☆').repeat(5-review.rating)}
                    </div>
                </div>
                <p>${review.text}</p>
            </div>
        `).join('');
    }

    // Load existing reviews
    const reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
    displayReviews(reviews);
});
    

    // Load existing reviews
    const reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
    displayReviews(reviews);
