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

// ===== LIGHTBOX GALLERY =====
let currentImageIndex = 0;
let galleryImages = [];

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    // Get all gallery images
    galleryImages = Array.from(document.querySelectorAll('.gallery-item img')).map(img => img.src);
    currentImageIndex = galleryImages.indexOf(imageSrc);
    
    lightboxImg.src = imageSrc;
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    document.getElementById('lightboxImg').src = galleryImages[currentImageIndex];
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    document.getElementById('lightboxImg').src = galleryImages[currentImageIndex];
}

// Close lightbox when clicking outside image
document.addEventListener('click', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(event) {
    if (document.getElementById('lightbox').classList.contains('active')) {
        if (event.key === 'ArrowRight') nextImage();
        if (event.key === 'ArrowLeft') previousImage();
        if (event.key === 'Escape') closeLightbox();
    }
});

// ===== EVENT REGISTRATION MODAL =====
function openEventModal() {
    document.getElementById('eventModal').style.display = 'flex';
}

function closeEventModal() {
    document.getElementById('eventModal').style.display = 'none';
}

// Handle event registration form
document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for registering! We will send you confirmation details.');
            closeEventModal();
            eventForm.reset();
        });
    }
});

// ===== NEWSLETTER POPUP =====
function openNewsletter() {
    document.getElementById('newsletterModal').style.display = 'flex';
}

function closeNewsletter() {
    document.getElementById('newsletterModal').style.display = 'none';
}

// Show newsletter popup after 30 seconds
setTimeout(function() {
    openNewsletter();
}, 30000);

// Handle newsletter form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter popup form
    const newsletterModal = document.getElementById('newsletterModal');
    if (newsletterModal) {
        const form = newsletterModal.querySelector('form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            closeNewsletter();
            form.reset();
        });
    }

    // Newsletter footer form
    const footerForm = document.querySelector('.newsletter-footer-form');
    if (footerForm) {
        footerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            footerForm.reset();
        });
    }
});

// ===== SMOOTH SCROLL NAVIGATION =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply scroll animations to event cards and gallery items
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.event-card, .gallery-item, .section-subtitle');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

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
