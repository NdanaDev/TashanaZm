/**
 * Focus Trap Utility for Accessible Mobile Menus
 * Traps keyboard focus within an element when active
 */

class FocusTrap {
  constructor(element) {
    this.element = element;
    this.focusableElements = [];
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
    this.isActive = false;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updateFocusableElements();
  }

  /**
   * Get all focusable elements within the trap
   */
  updateFocusableElements() {
    if (!this.element) return;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    this.focusableElements = Array.from(
      this.element.querySelectorAll(focusableSelectors)
    ).filter(el => {
      return el.offsetParent !== null; // Filter out hidden elements
    });

    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
  }

  /**
   * Handle Tab key navigation
   */
  handleKeyDown(e) {
    if (e.key !== 'Tab') return;

    this.updateFocusableElements();

    if (this.focusableElements.length === 0) return;

    // Handle Shift + Tab (backward)
    if (e.shiftKey) {
      if (document.activeElement === this.firstFocusableElement) {
        e.preventDefault();
        this.lastFocusableElement.focus();
      }
    }
    // Handle Tab (forward)
    else {
      if (document.activeElement === this.lastFocusableElement) {
        e.preventDefault();
        this.firstFocusableElement.focus();
      }
    }
  }

  /**
   * Activate the focus trap
   */
  activate() {
    if (this.isActive) return;

    this.isActive = true;
    this.updateFocusableElements();

    // Save currently focused element to restore later
    this.previouslyFocusedElement = document.activeElement;

    // Add event listener for tab key
    document.addEventListener('keydown', this.handleKeyDown);

    // Focus first element
    if (this.firstFocusableElement) {
      // Small delay to ensure menu is visible
      setTimeout(() => {
        if (this.firstFocusableElement) {
          this.firstFocusableElement.focus();
        }
      }, 10);
    }
  }

  /**
   * Deactivate the focus trap
   */
  deactivate() {
    if (!this.isActive) return;

    this.isActive = false;
    document.removeEventListener('keydown', this.handleKeyDown);

    // Restore focus to previously focused element
    if (this.previouslyFocusedElement && this.previouslyFocusedElement.focus) {
      this.previouslyFocusedElement.focus();
    }
  }

  /**
   * Destroy the focus trap
   */
  destroy() {
    this.deactivate();
    this.element = null;
    this.focusableElements = [];
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
  }
}

/**
 * Helper function to create and manage a focus trap
 * @param {HTMLElement|string} element - Element or selector
 * @param {Object} options - Configuration options
 */
function createFocusTrap(element, options = {}) {
  const el = typeof element === 'string'
    ? document.querySelector(element)
    : element;

  if (!el) {
    console.error('Focus trap element not found');
    return null;
  }

  const trap = new FocusTrap(el);

  // Handle Escape key to close
  if (options.escapeDeactivates !== false) {
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && trap.isActive) {
        trap.deactivate();
        if (options.onEscape) {
          options.onEscape();
        }
      }
    };
    document.addEventListener('keydown', escapeHandler);
    trap.escapeHandler = escapeHandler;
  }

  return trap;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FocusTrap, createFocusTrap };
}
