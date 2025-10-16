// Admin Dashboard JavaScript Functionality

class AdminDashboard {
    constructor() {
        this.animeData = JSON.parse(localStorage.getItem('animeData')) || this.getDefaultAnimeData();
        this.userData = JSON.parse(localStorage.getItem('users')) || this.getDefaultUserData();
        this.sliderData = JSON.parse(localStorage.getItem('sliderData')) || this.getDefaultSliderData();
        this.themeSettings = JSON.parse(localStorage.getItem('themeSettings')) || this.getDefaultThemeSettings();
        this.languageSettings = JSON.parse(localStorage.getItem('languageSettings')) || this.getDefaultLanguageSettings();
        this.init();
    }
    
    getDefaultAnimeData() {
        return [
            {
                id: 1,
                title: 'The Seven Deadly Sins: Wrath of the Gods',
                category: 'Hành Động',
                episodes: 18,
                image: 'img/trending/trend-1.jpg',
                description: 'Một nhóm hiệp sĩ chống lại các thế lực hắc ám.'
            },
            {
                id: 2,
                title: 'Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien',
                category: 'Hài Hước',
                episodes: 18,
                image: 'img/trending/trend-2.jpg',
                description: 'Bộ phim kết thúc của series Gintama.'
            },
            {
                id: 3,
                title: 'Shingeki no Kyojin Season 3 Part 2',
                category: 'Hành Động',
                episodes: 18,
                image: 'img/trending/trend-3.jpg',
                description: 'Phần tiếp theo của mùa 3 về cuộc chiến với người khổng lồ.'
            },
            {
                id: 4,
                title: 'Fullmetal Alchemist: Brotherhood',
                category: 'Phiêu Lưu',
                episodes: 18,
                image: 'img/trending/trend-4.jpg',
                description: 'Câu chuyện về hai anh em tìm đá philosopher.'
            }
        ];
    }
    
    getDefaultUserData() {
        return [
            {
                id: 1,
                name: 'Admin',
                email: 'admin@example.com',
                password: 'admin123',
                isAdmin: true,
                joinDate: '2023-01-01'
            },
            {
                id: 2,
                name: 'Nguyễn Văn A',
                email: 'nguyenvana@example.com',
                password: 'password123',
                isAdmin: false,
                joinDate: '2023-01-15'
            },
            {
                id: 3,
                name: 'Trần Thị B',
                email: 'tranthib@example.com',
                password: 'password123',
                isAdmin: false,
                joinDate: '2023-02-20'
            }
        ];
    }
    
    getDefaultSliderData() {
        return [
            {
                id: 1,
                title: 'Fate / Stay Night: Unlimited Blade Works',
                category: 'Phiêu Lưu',
                description: 'Sau 30 ngày du hành khắp thế giới...',
                image: 'img/hero/hero-1.jpg',
                link: '#'
            },
            {
                id: 2,
                title: 'Attack on Titan: Final Season',
                category: 'Hành Động',
                description: 'Cuộc chiến cuối cùng giữa nhân loại và người khổng lồ...',
                image: 'img/hero/hero-2.jpg',
                link: '#'
            },
            {
                id: 3,
                title: 'Demon Slayer: Entertainment District Arc',
                category: 'Siêu Nhiên',
                description: 'Tanjiro và đồng đội đối mặt với các ác quỷ mạnh nhất...',
                image: 'img/hero/hero-3.jpg',
                link: '#'
            }
        ];
    }
    
    getDefaultThemeSettings() {
        return {
            darkMode: true,
            customColors: {
                primary: '#e53637',
                secondary: '#0b0c2a'
            }
        };
    }
    
    getDefaultLanguageSettings() {
        return {
            defaultLanguage: 'vi',
            supportedLanguages: ['vi', 'en']
        };
    }
    
    init() {
        // Initialize all dashboard components
        this.initEventListeners();
        this.loadDashboardData();
        this.initFormHandlers();
        this.loadDesignSettings();
        this.loadThemeSettings();
        this.loadLanguageSettings();
    }
    
    initEventListeners() {
        // Navigation handling
        const navLinks = document.querySelectorAll('.admin-nav a[data-section]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(e.target.getAttribute('data-section'));
            });
        });
        
        // Form submission handling
        const animeForm = document.getElementById('anime-form');
        if (animeForm) {
            animeForm.addEventListener('submit', (e) => this.handleAnimeSubmit(e));
        }
        
        const designForm = document.getElementById('design-form');
        if (designForm) {
            designForm.addEventListener('submit', (e) => this.handleDesignSubmit(e));
        }
        
        const settingsForm = document.getElementById('settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => this.handleSettingsSubmit(e));
        }
        
        const userForm = document.getElementById('user-form');
        if (userForm) {
            userForm.addEventListener('submit', (e) => this.handleUserSubmit(e));
        }
        
        const sliderForm = document.getElementById('slider-form');
        if (sliderForm) {
            sliderForm.addEventListener('submit', (e) => this.handleSliderSubmit(e));
        }
        
        const themeForm = document.getElementById('theme-form');
        if (themeForm) {
            themeForm.addEventListener('submit', (e) => this.handleThemeSubmit(e));
        }
        
        const languageForm = document.getElementById('language-form');
        if (languageForm) {
            languageForm.addEventListener('submit', (e) => this.handleLanguageSubmit(e));
        }
    }
    
    switchSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Update active nav link
        document.querySelectorAll('.admin-nav a').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`.admin-nav a[data-section="${sectionId}"]`).classList.add('active');
        
        // Load data for the section if needed
        switch(sectionId) {
            case 'content':
                this.loadContentData();
                break;
            case 'users':
                this.loadUserData();
                break;
            case 'site-design':
                this.loadDesignSettings();
                break;
            case 'slider':
                this.loadSliderData();
                break;
            case 'themes':
                this.loadThemeSettings();
                break;
            case 'languages':
                this.loadLanguageSettings();
                break;
        }
    }
    
    loadDashboardData() {
        // Load dashboard statistics
        this.updateStats();
        
        // Load recent activity
        this.loadRecentActivity();
    }
    
    updateStats() {
        // Load stats
        document.getElementById('total-anime').textContent = this.animeData.length;
        document.getElementById('total-users').textContent = this.userData.length;
        document.getElementById('total-views').textContent = localStorage.getItem('viewCount') || '45,621';
        document.getElementById('total-comments').textContent = localStorage.getItem('commentCount') || '892';
    }
    
    loadRecentActivity() {
        // This would load recent activity from the server
        // For now, we'll leave the sample data in the HTML
    }
    
    loadContentData() {
        // Load anime data for the content management section
        this.loadAnimeList();
    }
    
    loadAnimeList() {
        // In a real implementation, this would fetch anime data from the server
        // For now, we'll use sample data
        const animeListElement = document.getElementById('anime-list');
        if (!animeListElement) return;
        
        // Clear existing content
        animeListElement.innerHTML = '';
        
        // Load anime data
        this.animeData.forEach(anime => {
            const row = this.createAnimeRow(anime);
            animeListElement.appendChild(row);
        });
    }
    
    createAnimeRow(anime) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${anime.title}</td>
            <td>${anime.category}</td>
            <td>${anime.episodes}</td>
            <td class="admin-table-actions">
                <a href="#" class="btn-edit" data-id="${anime.id}">Sửa</a>
                <a href="#" class="btn-delete" data-id="${anime.id}">Xóa</a>
            </td>
        `;
        
        // Add event listeners for edit and delete buttons
        row.querySelector('.btn-edit').addEventListener('click', (e) => {
            e.preventDefault();
            this.editAnime(anime.id);
        });
        
        row.querySelector('.btn-delete').addEventListener('click', (e) => {
            e.preventDefault();
            this.deleteAnime(anime.id);
        });
        
        return row;
    }
    
    loadUserData() {
        // Load user data for the user management section
        this.loadUserList();
    }
    
    loadUserList() {
        const userListElement = document.getElementById('user-list');
        if (!userListElement) return;
        
        // Clear existing content
        userListElement.innerHTML = '';
        
        // Load user data
        this.userData.forEach(user => {
            const row = this.createUserRow(user);
            userListElement.appendChild(row);
        });
    }
    
    createUserRow(user) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.isAdmin ? 'Quản trị' : 'Người dùng'}</td>
            <td>${user.joinDate}</td>
            <td class="admin-table-actions">
                <a href="#" class="btn-edit" data-id="${user.id}">Sửa</a>
                <a href="#" class="btn-delete" data-id="${user.id}">Xóa</a>
            </td>
        `;
        
        // Add event listeners for edit and delete buttons
        row.querySelector('.btn-edit').addEventListener('click', (e) => {
            e.preventDefault();
            this.editUser(user.id);
        });
        
        row.querySelector('.btn-delete').addEventListener('click', (e) => {
            e.preventDefault();
            this.deleteUser(user.id);
        });
        
        return row;
    }
    
    loadSliderData() {
        // Load slider data for the slider management section
        this.loadSliderList();
    }
    
    loadSliderList() {
        const sliderListElement = document.getElementById('slider-list');
        if (!sliderListElement) return;
        
        // Clear existing content
        sliderListElement.innerHTML = '';
        
        // Load slider data
        this.sliderData.forEach(slider => {
            const row = this.createSliderRow(slider);
            sliderListElement.appendChild(row);
        });
    }
    
    createSliderRow(slider) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${slider.title}</td>
            <td>${slider.category}</td>
            <td><img src="${slider.image}" alt="Slider Image" style="width: 50px; height: auto;"></td>
            <td class="admin-table-actions">
                <a href="#" class="btn-edit" data-id="${slider.id}">Sửa</a>
                <a href="#" class="btn-delete" data-id="${slider.id}">Xóa</a>
            </td>
        `;
        
        // Add event listeners for edit and delete buttons
        row.querySelector('.btn-edit').addEventListener('click', (e) => {
            e.preventDefault();
            this.editSlider(slider.id);
        });
        
        row.querySelector('.btn-delete').addEventListener('click', (e) => {
            e.preventDefault();
            this.deleteSlider(slider.id);
        });
        
        return row;
    }
    
    loadThemeSettings() {
        // Load existing theme settings into the form
        const themeForm = document.getElementById('theme-form');
        if (!themeForm) return;
        
        document.getElementById('dark-mode').checked = this.themeSettings.darkMode;
        document.getElementById('theme-primary-color').value = this.themeSettings.customColors.primary;
        document.getElementById('theme-secondary-color').value = this.themeSettings.customColors.secondary;
    }
    
    loadLanguageSettings() {
        // Load existing language settings into the form
        const languageForm = document.getElementById('language-form');
        if (!languageForm) return;
        
        document.getElementById('default-language').value = this.languageSettings.defaultLanguage;
        
        // Load supported languages
        const supportedLanguagesContainer = document.getElementById('supported-languages');
        if (supportedLanguagesContainer) {
            supportedLanguagesContainer.innerHTML = '';
            this.languageSettings.supportedLanguages.forEach(lang => {
                const langElement = document.createElement('div');
                langElement.className = 'language-item';
                langElement.innerHTML = `
                    <label>
                        <input type="checkbox" name="supportedLanguages" value="${lang}" ${lang === this.languageSettings.defaultLanguage ? 'checked' : ''}>
                        ${lang === 'vi' ? 'Tiếng Việt' : 'English'}
                    </label>
                `;
                supportedLanguagesContainer.appendChild(langElement);
            });
        }
    }
    
    initFormHandlers() {
        // Anime form handler
        const animeForm = document.getElementById('anime-form');
        if (animeForm) {
            animeForm.addEventListener('submit', (e) => this.handleAnimeSubmit(e));
        }
        
        // Design form handler
        const designForm = document.getElementById('design-form');
        if (designForm) {
            designForm.addEventListener('submit', (e) => this.handleDesignSubmit(e));
        }
        
        // Settings form handler
        const settingsForm = document.getElementById('settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => this.handleSettingsSubmit(e));
        }
        
        // User form handler
        const userForm = document.getElementById('user-form');
        if (userForm) {
            userForm.addEventListener('submit', (e) => this.handleUserSubmit(e));
        }
        
        // Slider form handler
        const sliderForm = document.getElementById('slider-form');
        if (sliderForm) {
            sliderForm.addEventListener('submit', (e) => this.handleSliderSubmit(e));
        }
        
        // Theme form handler
        const themeForm = document.getElementById('theme-form');
        if (themeForm) {
            themeForm.addEventListener('submit', (e) => this.handleThemeSubmit(e));
        }
        
        // Language form handler
        const languageForm = document.getElementById('language-form');
        if (languageForm) {
            languageForm.addEventListener('submit', (e) => this.handleLanguageSubmit(e));
        }
    }
    
    handleAnimeSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const animeData = {
            id: Date.now(), // Simple ID generation
            title: formData.get('title'),
            category: formData.get('category'),
            episodes: parseInt(formData.get('episodes')),
            image: formData.get('image'),
            description: formData.get('description')
        };
        
        // Validate required fields
        if (!animeData.title || !animeData.category || !animeData.episodes) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }
        
        // Save anime data
        this.saveAnime(animeData);
        
        // Reset form
        e.target.reset();
        
        // Show success message
        alert('Anime đã được thêm thành công!');
        
        // Refresh anime list
        this.loadAnimeList();
    }
    
    saveAnime(animeData) {
        // Add to anime data
        this.animeData.push(animeData);
        
        // Save to localStorage
        localStorage.setItem('animeData', JSON.stringify(this.animeData));
        
        // Update anime count
        document.getElementById('total-anime').textContent = this.animeData.length;
    }
    
    editAnime(animeId) {
        // Find the anime to edit
        const anime = this.animeData.find(item => item.id == animeId);
        if (!anime) {
            alert('Không tìm thấy anime để chỉnh sửa!');
            return;
        }
        
        // Populate the form with anime data
        document.getElementById('anime-title').value = anime.title;
        document.getElementById('anime-category').value = anime.category;
        document.getElementById('anime-episodes').value = anime.episodes;
        document.getElementById('anime-image').value = anime.image;
        document.getElementById('anime-description').value = anime.description;
        
        // Change submit button to update mode
        const form = document.getElementById('anime-form');
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Cập Nhật Anime';
        
        // Add a hidden field to track edit mode
        let editIdField = document.getElementById('edit-anime-id');
        if (!editIdField) {
            editIdField = document.createElement('input');
            editIdField.type = 'hidden';
            editIdField.id = 'edit-anime-id';
            form.appendChild(editIdField);
        }
        editIdField.value = animeId;
        
        // Change form submit handler for update
        form.removeEventListener('submit', (e) => this.handleAnimeSubmit(e));
        form.addEventListener('submit', (e) => this.handleAnimeUpdate(e));
        
        // Scroll to the form
        document.getElementById('content').scrollIntoView();
    }
    
    handleAnimeUpdate(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const animeId = document.getElementById('edit-anime-id').value;
        
        const updatedAnime = {
            id: parseInt(animeId),
            title: formData.get('title'),
            category: formData.get('category'),
            episodes: parseInt(formData.get('episodes')),
            image: formData.get('image'),
            description: formData.get('description')
        };
        
        // Validate required fields
        if (!updatedAnime.title || !updatedAnime.category || !updatedAnime.episodes) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }
        
        // Update anime data
        this.updateAnime(updatedAnime);
        
        // Reset form
        e.target.reset();
        
        // Restore submit button
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.textContent = 'Thêm Anime';
        
        // Remove edit mode
        const editIdField = document.getElementById('edit-anime-id');
        if (editIdField) {
            editIdField.remove();
        }
        
        // Restore original submit handler
        e.target.removeEventListener('submit', (e) => this.handleAnimeUpdate(e));
        e.target.addEventListener('submit', (e) => this.handleAnimeSubmit(e));
        
        // Show success message
        alert('Anime đã được cập nhật thành công!');
        
        // Refresh anime list
        this.loadAnimeList();
    }
    
    updateAnime(updatedAnime) {
        // Find and update the anime
        const index = this.animeData.findIndex(item => item.id === updatedAnime.id);
        if (index !== -1) {
            this.animeData[index] = updatedAnime;
            
            // Save to localStorage
            localStorage.setItem('animeData', JSON.stringify(this.animeData));
        }
    }
    
    deleteAnime(animeId) {
        if (confirm('Bạn có chắc chắn muốn xóa anime này?')) {
            // Remove from anime data
            this.animeData = this.animeData.filter(item => item.id != animeId);
            
            // Save to localStorage
            localStorage.setItem('animeData', JSON.stringify(this.animeData));
            
            // Update anime count
            document.getElementById('total-anime').textContent = this.animeData.length;
            
            // Refresh anime list
            this.loadAnimeList();
            
            // Show success message
            alert('Anime đã được xóa thành công!');
        }
    }
    
    handleUserSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const userData = {
            id: Date.now(), // Simple ID generation
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            isAdmin: formData.get('role') === 'admin',
            joinDate: new Date().toISOString().split('T')[0]
        };
        
        // Validate required fields
        if (!userData.name || !userData.email || !userData.password) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }
        
        // Check if email already exists
        if (this.userData.some(user => user.email === userData.email)) {
            alert('Email này đã được sử dụng!');
            return;
        }
        
        // Save user data
        this.saveUser(userData);
        
        // Reset form
        e.target.reset();
        
        // Show success message
        alert('Người dùng đã được thêm thành công!');
        
        // Refresh user list
        this.loadUserList();
    }
    
    saveUser(userData) {
        // Add to user data
        this.userData.push(userData);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(this.userData));
        
        // Update user count
        document.getElementById('total-users').textContent = this.userData.length;
    }
    
    editUser(userId) {
        // Find the user to edit
        const user = this.userData.find(item => item.id == userId);
        if (!user) {
            alert('Không tìm thấy người dùng để chỉnh sửa!');
            return;
        }
        
        // Populate the form with user data
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-email').value = user.email;
        // Note: We don't populate password for security reasons
        document.getElementById('user-role').value = user.isAdmin ? 'admin' : 'user';
        
        // Change submit button to update mode
        const form = document.getElementById('user-form');
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Cập Nhật Người Dùng';
        
        // Add a hidden field to track edit mode
        let editIdField = document.getElementById('edit-user-id');
        if (!editIdField) {
            editIdField = document.createElement('input');
            editIdField.type = 'hidden';
            editIdField.id = 'edit-user-id';
            form.appendChild(editIdField);
        }
        editIdField.value = userId;
        
        // Change form submit handler for update
        form.removeEventListener('submit', (e) => this.handleUserSubmit(e));
        form.addEventListener('submit', (e) => this.handleUserUpdate(e));
        
        // Scroll to the form
        document.getElementById('users').scrollIntoView();
    }
    
    handleUserUpdate(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const userId = document.getElementById('edit-user-id').value;
        
        const updatedUser = {
            id: parseInt(userId),
            name: formData.get('name'),
            email: formData.get('email'),
            // Only update password if provided
            password: formData.get('password') || undefined,
            isAdmin: formData.get('role') === 'admin',
            joinDate: formData.get('join-date') || new Date().toISOString().split('T')[0]
        };
        
        // Validate required fields
        if (!updatedUser.name || !updatedUser.email) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }
        
        // Check if email already exists (excluding current user)
        if (this.userData.some(user => user.email === updatedUser.email && user.id != userId)) {
            alert('Email này đã được sử dụng!');
            return;
        }
        
        // Update user data
        this.updateUser(updatedUser);
        
        // Reset form
        e.target.reset();
        
        // Restore submit button
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.textContent = 'Thêm Người Dùng';
        
        // Remove edit mode
        const editIdField = document.getElementById('edit-user-id');
        if (editIdField) {
            editIdField.remove();
        }
        
        // Restore original submit handler
        e.target.removeEventListener('submit', (e) => this.handleUserUpdate(e));
        e.target.addEventListener('submit', (e) => this.handleUserSubmit(e));
        
        // Show success message
        alert('Người dùng đã được cập nhật thành công!');
        
        // Refresh user list
        this.loadUserList();
    }
    
    updateUser(updatedUser) {
        // Find and update the user
        const index = this.userData.findIndex(item => item.id === updatedUser.id);
        if (index !== -1) {
            // If password is not provided, keep the existing one
            if (!updatedUser.password) {
                updatedUser.password = this.userData[index].password;
            }
            
            this.userData[index] = updatedUser;
            
            // Save to localStorage
            localStorage.setItem('users', JSON.stringify(this.userData));
        }
    }
    
    deleteUser(userId) {
        // Prevent deleting the current admin user
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.id == userId) {
            alert('Bạn không thể xóa tài khoản đang đăng nhập!');
            return;
        }
        
        if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            // Remove from user data
            this.userData = this.userData.filter(item => item.id != userId);
            
            // Save to localStorage
            localStorage.setItem('users', JSON.stringify(this.userData));
            
            // Update user count
            document.getElementById('total-users').textContent = this.userData.length;
            
            // Refresh user list
            this.loadUserList();
            
            // Show success message
            alert('Người dùng đã được xóa thành công!');
        }
    }
    
    handleSliderSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const sliderData = {
            id: Date.now(), // Simple ID generation
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            image: formData.get('image'),
            link: formData.get('link')
        };
        
        // Validate required fields
        if (!sliderData.title || !sliderData.category || !sliderData.image) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }
        
        // Save slider data
        this.saveSlider(sliderData);
        
        // Reset form
        e.target.reset();
        
        // Show success message
        alert('Slider item đã được thêm thành công!');
        
        // Refresh slider list
        this.loadSliderList();
    }
    
    saveSlider(sliderData) {
        // Add to slider data
        this.sliderData.push(sliderData);
        
        // Save to localStorage
        localStorage.setItem('sliderData', JSON.stringify(this.sliderData));
    }
    
    editSlider(sliderId) {
        // Find the slider item to edit
        const slider = this.sliderData.find(item => item.id == sliderId);
        if (!slider) {
            alert('Không tìm thấy slider item để chỉnh sửa!');
            return;
        }
        
        // Populate the form with slider data
        document.getElementById('slider-title').value = slider.title;
        document.getElementById('slider-category').value = slider.category;
        document.getElementById('slider-description').value = slider.description;
        document.getElementById('slider-image').value = slider.image;
        document.getElementById('slider-link').value = slider.link;
        
        // Change submit button to update mode
        const form = document.getElementById('slider-form');
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Cập Nhật Slider';
        
        // Add a hidden field to track edit mode
        let editIdField = document.getElementById('edit-slider-id');
        if (!editIdField) {
            editIdField = document.createElement('input');
            editIdField.type = 'hidden';
            editIdField.id = 'edit-slider-id';
            form.appendChild(editIdField);
        }
        editIdField.value = sliderId;
        
        // Change form submit handler for update
        form.removeEventListener('submit', (e) => this.handleSliderSubmit(e));
        form.addEventListener('submit', (e) => this.handleSliderUpdate(e));
        
        // Scroll to the form
        document.getElementById('slider').scrollIntoView();
    }
    
    handleSliderUpdate(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const sliderId = document.getElementById('edit-slider-id').value;
        
        const updatedSlider = {
            id: parseInt(sliderId),
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            image: formData.get('image'),
            link: formData.get('link')
        };
        
        // Validate required fields
        if (!updatedSlider.title || !updatedSlider.category || !updatedSlider.image) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }
        
        // Update slider data
        this.updateSlider(updatedSlider);
        
        // Reset form
        e.target.reset();
        
        // Restore submit button
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.textContent = 'Thêm Slider Item';
        
        // Remove edit mode
        const editIdField = document.getElementById('edit-slider-id');
        if (editIdField) {
            editIdField.remove();
        }
        
        // Restore original submit handler
        e.target.removeEventListener('submit', (e) => this.handleSliderUpdate(e));
        e.target.addEventListener('submit', (e) => this.handleSliderSubmit(e));
        
        // Show success message
        alert('Slider item đã được cập nhật thành công!');
        
        // Refresh slider list
        this.loadSliderList();
    }
    
    updateSlider(updatedSlider) {
        // Find and update the slider item
        const index = this.sliderData.findIndex(item => item.id === updatedSlider.id);
        if (index !== -1) {
            this.sliderData[index] = updatedSlider;
            
            // Save to localStorage
            localStorage.setItem('sliderData', JSON.stringify(this.sliderData));
        }
    }
    
    deleteSlider(sliderId) {
        if (confirm('Bạn có chắc chắn muốn xóa slider item này?')) {
            // Remove from slider data
            this.sliderData = this.sliderData.filter(item => item.id != sliderId);
            
            // Save to localStorage
            localStorage.setItem('sliderData', JSON.stringify(this.sliderData));
            
            // Refresh slider list
            this.loadSliderList();
            
            // Show success message
            alert('Slider item đã được xóa thành công!');
        }
    }
    
    handleThemeSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const darkMode = document.getElementById('dark-mode').checked;
        const primaryColor = document.getElementById('theme-primary-color').value;
        const secondaryColor = document.getElementById('theme-secondary-color').value;
        
        const themeSettings = {
            darkMode: darkMode,
            customColors: {
                primary: primaryColor,
                secondary: secondaryColor
            }
        };
        
        // Save theme settings
        this.saveThemeSettings(themeSettings);
        
        // Show success message
        alert('Cài đặt giao diện đã được lưu thành công!');
        
        // Apply changes to preview
        this.applyThemePreview(themeSettings);
    }
    
    saveThemeSettings(themeSettings) {
        // Save theme settings to localStorage
        localStorage.setItem('themeSettings', JSON.stringify(themeSettings));
        this.themeSettings = themeSettings;
        
        // Apply theme changes immediately
        this.applyThemeChanges(themeSettings);
    }
    
    applyThemePreview(themeSettings) {
        // Apply preview changes to the admin interface
        if (themeSettings.customColors.primary) {
            document.documentElement.style.setProperty('--primary-color', themeSettings.customColors.primary);
        }
        
        if (themeSettings.customColors.secondary) {
            document.documentElement.style.setProperty('--secondary-color', themeSettings.customColors.secondary);
        }
    }
    
    applyThemeChanges(themeSettings) {
        // This function would apply the theme changes to the admin interface
        // In a real implementation, this would also send a message to update the main site
        console.log('Theme changes applied:', themeSettings);
    }
    
    handleLanguageSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const defaultLanguage = document.getElementById('default-language').value;
        const supportedLanguages = Array.from(document.querySelectorAll('input[name="supportedLanguages"]:checked'))
            .map(checkbox => checkbox.value);
        
        const languageSettings = {
            defaultLanguage: defaultLanguage,
            supportedLanguages: supportedLanguages
        };
        
        // Save language settings
        this.saveLanguageSettings(languageSettings);
        
        // Show success message
        alert('Cài đặt ngôn ngữ đã được lưu thành công!');
    }
    
    saveLanguageSettings(languageSettings) {
        // Save language settings to localStorage
        localStorage.setItem('languageSettings', JSON.stringify(languageSettings));
        this.languageSettings = languageSettings;
        
        // Apply language changes
        this.applyLanguageChanges(languageSettings);
    }
    
    applyLanguageChanges(languageSettings) {
        // This function would apply the language changes
        console.log('Language settings applied:', languageSettings);
    }
    
    loadDesignSettings() {
        // Load existing design settings into the form
        const designForm = document.getElementById('design-form');
        if (!designForm) return;
        
        document.getElementById('site-logo').value = localStorage.getItem('siteLogo') || '';
        document.getElementById('primary-color').value = localStorage.getItem('primaryColor') || '#e53637';
        document.getElementById('secondary-color').value = localStorage.getItem('secondaryColor') || '#0b0c2a';
        document.getElementById('footer-text').value = localStorage.getItem('footerText') || '';
    }
    
    handleDesignSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const designData = {
            logo: formData.get('logo'),
            primaryColor: formData.get('primaryColor'),
            secondaryColor: formData.get('secondaryColor'),
            footerText: formData.get('footerText')
        };
        
        // Save design data
        this.saveDesign(designData);
        
        // Show success message
        alert('Thiết kế trang web đã được cập nhật thành công!');
        
        // Apply changes to preview
        this.applyDesignPreview(designData);
    }
    
    saveDesign(designData) {
        // Save design settings to localStorage
        localStorage.setItem('siteLogo', designData.logo);
        localStorage.setItem('primaryColor', designData.primaryColor);
        localStorage.setItem('secondaryColor', designData.secondaryColor);
        localStorage.setItem('footerText', designData.footerText);
        
        // Apply design changes immediately
        this.applyDesignChanges(designData);
    }
    
    applyDesignPreview(designData) {
        // Apply preview changes to the admin interface
        if (designData.primaryColor) {
            document.documentElement.style.setProperty('--primary-color', designData.primaryColor);
        }
        
        if (designData.secondaryColor) {
            document.documentElement.style.setProperty('--secondary-color', designData.secondaryColor);
        }
    }
    
    applyDesignChanges(designData) {
        // This function would apply the design changes to the admin interface
        // In a real implementation, this would also send a message to update the main site
        console.log('Design changes applied:', designData);
    }
    
    handleSettingsSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const settingsData = {
            siteTitle: formData.get('siteTitle'),
            siteDescription: formData.get('siteDescription'),
            maintenanceMode: formData.get('maintenanceMode') === 'on'
        };
        
        // Save settings data
        this.saveSettings(settingsData);
        
        // Show success message
        alert('Cài đặt đã được lưu thành công!');
    }
    
    saveSettings(settingsData) {
        // Save settings to localStorage
        localStorage.setItem('siteTitle', settingsData.siteTitle);
        localStorage.setItem('siteDescription', settingsData.siteDescription);
        localStorage.setItem('maintenanceMode', settingsData.maintenanceMode);
        
        // Apply settings changes
        this.applySettingsChanges(settingsData);
    }
    
    applySettingsChanges(settingsData) {
        // This function would apply the settings changes
        console.log('Settings changes applied:', settingsData);
    }
}

// Initialize the admin dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.adminDashboard = new AdminDashboard();
    
    // Set up CSS variables for preview
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --primary-color: #e53637;
            --secondary-color: #0b0c2a;
        }
    `;
    document.head.appendChild(style);
});