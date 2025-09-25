document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
  });

  // Smooth scrolling for nav links
  document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
      // Close mobile menu on link click
      if (navLinks.classList.contains('nav-active')) {
        navLinks.classList.remove('nav-active');
      }
    });
  });

  // Video Modal
  const videoThumbnails = document.querySelectorAll('.video-thumbnail');
  const videoModal = document.querySelector('.video-modal');
  const closeModal = document.querySelector('.close-modal');
  const modalVideo = videoModal.querySelector('video');

  videoThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      const videoSrc = thumbnail.getAttribute('data-video');
      modalVideo.querySelector('source').setAttribute('src', videoSrc);
      modalVideo.load();
      videoModal.style.display = 'flex';
      modalVideo.play();
    });
  });

  const closeVideoModal = () => {
    videoModal.style.display = 'none';
    modalVideo.pause();
    modalVideo.querySelector('source').setAttribute('src', '');
  }

  closeModal.addEventListener('click', closeVideoModal);
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });

  // Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
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
    });
  });

  // Scroll Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } 
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, .bio-grid, .reel-grid, .portfolio-grid, .contact-grid').forEach(el => {
    observer.observe(el);
  });
});
