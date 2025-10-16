// Site Configuration Manager
// This script applies admin-configured settings to the main website

document.addEventListener('DOMContentLoaded', function() {
    // Apply site design settings
    applySiteDesign();
});

function applySiteDesign() {
    // Apply logo
    const logoUrl = localStorage.getItem('siteLogo');
    if (logoUrl) {
        const logoElements = document.querySelectorAll('.header__logo img, .footer__logo img');
        logoElements.forEach(logo => {
            logo.src = logoUrl;
        });
    }
    
    // Apply colors
    const primaryColor = localStorage.getItem('primaryColor');
    const secondaryColor = localStorage.getItem('secondaryColor');
    
    if (primaryColor) {
        // Apply primary color to various elements
        applyPrimaryColor(primaryColor);
    }
    
    if (secondaryColor) {
        // Apply secondary color to various elements
        applySecondaryColor(secondaryColor);
    }
    
    // Apply footer text
    const footerText = localStorage.getItem('footerText');
    if (footerText) {
        const footerElements = document.querySelectorAll('.footer p');
        footerElements.forEach(footer => {
            footer.innerHTML = footerText;
        });
    }
    
    // Apply site title
    const siteTitle = localStorage.getItem('siteTitle');
    if (siteTitle) {
        document.title = siteTitle;
        // Update header title if exists
        const titleElements = document.querySelectorAll('title, .site-title');
        titleElements.forEach(el => {
            if (el.tagName === 'TITLE') {
                el.textContent = siteTitle;
            } else {
                el.textContent = siteTitle;
            }
        });
    }
}

function applyPrimaryColor(color) {
    // Apply to primary buttons
    const primaryButtons = document.querySelectorAll('.primary-btn, .site-btn');
    primaryButtons.forEach(button => {
        button.style.backgroundColor = color;
        button.style.borderColor = color;
    });
    
    // Apply to section titles
    const sectionTitles = document.querySelectorAll('.section-title h4, .section-title h5');
    sectionTitles.forEach(title => {
        title.style.color = color;
    });
    
    // Apply to other elements with primary color
    const style = document.createElement('style');
    style.innerHTML = `
        .header__menu ul li.active a,
        .header__menu ul li:hover a,
        .search-model-form button,
        .filter__controls li.active,
        .product__sidebar__view__item .view,
        .product__sidebar__view__item .ep,
        .product__item__pic .ep,
        .product__item__text ul li,
        .anime__details__widget ul li span,
        .anime__details__title .tag li,
        .anime__details__btn .follow-btn,
        .anime__review__item .anime__review__item__text h6,
        .blog__sidebar .follow__item .follow__links a:hover,
        .blog__sidebar .sidebar__item__title h4,
        .blog__sidebar .sidebar__item__title h5,
        .blog__details__tags a,
        .blog__details__share a:hover,
        .blog__details__btns .blog__details__btns__item .btn:hover,
        .blog__comment__item__text .blog__comment__item__text__top h5,
        .comment__btn,
        .contact__form button,
        .login__form button,
        .signup__form button {
            color: ${color} !important;
        }
        
        .set-bg:before,
        .product__item__pic .ep,
        .product__sidebar__view__item .ep,
        .product__sidebar__view__item .view,
        .anime__details__widget ul li span,
        .anime__details__title .tag li,
        .anime__details__btn .follow-btn,
        .blog__details__tags a,
        .comment__btn {
            border-color: ${color} !important;
        }
        
        /* Admin interface styling */
        .admin-btn,
        .admin-action-btn,
        .admin-table-actions .btn-edit,
        .admin-table-actions .btn-delete {
            background: ${color} !important;
        }
    `;
    document.head.appendChild(style);
}

function applySecondaryColor(color) {
    // Apply secondary color to various elements
    const style = document.createElement('style');
    style.innerHTML = `
        body,
        .header,
        .footer,
        .product__sidebar,
        .anime__details__content,
        .anime__details__review,
        .blog__sidebar,
        .blog__details__content,
        .login,
        .signup {
            background-color: ${color}10 !important; /* 10% opacity */
        }
        
        /* Admin interface styling */
        .admin-header,
        .admin-card,
        .admin-table,
        .admin-nav {
            background: ${color} !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize site configuration
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySiteDesign);
} else {
    applySiteDesign();
}