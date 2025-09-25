document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.scroll-container');
    const sections = document.querySelectorAll('.hero-section, .fullpage-section');
    let touchstartY = 0;
    let touchendY = 0;
    let isScrolling = false;

    function handleGesture() {
        if (isScrolling) return;

        const swipeThreshold = 50; // Minimum swipe distance
        const swipeDistance = touchendY - touchstartY;

        if (Math.abs(swipeDistance) < swipeThreshold) {
            return;
        }

        let currentIndex = 0;
        const viewportCenter = window.innerHeight / 2;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
                currentIndex = index;
            }
        });

        let nextIndex = currentIndex;
        if (swipeDistance < 0) { // Swipe Up
            nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else { // Swipe Down
            nextIndex = Math.max(currentIndex - 1, 0);
        }

        if (nextIndex !== currentIndex) {
            isScrolling = true;
            sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
            // Prevent further gesture handling until scroll is complete
            setTimeout(() => {
                isScrolling = false;
            }, 800); // Adjust timeout to match scroll duration
        }
    }

    container.addEventListener('touchstart', e => {
        touchstartY = e.changedTouches[0].screenY;
    }, { passive: true });

    container.addEventListener('touchend', e => {
        touchendY = e.changedTouches[0].screenY;
        handleGesture();
    }, { passive: true });

    const contactButtons = document.querySelectorAll('.contact-btn');
    
    // Initialize Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const content = entry.target.querySelector('.content, .hero-content');
                if (content) {
                    content.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    
    // Smooth scroll behavior for browsers that don't support scroll-snap
    document.querySelector('.scroll-container').addEventListener('scroll', function() {
        sections.forEach(section => {
            const content = section.querySelector('.content, .hero-content');
            if (content) {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                // If section is in the middle of the viewport
                if (sectionTop < windowHeight * 0.7 && sectionTop > -windowHeight * 0.3) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            }
        });
    });
    
    // Ensure image overlays exist for all sections
    sections.forEach(section => {
        // Check if image overlay exists, if not create it
        if (!section.querySelector('.image-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'image-overlay';
            // Insert after image-container
            const imageContainer = section.querySelector('.image-container');
            if (imageContainer) {
                imageContainer.after(overlay);
            } else {
                section.prepend(overlay);
            }
        }
    });

    // Apply background overlay to sections for consistency
    sections.forEach(section => {
        const bgImage = new Image();
        const computedStyle = window.getComputedStyle(section);
        const bgImageUrl = computedStyle.backgroundImage;
        
        if (bgImageUrl && bgImageUrl !== 'none' && !bgImageUrl.includes('linear-gradient')) {
            section.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${bgImageUrl}`;
        }
    });
});