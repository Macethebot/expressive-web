document.addEventListener('DOMContentLoaded', () => {
    const slideBtn = document.getElementById('slideBtn');
    const roomNav = document.getElementById('roomNav');
    const landing = document.querySelector('.landing');
    const backToLanding = document.getElementById('backToLanding');

    if (slideBtn) {
        slideBtn.addEventListener('click', () => {
            // Slide up the main content
            landing.style.transform = 'translateY(-100vh)';
            
            // Show the navigation
            roomNav.classList.remove('hidden');
            setTimeout(() => {
                roomNav.classList.add('visible');
            }, 100);
        });
    }

    if (backToLanding) {
        backToLanding.addEventListener('click', () => {
            roomNav.classList.remove('visible');
            setTimeout(() => {
                roomNav.classList.add('hidden');
                landing.style.transform = 'translateY(0)';
            }, 500);
        });
    }
});

// // --- Universal Music and Back Button ---
// function addMusicAndBackButtons() {
//     // Create sound toggle button
//     const soundBtn = document.createElement('button');
//     soundBtn.className = 'universal-sound-toggle';
//     soundBtn.title = 'Sound On/Off';
//     soundBtn.innerHTML = '🔊';
//     soundBtn.style.position = 'fixed';
//     soundBtn.style.left = '30px';
//     soundBtn.style.bottom = '40px';

//     soundBtn.onclick = function() {
//         const audios = document.querySelectorAll('audio');
//         let anyMuted = Array.from(audios).some(a => a.muted);
//         audios.forEach(a => a.muted = !anyMuted);
//         soundBtn.innerHTML = anyMuted ? '🔊' : '🔇';
//     };

//     // Create back to home button
//     const backBtn = document.createElement('a');
//     backBtn.className = 'universal-back-button';
//     backBtn.href = 'index.html';
//     backBtn.title = 'Back to Home';
//     backBtn.innerHTML = '<img src="images/home-icon.png" alt="Back to Home">';
//     backBtn.style.position = 'fixed';
//     backBtn.style.right = '30px';
//     backBtn.style.bottom = '40px';

//     document.body.appendChild(soundBtn);
//     document.body.appendChild(backBtn);
// } 