document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('username').textContent = currentUser.username;
    document.getElementById('email').textContent = currentUser.email;
    document.getElementById('role').textContent = currentUser.role === 'seller' ? 'Người bán' : 
                                                currentUser.role === 'admin' ? 'Quản trị viên' : 'Người mua';
});
