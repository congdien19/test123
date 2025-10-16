// User Management System using localStorage
class UserManager {
    static getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    static setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    static clearCurrentUser() {
        localStorage.removeItem('currentUser');
    }

    static getUserByEmail(email) {
        const users = localStorage.getItem('users');
        if (!users) return null;
        
        const usersArray = JSON.parse(users);
        return usersArray.find(user => user.email === email);
    }

    static registerUser(email, name, password, isAdmin = false) {
        // Get existing users or initialize empty array
        const users = localStorage.getItem('users');
        const usersArray = users ? JSON.parse(users) : [];
        
        // Check if user already exists
        const existingUser = usersArray.find(user => user.email === email);
        if (existingUser) {
            throw new Error('Người dùng với email này đã tồn tại');
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            email: email,
            name: name,
            password: password, // In a real app, this should be hashed
            isAdmin: isAdmin
        };
        
        // Add new user to array and save
        usersArray.push(newUser);
        localStorage.setItem('users', JSON.stringify(usersArray));
        
        return newUser;
    }

    static authenticateUser(email, password) {
        const user = this.getUserByEmail(email);
        if (!user) {
            throw new Error('Không tìm thấy người dùng');
        }
        
        if (user.password !== password) {
            throw new Error('Mật khẩu không đúng');
        }
        
        return user;
    }

    // Function to create admin account
    static createAdminAccount(email, name, password) {
        return this.registerUser(email, name, password, true);
    }

    // Function to check if current user is admin
    static isAdmin() {
        const currentUser = this.getCurrentUser();
        return currentUser && currentUser.isAdmin === true;
    }
}

// Form Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // At least 6 characters
    return password.length >= 6;
}

function validateName(name) {
    // At least 2 characters
    return name.length >= 2;
}

// Signup Form Handler
function handleSignupForm(event) {
    event.preventDefault();
    
    const emailInput = document.querySelector('#signup-email');
    const nameInput = document.querySelector('#signup-name');
    const passwordInput = document.querySelector('#signup-password');
    const submitButton = document.querySelector('#signup-form .site-btn');
    
    const email = emailInput.value.trim();
    const name = nameInput.value.trim();
    const password = passwordInput.value;
    
    // Reset error messages
    clearErrors();
    
    // Validation
    let isValid = true;
    
    if (!email) {
        showError(emailInput, 'Email là bắt buộc');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, 'Vui lòng nhập địa chỉ email hợp lệ');
        isValid = false;
    }
    
    if (!name) {
        showError(nameInput, 'Tên là bắt buộc');
        isValid = false;
    } else if (!validateName(name)) {
        showError(nameInput, 'Tên phải có ít nhất 2 ký tự');
        isValid = false;
    }
    
    if (!password) {
        showError(passwordInput, 'Mật khẩu là bắt buộc');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(passwordInput, 'Mật khẩu phải có ít nhất 6 ký tự');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Disable submit button during processing
    submitButton.disabled = true;
    submitButton.textContent = 'Đang xử lý...';
    
    try {
        const user = UserManager.registerUser(email, name, password);
        UserManager.setCurrentUser(user);
        
        // Show success message
        alert('Tạo tài khoản thành công! Bạn đã đăng nhập.');
        
        // Redirect to homepage
        window.location.href = './index.html';
    } catch (error) {
        showError(null, error.message);
        submitButton.disabled = false;
        submitButton.textContent = 'Đăng Ký';
    }
}

// Login Form Handler
function handleLoginForm(event) {
    event.preventDefault();
    
    const emailInput = document.querySelector('#login-email');
    const passwordInput = document.querySelector('#login-password');
    const submitButton = document.querySelector('#login-form .site-btn');
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Reset error messages
    clearErrors();
    
    // Validation
    let isValid = true;
    
    if (!email) {
        showError(emailInput, 'Email là bắt buộc');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, 'Vui lòng nhập địa chỉ email hợp lệ');
        isValid = false;
    }
    
    if (!password) {
        showError(passwordInput, 'Mật khẩu là bắt buộc');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Disable submit button during processing
    submitButton.disabled = true;
    submitButton.textContent = 'Đang xử lý...';
    
    try {
        const user = UserManager.authenticateUser(email, password);
        UserManager.setCurrentUser(user);
        
        // Show success message
        alert('Đăng nhập thành công! Chào mừng trở lại, ' + user.name + '!');
        
        // Redirect to homepage for all users (including admins)
        window.location.href = './index.html';
    } catch (error) {
        showError(null, error.message);
        submitButton.disabled = false;
        submitButton.textContent = 'Đăng Nhập';
    }
}

// Error Handling Functions
function showError(inputElement, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    
    if (inputElement) {
        // Insert error message after the input field
        inputElement.parentNode.appendChild(errorDiv);
        inputElement.style.borderColor = 'red';
    } else {
        // Show general error message at the top of the form
        const form = document.querySelector('#signup-form') || document.querySelector('#login-form');
        if (form) {
            form.insertBefore(errorDiv, form.firstChild);
        }
    }
}

function clearErrors() {
    // Remove all error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    // Reset input borders
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    inputs.forEach(input => input.style.borderColor = '');
}

// Update Navigation Based on User State
function updateNavigation() {
    const currentUser = UserManager.getCurrentUser();
    const profileLinks = document.querySelectorAll('.header__right .icon_profile');
    
    profileLinks.forEach(profileLink => {
        const parentLink = profileLink.closest('a');
        if (currentUser) {
            // User is logged in
            if (currentUser.isAdmin) {
                // Admin user - show admin dashboard link with badge
                parentLink.href = './profile.html';
                parentLink.innerHTML = '<span class="icon_profile"></span> <span style="color: #e74c3c; font-weight: bold;">QUẢN TRỊ</span>';
            } else {
                // Regular user - show profile link
                parentLink.href = './profile.html';
                parentLink.innerHTML = '<span class="icon_profile"></span> ' + currentUser.name;
            }
        } else {
            // User is not logged in
            parentLink.href = './login.html';
            parentLink.innerHTML = '<span class="icon_profile"></span>';
        }
    });
}

// Check if user is authenticated for protected pages
function checkAuthentication() {
    // List of protected pages
    const protectedPages = [
        'index.html',
        'categories.html',
        'anime-details.html',
        'anime-watching.html',
        'blog.html',
        'blog-details.html',
        'profile.html'
    ];
    
    // Get current page
    const currentPage = window.location.pathname.split('/').pop();
    
    // Check if current page is protected
    if (protectedPages.includes(currentPage)) {
        const currentUser = UserManager.getCurrentUser();
        if (!currentUser) {
            // Redirect to welcome page if not authenticated
            window.location.href = './welcome.html';
        }
    }
    
    // Special case: if on signup or login page and user is already logged in, redirect to homepage
    if (currentPage === 'signup.html' || currentPage === 'login.html') {
        const currentUser = UserManager.getCurrentUser();
        if (currentUser) {
            window.location.href = './index.html';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create admin account if it doesn't exist
    const users = localStorage.getItem('users');
    const usersArray = users ? JSON.parse(users) : [];
    const adminExists = usersArray.some(user => user.isAdmin === true);
    
    if (!adminExists) {
        try {
            UserManager.createAdminAccount('admin@example.com', 'Quản Trị Viên', 'admin123');
            console.log('Tài khoản quản trị được tạo thành công');
        } catch (error) {
            console.log('Tài khoản quản trị có thể đã tồn tại hoặc xảy ra lỗi:', error.message);
        }
    }
    
    // Check authentication for protected pages
    checkAuthentication();
    
    // Check if we're on signup or login page
    if (document.querySelector('#signup-form')) {
        document.querySelector('#signup-form').addEventListener('submit', handleSignupForm);
    }
    
    if (document.querySelector('#login-form')) {
        document.querySelector('#login-form').addEventListener('submit', handleLoginForm);
    }
    
    // Update navigation
    updateNavigation();
});

// Logout function
function logout() {
    UserManager.clearCurrentUser();
    updateNavigation();
    alert('Bạn đã đăng xuất thành công.');
    window.location.href = './welcome.html';
}