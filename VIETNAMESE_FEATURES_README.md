# Vietnamese Language and Theme Features

## Overview
This document describes the implementation of Vietnamese language support and light/dark theme switching features for the anime website.

## Features

### 1. Vietnamese Language Support
- Complete translation of all website content to Vietnamese
- Language switching capability (Vietnamese/English)
- Consistent terminology throughout the website

### 2. Theme Switching
- Dark mode (default) - Original website theme
- Light mode - Alternative theme with lighter colors
- Theme preference saved in localStorage

### 3. Language Switching
- Vietnamese (default) - Native language support
- English - Alternative language option
- Language preference saved in localStorage

## File Structure
```
.
├── welcome.html                      # Vietnamese welcome page with language/theme controls
├── signup.html                       # Vietnamese signup page
├── login.html                        # Vietnamese login page
├── profile.html                      # Vietnamese profile page
├── index.html                        # Vietnamese homepage with language/theme controls
├── VIETNAMESE_FEATURES_README.md     # This documentation

js/
├── auth.js                           # Updated authentication with Vietnamese messages
├── language-theme-manager.js         # Language and theme management system
```

## Implementation Details

### Language Support
All website pages have been translated to Vietnamese:
- Navigation menus
- Page titles and headings
- Form labels and placeholders
- Button text
- Error messages
- User interface elements

### Theme Switching
The theme switching feature allows users to toggle between:
- Dark mode (default): Original website theme with dark backgrounds
- Light mode: Alternative theme with lighter backgrounds and text

### Language Switching
Users can switch between:
- Vietnamese (default): Native language support
- English: Alternative language option

Note: In this implementation, the language switching is UI-only. In a full implementation, all text would dynamically change.

### Preference Storage
Both language and theme preferences are saved in localStorage:
- Language preference key: `language`
- Theme preference key: `theme`

## How It Works

### Theme Manager
The `LanguageThemeManager` class handles both language and theme functionality:

```javascript
class LanguageThemeManager {
    static init() {
        // Load saved preferences
        this.loadPreferences();
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    static loadPreferences() {
        // Load language preference
        const savedLanguage = localStorage.getItem('language') || 'vi';
        this.setLanguage(savedLanguage);
        
        // Load theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    }
    
    static setTheme(theme) {
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Apply theme
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            this.applyLightTheme();
        } else {
            document.body.classList.remove('light-mode');
            this.applyDarkTheme();
        }
    }
}
```

### UI Controls
Each page includes language and theme controls in the header:
```html
<!-- Language and Theme Controls -->
<div class="theme-toggle">
    <span>Giao diện:</span>
    <button class="theme-btn active" data-theme="dark">Tối</button>
    <button class="theme-btn" data-theme="light">Sáng</button>
</div>

<div class="language-switcher">
    <span>Ngôn ngữ:</span>
    <button class="language-btn active" data-lang="vi">VI</button>
    <button class="language-btn" data-lang="en">EN</button>
</div>
```

## Customization

### Adding New Languages
To add a new language:
1. Add a new button to the language switcher
2. Update the `setLanguage()` method in `language-theme-manager.js`
3. Translate all text content

### Adding New Themes
To add a new theme:
1. Add a new button to the theme toggle
2. Update the `setTheme()` method in `language-theme-manager.js`
3. Create CSS styles for the new theme

### Modifying Translations
To modify translations:
1. Edit the HTML files directly
2. Update the error messages in `auth.js`
3. Update the UI text in `language-theme-manager.js`

## Testing

### Manual Testing
1. Open the website in a browser
2. Verify all text is in Vietnamese
3. Click the "Sáng" button to switch to light mode
4. Click the "Tối" button to switch back to dark mode
5. Click the "EN" button to switch language (UI only in this implementation)
6. Refresh the page and verify preferences are saved

## Future Enhancements

### Full Language Implementation
- Implement dynamic text translation
- Add more languages (Chinese, Japanese, Korean, etc.)
- Create a translation management system

### Advanced Theme Features
- Custom color schemes
- Automatic theme switching based on time of day
- User-defined themes

### Accessibility Improvements
- High contrast themes
- Font size adjustment
- Screen reader optimization

## Technical Notes

### Browser Compatibility
The implementation uses modern JavaScript features:
- localStorage API
- classList API
- Arrow functions
- Template literals

### Performance Considerations
- Minimal JavaScript overhead
- Efficient DOM manipulation
- CSS-based theme switching

### Security Considerations
- Client-side preferences only
- No server-side implementation required
- localStorage usage is secure for preferences