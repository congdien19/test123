# Admin Redirect Behavior Change

## Overview
This document describes the change in admin user redirect behavior. Previously, when admin users logged in, they were automatically redirected to the admin dashboard. Now, admin users are redirected to the main website page, just like regular users.

## Change Details

### Before
- When admin users logged in, they were redirected to `./admin/index.html`
- This provided direct access to the admin dashboard

### After
- When admin users log in, they are redirected to `./index.html` (main website)
- Admin users can still access the admin dashboard through the profile page
- Admin users can access admin functions through the "QUẢN TRỊ" link in the header

## Implementation

### Modified File
- `js/auth.js` - Updated the `handleLoginForm` function

### Code Change
```javascript
// Before
if (user.isAdmin) {
    window.location.href = './admin/index.html';
} else {
    window.location.href = './index.html';
}

// After
// Redirect to homepage for all users (including admins)
window.location.href = './index.html';
```

## How It Works

### Login Process
1. User enters email and password
2. System authenticates credentials
3. If successful, user is redirected to `./index.html` regardless of admin status
4. Navigation is updated to show "QUẢN TRỊ" badge for admin users

### Admin Access
Admin users can still access admin functions:
1. Click on the "QUẢN TRỊ" badge in the header to go to the profile page
2. From the profile page, click on "Bảng Điều Khiển" to access the admin dashboard
3. Alternatively, access the admin dashboard directly at `./admin/index.html`

## Benefits

### Consistent User Experience
- All users follow the same login flow
- Admin users see the same website as regular users
- Reduced confusion about where users are directed after login

### Simplified Navigation
- Admin functions are accessible through the profile page
- Clear indication of admin status through the "QUẢN TRỊ" badge
- Maintains all admin functionality while improving user experience

## Testing

### Manual Testing
1. Log in with admin credentials:
   - Email: admin@example.com
   - Password: admin123
2. Verify that you are redirected to the main website (`index.html`)
3. Check that the header shows the "QUẢN TRỊ" badge
4. Click on the "QUẢN TRỊ" badge to access the profile page
5. Verify that admin functions are available on the profile page

### Test Page
A test page is available at `test-admin-redirect.html` to:
- Check current user status
- Simulate admin login
- Clear current user

## Reverting the Change
To revert to the previous behavior:
1. Edit `js/auth.js`
2. Modify the `handleLoginForm` function to restore the previous redirect logic:
```javascript
if (user.isAdmin) {
    window.location.href = './admin/index.html';
} else {
    window.location.href = './index.html';
}
```

## Security Notes
- This change does not affect security as admin users still have the same access rights
- Admin functions are still protected and accessible only to authenticated admin users
- The change only affects the initial redirect after login, not the actual permissions