/**
 * Reusable Typing Effect Module
 * Provides a configurable typing animation for text elements
 */

class TypingEffect {
  constructor(options = {}) {
    // Configuration with defaults
    this.config = {
      textElement: options.textElement || '.typed-text',
      cursorElement: options.cursorElement || null,
      words: options.words || ['Default Text'],
      typingSpeed: options.typingSpeed || 150,
      deletingSpeed: options.deletingSpeed || 75,
      pauseDelay: options.pauseDelay || 2000,
      startDelay: options.startDelay || 250,
      loop: options.loop !== false, // Default to true
      onComplete: options.onComplete || null,
      onError: options.onError || null
    };

    this.textElement = null;
    this.cursorElement = null;
    this.currentWordIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.isInitialized = false;
  }

  /**
   * Initialize the typing effect
   */
  init() {
    try {
      // Get text element
      if (typeof this.config.textElement === 'string') {
        this.textElement = document.querySelector(this.config.textElement);
      } else {
        this.textElement = this.config.textElement;
      }

      if (!this.textElement) {
        throw new Error(`Text element "${this.config.textElement}" not found`);
      }

      // Get cursor element if specified
      if (this.config.cursorElement) {
        if (typeof this.config.cursorElement === 'string') {
          this.cursorElement = document.querySelector(this.config.cursorElement);
        } else {
          this.cursorElement = this.config.cursorElement;
        }
      }

      // Validate words array
      if (!Array.isArray(this.config.words) || this.config.words.length === 0) {
        throw new Error('Words array must be a non-empty array');
      }

      this.isInitialized = true;

      // Start typing after initial delay
      setTimeout(() => this.type(), this.config.startDelay);

    } catch (error) {
      console.error('TypingEffect initialization error:', error);
      if (this.config.onError) {
        this.config.onError(error);
      }
    }
  }

  /**
   * Type out characters
   */
  type() {
    if (!this.isInitialized) return;

    try {
      const currentWord = this.config.words[this.currentWordIndex];

      if (this.isDeleting) {
        // Delete character
        this.textElement.textContent = currentWord.substring(0, this.currentCharIndex - 1);
        this.currentCharIndex--;

        // Add typing class to cursor
        if (this.cursorElement && !this.cursorElement.classList.contains('typing')) {
          this.cursorElement.classList.add('typing');
        }

        // Check if word is fully deleted
        if (this.currentCharIndex === 0) {
          this.isDeleting = false;
          this.currentWordIndex++;

          // Check if we should loop
          if (this.currentWordIndex >= this.config.words.length) {
            if (this.config.loop) {
              this.currentWordIndex = 0;
            } else {
              // Typing complete
              if (this.cursorElement) {
                this.cursorElement.classList.remove('typing');
              }
              if (this.config.onComplete) {
                this.config.onComplete();
              }
              return;
            }
          }

          if (this.cursorElement) {
            this.cursorElement.classList.remove('typing');
          }

          setTimeout(() => this.type(), this.config.typingSpeed + 500);
          return;
        }

        setTimeout(() => this.type(), this.config.deletingSpeed);

      } else {
        // Add character
        this.textElement.textContent = currentWord.substring(0, this.currentCharIndex + 1);
        this.currentCharIndex++;

        // Add typing class to cursor
        if (this.cursorElement && !this.cursorElement.classList.contains('typing')) {
          this.cursorElement.classList.add('typing');
        }

        // Check if word is fully typed
        if (this.currentCharIndex === currentWord.length) {
          if (this.cursorElement) {
            this.cursorElement.classList.remove('typing');
          }

          // Pause before deleting
          setTimeout(() => {
            this.isDeleting = true;
            this.type();
          }, this.config.pauseDelay);
          return;
        }

        setTimeout(() => this.type(), this.config.typingSpeed);
      }

    } catch (error) {
      console.error('TypingEffect error during typing:', error);
      if (this.config.onError) {
        this.config.onError(error);
      }
    }
  }

  /**
   * Stop the typing effect
   */
  stop() {
    this.isInitialized = false;
  }

  /**
   * Restart the typing effect
   */
  restart() {
    this.currentWordIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    if (this.textElement) {
      this.textElement.textContent = '';
    }
    this.init();
  }
}

/**
 * Simple helper function for quick initialization
 * @param {string|HTMLElement} element - Text element selector or element
 * @param {Array<string>} words - Array of words to type
 * @param {Object} options - Additional configuration options
 */
function initTypingEffect(element, words, options = {}) {
  const typing = new TypingEffect({
    textElement: element,
    words: words,
    ...options
  });

  typing.init();
  return typing;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TypingEffect, initTypingEffect };
}
