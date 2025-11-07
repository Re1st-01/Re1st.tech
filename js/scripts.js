document.addEventListener('DOMContentLoaded', function() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
        const nav = document.getElementById('nav');
        if (nav) {
          nav.classList.remove('open');
          document.body.classList.remove('nav-open');
        }
      }
    });
  });

  (function() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const body = document.body;
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('open');
      body.classList.toggle('nav-open');
    });
    
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && 
          !nav.contains(e.target) && 
          !toggle.contains(e.target)) {
        nav.classList.remove('open');
        body.classList.remove('nav-open');
      }
    });
    
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        body.classList.remove('nav-open');
      });
    });
  })();

  (function() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let lastScrollTop = 0;
    const scrollThreshold = 200;
    
    function updateHeaderVisibility() {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      
      if (st > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      if (st > lastScrollTop && st > scrollThreshold) {
        header.classList.add('hidden');
      } else if (st < lastScrollTop || st < scrollThreshold) {
        header.classList.remove('hidden');
      }
      
      lastScrollTop = st <= 0 ? 0 : st;
    }
    
    window.addEventListener('scroll', updateHeaderVisibility, {passive: true});
    updateHeaderVisibility();
  })();

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  
  function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    if (scrollY < 200) {
      navLinks.forEach(link => link.classList.remove('active'));
      const aboutLink = document.querySelector('.nav a[href="#about"]');
      if (aboutLink) aboutLink.classList.add('active');
    }
  }
  
  window.addEventListener('scroll', highlightNav);
  highlightNav();
});
