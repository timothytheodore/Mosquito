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
document.querySelectorAll('.section, .tech-category, .process-step, .detection-card, .testing-phase, .timeline-item, .impact-card').forEach(element => {
    observer.observe(element);
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-box h3, .metric-value, .impact-stat h4');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const hasPercent = text.includes('%');
        const hasTime = text.includes('s');
        const hasPlusMinus = text.includes('±');
        
        let target = parseFloat(text.replace(/[%s±+]/g, ''));
        
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let displayValue = current.toFixed(1);
            if (hasPercent) displayValue += '%';
            if (hasTime) displayValue += 's';
            if (hasPlusMinus) displayValue = '±' + displayValue + '%';
            if (text.includes('+') && !hasPlusMinus) displayValue += '+';
            
            counter.textContent = displayValue;
        }, 30);
    });
}

// Trigger counter animation when stats sections are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsElements = document.querySelectorAll('.project-stats, .detection-metrics, .impact-metrics');
statsElements.forEach(element => {
    if (element) {
        statsObserver.observe(element);
    }
});

// Process step hover effects
document.querySelectorAll('.process-step').forEach((step, index) => {
    step.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(15px) scale(1.02)';
    });
    
    step.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// Tech category interactive effects
document.querySelectorAll('.tech-category').forEach(category => {
    category.addEventListener('click', function() {
        const techItems = this.querySelectorAll('.tech-items span');
        techItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('tech-highlight');
        });
        
        setTimeout(() => {
            techItems.forEach(item => {
                item.classList.remove('tech-highlight');
            });
        }, 2000);
    });
});

// Detection card interactive features
document.querySelectorAll('.detection-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const metrics = this.querySelectorAll('.metric');
        metrics.forEach((metric, index) => {
            metric.style.animationDelay = `${index * 0.1}s`;
            metric.classList.add('metric-pulse');
        });
    });
    
    card.addEventListener('mouseleave', function() {
        const metrics = this.querySelectorAll('.metric');
        metrics.forEach(metric => {
            metric.classList.remove('metric-pulse');
        });
    });
});

// Timeline progress animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
        item.classList.add('timeline-animate');
    });
}

// Trigger timeline animation when visible
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateTimeline();
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const timeline = document.querySelector('.status-timeline');
if (timeline) {
    timelineObserver.observe(timeline);
}

// Parallax effect for page header
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.page-header');
    const rate = scrolled * -0.3;
    
    if (header) {
        header.style.transform = `translateY(${rate}px)`;
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .tech-highlight {
        animation: techHighlight 0.6s ease-out;
        transform: scale(1.1);
    }
    
    @keyframes techHighlight {
        0% { transform: scale(1); background: linear-gradient(135deg, #8bc34a 0%, #26a69a 100%); }
        50% { transform: scale(1.2); background: linear-gradient(135deg, #aed581 0%, #4dd0e1 100%); }
        100% { transform: scale(1.1); background: linear-gradient(135deg, #8bc34a 0%, #26a69a 100%); }
    }
    
    .metric-pulse {
        animation: metricPulse 1s ease-out;
    }
    
    @keyframes metricPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .timeline-animate {
        animation: timelineSlide 0.8s ease-out;
    }
    
    @keyframes timelineSlide {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(38, 166, 154, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(38, 166, 154, 0);
        }
    }
`;
document.head.appendChild(style);

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Copy dosage information to clipboard
document.querySelectorAll('.treatment-info').forEach(info => {
    info.addEventListener('click', function() {
        const text = this.textContent;
        navigator.clipboard.writeText(text).then(() => {
            // Show temporary feedback
            const feedback = document.createElement('div');
            feedback.textContent = 'Treatment info copied!';
            feedback.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #8bc34a 0%, #26a69a 100%);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                z-index: 10000;
                animation: fadeInOut 2s ease-out;
            `;
            document.body.appendChild(feedback);
            
            setTimeout(() => {
                feedback.remove();
            }, 2000);
        });
    });
});

// Add fade in/out animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(fadeStyle);