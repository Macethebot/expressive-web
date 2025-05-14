
document.addEventListener('DOMContentLoaded', () => {
    const slideBtn = document.getElementById('slideBtn');
    const roomNav = document.getElementById('roomNav');
    const landing = document.querySelector('.landing');
    const backToLanding = document.getElementById('backToLanding');

    // Arrow Button on landing 
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

    //Home button, back to landing 
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

// Add mouse movement tracking for gradient effect
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 200;
    const y = (e.clientY / window.innerHeight) * 100;
    
    document.body.style.setProperty('--gradient-x', `${x}%`);
    document.body.style.setProperty('--gradient-y', `${y}%`);
});

// Add touch movement tracking for mobile devices
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const x = (touch.clientX / window.innerWidth) * 100;
    const y = (touch.clientY / window.innerHeight) * 100;
    
    document.body.style.setProperty('--gradient-x', `${x}%`);
    document.body.style.setProperty('--gradient-y', `${y}%`);
}, { passive: true }); 



