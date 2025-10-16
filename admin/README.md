# Admin Panel Documentation

## Overview
This admin panel provides management capabilities for the Anime website. It allows administrators to manage users, content, and site settings.

## Default Admin Credentials
- **Email**: admin@example.com
- **Password**: admin123

## Features

### Dashboard
- Overview of site statistics
- Total user count
- Content counts (anime, categories, blog posts)

### User Management
- View all registered users
- Delete users (except admin)
- Identify user roles (admin/user)

### Content Management
- Manage anime entries
- Manage categories
- Manage blog posts

### Settings
- Update admin account settings
- Change password
- Update email

## Access Control
- Only users with admin privileges can access the admin panel
- Regular users will be redirected to the login page if they try to access admin URLs
- Admin users are automatically redirected to the admin dashboard after login

## Technical Implementation
- Built with HTML, CSS, and JavaScript
- Uses localStorage for data persistence
- Integrated with the existing authentication system
- Responsive design for different screen sizes

## Security Notes
- In a production environment, passwords should be properly hashed
- Admin credentials should be changed immediately after deployment
- Additional security measures should be implemented (e.g., session timeouts, CSRF protection)

## File Structure
```
admin/
├── index.html          # Admin dashboard main page
├── README.md           # This documentation file
├── test-admin.html     # Test page for admin account
```

## CSS Files
- `css/admin-dashboard.css` - Styles for the admin dashboard

## JavaScript Files
- `js/admin-dashboard.js` - Admin dashboard functionality
- `js/auth.js` - Authentication system (shared with main site)

## Navigation Integration
- Admin users see "Admin Dashboard" in the header navigation
- Regular users see their name in the header navigation
- Guest users see the login icon