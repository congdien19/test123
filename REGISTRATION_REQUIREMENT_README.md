# Registration Requirement System

## Overview
This document describes the registration requirement system that forces users to register and log in before accessing the website content. A welcome screen is shown before the signup page.

## Features

### 1. Welcome Page
- Users are redirected to a welcome page before accessing the signup page
- Welcome page includes:
  - Attractive design with background image
  - Introduction to the website
  - Call-to-action buttons for signup and login
  - Feature highlights

### 2. Authentication Enforcement
- All protected pages require user authentication
- Unauthenticated users are redirected to the welcome page
- Authenticated users can access all content

### 3. Automatic Redirection
- Users already logged in are redirected from signup/login pages to the homepage
- Logging out redirects users to the welcome page

## File Structure
```
.
├── welcome.html              # Welcome page shown before signup
├── REGISTRATION_REQUIREMENT_README.md  # This documentation
├── test-auth.html            # Test page for authentication system

js/
├── auth.js                   # Updated authentication system
```

## How It Works

### Welcome Page
When users try to access the website, they are first shown the welcome page:
- URL: `welcome.html`
- Contains signup and login buttons
- Provides an overview of website features

### Protected Pages
The following pages require authentication:
- Homepage (`index.html`)
- Categories (`categories.html`)
- Anime details (`anime-details.html`)
- Anime watching (`anime-watching.html`)
- Blog (`blog.html`)
- Blog details (`blog-details.html`)
- User profile (`profile.html`)

### Authentication Flow
1. User visits any protected page
2. System checks if user is authenticated
3. If not authenticated, user is redirected to `welcome.html`
4. User can choose to signup or login
5. After successful authentication, user can access protected content

### Logout Behavior
When users log out:
- They are redirected to the welcome page
- Session is cleared
- All authentication tokens are removed

## Implementation Details

### Authentication Check
The system uses the `checkAuthentication()` function to verify if a user is logged in:
```javascript
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
}
```

### Page Protection
Each protected page includes the authentication check in its JavaScript:
```html
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Check authentication
        checkAuthentication();
        // Update navigation based on user state
        updateNavigation();
    });
</script>
```

## Testing

### Test Page
A test page is available at `test-auth.html` to:
- Check current user status
- Test authentication checks
- Simulate login/logout scenarios

### Manual Testing
1. Open the website in an incognito/private browser window
2. Try to access `index.html` - should redirect to `welcome.html`
3. Click "Create Account" on welcome page to go to signup
4. Complete signup process
5. Verify access to protected pages
6. Logout and verify redirection to welcome page

## Customization

### Modifying Protected Pages
To add or remove pages from the protection list:
1. Edit `js/auth.js`
2. Modify the `protectedPages` array in the `checkAuthentication()` function

### Customizing Welcome Page
To modify the welcome page:
1. Edit `welcome.html`
2. Update content, styles, and buttons as needed

### Changing Redirection Behavior
To modify where unauthenticated users are redirected:
1. Edit `js/auth.js`
2. Change the redirect URL in the `checkAuthentication()` function

## Security Notes
- In a production environment, passwords should be properly hashed
- Additional security measures should be implemented (e.g., session timeouts, CSRF protection)
- The localStorage implementation is suitable for demonstration purposes only