    // Stream URL (replace with your live stream URL)
        const streamUrl = "https://stream.zeno.fm/4xt5iodsby3tv";

        // Update footer year dynamically
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Get elements
        const playButton = document.getElementById('playButton');
        const waveContainer = document.getElementById('waveContainer');
        let isPlaying = false;
        let audio = new Audio(streamUrl); // Create new audio object with stream URL

        // Play/Pause button functionality
        playButton.addEventListener('click', () => {
            isPlaying = !isPlaying;
            if (isPlaying) {
                playButton.classList.remove('bi-play-circle-fill');
                playButton.classList.add('bi-pause-circle-fill');
                audio.play(); // Play stream
                waveContainer.classList.add('active');  // Show wave animation
            } else {
                playButton.classList.remove('bi-pause-circle-fill');
                playButton.classList.add('bi-play-circle-fill');
                audio.pause(); // Pause stream
                waveContainer.classList.remove('active');  // Hide wave animation
            }
        });