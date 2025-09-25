document.addEventListener('DOMContentLoaded', function() {

    // Enhanced portfolio filtering with shuffle animation
    function filterPortfolio(category) {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
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
        }, 500);
    }

    // Enhanced image loading with intersection observer
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('image-loading');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('image-loading');
            imageObserver.observe(img);
        });
    }

    // Initialize enhanced portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Use enhanced filtering with animation
            const filter = btn.getAttribute('data-filter');
            filterPortfolio(filter);
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe all sections and portfolio items
    document.querySelectorAll('section, .portfolio-item, .about-image-container').forEach(el => {
        observer.observe(el);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.85))';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Form validation and submission
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const project = document.getElementById('project').value;
            const message = document.getElementById('message').value;
            
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
        });
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

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });

    // Add custom styles for enhanced features
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
    
    // Initialize enhanced features
    if (typingTextElement) {
        console.log('Starting typing effect...');
        type();
    } else {
        console.error('Element with ID "typing-text" not found');
    }
    lazyLoadImages();
    
    // Add interactive cursor to portfolio items
    const interactiveElements = document.querySelectorAll('.portfolio-item, .filter-btn, .btn-custom');
    interactiveElements.forEach(item => {
        item.classList.add('interactive-cursor');
    });
    
    // Add scroll progress indicator
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
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / documentHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
});