
document.addEventListener("DOMContentLoaded", function() {
    // Typing effect
    const typingTextElement = document.getElementById('typing-text');
    const words = ["Tashana Zm", "an Event Host", "a Professional Emcee", "Your Next Event Star"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        // Adjust speed of typing
        const typeSpeed = isDeleting ? 100 : 200;

        if (isDeleting) {
            // Remove a character
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add a character
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // If word is fully typed or deleted
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end of word then start deleting
            setTimeout(() => { isDeleting = true; type(); }, 2000);
            return;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, typeSpeed);
    }

    type();

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
});

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


if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => img.loading = 'lazy');
}