document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle with error handling
  try {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
      });
    }
  } catch (error) {
    console.error('Error initializing mobile menu:', error);
  }

  // Smooth scrolling for nav links with error handling
  try {
    const navLinks = document.querySelector('.nav-links');
    const anchors = document.querySelectorAll('.nav-links a');

    if (anchors.length > 0) {
      anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetElement = document.querySelector(this.getAttribute('href'));
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
          // Close mobile menu on link click
          if (navLinks && navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
          }
        });
      });
    }
  } catch (error) {
    console.error('Error initializing smooth scrolling:', error);
  }

  // Video Modal with error handling
  try {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    const videoModal = document.querySelector('.video-modal');
    const closeModal = document.querySelector('.close-modal');

    if (videoModal && closeModal && videoThumbnails.length > 0) {
      const modalVideo = videoModal.querySelector('video');

      if (modalVideo) {
        videoThumbnails.forEach(thumbnail => {
          thumbnail.addEventListener('click', () => {
            try {
              const videoSrc = thumbnail.getAttribute('data-video');
              const videoSource = modalVideo.querySelector('source');
              if (videoSource && videoSrc) {
                videoSource.setAttribute('src', videoSrc);
                modalVideo.load();
                videoModal.style.display = 'flex';
                modalVideo.play().catch(err => {
                  console.error('Error playing video:', err);
                });
              }
            } catch (error) {
              console.error('Error loading video:', error);
            }
          });
        });

        const closeVideoModal = () => {
          try {
            videoModal.style.display = 'none';
            modalVideo.pause();
            const videoSource = modalVideo.querySelector('source');
            if (videoSource) {
              videoSource.setAttribute('src', '');
            }
          } catch (error) {
            console.error('Error closing video modal:', error);
          }
        };

        closeModal.addEventListener('click', closeVideoModal);
        videoModal.addEventListener('click', (e) => {
          if (e.target === videoModal) {
            closeVideoModal();
          }
        });
      }
    }
  } catch (error) {
    console.error('Error initializing video modal:', error);
  }

  // Portfolio Filtering with error handling
  try {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          try {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Show/hide portfolio items
            portfolioItems.forEach(item => {
              if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
              } else {
                item.style.display = 'none';
              }
            });
          } catch (error) {
            console.error('Error filtering portfolio:', error);
          }
        });
      });
    }
  } catch (error) {
    console.error('Error initializing portfolio filtering:', error);
  }

  // Scroll Animations with error handling
  try {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      const observableElements = document.querySelectorAll('section, .bio-grid, .reel-grid, .portfolio-grid, .contact-grid');
      if (observableElements.length > 0) {
        observableElements.forEach(el => {
          observer.observe(el);
        });
      }
    }
  } catch (error) {
    console.error('Error initializing scroll animations:', error);
  }
});
