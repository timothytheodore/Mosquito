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

// App Interface Screen Switching
function switchScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the selected screen
    const targetScreen = document.querySelector(`[data-screen="${screenName}"]`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Update control buttons
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the corresponding control button
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        const btnText = btn.querySelector('span:last-child')?.textContent.toLowerCase();
        if (btnText === screenName) {
            btn.classList.add('active');
        }
    });
}

// Simulate camera detection for demo
function simulateDetection() {
    const detectionOverlay = document.querySelector('.detection-overlay');
    const detectionBox = document.querySelector('.detection-box');
    
    if (detectionOverlay && detectionBox) {
        // Add a scanning animation effect
        detectionOverlay.style.opacity = '0.5';
        setTimeout(() => {
            detectionOverlay.style.opacity = '1';
            detectionBox.style.animation = 'pulse 0.5s ease-in-out';
            
            // Show concept alert
            showConceptAlert('Demo Detection Completed', 'This is a conceptual demonstration of the detection interface.');
        }, 1500);
    }
}

// Show concept alert for demo interactions
function showConceptAlert(title = 'Concept Demo', message = 'This is a conceptual design. Feature not yet implemented.') {
    // Create modal overlay if it doesn't exist
    let modalOverlay = document.querySelector('.concept-modal-overlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.className = 'concept-modal-overlay';
        modalOverlay.innerHTML = `
            <div class="concept-modal">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" onclick="closeConceptAlert()">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="modal-message">${message}</p>
                    <div class="modal-note">
                        <span class="note-icon">💡</span>
                        <span>This interface is a conceptual design for research and demonstration purposes.</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn" onclick="closeConceptAlert()">Understood</button>
                </div>
            </div>
        `;
        document.body.appendChild(modalOverlay);
        
        // Add modal styles dynamically
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .concept-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                animation: fadeIn 0.3s ease-out forwards;
            }
            
            .concept-modal {
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                transform: scale(0.8);
                animation: modalSlideIn 0.3s ease-out forwards;
            }
            
            .modal-header {
                padding: 24px 24px 16px;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .modal-title {
                margin: 0;
                color: #1f2937;
                font-size: 1.25rem;
                font-weight: 600;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #6b7280;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s;
            }
            
            .modal-close:hover {
                background-color: #f3f4f6;
            }
            
            .modal-body {
                padding: 16px 24px;
            }
            
            .modal-message {
                color: #374151;
                line-height: 1.6;
                margin: 0 0 16px 0;
            }
            
            .modal-note {
                background: #f0f9ff;
                border: 1px solid #0ea5e9;
                border-radius: 8px;
                padding: 12px;
                display: flex;
                align-items: flex-start;
                gap: 8px;
                font-size: 0.875rem;
                color: #0369a1;
            }
            
            .note-icon {
                flex-shrink: 0;
                margin-top: 1px;
            }
            
            .modal-footer {
                padding: 16px 24px 24px;
                display: flex;
                justify-content: flex-end;
            }
            
            .modal-btn {
                background: #3b82f6;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .modal-btn:hover {
                background: #2563eb;
            }
            
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            
            @keyframes modalSlideIn {
                to { transform: scale(1); }
            }
        `;
        document.head.appendChild(modalStyles);
    } else {
        // Update existing modal content
        modalOverlay.querySelector('.modal-title').textContent = title;
        modalOverlay.querySelector('.modal-message').textContent = message;
    }
    
    modalOverlay.style.display = 'flex';
}

// Close concept alert modal
function closeConceptAlert() {
    const modalOverlay = document.querySelector('.concept-modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            modalOverlay.style.animation = '';
        }, 300);
    }
}

// Add CSS for fade out animation
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes fadeOut {
        to { opacity: 0; }
    }
`;
document.head.appendChild(additionalStyles);

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add hover effects for concept cards
document.querySelectorAll('.feature-card, .stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
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

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Initialize the interface to show home screen
document.addEventListener('DOMContentLoaded', () => {
    switchScreen('home');
    
    // Add stagger animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add interaction effects to interface controls
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
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

// Add keyboard navigation for app interface
document.addEventListener('keydown', (e) => {
    const currentScreen = document.querySelector('.screen.active');
    if (!currentScreen) return;
    
    const screens = ['home', 'camera', 'map', 'analytics', 'reports'];
    const currentIndex = screens.indexOf(currentScreen.getAttribute('data-screen'));
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        switchScreen(screens[currentIndex - 1]);
    } else if (e.key === 'ArrowRight' && currentIndex < screens.length - 1) {
        switchScreen(screens[currentIndex + 1]);
    } else if (e.key === 'Escape') {
        closeConceptAlert();
    }
});