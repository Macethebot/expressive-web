// JavaScript file ready for future functionality 

document.addEventListener('DOMContentLoaded', () => {
    const exploreBtn = document.getElementById('exploreBtn');
    const navigation = document.getElementById('navigation');
    const container = document.querySelector('.container');
    const backToLanding = document.getElementById('backToLanding');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            // Slide up the main content
            container.style.transform = 'translateY(-100vh)';
            
            // Show the navigation
            navigation.classList.remove('hidden');
            setTimeout(() => {
                navigation.classList.add('visible');
            }, 100);
        });
    }

    if (backToLanding) {
        backToLanding.addEventListener('click', () => {
            navigation.classList.remove('visible');
            setTimeout(() => {
                navigation.classList.add('hidden');
                container.style.transform = 'translateY(0)';
            }, 500);
        });
    }
});

// --- Universal Music and Back Button ---
function addMusicAndBackButtons() {
    // Create sound toggle button
    const soundBtn = document.createElement('button');
    soundBtn.className = 'universal-sound-toggle';
    soundBtn.title = 'Sound On/Off';
    soundBtn.innerHTML = '🔊';
    soundBtn.style.position = 'fixed';
    soundBtn.style.left = '30px';
    soundBtn.style.bottom = '40px';

    soundBtn.onclick = function() {
        const audios = document.querySelectorAll('audio');
        let anyMuted = Array.from(audios).some(a => a.muted);
        audios.forEach(a => a.muted = !anyMuted);
        soundBtn.innerHTML = anyMuted ? '🔊' : '🔇';
    };

    // Create back to home button
    const backBtn = document.createElement('a');
    backBtn.className = 'universal-back-button';
    backBtn.href = 'index.html';
    backBtn.title = 'Back to Home';
    backBtn.innerHTML = '<img src="images/home-icon.png" alt="Back to Home">';
    backBtn.style.position = 'fixed';
    backBtn.style.right = '30px';
    backBtn.style.bottom = '40px';

    document.body.appendChild(soundBtn);
    document.body.appendChild(backBtn);
} 