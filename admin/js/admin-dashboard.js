// Admin Dashboard JavaScript Functionality

class AdminDashboard {
    constructor() {
        this.init();
    }
    
    init() {
        // Initialize all dashboard components
        this.initEventListeners();
        this.loadDashboardData();
        this.initFormHandlers();
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
        }
    }
    
    loadDashboardData() {
        // Load dashboard statistics
        this.updateStats();
        
        // Load recent activity
        this.loadRecentActivity();
    }
    
    updateStats() {
        // In a real implementation, this would fetch data from the server
        // For now, we'll use sample data
        document.getElementById('total-anime').textContent = localStorage.getItem('animeCount') || '24';
        document.getElementById('total-users').textContent = localStorage.getItem('userCount') || '1,248';
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
        
        // Sample anime data
        const animeData = [
            { id: 1, title: 'Attack on Titan', category: 'Hành Động', episodes: '87' },
            { id: 2, title: 'Demon Slayer', category: 'Phiêu Lưu', episodes: '44' },
            { id: 3, title: 'My Hero Academia', category: 'Hành Động', episodes: '138' },
            { id: 4, title: 'One Piece', category: 'Phiêu Lưu', episodes: '1000+' }
        ];
        
        animeData.forEach(anime => {
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
        // In a real implementation, this would fetch user data from the server
        // For now, we'll use sample data
        const userListElement = document.getElementById('user-list');
        if (!userListElement) return;
        
        // Clear existing content
        userListElement.innerHTML = '';
        
        // Sample user data
        const userData = [
            { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', role: 'Người dùng', joinDate: '2023-01-15' },
            { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', role: 'Người dùng', joinDate: '2023-02-20' },
            { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', role: 'Quản trị', joinDate: '2022-11-10' },
            { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', role: 'Người dùng', joinDate: '2023-03-05' }
        ];
        
        userData.forEach(user => {
            const row = this.createUserRow(user);
            userListElement.appendChild(row);
        });
    }
    
    createUserRow(user) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
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
    }
    
    handleAnimeSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const animeData = {
            title: formData.get('title'),
            category: formData.get('category'),
            episodes: formData.get('episodes'),
            image: formData.get('image'),
            description: formData.get('description')
        };
        
        // Save anime data (in a real app, this would be sent to a server)
        this.saveAnime(animeData);
        
        // Reset form
        e.target.reset();
        
        // Show success message
        alert('Anime đã được thêm thành công!');
        
        // Refresh anime list
        this.loadAnimeList();
    }
    
    saveAnime(animeData) {
        // In a real implementation, this would send data to the server
        // For now, we'll store in localStorage
        let animeList = JSON.parse(localStorage.getItem('animeList')) || [];
        animeData.id = Date.now(); // Simple ID generation
        animeList.push(animeData);
        localStorage.setItem('animeList', JSON.stringify(animeList));
        
        // Update anime count
        const animeCount = animeList.length;
        localStorage.setItem('animeCount', animeCount);
        document.getElementById('total-anime').textContent = animeCount;
    }
    
    editAnime(animeId) {
        // In a real implementation, this would load the anime data and populate the form
        alert(`Chỉnh sửa anime với ID: ${animeId}`);
    }
    
    deleteAnime(animeId) {
        if (confirm('Bạn có chắc chắn muốn xóa anime này?')) {
            // In a real implementation, this would delete the anime from the server
            // For now, we'll remove from localStorage
            let animeList = JSON.parse(localStorage.getItem('animeList')) || [];
            animeList = animeList.filter(anime => anime.id != animeId);
            localStorage.setItem('animeList', JSON.stringify(animeList));
            
            // Update anime count
            const animeCount = animeList.length;
            localStorage.setItem('animeCount', animeCount);
            document.getElementById('total-anime').textContent = animeCount;
            
            // Refresh anime list
            this.loadAnimeList();
            
            // Show success message
            alert('Anime đã được xóa thành công!');
        }
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
    
    editUser(userId) {
        // In a real implementation, this would load the user data and populate the form
        alert(`Chỉnh sửa người dùng với ID: ${userId}`);
    }
    
    deleteUser(userId) {
        if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            // In a real implementation, this would delete the user from the server
            alert(`Người dùng với ID: ${userId} đã được xóa!`);
            
            // Refresh user list
            this.loadUserList();
        }
    }
}

// Initialize the admin dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.adminDashboard = new AdminDashboard();
});