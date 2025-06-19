document.addEventListener('DOMContentLoaded', () => {
    // Initialize admin user if no users exist
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
        users.push({
            username: 'hoa2995',
            password: '1',
            email: 'admin@example.com',
            role: 'admin'
        });
        localStorage.setItem('users', JSON.stringify(users));
    }

    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            email: document.getElementById('email').value,
            role: document.getElementById('role').value
        };

        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if username already exists
        if (users.some(user => user.username === userData.username)) {
            alert('Tên đăng nhập đã tồn tại!');
            return;
        }

        // Add new user
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Đăng ký thành công!');
        window.location.href = 'login.html';
    });
});

function registerWithGoogle() {
    // Mock Google registration
    const mockGoogleUser = {
        username: 'google_user_' + Math.random().toString(36).substring(7),
        email: 'user@gmail.com',
        role: 'buyer'
    };
    handleSocialRegistration(mockGoogleUser);
}

function registerWithFacebook() {
    // Mock Facebook registration
    const mockFacebookUser = {
        username: 'fb_user_' + Math.random().toString(36).substring(7),
        email: 'user@facebook.com',
        role: 'buyer'
    };
    handleSocialRegistration(mockFacebookUser);
}

function handleSocialRegistration(socialUser) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.email === socialUser.email)) {
        alert('Tài khoản đã tồn tại!');
        return;
    }

    const newUser = {
        ...socialUser,
        password: Math.random().toString(36)
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    alert('Đăng ký thành công!');
    window.location.href = 'index.html';
}

window.registerWithGoogle = registerWithGoogle;
window.registerWithFacebook = registerWithFacebook;
