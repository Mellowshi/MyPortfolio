// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 50, // 50px offset to account for fixed header
            behavior: 'smooth'
        });
    });
});

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Form Validation (Simple)
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', function (e) {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Simple validation for required fields
    if (!name.value || !email.value || !message.value) {
        e.preventDefault();
        alert('Please fill in all the fields!');
    } else {
        alert('Message sent successfully!');
    }
});

// Function to change navigation color based on background
function changeNavColorOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentSection = '';

    // Loop through sections to find the one in the viewport
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        // If the section is in the viewport
        if (rect.top <= 0 && rect.bottom >= 0) {
            currentSection = section.id;
        }
    });

    // Loop through navigation links and update their color
    navLinks.forEach((link) => {
        const linkHref = link.getAttribute('href').substring(1); // Remove the '#' symbol

        // Default color
        link.style.transition = "color 0.2s ease"; // Quick transition for better performance
        link.style.color = '#fff'; // Default white color

        // Check if the link matches the current section and if the section background is white
        if (currentSection === linkHref) {
            const section = document.getElementById(currentSection);
            const sectionBackgroundColor = window.getComputedStyle(section).backgroundColor;

            // Check if the background color is close to white
            if (isWhiteBackground(sectionBackgroundColor)) {
                link.style.color = '#333'; // Dark color for white background sections
            } else {
                link.style.color = '#ff007f'; // Yellow color for non-white backgrounds
            }
        }
    });
}

// Function to determine if a section's background is close to white
function isWhiteBackground(color) {
    const rgb = color.match(/\d+/g);
    const [r, g, b] = rgb.map(Number);
    return (r > 200 && g > 200 && b > 200); // Close to white RGB values
}

// Add event listener to the scroll event to trigger color change
window.addEventListener('scroll', () => {
    // Use requestAnimationFrame for smoother scroll handling
    requestAnimationFrame(changeNavColorOnScroll);
});

// Also trigger the function on page load
document.addEventListener('DOMContentLoaded', changeNavColorOnScroll);
