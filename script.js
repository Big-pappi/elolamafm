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
