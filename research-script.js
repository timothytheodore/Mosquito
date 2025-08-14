// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .step-item, .area-card, .tool-category').forEach(element => {
    observer.observe(element);
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3, .metric h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[+,]/g, ''));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                counter.textContent = formatNumber(Math.floor(current));
            }
        }, 20);
    });
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + '+';
    }
    return num.toString();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.research-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add hover effects for cards
document.querySelectorAll('.area-card, .tool-category, .step-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for page header
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.page-header');
    const rate = scrolled * -0.3;
    
    if (header) {
        header.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add stagger animation to methodology steps
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step-item');
    steps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.2}s`;
    });
});

// Research areas interactive effects
document.querySelectorAll('.area-card').forEach((card, index) => {
    card.addEventListener('click', function() {
        // Add a subtle click effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        }, 150);
    });
});

// Tool category expansion effect
document.querySelectorAll('.tool-category').forEach(category => {
    category.addEventListener('click', function() {
        const toolList = this.querySelector('.tool-list');
        toolList.classList.toggle('expanded');
    });
});

// Publication item interactions
document.querySelectorAll('.publication-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const tags = this.querySelectorAll('.publication-tags span');
        tags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
            tag.classList.add('tag-animate');
        });
    });
    
    item.addEventListener('mouseleave', function() {
        const tags = this.querySelectorAll('.publication-tags span');
        tags.forEach(tag => {
            tag.classList.remove('tag-animate');
        });
    });
});

// Add CSS for tag animation
const style = document.createElement('style');
style.textContent = `
    .tag-animate {
        animation: tagPulse 0.6s ease-out;
    }
    
    @keyframes tagPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);