// Anime Manager - Handles anime selection and viewing functionality

class AnimeManager {
    constructor() {
        this.animeData = {
            'The Seven Deadly Sins: Wrath of the Gods': {
                id: 1,
                title: 'The Seven Deadly Sins: Wrath of the Gods',
                video: 'videos/1.mp4',
                poster: 'videos/anime-watch.jpg',
                episodes: 18
            },
            'Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien': {
                id: 2,
                title: 'Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien',
                video: 'videos/1.mp4',
                poster: 'videos/anime-watch.jpg',
                episodes: 18
            },
            'Shingeki no Kyojin Season 3 Part 2': {
                id: 3,
                title: 'Shingeki no Kyojin Season 3 Part 2',
                video: 'videos/1.mp4',
                poster: 'videos/anime-watch.jpg',
                episodes: 18
            },
            'Fullmetal Alchemist: Brotherhood': {
                id: 4,
                title: 'Fullmetal Alchemist: Brotherhood',
                video: 'videos/1.mp4',
                poster: 'videos/anime-watch.jpg',
                episodes: 18
            },
            'Shiratorizawa Gakuen Koukou': {
                id: 5,
                title: 'Shiratorizawa Gakuen Koukou',
                video: 'videos/1.mp4',
                poster: 'videos/anime-watch.jpg',
                episodes: 18
            },
            'Code Geass: Hangyaku no Lelouch R2': {
                id: 6,
                title: 'Code Geass: Hangyaku no Lelouch R2',
                video: 'videos/1.mp4',
                poster: 'videos/anime-watch.jpg',
                episodes: 18
            },
            'Sen to Chihiro no Kamikakushi': {
                id: 7,
                title: 'Sen to Chihiro no Kamikakushi',
                video: 'videos/1.mp4',
                poster: 'videos/anime-watch.jpg',
                episodes: 18
            },
            'Kizumonogatari III: Reiket su-hen': {
                id: 8,
                title: 'Kizumonogatari III: Reiket su-hen',
                video: 'videos/1.mp4',
                poster: 'videos/anime-watch.jpg',
                episodes: 18
            }
        };
        
        this.init();
    }
    
    init() {
        // Set up event listeners for anime selection
        this.setupAnimeSelection();
        
        // Load anime data on watching page
        this.loadAnimeData();
    }
    
    setupAnimeSelection() {
        // Handle clicks on anime titles
        $(document).on('click', '.product__item__text h5 a', (e) => {
            e.preventDefault();
            const animeTitle = $(e.target).text();
            this.selectAnime(animeTitle);
        });
        
        // Handle clicks on "Watch Now" buttons
        $(document).on('click', '.watch-btn', (e) => {
            e.preventDefault();
            const animeTitle = $('.anime__details__title h3').text();
            this.selectAnime(animeTitle);
        });
    }
    
    selectAnime(title) {
        // Store selected anime in localStorage
        localStorage.setItem('selectedAnime', title);
        
        // Redirect to watching page
        window.location.href = './anime-watching.html';
    }
    
    loadAnimeData() {
        // Only run on the watching page
        if (window.location.pathname.includes('anime-watching.html')) {
            const selectedAnime = localStorage.getItem('selectedAnime');
            
            if (selectedAnime && this.animeData[selectedAnime]) {
                const anime = this.animeData[selectedAnime];
                
                // Update page title
                document.title = `Anime | ${anime.title}`;
                
                // Update breadcrumb
                document.getElementById('anime-title').textContent = anime.title;
                
                // Update episodes title
                document.getElementById('episodes-title').textContent = `${anime.title} Episodes`;
                
                // Update video source
                const videoSource = document.querySelector('#player source');
                if (videoSource) {
                    videoSource.src = anime.video;
                    // Reload the player
                    const player = document.getElementById('player');
                    if (player) {
                        player.load();
                    }
                }
                
                // Update poster
                const playerElement = document.getElementById('player');
                if (playerElement) {
                    playerElement.setAttribute('data-poster', anime.poster);
                }
                
                // Generate episode links
                this.generateEpisodeLinks(anime.episodes);
            }
        }
    }
    
    generateEpisodeLinks(episodeCount) {
        const episodesContainer = document.querySelector('.anime__details__episodes');
        if (!episodesContainer) return;
        
        // Clear existing episodes except the title
        const sectionTitle = episodesContainer.querySelector('.section-title');
        if (sectionTitle) {
            episodesContainer.innerHTML = '';
            episodesContainer.appendChild(sectionTitle);
        }
        
        // Generate episode links
        for (let i = 1; i <= episodeCount; i++) {
            const episodeLink = document.createElement('a');
            episodeLink.href = '#';
            episodeLink.textContent = `Ep ${i.toString().padStart(2, '0')}`;
            episodesContainer.appendChild(episodeLink);
        }
    }
}

// Initialize AnimeManager when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.animeManager = new AnimeManager();
});