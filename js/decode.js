/* Typing/Coding animation for hero text (h1 and p)
   - Simulates text being typed character by character like in a terminal
   - Includes cursor blink effect
   - Triggered on page load
*/
(function () {
  
  function typeText(element, delay = 0) {
    const originalText = element.getAttribute('data-text') || element.textContent;
    const isHTML = element.querySelector('.accent'); // Check if contains HTML elements
    
    // Store original HTML structure if exists
    const originalHTML = isHTML ? element.innerHTML : null;
    
    // Extract plain text for animation (without HTML tags)
    let plainText = originalText;
    
    // Check if text has accent part (after " — ")
    const hasAccent = plainText.includes(' — ');
    const accentStartIndex = hasAccent ? plainText.indexOf(' — ') + 3 : -1;
    
    const typingSpeed = 50; // ms per character
    let currentIndex = 0;
    
    // Clear element and add cursor
    element.innerHTML = '';
    element.style.position = 'relative';
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    cursor.style.cssText = 'animation: blink 0.7s infinite; margin-left: 2px; color: var(--accent);';
    
    const animate = () => {
      if (currentIndex < plainText.length) {
        // Remove cursor temporarily
        const cursorParent = cursor.parentNode;
        if (cursorParent) cursorParent.removeChild(cursor);
        
        // Build text with proper styling
        const displayText = plainText.substring(0, currentIndex + 1);
        
        if (hasAccent && currentIndex >= accentStartIndex) {
          // Split into regular and accent parts
          const regularPart = displayText.substring(0, accentStartIndex);
          const accentPart = displayText.substring(accentStartIndex);
          
          element.innerHTML = `${regularPart}<span class="accent">${accentPart}</span>`;
        } else {
          element.textContent = displayText;
        }
        
        element.appendChild(cursor);
        
        currentIndex++;
        setTimeout(animate, typingSpeed);
      } else {
        // Typing complete - restore original HTML if needed
        setTimeout(() => {
          // Remove cursor
          if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
          }
          
          // Restore original HTML with styling
          if (originalHTML) {
            element.innerHTML = originalHTML;
          } else {
            element.textContent = plainText;
          }
        }, 500); // Small delay before removing cursor
      }
    };
    
    // Start animation after delay
    setTimeout(() => {
      animate();
    }, delay);
  }
  
  // Run on page load
  window.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroLead = document.querySelector('.hero .lead');
    
    // Add cursor blink animation to document
    if (!document.querySelector('#cursor-blink-style')) {
      const style = document.createElement('style');
      style.id = 'cursor-blink-style';
      style.textContent = `
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    if (heroTitle) {
      typeText(heroTitle, 800); // Start after 800ms
    }
    
    if (heroLead) {
      // Calculate delay: 800ms initial + title length * 50ms + 300ms pause
      const titleLength = heroTitle ? (heroTitle.getAttribute('data-text') || heroTitle.textContent).length : 0;
      const leadDelay = 800 + (titleLength * 50) + 500;
      typeText(heroLead, leadDelay); // Start after title finishes
    }
    
    // Footer text animation with IntersectionObserver
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !footerText.classList.contains('animated')) {
            footerText.classList.add('animated');
            typeText(footerText, 300);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(footerText);
    }
  });
})();
