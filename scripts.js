document.addEventListener('DOMContentLoaded', () => {

  // ========== INITIALIZE AOS (Animate on Scroll) ==========
  AOS.init({
    duration: 800,
    once: true,
    offset: 50,
  });

  // ========== LOADER ==========
  const loader = document.getElementById('pageLoader');
  const site = document.getElementById('site');
  window.addEventListener('load', () => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        site?.classList.remove('hidden');
      }, 3000);
    }
  });

  // ========== HEADER ON SCROLL ==========
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ========== MOBILE NAVIGATION ==========
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = menuBtn.querySelector('i');
  menuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
    });
  });

  // ========== THEME TOGGLE ==========
  const themeToggle = document.getElementById('themeToggle');
  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '☼' : '☾';
  });

  // ========== REAL-TIME DATE + CLOCK ==========
  const clockElement = document.getElementById('real-time-clock');
  function updateClock() {
    if (!clockElement) return;
    const now = new Date();

    // Date format
    const dateOptions = { weekday: 'long', year: 'numeric', day: 'long', month: 'long' };
    const dateStr = now.toLocaleDateString('en-US', dateOptions);

    // Time format
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const timeStr = now.toLocaleTimeString('en-US', timeOptions);

    // Final output
    clockElement.textContent = `${dateStr} | ${timeStr}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // ========== HERO TYPEWRITER EFFECT ==========
  const typewriterTextElement = document.getElementById('typewriter-text');
  if (typewriterTextElement) {
    const phrases = ['Frontend Developer.', 'UI/UX Enthusiast.', 'Creative Coder.'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];
      let displayText = isDeleting ? currentPhrase.substring(0, charIndex - 1) : currentPhrase.substring(0, charIndex + 1);
      typewriterTextElement.textContent = displayText;
      let typingSpeed = 120;
      if (isDeleting) typingSpeed /= 2;
      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }
      charIndex += isDeleting ? -1 : 1;
      setTimeout(typeWriter, typingSpeed);
    }
    typeWriter();
  }

  // ========== ANIMATED STATS COUNTER ==========
  const statsSection = document.querySelector('.stats-grid');
  let hasAnimated = false;
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        const stats = document.querySelectorAll('.stat-num');
        stats.forEach(stat => {
          const goal = +stat.dataset.goal;
          let start = 0;
          const duration = 2000;
          const increment = goal / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= goal) {
              stat.textContent = goal.toLocaleString() + (stat.dataset.goal.includes('%') ? '%' : '');
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(start).toLocaleString();
            }
          }, 16);
        });
        hasAnimated = true;
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  // ========== MODAL LOGIC ==========
  const imageModal = document.getElementById('imageModal');
  const closeModalBtn = document.getElementById('closeModal');
  const openModalBtns = document.querySelectorAll('.open-modal');
  
  function openModal(img, title, desc) {
    if (!imageModal) return;
    imageModal.querySelector('#modalImg').src = img;
    imageModal.querySelector('#modalTitle').textContent = title;
    const descEl = imageModal.querySelector('#modalDesc');
    if (desc) {
      descEl.textContent = desc;
      descEl.style.display = 'block';
    } else {
      descEl.style.display = 'none';
    }
    imageModal.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!imageModal) return;
    imageModal.classList.remove('visible');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.img, btn.dataset.title, btn.dataset.desc);
    });
  });

  closeModalBtn?.addEventListener('click', closeModal);
  imageModal?.addEventListener('click', (e) => {
    if (e.target === imageModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal?.classList.contains('visible')) closeModal();
  });

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  contactForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    formStatus.textContent = "Sending...";
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      formStatus.textContent = data.success ? "Message sent successfully!" : "Something went wrong.";
      if (data.success) contactForm.reset();
      setTimeout(() => formStatus.textContent = "", 5000);
    })
    .catch(() => {
      formStatus.textContent = "Something went wrong.";
      setTimeout(() => formStatus.textContent = "", 5000);
    });
  });

  // ========== BACK TO TOP BUTTON ==========
  const backToTopButton = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTopButton.classList.toggle('visible', window.scrollY > 300);
  });

  // ========== YEAR IN FOOTER ==========
  document.getElementById('year').textContent = new Date().getFullYear();
});


