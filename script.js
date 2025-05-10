const games = [
    {
        title: "Uncharted 4 The Thief's End",
        description: "Nathan Drake, a retired treasure hunter, is pulled back into a dangerous world of thieves and pirate treasure, sparking a thrilling global adventure.",
        genre: "Action-Adventure",
        image: "assets/uncharted.jpg",
        trailerUrl: "https://video.cloudflare.steamstatic.com/store_trailers/256910607/movie480_vp9.webm?t=1671505478",
        steamLink: "https://store.steampowered.com/app/1659420/UNCHARTED_Legacy_of_Thieves_Collection/"
    },
    {
        title: "Spider-Man Remastered",
        description: "Play as Spider-Man, swinging through New York City, battling iconic villains, and balancing Peter Parker’s life with superhero duties.",
        genre: "Super Hero",
        image: "assets/spiderman.jpg",
        trailerUrl: "https://video.cloudflare.steamstatic.com/store_trailers/256900369/movie480_vp9.webm?t=1672791651",
        steamLink: "https://store.steampowered.com/app/1817070/Marvels_SpiderMan_Remastered/"
    },
    {
        title: "Tomb Raider",
        description: "Lara Croft, stranded on a deadly island, must fight to survive, uncover ancient secrets, and face ruthless enemies in her first major adventure.",
        genre: "Action-Adventure",
        image: "assets/tomb.jpg",
        trailerUrl: "https://video.cloudflare.steamstatic.com/store_trailers/256663321/movie480.webm?t=1461660154",
        steamLink: "https://store.steampowered.com/app/203160/Tomb_Raider/"
    },
    {
        title: "World War Z",
        description: "Fight massive, fast-moving zombie swarms in intense co-op missions set across global cities inspired by the World War Z film.",
        genre: "Co-op Action",
        image: "assets/world war.jpg",
        trailerUrl: "https://video.cloudflare.steamstatic.com/store_trailers/257072452/movie480_vp9.webm?t=1731416351",
        steamLink: "https://store.steampowered.com/app/699130/World_War_Z/"
    },
    {
        title: "The Last Of Us Part 1",
        description: "In a devastated America, Joel and Ellie must survive brutal threats and form a deep bond while journeying across dangerous territories.",
        genre: "Post Apocalyptic",
        image: "assets/the last.jpg",
        trailerUrl: "https://video.cloudflare.steamstatic.com/store_trailers/256936970/movie480_vp9.webm?t=1705640431",
        steamLink: "https://store.steampowered.com/app/1888930/The_Last_of_Us_Part_I/"
    },
    {
        title: "Days Gone",
        description: "Biker Deacon St. John struggles to survive a brutal post-apocalyptic world overrun by deadly infected creatures and hostile humans.",
        genre: "Survival Horror",
        image: "assets/days gone.jpg",
        trailerUrl: "assets/days_gone.mp4",
        steamLink: "https://store.steampowered.com/app/1259420/Days_Gone/"
    }
];

// Create game card
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
        <img src="${game.image}" alt="${game.title}">
        <div class="trailer-overlay">
            <video loop muted>
                <source src="${game.trailerUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <button class="mute-button">Unmute</button>
        </div>
        <div class="game-info">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <p class="genre">${game.genre}</p>
        </div>
    `;
    return card;
}

// Populate game grids
function populateGames() {
    const featuredGrid = document.getElementById('featuredGrid');
    const gamesGrid = document.getElementById('gamesGrid');

    if (featuredGrid) {
        // Show only first 3 games in featured section
        games.slice(0, 3).forEach((game, index) => {
            const card = createGameCard(game);
            featuredGrid.appendChild(card);
            setupCardInteractions(card, game, index);
        });
    }

    if (gamesGrid) {
        // Show all games in games page
        games.forEach((game, index) => {
            const card = createGameCard(game);
            gamesGrid.appendChild(card);
            setupCardInteractions(card, game, index);
        });
    }
}

// Setup hover and click interactions for game cards
function setupCardInteractions(card, game, index) {
    const trailerOverlay = card.querySelector('.trailer-overlay');
    const video = trailerOverlay.querySelector('video');
    const muteButton = trailerOverlay.querySelector('.mute-button');
    let hoverTimeout;

    // Hover event for trailer
    card.addEventListener('mouseenter', () => {
        hoverTimeout = setTimeout(() => {
            trailerOverlay.style.display = 'flex';
            video.play();
            card.querySelector('img').style.opacity = '0';
        }, 1000);
    });

    card.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
        trailerOverlay.style.display = 'none';
        video.pause();
        video.currentTime = 0;
        card.querySelector('img').style.opacity = '1';
    });

    // Mute/Unmute toggle
    muteButton.addEventListener('click', () => {
        video.muted = !video.muted;
        muteButton.textContent = video.muted ? 'Unmute' : 'Mute';
    });

    // Click event to redirect to Steam page
    card.addEventListener('click', (e) => {
        // Prevent redirect if clicking mute button
        if (e.target !== muteButton) {
            window.location.href = game.steamLink;
        }
    });

    // Animate card entrance
    animateCard(card, index);
}

// Animate card entrance
function animateCard(card, index) {
    setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.animate([
            { opacity: 0, transform: 'translateY(50px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards'
        });
    }, index * 200);
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Contact form submission for contact page
function submitForm() {
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const message = document.getElementById('message')?.value;

    if (name && email && message) {
        alert('Thank you for your message! We will get back to you soon.');
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    } else {
        alert('Please fill out all fields.');
    }
}

// Contact form submission for home page
function submitHomeForm() {
    const name = document.getElementById('home-name')?.value;
    const email = document.getElementById('home-email')?.value;
    const message = document.getElementById('home-message')?.value;

    if (name && email && message) {
        alert('Thank you for your message! We will get back to you soon.');
        document.getElementById('home-name').value = '';
        document.getElementById('home-email').value = '';
        document.getElementById('home-message').value = '';
    } else {
        alert('Please fill out all fields.');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateGames();
});