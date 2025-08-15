// Screen Size Warning Functionality
function checkScreenSize() {
    const warning = document.getElementById('screenWarning');
    const body = document.body;
    
    if (window.innerWidth < 768) {
        warning.classList.add('show');
        body.classList.add('warning-shown');
    } else {
        warning.classList.remove('show');
        body.classList.remove('warning-shown');
    }
}

// Check screen size on page load and resize
document.addEventListener('DOMContentLoaded', checkScreenSize);
window.addEventListener('resize', checkScreenSize);
