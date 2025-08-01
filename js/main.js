// DOM Elements
const header = document.querySelector('.header');
const themeToggle = document.getElementById('theme-toggle');
const scrollTopBtn = document.getElementById('scroll-top');
const navLinks = document.querySelectorAll('.nav-links a');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.getElementById('primary-navigation');
const contactForm = document.getElementById('contact-form');
const typingText = document.querySelector('.typing-text');

// Theme Toggle
function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Scroll to Top
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navigation Highlight
function highlightNavigation() {
    const sections = document.querySelectorAll('section');
    const navHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Navigation
function toggleMobileNav() {
    const visibility = primaryNav.getAttribute('data-visible');
    const isOpen = visibility === "true";
    
    primaryNav.setAttribute('data-visible', !isOpen);
    mobileNavToggle.setAttribute('aria-expanded', !isOpen);
    document.body.setAttribute('data-nav-open', !isOpen);
}

mobileNavToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileNav();
});

// Close mobile nav when clicking a link
primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        toggleMobileNav();
    });
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (primaryNav.getAttribute('data-visible') === 'true' &&
        !primaryNav.contains(e.target) &&
        !mobileNavToggle.contains(e.target)) {
        primaryNav.setAttribute('data-visible', false);
        mobileNavToggle.setAttribute('aria-expanded', false);
    }
});

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Typing Effect
function typeText() {
    const text = typingText.textContent;
    typingText.textContent = '';
    
    let charIndex = 0;
    const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
            typingText.textContent += text[charIndex];
            charIndex++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    highlightNavigation();
    typeText();
});
