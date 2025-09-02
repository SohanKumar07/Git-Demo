// Theme Toggle Functionality
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️';
    }
}

// Navigation Functionality
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    document.getElementById(sectionName).style.display = 'block';
    
    // Update active nav item
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.style.color = 'var(--text-color)';
        link.style.backgroundColor = 'transparent';
    });
    
    // Highlight clicked nav item
    if (event && event.target) {
        event.target.style.color = 'var(--accent-color)';
        event.target.style.backgroundColor = 'rgba(189, 51, 51, 0.1)';
    }
}

// Follow Button Functionality
function toggleFollow() {
    const followBtn = document.getElementById('followBtn');
    if (followBtn.textContent === 'Follow') {
        followBtn.textContent = 'Following';
        followBtn.classList.add('following');
        // Optional: Add animation or notification
        showNotification('Thanks for following!');
    } else {
        followBtn.textContent = 'Follow';
        followBtn.classList.remove('following');
        showNotification('Unfollowed successfully');
    }
}

// Login Modal Functionality
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    // Clear form fields
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (in real app, you'd authenticate with backend)
    if (email && password) {
        showNotification('Login successful! Welcome back, ' + email);
        closeLoginModal();
        
        // Update login button to show logged in state
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.textContent = 'Account';
        loginBtn.onclick = () => showAccountMenu();
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

// Account Menu (after login)
function showAccountMenu() {
    const menu = confirm('Account Menu:\n\n1. View Profile\n2. Settings\n3. Logout\n\nChoose an option:');
    if (menu) {
        // Simple logout functionality
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.textContent = 'Login';
        loginBtn.onclick = openLoginModal;
        showNotification('Logged out successfully');
    }
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: ${type === 'error' ? '#e74c3c' : '#27ae60'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 3000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for navigation
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhanced contact functionality
function handleContactClick(type) {
    switch(type) {
        case 'email':
            window.location.href = 'mailto:sohan.dev@email.com';
            break;
        case 'linkedin':
            window.open('https://linkedin.com/in/sohansingh', '_blank');
            break;
        case 'github':
            window.open('https://github.com/sohansingh', '_blank');
            break;
        case 'phone':
            window.location.href = 'tel:+919876543210';
            break;
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLoginModal();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // ESC to close modal
    if (event.key === 'Escape') {
        closeLoginModal();
    }
    
    // Alt + T for theme toggle
    if (event.altKey && event.key === 't') {
        event.preventDefault();
        toggleTheme();
    }
    
    // Alt + L for login
    if (event.altKey && event.key === 'l') {
        event.preventDefault();
        openLoginModal();
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
    
    // Add click handlers to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        const types = ['email', 'linkedin', 'github', 'phone'];
        item.style.cursor = 'pointer';
        item.onclick = () => handleContactClick(types[index]);
    });
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to Sohan Singh\'s Portfolio!');
    }, 1000);
});

// Additional utility functions
function animateOnScroll() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Load theme from localStorage (if you want to persist theme)
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        document.querySelector('.theme-toggle').textContent = '☀️';
    }
}

// Save theme to localStorage
function saveTheme() {
    const theme = document.body.getAttribute('data-theme');
    if (theme) {
        localStorage.setItem('theme', theme);
    } else {
        localStorage.removeItem('theme');
    }
}

// Update toggleTheme to save preference
const originalToggleTheme = toggleTheme;
toggleTheme = function() {
    originalToggleTheme();
    saveTheme();
}

// Initialize theme on load
// loadTheme(); // Uncomment this if you want to persist theme across sessions

// Add typing effect to hero text
function typeWriter(text, element, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// Animate hero text on page load
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-section h1');
    const originalText = heroTitle.textContent;
    typeWriter(originalText, heroTitle, 80);
});
animateOnScroll();
loadTheme(); // Uncomment this if you want to persist theme across sessions