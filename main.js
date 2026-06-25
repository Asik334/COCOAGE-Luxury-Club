// COCOAGE LUXURY CLUB — JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // ——— NAV SCROLL EFFECT ———
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ——— BURGER MENU ———
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mmLinks = document.querySelectorAll('.mm-link');

  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    burger.classList.toggle('active');
    const isOpen = mobileMenu.classList.contains('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mmLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ——— INTERSECTION OBSERVER ———
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

  // Gold line
  const goldLine = document.querySelector('.gold-line-inner');
  if (goldLine) {
    new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting && goldLine.classList.add('animate'));
    }, { threshold: 0.5 }).observe(goldLine);
  }

  // Service cards with staggered delay
  const serviceCards = document.querySelectorAll('.service-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
        cardObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  serviceCards.forEach(card => cardObserver.observe(card));

  // Generic fade-in for sections
  const fadeEls = document.querySelectorAll('.section-header, .about-text, .about-visual, .doctor-card, .contact-info, .contact-map');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    fadeObserver.observe(el);
  });

  // ——— SMOOTH ANCHOR SCROLL ———
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ——— PARALLAX HERO BG (subtle) ———
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.25}px)`;
    }, { passive: true });
  }

  // ——— CURSOR GOLD TRAIL (desktop only) ———
  if (window.innerWidth > 900 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed; width: 6px; height: 6px;
      background: rgba(201,169,110,0.6); border-radius: 50%;
      pointer-events: none; z-index: 9999;
      transition: transform 0.15s ease, opacity 0.3s ease;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(trail);

    let mx = 0, my = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
    });
    const animateTrail = () => {
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      trail.style.left = (tx - 3) + 'px';
      trail.style.top = (ty - 3) + 'px';
      requestAnimationFrame(animateTrail);
    };
    animateTrail();
  }

});
