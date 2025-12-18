// Global variables
let currentTheme = 'light';

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('Phoenix website loaded successfully!');
    initializeWebsite();
});

// Initialize website functionality
function initializeWebsite() {
    // Add smooth scrolling to all internal links
    addSmoothScrolling();
    
    // Add active navigation highlighting
    updateActiveNavigation();
    
    // Add loading animation to feature cards
    animateOnScroll();
}

// Show welcome message (used by CTA button)
function showMessage() {
    const messages = [
        'Welcome to Phoenix! 🔥',
        'Ready to build something amazing? 🚀',
        'Let\'s create the future together! ⭐',
        'Phoenix is here to help you soar! 🦅'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create and show custom alert
    showCustomAlert(randomMessage);
}

// Custom alert function
function showCustomAlert(message) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert';
    alertDiv.innerHTML = `
        <div class="alert-content">
            <span class="alert-message">${message}</span>
            <button class="alert-close" onclick="closeAlert()">&times;</button>
        </div>
    `;
    
    // Add styles for the alert
    const alertStyles = `
        .custom-alert {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        }
        
        .alert-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .alert-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .alert-close:hover {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#alert-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'alert-styles';
        styleSheet.textContent = alertStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.contains(alertDiv)) {
            closeAlert();
        }
    }, 5000);
}

// Close custom alert
function closeAlert() {
    const alert = document.querySelector('.custom-alert');
    if (alert) {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.contains(alert)) {
                alert.remove();
            }
        }, 300);
    }
}

// Highlight team member (used on about page)
function highlightMember(memberElement) {
    // Remove highlight from all members
    const allMembers = document.querySelectorAll('.team-member');
    allMembers.forEach(member => {
        member.classList.remove('highlighted');
    });
    
    // Add highlight to clicked member
    memberElement.classList.add('highlighted');
    
    // Show member info
    const memberName = memberElement.querySelector('h3').textContent;
    const memberRole = memberElement.querySelector('p').textContent;
    
    showCustomAlert(`Meet ${memberName}, our ${memberRole}! 👋`);
}

// Add smooth scrolling to internal links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Update active navigation based on current page
function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (href === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe feature cards and team members
    const animateElements = document.querySelectorAll('.feature-card, .team-member');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility function to toggle theme (for future enhancement)
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
}

// Load saved theme on page load
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.body.setAttribute('data-theme', currentTheme);
    }
}

// Navigation menu toggle for mobile (future enhancement)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-active');
}

// Form validation helper (for future forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Console welcome message
console.log(`
🔥 Phoenix Website Loaded Successfully! 🔥

Features:
- Responsive design
- Smooth animations
- Interactive elements
- Modern ES6+ JavaScript

Developed with ❤️
`);

// Export functions for testing (if module system is used)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showMessage,
        highlightMember,
        toggleTheme,
        validateForm
    };
}