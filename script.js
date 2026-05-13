function main() {
    initNavHighlight();
    initSkillBars();
    initPortfolioCards();
    initTimelineCards();

    //Attach submit event to form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', sendEmail);
    }
}

//Highlight clicked navigation link
function initNavHighlight() {
    const navLinks = document.querySelectorAll('.nav a');
    if (navLinks.length === 0) return;
    
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            //Remove active class from all links
            navLinks.forEach(function (l) {
                l.classList.remove('active');
            });
            //Add active class to clicked link
            this.classList.add('active');
        });
    });
    //Set first link active by default
    navLinks[0].classList.add('active');
}

//Animate skill bars progress
function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    if (fills.length === 0) return;
    
    fills.forEach(function (fill) {
        //Save target width from CSS
        const targetWidth = fill.style.width;
        //Reset to zero for animation
        fill.style.width = '0%';
        //Apply target width after delay
        setTimeout(function () {
            fill.style.width = targetWidth;
        }, 300);
    });
}

//Fade and slide up portfolio cards
function initPortfolioCards() {
    const cards = document.querySelectorAll('.portfolio-card');
    if (cards.length === 0) return;

    cards.forEach(function (card, index) {
        //Hide card initially
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        //Reveal cards with staggered delay
        setTimeout(function () {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 80);
    });
}

//Slide in timeline items from left
function initTimelineCards() {
    const cards = document.querySelectorAll('.timeline-card');
    if (cards.length === 0) return;

    cards.forEach(function (card, i) {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        
        setTimeout(function () {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, i * 120);
    });
}

//Submit form data to Formspree
function sendEmail(event) {
    // Prevent page reload on submit
    event.preventDefault(); 

    //Gather user input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var btn = document.getElementById('send-btn');

    //Basic empty field check
    if (!name || !email || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
    }

    //Update button state while sending
    btn.textContent = 'Sending...';
    btn.disabled = true;

    //Send data to Formspree endpoint
    fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: JSON.stringify({ name: name, email: email, message: message }),
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(function() {
        //Success handling and form reset
        showStatus('Message sent! 😊', 'success');
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
        btn.textContent = 'Send Message ✉';
        btn.disabled = false;
    })
    .catch(function() {
        //Error handling
        showStatus('Oops! Something went wrong. Please try again.', 'error');
        btn.textContent = 'Send Message ✉';
        btn.disabled = false;
    });
}

//Display success or error messages
function showStatus(message, type) {
    var status = document.getElementById('status-msg');
    if (!status) return;
    status.textContent = message;
    status.className = 'status-msg ' + type;
}

//Initialize script once page is loaded
window.addEventListener('load', main);