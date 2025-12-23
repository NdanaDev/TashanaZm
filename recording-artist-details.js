document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation with error handling
    try {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        if (navLinks.length > 0 && sections.length > 0) {
            // Show only the active section
            function showSection(sectionId) {
                try {
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
                } catch (error) {
                    console.error('Error showing section:', error);
                }
            }

            // Add click event to nav links
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const sectionId = this.getAttribute('href').substring(1);
                    showSection(sectionId);
                    // Update URL without page reload
                    try {
                        history.pushState(null, '', `#${sectionId}`);
                    } catch (error) {
                        console.error('Error updating URL:', error);
                    }
                });
            });

            // Check URL hash on page load
            if (window.location.hash) {
                const sectionId = window.location.hash.substring(1);
                showSection(sectionId);
            } else {
                showSection('music'); // Default to music section
            }
        }
    } catch (error) {
        console.error('Error initializing tab navigation:', error);
    }
    
    // Music Player Functionality with error handling
    try {
        const playBtns = document.querySelectorAll('.play-btn');

        if (playBtns.length > 0) {
            const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/01/20/audio_172d7dec90.mp3?filename=soft-smooth-jazz-piano-169621.mp3');
            let isPlaying = false;

            playBtns.forEach((playBtn, index) => {
                const playIcon = playBtn.querySelector('i');

                if (playIcon) {
                    playBtn.addEventListener('click', function() {
                        try {
                            // For demo purposes, we'll just use one audio element
                            if (index === 0) { // Only the first player controls the audio
                                if (isPlaying) {
                                    audio.pause();
                                    playIcon.classList.remove('fa-pause');
                                    playIcon.classList.add('fa-play');
                                } else {
                                    audio.play().catch(err => {
                                        console.error('Error playing audio:', err);
                                    });
                                    playIcon.classList.remove('fa-play');
                                    playIcon.classList.add('fa-pause');

                                    // Update progress bar
                                    audio.addEventListener('timeupdate', function() {
                                        try {
                                            const progressBar = document.querySelector('.progress-bar');
                                            const timeDisplay = document.querySelector('.time-display');

                                            if (progressBar && !isNaN(audio.duration)) {
                                                const progressPercent = (audio.currentTime / audio.duration) * 100;
                                                progressBar.style.width = `${progressPercent}%`;
                                            }

                                            // Update time display
                                            if (timeDisplay && !isNaN(audio.duration)) {
                                                const currentMins = Math.floor(audio.currentTime / 60);
                                                const currentSecs = Math.floor(audio.currentTime % 60);
                                                const durationMins = Math.floor(audio.duration / 60);
                                                const durationSecs = Math.floor(audio.duration % 60);

                                                timeDisplay.textContent =
                                                    `${currentMins}:${currentSecs < 10 ? '0' : ''}${currentSecs} / ${durationMins}:${durationSecs < 10 ? '0' : ''}${durationSecs}`;
                                            }
                                        } catch (error) {
                                            console.error('Error updating progress:', error);
                                        }
                                    });
                                }
                                isPlaying = !isPlaying;
                            } else {
                                alert("This is a demo. Only the first player is functional.");
                            }
                        } catch (error) {
                            console.error('Error in music player:', error);
                        }
                    });
                }
            });

            // Update play/pause button when audio ends
            audio.addEventListener('ended', function() {
                try {
                    playBtns.forEach(playBtn => {
                        const playIcon = playBtn.querySelector('i');
                        if (playIcon) {
                            playIcon.classList.remove('fa-pause');
                            playIcon.classList.add('fa-play');
                        }
                    });
                    isPlaying = false;
                    const progressBar = document.querySelector('.progress-bar');
                    if (progressBar) {
                        progressBar.style.width = '0%';
                    }
                } catch (error) {
                    console.error('Error resetting player:', error);
                }
            });
        }
    } catch (error) {
        console.error('Error initializing music player:', error);
    }
    
    // Smooth scrolling for anchor links with error handling
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
    
    // Form validation for contact form with error handling
    try {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                try {
                    const nameInput = this.querySelector('input[name="name"]');
                    const emailInput = this.querySelector('input[name="email"]');
                    const messageInput = this.querySelector('textarea[name="message"]');

                    if (!nameInput || !emailInput || !messageInput) {
                        console.error('Form fields not found');
                        return;
                    }

                    const name = nameInput.value.trim();
                    const email = emailInput.value.trim();
                    const message = messageInput.value.trim();
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
                } catch (error) {
                    console.error('Error validating form:', error);
                    showError('An error occurred. Please try again.');
                }
            });
        }
    } catch (error) {
        console.error('Error initializing form validation:', error);
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Helper function to show error messages
    function showError(message) {
        try {
            const contactForm = document.querySelector('.contact-form');
            if (!contactForm) return;

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
        } catch (error) {
            console.error('Error showing error message:', error);
        }
    }

    // Helper function to show success message
    function showSuccess(message) {
        try {
            const contactForm = document.querySelector('.contact-form');
            if (!contactForm) return;

            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.textContent = message;
            successDiv.style.color = 'green';
            successDiv.style.marginBottom = '1rem';
            contactForm.prepend(successDiv);

            // Remove success message after 5 seconds
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.remove();
                }
            }, 5000);
        } catch (error) {
            console.error('Error showing success message:', error);
        }
    }
    
    // Initialize any other interactive elements
    // Add any additional initialization code here
  });