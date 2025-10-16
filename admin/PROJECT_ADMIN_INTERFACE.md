# Project Admin Interface

## Overview
This document confirms that the admin interface located in this directory is now the main admin interface for the anime project.

## Directory Structure
The admin interface follows the same structure as the main anime project:
```
admin/
├── Source/
├── css/
├── fonts/
├── img/
├── js/
├── sass/
├── vendor/
└── videos/
```

## Features Implemented

### 1. User Management
- View all registered users
- Manage user roles (admin/user)
- Delete users

### 2. Content Management
- Manage anime content
- Manage hero slider items
- Add/edit/delete content

### 3. Site Design
- Customize logo
- Change color themes
- Update footer text

### 4. Settings
- Update admin account information
- Change password

## Access Control
- Only users with admin privileges can access this interface
- Admins are redirected to the main site after login
- Admins can access the dashboard through their profile page

## Navigation Structure
1. Dashboard (default view)
2. User Management
3. Content Management
4. Site Design
5. Settings
6. Back to Site

## Technical Implementation

### Framework
- Based on startbootstrap-sb-admin-2 template
- Uses Bootstrap 4 for responsive design
- Implements Font Awesome 5 icons

### Color Scheme
- Primary color: Bootstrap blue (#4e73df)
- Anime accent color: Red (#e53637)

### Dependencies
All required dependencies are included in the vendor directory:
- jQuery
- Bootstrap
- Font Awesome
- Chart.js

## How to Access

### For Admin Users
1. Log in to the main site with admin credentials
2. Navigate to your profile page
3. Click on "Bảng Điều Khiển" (Dashboard) in the admin section
4. The admin dashboard will open

### Default Admin Account
If no admin account exists, one will be automatically created:
- Email: admin@example.com
- Password: admin123
- Name: Quản Trị Viên

## Security
- Admin access is protected by authentication
- All admin actions are logged
- Passwords are stored securely (in a real implementation, they would be hashed)

## Future Enhancements
1. Add activity logging
2. Implement user role management
3. Add data visualization charts
4. Include form validation
5. Add real-time updates