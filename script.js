document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playerStatus = document.getElementById('player-status');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    // Audio Stream Setup
    const audioElement = new Audio('https://stream.zeno.fm/4xt5iodsby3tv'); // Correct Stream URL
    let isPlaying = false;

    // Play/Pause Button Event
    playPauseBtn.addEventListener('click', function () {
        if (isPlaying) {
            audioElement.pause();
            playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
            playerStatus.textContent = 'Click to Listen Live';
        } else {
            audioElement.play();
            playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
            playerStatus.textContent = 'Now Playing: El Olama FM 100.3 MHz';
        }
        isPlaying = !isPlaying;
    });


    // Search Functionality
    searchButton.addEventListener('click', function () {
        const query = searchInput.value.trim();
        if (query) {
            searchRadioStation(query);
        }
    });

    function searchRadioStation(query) {
        // Mock API Response
        const mockApiResponse = {
            name: "El Olama FM",
            frequency: "100.3 MHz",
            location: "Njombe, Tanzania",
            streamUrl: "https://stream.zeno.fm/4xt5iodsby3tv" // Replace with actual URL if needed
        };

        // Simulate API Delay
        setTimeout(() => {
            displaySearchResults(mockApiResponse);
        }, 1000);
    }

    function displaySearchResults(station) {
        searchResults.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${station.name}</h5>
                    <p class="card-text">Frequency: ${station.frequency}</p>
                    <p class="card-text">Location: ${station.location}</p>
                    <button class="btn btn-primary" onclick="playStation('${station.streamUrl}')">Play Station</button>
                </div>
            </div>
        `;
    }

    // Play Station from Search Results
    window.playStation = function (streamUrl) {
        audioElement.src = streamUrl;
        audioElement.play();
        playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        playerStatus.textContent = 'Now Playing: El Olama FM 100.3 MHz';
        isPlaying = true;
    };
});

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.scroll-animation');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
});
document.getElementById('current-year').textContent = new Date().getFullYear();




 // Update footer year dynamically
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // YouTube API Integration
        const API_KEY = 'AIzaSyBn0U7CxUYOmOk3V65R5QvwFarCLdOg1iU'; // Replace with your valid YouTube API Key
        const CHANNEL_ID = 'UCxjkwPa8UsFxyMZrGLgfcRg'; // Replace with your Channel ID

        async function fetchPodcasts() {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6`
                );
                const data = await response.json();

                if (data.error) {
                    console.error('YouTube API Error:', data.error.message);
                    alert('Failed to fetch podcasts. Please try again later.');
                    return [];
                }

                return data.items || [];
            } catch (error) {
                console.error('Error fetching podcasts:', error);
                alert('Unable to load podcasts. Please try again later.');
                return [];
            }
        }

        function createPodcastCard(podcast) {
            return `
                <div class="col-md-4">
                    <div class="podcast-card">
                        <img src="${podcast.snippet.thumbnails.medium.url}" alt="${podcast.snippet.title}" class="podcast-thumbnail">
                        <div class="podcast-header">${podcast.snippet.title}</div>
                        <div class="podcast-description">
                            <p>${podcast.snippet.description}</p>
                            <a href="https://www.youtube.com/watch?v=${podcast.id.videoId}" target="_blank" class="play-button">
                                <i class="bi bi-play-circle"></i> Watch Now
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }

        async function displayPodcasts() {
            const podcasts = await fetchPodcasts();
            const container = document.getElementById('podcasts-container');
            container.innerHTML = podcasts.length === 0 
                ? '<p class="text-center text-danger">No podcasts available.</p>'
                : podcasts.map(createPodcastCard).join('');
        }

        document.addEventListener('DOMContentLoaded', displayPodcasts);


        /* YouTube API Integration
const API_KEY = 'AIzaSyBn0U7CxUYOmOk3V65R5QvwFarCLdOg1iU'; // Replace with your valid YouTube API Key
const CHANNEL_ID = 'UCxjkwPa8UsFxyMZrGLgfcRg'; // Replace with your Channel ID
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

async function fetchPodcasts() {
    try {
        // Check if we have cached data
        const cachedData = localStorage.getItem('youtubePodcasts');
        const cachedTimestamp = localStorage.getItem('youtubePodcastsTimestamp');

        if (cachedData && cachedTimestamp) {
            const currentTime = new Date().getTime();
            if (currentTime - parseInt(cachedTimestamp) < CACHE_DURATION) {
                return JSON.parse(cachedData);
            }
        }

        // If no cache or cache is old, fetch new data
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6`
        );
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        // Cache the new data
        localStorage.setItem('youtubePodcasts', JSON.stringify(data.items));
        localStorage.setItem('youtubePodcastsTimestamp', new Date().getTime().toString());

        return data.items || [];
    } catch (error) {
        console.error('Error fetching podcasts:', error);
        throw error;
    }
}

function createPodcastCard(podcast) {
    return `
        <div class="col-md-4">
            <div class="podcast-card">
                <img src="${podcast.snippet.thumbnails.medium.url}" alt="${podcast.snippet.title}" class="podcast-thumbnail">
                <div class="podcast-header">${podcast.snippet.title}</div>
                <div class="podcast-description">
                    <p>${podcast.snippet.description}</p>
                    <a href="https://www.youtube.com/watch?v=${podcast.id.videoId}" target="_blank" class="play-button">
                        <i class="bi bi-play-circle"></i> Watch Now
                    </a>
                </div>
            </div>
        </div>
    `;
}

async function displayPodcasts() {
    const container = document.getElementById('podcasts-container');
    try {
        const podcasts = await fetchPodcasts();
        container.innerHTML = podcasts.length === 0 
            ? '<p class="text-center text-danger">No podcasts available.</p>'
            : podcasts.map(createPodcastCard).join('');
    } catch (error) {
        if (error.message.includes('quota')) {
            container.innerHTML = '<p class="text-center text-danger">API quota exceeded. Please try again later.</p>';
        } else {
            container.innerHTML = '<p class="text-center text-danger">Unable to load podcasts. Please try again later.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', displayPodcasts);
*/