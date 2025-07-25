// Global Variables
let musicPlaying = false;
let typingComplete = false;
const birthdayMessages = [
    "Selamat Ulang Tahun Putriii Sayanggg! ❤🎂",
    "Happy Birthday My Beautiful! 💕",
    "Semoga Bahagia Selalu Sayang! 🎂"
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functions
function initializeWebsite() {
    showLoadingScreen();
    setupMusicControl();
    startTypingAnimation();
    startFloatingElements();
    startConfetti();
    setupPhotoCarousel();
    setupScrollAnimations();
    startCountdown();
    setupInteractiveElements();
    setupHeartGame();

    setupParallaxEffect();
    
    // Add loading animation
    document.body.classList.add('loading');
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}



// Typing Animation
function startTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    const messages = birthdayMessages;
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeMessage() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentMessage.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typeSpeed = 500; // Pause before next message
        }
        
        setTimeout(typeMessage, typeSpeed);
    }
    
    typeMessage();
}

// Floating Elements (Hearts and Balloons)
function startFloatingElements() {
    const container = document.getElementById('floatingElements');
    
    function createFloatingElement() {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Random element type
        const types = [
            { class: 'floating-heart', icon: '❤' },
            { class: 'floating-heart', icon: '💕' },
            { class: 'floating-heart', icon: '💖' },
            { class: 'floating-balloon', icon: '🎈' },
            { class: 'floating-balloon', icon: '🎂' },
            { class: 'floating-balloon', icon: '🌸' }
        ];
        
        const randomType = types[Math.floor(Math.random() * types.length)];
        element.className += ' ' + randomType.class;
        element.innerHTML = randomType.icon;
        
        // Random position
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 2 + 's';
        element.style.animationDuration = (Math.random() * 3 + 6) + 's';
        
        container.appendChild(element);
        
        // Remove element after animation
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 12000);
    }
    
    // Create floating elements periodically
    setInterval(createFloatingElement, 2000);
    
    // Create initial elements
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingElement, i * 400);
    }
}

// Confetti Effect
function startConfetti() {
    const container = document.getElementById('confetti');
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        // Random position and properties
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        // Random colors
        const colors = ['#ff6b9d', '#c8a2c8', '#ffd700', '#ff69b4', '#9370db'];
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
    
    // Create confetti periodically
    setInterval(createConfetti, 300);
}

// Photo Carousel Setup
function setupPhotoCarousel() {
    const carousel = document.getElementById('photoCarousel');
    
    // Auto-slide every 7 seconds
    setInterval(() => {
        const activeItem = carousel.querySelector('.carousel-item.active');
        const nextItem = activeItem.nextElementSibling || carousel.querySelector('.carousel-item:first-child');
        
        activeItem.classList.remove('active');
        nextItem.classList.add('active');
        
        // Update indicators
        const indicators = carousel.querySelectorAll('.carousel-indicators button');
        const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(nextItem);
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
        });
    }, 7000);
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// WhatsApp Integration
function openWhatsApp() {
    // CARA MENGGANTI NOMOR WHATSAPP: 
    // Ganti nomor "6281234567890" dengan nomor WhatsApp Anda (gunakan format internasional tanpa tanda +)
    // Contoh: untuk +62 812-3456-7890, gunakan "6281234567890"
    const phoneNumber = "62895391514787"; // Ganti dengan nomor Anda

    const message = encodeURIComponent(
        "Terima kasih untuk ucapan ulang tahun yang sangat romantis! ❤\n\n" +
        "Aku sangat terharu dengan website indah yang kamu buat. " +
        "Setiap detail di dalamnya menunjukkan betapa besar cintamu. " +
        "Aku merasa sangat beruntung memiliki seseorang seperti kamu dalam hidupku. 💕\n\n" +
        "I love you so more! 🥰"
    );

    // ✅ Perbaikan: gunakan backtick (``) agar template literal bisa diparsing
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    // Open WhatsApp in new window/tab
    window.open(whatsappURL, '_blank');
}

// Additional Utility Functions
function addFadeInAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize fade-in animation
addFadeInAnimation();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate floating elements positions if needed
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
        if (Math.random() > 0.5) {
            element.style.left = Math.random() * 100 + '%';
        }
    });
});

// Prevent right-click context menu (optional)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Add loading screen functionality
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Start confetti after page load
    setTimeout(() => {
        startConfetti();
    }, 1000);
});

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = ['backgroundMusic', 'musicToggle', 'typingText', 'floatingElements', 'confetti'];

    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with ID '${id}' not found`);
        }
    });
}

// Initialize error handling
handleMissingElements();

// Countdown Timer Function
function startCountdown() {
    const nextBirthday = new Date('2026-07-28 00:00:00'); // Tanggal ulang tahun
    const birthDate = new Date('2007-07-28'); // Tanggal lahir

    function updateCountdown() {
        const now = new Date();
        const timeDifference = nextBirthday - now;

        const currentYear = now.getFullYear();
        let age = currentYear - birthDate.getFullYear();
        const hasHadBirthdayThisYear = (
            now.getMonth() > birthDate.getMonth() || 
            (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate())
        );
        if (!hasHadBirthdayThisYear) {
            age--;
        }

        // ✅ Update teks
        const nextAge = age + 1;
        const subtitleElement = document.querySelector('.countdown-card p.font-poppins.text-muted');
        if (subtitleElement) {
            subtitleElement.textContent = `Menghitung Ulang Tahun Berikutnya yang ke - ${nextAge}...`;
        }

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = days;
            if (hoursElement) hoursElement.textContent = hours;
            if (minutesElement) minutesElement.textContent = minutes;
            if (secondsElement) secondsElement.textContent = seconds;

            const ageElement = document.getElementById('currentAge');
            if (ageElement) {
                ageElement.textContent = `Selamat Ulang Tahun Usia ke ${age} tahun`;
            }
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}


// Interactive Elements Setup
function setupInteractiveElements() {
    // Click anywhere to create hearts
    document.addEventListener('click', createClickHeart);
    
    // Double-click for extra confetti burst
    document.addEventListener('dblclick', createConfettiBurst);
}

// Create heart on click
function createClickHeart(event) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.className = 'clickable-heart';
    heart.style.left = event.clientX + 'px';
    heart.style.top = event.clientY + 'px';
    
    document.body.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 2000);
}

// Create confetti burst on double-click
function createConfettiBurst(event) {
    const colors = ['#ff6b9d', '#c8a2c8', '#ffd700', '#ff69b4', '#9370db'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = (event.clientX + Math.random() * 100 - 50) + 'px';
            confetti.style.top = (event.clientY + Math.random() * 100 - 50) + 'px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = '0s';
            confetti.style.animationDuration = '2s';
            
            document.getElementById('confetti').appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 2000);
        }, i * 50);
    }
}

// Show Surprise Function
function showSurprise() {
    const surpriseElement = document.getElementById('surpriseMessage');
    const button = event.target;
    
    if (surpriseElement) {
        surpriseElement.classList.remove('d-none');
        button.style.display = 'none';
        
        // Create extra confetti for surprise
        createConfettiBurst({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
        
        // Play a sweet sound effect using Web Audio API
        playHappyTone();
    }
}

// Play Happy Tone using Web Audio API
function playHappyTone() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create a happy melody
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        notes.forEach((frequency, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
            }, index * 200);
        });
    } catch (error) {
        console.log('Audio context not available');
    }
}

// Enhanced Music Control with better error handling
function setupMusicControl() {
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (!music || !musicToggle) {
        console.log('Music elements not found');
        return;
    }
    
    // Set initial state
    musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    musicToggle.title = 'Klik untuk memutar musik';
    
    // Music toggle event
    musicToggle.addEventListener('click', function() {
        if (musicPlaying) {
            music.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            musicToggle.title = 'Klik untuk memutar musik';
            musicPlaying = false;
        } else {
            music.play().then(() => {
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                musicToggle.title = 'Klik untuk menghentikan musik';
                musicPlaying = true;
            }).catch((error) => {
                console.log('Cannot play music:', error);
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                musicToggle.title = 'Upload file musik ke folder music/';
                musicPlaying = false;
            });
        }
    });
    
    // Handle music events
    music.addEventListener('play', () => {
        musicPlaying = true;
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    });
    
    music.addEventListener('pause', () => {
        musicPlaying = false;
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    });
    
    music.addEventListener('error', () => {
        console.log('Music file not found - upload your romantic song to music/romantic-song.mp3');
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        musicToggle.title = 'Upload file musik ke folder music/';
    });
}

// Loading Screen Function
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 3000);
}

// Quote Slideshow Function (Disabled - Single Quote Only)
function setupQuoteSlideshow() {
    // Slideshow disabled per user request - keeping single quote only
    return;
}

// Parallax Effect Function
function setupParallaxEffect() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        // Parallax background layers
        parallaxLayers.forEach((layer) => {
            const speed = parseFloat(layer.dataset.speed) || 0.5;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;  // ← pakai backtick
        });
    
        // Parallax effect for sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const speed = 0.1;
            const yPos = rect.top * speed;
    
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.style.transform = `translateY(${yPos}px)`;  // ← pakai backtick
            }
        });
    }    
    
    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    function handleScroll() {
        ticking = false;
        requestTick();
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial call
    updateParallax();
}

// Enhanced Music Control with auto-start attempt
function setupMusicControl() {
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (!music || !musicToggle) {
        console.log('Music elements not found');
        return;
    }
    
    // Set initial state
    musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    musicToggle.title = 'Klik untuk memutar musik';
    
    // Try to auto-start music after loading screen
    setTimeout(() => {
        music.play().then(() => {
            musicPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            musicToggle.title = 'Klik untuk menghentikan musik';
        }).catch((error) => {
            console.log('Autoplay prevented - user interaction required');
        });
    }, 3500);
    
    // Music toggle event
    musicToggle.addEventListener('click', function() {
        if (musicPlaying) {
            music.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            musicToggle.title = 'Klik untuk memutar musik';
            musicPlaying = false;
        } else {
            music.play().then(() => {
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                musicToggle.title = 'Klik untuk menghentikan musik';
                musicPlaying = true;
            }).catch((error) => {
                console.log('Cannot play music:', error);
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                musicToggle.title = 'Upload file musik ke folder music/';
                musicPlaying = false;
            });
        }
    });
    
    // Handle music events
    music.addEventListener('play', () => {
        musicPlaying = true;
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    });
    
    music.addEventListener('pause', () => {
        musicPlaying = false;
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    });
    
    music.addEventListener('error', () => {
        console.log('Music file not found - upload your romantic song to music/romantic-song.mp3');
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        musicToggle.title = 'Upload file musik ke folder music/';
    });
}

// Generate Simple Music (as fallback)
function generateRomanticTone() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create a simple romantic melody using Web Audio API
        const frequencies = [
            261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25
        ]; // C4 to C5 scale
        
        const melody = [0, 2, 4, 2, 5, 4, 2, 0, 7, 5, 4, 2]; // Simple melody pattern
        
        melody.forEach((noteIndex, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequencies[noteIndex];
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.8);
            }, index * 600);
        });
    } catch (error) {
        console.log('Web Audio API not available');
    }
}

// Console message
console.log('🎉 Romantic Birthday Website Loaded Successfully! 💕');
console.log('Made with ❤ for someone special');
console.log('Instructions:');
console.log('- Upload your romantic song to music/romantic-song.mp3');
console.log('- Click anywhere to create hearts');
console.log('- Double-click for confetti burst');
console.log('- Loading screen will show for 3 seconds');
console.log('- Single quote display (slideshow disabled)');
console.log('- Parallax effects active on scroll');

// Heart Collection Game
let gameScore = 0;
let scoreElement; // global
let levelElement; // global
let gameLevels = ['Pemula', 'Pemula Cinta', 'Sayang', 'Cinta Sejati', 'Master Cinta', 'Love Expert'];

function setupHeartGame() {
    const gameArea = document.getElementById('gameArea');
    scoreElement = document.getElementById('heartScore');
    levelElement = document.getElementById('loveLevel');

    const resetBtn = document.getElementById('resetGame');
    const shareBtn = document.getElementById('shareScore');

    if (!gameArea) return;

    // Single click
    gameArea.addEventListener('click', function(e) {
        createGameHeart(e, 1);
        updateScore(1);
    });

    // Double click bonus
    gameArea.addEventListener('dblclick', function(e) {
        createGameHeart(e, 3);
        updateScore(3);
        createConfettiBurst(e);
    });

    // Reset score
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            gameScore = 0;
            updateScoreDisplay();
        });
    }

    // ✅ Share score (HARUS di dalam sini)
    if (shareBtn) {
        shareBtn.addEventListener('click', function () {
            const message = `Aku sudah mengumpulkan ${gameScore} hearts! 💕 Love Level: ${getCurrentLevel()}`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Heart Collection Score',
                    text: message
                }).catch(err => {
                    console.error("Gagal share:", err);
                });
            } else {
                // Fallback ke clipboard
                navigator.clipboard.writeText(message).then(() => {
                    alert('Score berhasil disalin ke clipboard!');
                }).catch(() => {
                    alert('Gagal menyalin ke clipboard!');
                });
            }
        });
    }
}


    
function createGameHeart(event, points) {
    const rect = gameArea.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    for (let i = 0; i < points; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.className = 'game-heart';
        heart.style.left = (x + (i * 10 - 10)) + 'px';
        heart.style.top = (y + (i * 5 - 5)) + 'px';
        
        gameArea.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 1000);
    }
}

function updateScore(points) {
    gameScore += points;
    updateScoreDisplay();
    
    // Add score animation
    scoreElement.classList.add('score-animation');
    setTimeout(() => {
        scoreElement.classList.remove('score-animation');
    }, 600);
}

function updateScoreDisplay() {
    if (scoreElement) scoreElement.textContent = gameScore;
    if (levelElement) levelElement.textContent = getCurrentLevel();
}

function getCurrentLevel() {
    if (gameScore >= 100) return gameLevels[5];
    if (gameScore >= 75) return gameLevels[4];
    if (gameScore >= 50) return gameLevels[3];
    if (gameScore >= 25) return gameLevels[2];
    if (gameScore >= 10) return gameLevels[1];
    return gameLevels[0];
}