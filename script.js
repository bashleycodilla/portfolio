function main() {
    initNavHighlight();
    initSkillBars();
    initPortfolioCards();
    initTimelineCards();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', sendEmail);
    }
}


function initNavHighlight() {
 
    const navLinks = document.querySelectorAll('.nav a');
    if (navLinks.length === 0) return;
    
    // Adding a "click" listener to every single link
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            // Removing the highlight from all other links first
            navLinks.forEach(function (l) {
                l.classList.remove('active');
            });
            // Adding the highlight to the one link I just clicked
            this.classList.add('active');
        });
    });
    // Setting the first link as active by default
    navLinks[0].classList.add('active');
}

// Making the skill progress bars animate or "grow"
function initSkillBars() {
    // Finding every progress bar on the page
    const fills = document.querySelectorAll('.skill-fill');
    if (fills.length === 0) return;
    
    fills.forEach(function (fill) {
        // Grabbing the percentage I set in HTML/CSS
        const targetWidth = fill.style.width;
        // Resetting it to 0% so it can grow
        fill.style.width = '0%';
        // Waiting a split second before growing the bar
        setTimeout(function () {
            fill.style.width = targetWidth;
        }, 300);
    });
}

// Making project cards fade in and slide up
function initPortfolioCards() {
    const cards = document.querySelectorAll('.portfolio-card');
    if (cards.length === 0) return;

    cards.forEach(function (card, index) {
        // Hiding the card initially
        card.style.opacity = '0';
        // Moving the card down 20 pixels
        card.style.transform = 'translateY(20px)';
        
        // Creating a "staggered" reveal effect
        setTimeout(function () {
            // Enabling the smooth movement transition
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            // Making the card visible
            card.style.opacity = '1';
            // Moving the card back to its original position
            card.style.transform = 'translateY(0)';
        }, index * 80);
    });
}

// Making the timeline items slide in from the left
function initTimelineCards() {
    const cards = document.querySelectorAll('.timeline-card');
    if (cards.length === 0) return;

    cards.forEach(function (card, i) {
        // Hiding the card initially
        card.style.opacity = '0';
        // Starting the card 20 pixels to the left
        card.style.transform = 'translateX(-20px)';
        
        // Creating a "staggered" reveal effect
        setTimeout(function () {
            // Enabling the smooth movement transition
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            // Making the card visible
            card.style.opacity = '1';
            // Moving the card back to its original position
            card.style.transform = 'translateX(0)';
        }, i * 120);
    });
}

// Sending the contact form data to Formspree
function sendEmail(event) {
    // Stopping the page from refreshing
    event.preventDefault(); 

    // Capturing the text you typed
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var btn = document.getElementById('send-btn');

    // Stopping if any box is empty
    if (!name || !email || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
    }

    // Changing the button text during send
    btn.textContent = 'Sending...';
    // Freezing the button
    btn.disabled = true;

    // Sending the data to the Formspree server
    fetch("https://formspree.io/f/xpqbdeok", {
        method: "POST",
        body: JSON.stringify({ name: name, email: email, message: message }),
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(function() {
        // Confirming success to the user
        showStatus('Message sent! 😊', 'success');
        // Clearing the text boxes
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
        // Resetting the button
        btn.textContent = 'Send Message ✉';
        btn.disabled = false;
    })
    .catch(function() {
        // Handling errors if the send fails
        showStatus('Oops! Something went wrong. Please try again.', 'error');
        // Resetting the button
        btn.textContent = 'Send Message ✉';
        btn.disabled = false;
    });
}

// For showing the success or error message on the screen
function showStatus(message, type) {
    // Finding the empty text area for status messages
    var status = document.getElementById('status-msg');
    if (!status) return;
    // Injecting the specific message text
    status.textContent = message;
    // Styling the text color
    status.className = 'status-msg ' + type;
}

// Triggering the main function once the browser is ready
window.addEventListener('load', main);