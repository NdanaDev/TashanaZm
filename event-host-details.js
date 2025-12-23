
document.addEventListener("DOMContentLoaded", function() {
    // Initialize typing effect using reusable module
    try {
        const typing = new TypingEffect({
            textElement: '#typing-text',
            words: ["Tashana Zm", "an Event Host", "a Professional Emcee", "Your Next Event Star"],
            typingSpeed: 200,
            deletingSpeed: 100,
            pauseDelay: 2000,
            onError: (error) => {
                console.error('Typing effect failed:', error);
            }
        });
        typing.init();
    } catch (error) {
        console.error('Failed to initialize typing effect:', error);
    }

    // Smooth scrolling for anchor links
    try {
        const anchors = document.querySelectorAll('a[href^="#"]');
        if (anchors.length > 0) {
            anchors.forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error initializing smooth scrolling:', error);
    }
});

// Initialize Swiper if element exists
try {
    const swiperElement = document.querySelector('.portfolio-swiper');
    if (swiperElement && typeof Swiper !== 'undefined') {
        var swiper = new Swiper('.portfolio-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
} catch (error) {
    console.error('Error initializing Swiper:', error);
}

// Enable lazy loading for images
try {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if (images.length > 0) {
            images.forEach(img => {
                img.loading = 'lazy';
            });
        }
    }
} catch (error) {
    console.error('Error setting up lazy loading:', error);
}