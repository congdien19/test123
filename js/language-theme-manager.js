// Language and Theme Manager

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
    
    static setLanguage(lang) {
        // Save to localStorage
        localStorage.setItem('language', lang);
        
        // Update UI
        const languageButtons = document.querySelectorAll('.language-btn');
        languageButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-lang') === lang) {
                button.classList.add('active');
            }
        });
        
        // In a full implementation, this would change all text on the page
        console.log(`Language set to: ${lang}`);
    }
    
    static setTheme(theme) {
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Update UI
        const themeButtons = document.querySelectorAll('.theme-btn');
        themeButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-theme') === theme) {
                button.classList.add('active');
            }
        });
        
        // Apply theme
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            this.applyLightTheme();
        } else {
            document.body.classList.remove('light-mode');
            this.applyDarkTheme();
        }
        
        console.log(`Theme set to: ${theme}`);
    }
    
    static applyLightTheme() {
        // Create or update style element for light theme
        let style = document.getElementById('theme-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'theme-style';
            document.head.appendChild(style);
        }
        
        // Light theme CSS
        style.innerHTML = `
            body.light-mode {
                background-color: #f5f5f5;
                color: #333;
            }
            
            body.light-mode .header {
                background-color: #fff;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            
            body.light-mode .footer {
                background-color: #eee;
                color: #333;
            }
            
            body.light-mode .product__item {
                background-color: #fff;
            }
            
            body.light-mode .section-title h4 {
                color: #e53637;
            }
            
            body.light-mode .product__item__text h5 a {
                color: #333;
            }
            
            body.light-mode .product__item__text h5 a:hover {
                color: #e53637;
            }
            
            body.light-mode .header__menu ul li a {
                color: #333;
            }
            
            body.light-mode .header__menu ul li a:hover {
                color: #e53637;
            }
            
            body.light-mode .welcome-section {
                background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('img/normal-breadcrumb.jpg');
                color: #333;
            }
            
            body.light-mode .welcome-btn {
                background: #e53637;
                color: white;
            }
            
            body.light-mode .welcome-btn.secondary {
                background: transparent;
                border: 2px solid #333;
                color: #333;
            }
            
            body.light-mode .feature {
                background: rgba(255, 255, 255, 0.8);
                color: #333;
            }
            
            body.light-mode .feature i {
                color: #e53637;
            }
        `;
    }
    
    static applyDarkTheme() {
        // Remove light theme styles
        const style = document.getElementById('theme-style');
        if (style) {
            style.innerHTML = '';
        }
    }
    
    static setupEventListeners() {
        // Language switching
        const languageButtons = document.querySelectorAll('.language-btn');
        languageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
        
        // Theme switching
        const themeButtons = document.querySelectorAll('.theme-btn');
        themeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const theme = e.target.getAttribute('data-theme');
                this.setTheme(theme);
            });
        });
    }
    
    static translate(key) {
        // In a full implementation, this would return translated text
        // For now, we'll just return the key
        return key;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    LanguageThemeManager.init();
});