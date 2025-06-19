document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Special check for admin user
        if (username === 'hoa2995' && password === '1') {
            const adminUser = {
                username: 'hoa2995',
                role: 'admin',
                email: 'admin@example.com'
            };
            localStorage.setItem('currentUser', JSON.stringify(adminUser));
            window.location.href = 'admin.html';
            return;
        }

        // Regular user login
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            switch(user.role) {
                case 'seller':
                    window.location.href = 'nguoiban.html';
                    break;
                default:
                    window.location.href = 'index.html';
            }
        } else {
            alert('Sai tên đăng nhập hoặc mật khẩu!');
        }
    });
});

function loginWithGoogle() {
    // Mock Google login
    const mockGoogleUser = {
        username: 'google_user_' + Math.random().toString(36).substring(7),
        email: 'user@gmail.com',
        role: 'buyer'
    };
    handleSocialLogin(mockGoogleUser);
}

function loginWithFacebook() {
    // Mock Facebook login
    const mockFacebookUser = {
        username: 'fb_user_' + Math.random().toString(36).substring(7),
        email: 'user@facebook.com',
        role: 'buyer'
    };
    handleSocialLogin(mockFacebookUser);
}

function handleSocialLogin(socialUser) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => u.email === socialUser.email);
    
    if (!user) {
        // Create new user if not exists
        user = {
            ...socialUser,
            password: Math.random().toString(36),
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'index.html';
}

window.loginWithGoogle = loginWithGoogle;
window.loginWithFacebook = loginWithFacebook;
