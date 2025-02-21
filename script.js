document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("bg-video");
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    // Initialize playback rate for instant playback
    video.playbackRate = 1;
    let targetPlaybackRate = 1; // Target playback rate for smoothing
    let smoothingFactor = 0.1; // Adjust this for more or less smoothing

    function updatePlaybackRate() {
        // Smoothly interpolate towards the target playback rate
        video.playbackRate += (targetPlaybackRate - video.playbackRate) * smoothingFactor;
        requestAnimationFrame(updatePlaybackRate); // Continue the update loop
    }
    
    requestAnimationFrame(updatePlaybackRate); // Start the update loop

    document.addEventListener("mousemove", function(event) {
        let currentTime = Date.now();
        let deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
        let deltaX = event.clientX - lastX;
        let deltaY = event.clientY - lastY;
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (deltaTime > 0) {
            let speed = distance / deltaTime; // Pixels per second

            // Increase the speedup factor for more sensitivity
            targetPlaybackRate = Math.min(Math.max(speed / 800, 1), 15); // Clamp between 0.5x and 5x speed
        }

        lastX = event.clientX;
        lastY = event.clientY;
        lastTime = currentTime;
    });
});
