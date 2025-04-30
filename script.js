console.log('Website loaded successfully!'); 

document.addEventListener('DOMContentLoaded', function() {
    const firstArrowBtn = document.getElementById('firstArrowBtn');
    const secondArrowBtn = document.getElementById('secondArrowBtn');
    const levelBar = document.querySelector('.level-bar');
    const levelProgress = document.querySelector('.level-progress');
    const activityCards = document.querySelectorAll('.activity-card');
    
    // First arrow click handler
    firstArrowBtn.addEventListener('click', function() {
        document.getElementById('slide2').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Second arrow click handler
    secondArrowBtn.addEventListener('click', function() {
        document.getElementById('slide3').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Level bar click handler
    levelBar.addEventListener('click', function(e) {
        const rect = levelBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        let level;
        
        if (percentage <= 33.33) {
            levelProgress.style.width = '33.33%';
            level = 'Low';
        } else if (percentage <= 66.66) {
            levelProgress.style.width = '66.66%';
            level = 'Medium';
        } else {
            levelProgress.style.width = '100%';
            level = 'High';
        }

        document.getElementById('levelTitle').textContent = level + ' Level Recipes';
        secondArrowBtn.classList.remove('hidden');
    });

    // Activity cards click handler
    activityCards.forEach(card => {
        card.addEventListener('click', function() {
            const activityName = this.querySelector('p').textContent;
            showActivityDetail(activityName);
        });
    });
});

// function showActivityDetail(activityName) {
//     const activities = {
//         'Drawing': {
//             ingredients: ['Paper', 'Pencils or crayons', 'Comfortable space'],
//             description: 'Find a quiet spot and let your creativity flow. There\'s no pressure to create anything specific - just enjoy the process of making marks on paper.'
//         },
//         'Listen to Music': {
//             ingredients: ['Headphones', 'Your favorite playlist', 'Comfortable spot'],
//             description: 'Put on your favorite songs and let yourself get lost in the music. Try closing your eyes and focusing only on the sounds.'
//         },
//         'Play Games': {
//             ingredients: ['Gaming device', 'Favorite game', 'Time set aside'],
//             description: 'Choose a game that brings you joy and set aside some time to fully immerse yourself in it. Remember, this is your time to enjoy yourself.'
//         }
//     };

//     const activity = activities[activityName];
//     document.getElementById('activityName').textContent = activityName;
    
//     const ingredientsList = document.getElementById('ingredientsList');
//     ingredientsList.innerHTML = activity.ingredients
//         .map(ingredient => `<li>${ingredient}</li>`)
//         .join('');
    
//     document.getElementById('descriptionText').textContent = activity.description;
    
//     document.getElementById('slide4').scrollIntoView({ 
//         behavior: 'smooth',
//         block: 'start'
//     });
// } 