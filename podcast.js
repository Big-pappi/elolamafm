


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

