document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userMenu = document.querySelector('.user-menu');
    const loginButton = document.getElementById('loginButton');
    const logoutBtn = document.getElementById('logoutBtn');

    function updateLoginState() {
        if (currentUser) {
            if (loginButton) loginButton.style.display = 'none';
            if (userMenu) userMenu.style.display = 'block';
        } else {
            if (loginButton) loginButton.style.display = 'block';
            if (userMenu) userMenu.style.display = 'none';
        }
    }

    // Initialize state
    updateLoginState();

    // Handle user menu dropdown
    if (userMenu) {
        userMenu.addEventListener('click', (e) => {
            const dropdown = userMenu.querySelector('.user-dropdown');
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenu.contains(e.target)) {
                userMenu.querySelector('.user-dropdown').classList.remove('active');
            }
        });
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    }
});
