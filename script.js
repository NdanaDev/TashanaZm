document.addEventListener('DOMContentLoaded', function() {
    // Touch gesture handling with error handling
    try {
        const container = document.querySelector('.scroll-container');
        const sections = document.querySelectorAll('.hero-section, .fullpage-section');

        if (!container || sections.length === 0) {
            console.warn('Container or sections not found for touch gestures');
        } else {
            let touchstartY = 0;
            let touchendY = 0;
            let isScrolling = false;

            function handleGesture() {
                try {
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

                    if (nextIndex !== currentIndex && sections[nextIndex]) {
                        isScrolling = true;
                        sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
                        // Prevent further gesture handling until scroll is complete
                        setTimeout(() => {
                            isScrolling = false;
                        }, 800); // Adjust timeout to match scroll duration
                    }
                } catch (error) {
                    console.error('Error handling gesture:', error);
                    isScrolling = false;
                }
            }

            container.addEventListener('touchstart', e => {
                try {
                    if (e.changedTouches && e.changedTouches[0]) {
                        touchstartY = e.changedTouches[0].screenY;
                    }
                } catch (error) {
                    console.error('Error on touchstart:', error);
                }
            }, { passive: true });

            container.addEventListener('touchend', e => {
                try {
                    if (e.changedTouches && e.changedTouches[0]) {
                        touchendY = e.changedTouches[0].screenY;
                        handleGesture();
                    }
                } catch (error) {
                    console.error('Error on touchend:', error);
                }
            }, { passive: true });
        }
    } catch (error) {
        console.error('Error initializing touch gestures:', error);
    }

    // Initialize Intersection Observer for scroll animations with error handling
    try {
        if ('IntersectionObserver' in window) {
            const sections = document.querySelectorAll('.hero-section, .fullpage-section');
            if (sections.length > 0) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        try {
                            if (entry.isIntersecting) {
                                const content = entry.target.querySelector('.content, .hero-content');
                                if (content) {
                                    content.classList.add('active');
                                }
                            }
                        } catch (error) {
                            console.error('Error processing intersection entry:', error);
                        }
                    });
                }, { threshold: 0.5 });

                sections.forEach(section => {
                    observer.observe(section);
                });
            }
        }
    } catch (error) {
        console.error('Error initializing Intersection Observer:', error);
    }
    
    
    // Smooth scroll behavior for browsers that don't support scroll-snap with error handling
    try {
        const scrollContainer = document.querySelector('.scroll-container');
        const sections = document.querySelectorAll('.hero-section, .fullpage-section');

        if (scrollContainer && sections.length > 0) {
            scrollContainer.addEventListener('scroll', function() {
                try {
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
                } catch (error) {
                    console.error('Error processing scroll:', error);
                }
            });
        }
    } catch (error) {
        console.error('Error initializing scroll behavior:', error);
    }
    
    // Ensure image overlays exist for all sections with error handling
    try {
        const sections = document.querySelectorAll('.hero-section, .fullpage-section');
        if (sections.length > 0) {
            sections.forEach(section => {
                try {
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
                } catch (error) {
                    console.error('Error creating image overlay:', error);
                }
            });
        }
    } catch (error) {
        console.error('Error initializing image overlays:', error);
    }

    // Apply background overlay to sections for consistency with error handling
    try {
        const sections = document.querySelectorAll('.hero-section, .fullpage-section');
        if (sections.length > 0) {
            sections.forEach(section => {
                try {
                    const computedStyle = window.getComputedStyle(section);
                    const bgImageUrl = computedStyle.backgroundImage;

                    if (bgImageUrl && bgImageUrl !== 'none' && !bgImageUrl.includes('linear-gradient')) {
                        section.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${bgImageUrl}`;
                    }
                } catch (error) {
                    console.error('Error applying background overlay:', error);
                }
            });
        }
    } catch (error) {
        console.error('Error initializing background overlays:', error);
    }
});