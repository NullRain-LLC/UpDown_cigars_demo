// Age Verification
function showModal() {
    const modal = document.getElementById('ageVerificationModal');
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('ageVerificationModal');
    modal.style.display = 'none';
}

function allowAccess() {
    // Set a cookie to remember the user is 21+
    document.cookie = "ageVerified=true; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/";
    closeModal();
    // Remove the age verification overlay from the body
    document.body.classList.remove('restricted');
}

function blockAccess() {
    // Set a cookie to remember the user is under 21
    document.cookie = "ageVerified=false; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/";
    // Redirect to a parent page or homepage with age restriction message
    alert("You must be 21 years or older to access this site.");
    window.location.href = "https://www.google.com";
}

// Check if the user has already verified their age
function checkAgeVerification() {
    const cookieValue = document.cookie.replace(/(?:(?:;\s*)?(?:[^=]+)=)?([^;]*)(?:;|$)/g, '$1').split(';').map(decodeURIComponent)[0];
    
    if (cookieValue === 'ageVerified=true') {
        // User has already verified, allow access
        document.body.classList.remove('restricted');
    } else {
        // Show the modal if no cookie exists or it's expired
        showModal();
    }
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    
    // Toggle hamburger icon positions
    const bars = menuToggle.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.classList.toggle('active');
    });
}

// Initialize the page
window.onload = function() {
    // Check for age verification cookie when page loads
    checkAgeVerification();
    
    // Set up event listeners for mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Initialize any other page-specific functionality
};
