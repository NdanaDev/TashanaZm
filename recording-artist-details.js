document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Show only the active section
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Add click event to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
            // Update URL without page reload
            history.pushState(null, '', `#${sectionId}`);
        });
    });
    
    // Check URL hash on page load
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        showSection(sectionId);
    } else {
        showSection('music'); // Default to music section
    }
    
    // Music Player Functionality
    const playBtns = document.querySelectorAll('.play-btn');
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/01/20/audio_172d7dec90.mp3?filename=soft-smooth-jazz-piano-169621.mp3'); // Sample audio
    let isPlaying = false;
    
    if (playBtns.length > 0) {
        playBtns.forEach((playBtn, index) => {
          const playIcon = playBtn.querySelector('i');
          
          playBtn.addEventListener('click', function() {
              // For demo purposes, we'll just use one audio element
              if (index === 0) { // Only the first player controls the audio
                if (isPlaying) {
                    audio.pause();
                    playIcon.classList.remove('fa-pause');
                    playIcon.classList.add('fa-play');
                } else {
                    audio.play();
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                    
                    // Update progress bar
                    audio.addEventListener('timeupdate', function() {
                      const progressPercent = (audio.currentTime / audio.duration) * 100;
                      document.querySelector('.progress-bar').style.width = `${progressPercent}%`;
                      
                      // Update time display
                      const currentMins = Math.floor(audio.currentTime / 60);
                      const currentSecs = Math.floor(audio.currentTime % 60);
                      const durationMins = Math.floor(audio.duration / 60);
                      const durationSecs = Math.floor(audio.duration % 60);
                      
                      document.querySelector('.time-display').textContent = 
                        `${currentMins}:${currentSecs < 10 ? '0' : ''}${currentSecs} / ${durationMins}:${durationSecs < 10 ? '0' : ''}${durationSecs}`;
                    });
                }
                isPlaying = !isPlaying;
              } else {
                alert("This is a demo. Only the first player is functional.");
              }
          });
        });
        
        // Update play/pause button when audio ends
        audio.addEventListener('ended', function() {
          playBtns.forEach(playBtn => {
            const playIcon = playBtn.querySelector('i');
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
          });
          isPlaying = false;
          document.querySelector('.progress-bar').style.width = '0%';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
    
    // Form validation for contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();
            let isValid = true;
            
            // Simple validation
            if (!name) {
                showError('Please enter your name');
                isValid = false;
            }
            
            if (!email || !isValidEmail(email)) {
                showError('Please enter a valid email address');
                isValid = false;
            }
            
            if (!message) {
                showError('Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                showSuccess('Message sent successfully!');
                this.reset();
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Helper function to show error messages
    function showError(message) {
        // Create or update error message element
        let errorDiv = document.querySelector('.form-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            contactForm.prepend(errorDiv);
        }
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.marginBottom = '1rem';
    }
    
    // Helper function to show success message
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.textContent = message;
        successDiv.style.color = 'green';
        successDiv.style.marginBottom = '1rem';
        contactForm.prepend(successDiv);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    // Initialize any other interactive elements
    // Add any additional initialization code here
  });