document.addEventListener('DOMContentLoaded', function() {

    // Enhanced portfolio filtering with shuffle animation and error handling
    function filterPortfolio(category) {
        try {
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            if (portfolioItems.length === 0) return;

            const filteredItems = category === 'all'
                ? portfolioItems
                : Array.from(portfolioItems).filter(item => item.getAttribute('data-category') === category);

            // Animate out all items
            portfolioItems.forEach(item => {
                item.style.transform = 'scale(0.8)';
                item.style.opacity = '0';
                item.style.transition = 'all 0.5s ease';
            });

            // Animate in filtered items after a delay
            setTimeout(() => {
                try {
                    portfolioItems.forEach(item => {
                        item.style.display = 'none';
                    });

                    filteredItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.transform = 'scale(1)';
                                item.style.opacity = '1';
                            }, 50);
                        }, index * 100);
                    });
                } catch (error) {
                    console.error('Error animating portfolio items:', error);
                }
            }, 500);
        } catch (error) {
            console.error('Error filtering portfolio:', error);
        }
    }

    // Enhanced image loading with intersection observer and error handling
    function lazyLoadImages() {
        try {
            const images = document.querySelectorAll('img[data-src]');
            if (images.length === 0 || !('IntersectionObserver' in window)) return;

            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    try {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.remove('image-loading');
                            imageObserver.unobserve(img);
                        }
                    } catch (error) {
                        console.error('Error loading image:', error);
                    }
                });
            });

            images.forEach(img => {
                img.classList.add('image-loading');
                imageObserver.observe(img);
            });
        } catch (error) {
            console.error('Error initializing lazy loading:', error);
        }
    }

    // Initialize enhanced portfolio filtering with error handling
    try {
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (filterBtns.length > 0) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    try {
                        // Update active button
                        filterBtns.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');

                        // Use enhanced filtering with animation
                        const filter = btn.getAttribute('data-filter');
                        filterPortfolio(filter);
                    } catch (error) {
                        console.error('Error handling filter button click:', error);
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error initializing filter buttons:', error);
    }

    // Intersection Observer for scroll animations with error handling
    try {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    try {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                        }
                    } catch (error) {
                        console.error('Error animating element:', error);
                    }
                });
            }, observerOptions);

            // Observe all sections and portfolio items
            const observableElements = document.querySelectorAll('section, .portfolio-item, .about-image-container');
            if (observableElements.length > 0) {
                observableElements.forEach(el => {
                    observer.observe(el);
                });
            }
        }
    } catch (error) {
        console.error('Error initializing scroll animations:', error);
    }

    // Navbar scroll effect with error handling
    try {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            let lastScrollTop = 0;

            window.addEventListener('scroll', () => {
                try {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                    if (scrollTop > 100) {
                        navbar.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.85))';
                        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
                    } else {
                        navbar.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))';
                        navbar.style.boxShadow = 'none';
                    }

                    lastScrollTop = scrollTop;
                } catch (error) {
                    console.error('Error updating navbar:', error);
                }
            });
        }
    } catch (error) {
        console.error('Error initializing navbar scroll effect:', error);
    }

    // Form validation and submission with error handling
    try {
        const contactForm = document.querySelector('#contact form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                try {
                    // Get form data
                    const formData = new FormData(this);
                    const nameField = document.getElementById('name');
                    const emailField = document.getElementById('email');
                    const projectField = document.getElementById('project');
                    const messageField = document.getElementById('message');

                    if (!nameField || !emailField || !projectField || !messageField) {
                        showNotification('Form fields not found', 'error');
                        return;
                    }

                    const name = nameField.value;
                    const email = emailField.value;
                    const project = projectField.value;
                    const message = messageField.value;

                    // Basic validation
                    if (!name || !email || !project || !message) {
                        showNotification('Please fill in all fields', 'error');
                        return;
                    }

                    // Email validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        showNotification('Please enter a valid email address', 'error');
                        return;
                    }

                    // Show success message (in a real app, you'd send this to a server)
                    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                    this.reset();
                } catch (error) {
                    console.error('Error submitting form:', error);
                    showNotification('An error occurred. Please try again.', 'error');
                }
            });
        }
    } catch (error) {
        console.error('Error initializing form:', error);
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 5px;
            color: white;
            font-weight: 600;
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #27ae60;' : 'background: #e74c3c;'}
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    // Parallax effect for hero section with error handling
    try {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                try {
                    const scrolled = window.pageYOffset;
                    const parallax = scrolled * 0.5;
                    hero.style.transform = `translateY(${parallax}px)`;
                } catch (error) {
                    console.error('Error applying parallax effect:', error);
                }
            });
        }
    } catch (error) {
        console.error('Error initializing parallax effect:', error);
    }

    // Add custom styles for enhanced features with error handling
    try {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(20px); }
            }

            .visible {
                opacity: 1;
                transform: translateY(0);
            }

            section {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }

            .portfolio-item {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }

            .image-loading {
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .interactive-cursor {
                cursor: pointer;
                transition: transform 0.2s ease;
            }

            .interactive-cursor:hover {
                transform: translateY(-3px);
            }
        `;
        document.head.appendChild(style);
    } catch (error) {
        console.error('Error adding custom styles:', error);
    }
    
    // Initialize typing effect using reusable module
    try {
        const typingTextElement = document.querySelector('.typed-text');
        if (typingTextElement && typeof TypingEffect !== 'undefined') {
            const typing = new TypingEffect({
                textElement: '.typed-text',
                cursorElement: '.cursor',
                words: ["Model", "Actress", "TV Presenter", "Commercial Talent"],
                typingSpeed: 100,
                deletingSpeed: 50,
                pauseDelay: 2000,
                onError: (error) => {
                    console.error('Typing effect failed:', error);
                }
            });
            typing.init();
        }
    } catch (error) {
        console.error('Failed to initialize typing effect:', error);
    }

    // Initialize lazy loading
    try {
        lazyLoadImages();
    } catch (error) {
        console.error('Error initializing lazy loading:', error);
    }
    
    // Add interactive cursor to portfolio items with error handling
    try {
        const interactiveElements = document.querySelectorAll('.portfolio-item, .filter-btn, .btn-custom');
        if (interactiveElements.length > 0) {
            interactiveElements.forEach(item => {
                item.classList.add('interactive-cursor');
            });
        }
    } catch (error) {
        console.error('Error adding interactive cursor:', error);
    }
    
    // Add scroll progress indicator with error handling
    try {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
            width: 0%;
            z-index: 9999;
            transition: width 0.2s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            try {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight - windowHeight;
                const scrollTop = window.pageYOffset;
                const progress = (scrollTop / documentHeight) * 100;
                progressBar.style.width = `${progress}%`;
            } catch (error) {
                console.error('Error updating progress bar:', error);
            }
        });
    } catch (error) {
        console.error('Error creating progress bar:', error);
    }
});