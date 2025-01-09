// YouTube API Integration
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
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=100`
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
