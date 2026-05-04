function main() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY");
    }
    initNavHighlight();
    initSkillBars();
    initPortfolioCards();
    initTimelineCards();
}

function initNavHighlight() {
    const navLinks = document.querySelectorAll('.nav a');
    if (navLinks.length === 0) return;
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.forEach(function (l) {
                l.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    navLinks[0].classList.add('active');
}

function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    if (fills.length === 0) return;
    fills.forEach(function (fill) {
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        setTimeout(function () {
            fill.style.width = targetWidth;
        }, 300);
    });
}

function initPortfolioCards() {
    const cards = document.querySelectorAll('.portfolio-card');
    if (cards.length === 0) return;
    cards.forEach(function (card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(function () {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 80);
    });
}

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

function sendEmail() {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    var btn = document.getElementById('send-btn');
    if (!name || !email || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
    }
    btn.textContent = 'Sending...';
    btn.disabled = true;
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function () {
        showStatus('Message sent! I will get back to you soon. 😊', 'success');
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
        btn.textContent = 'Send Message ✉';
        btn.disabled = false;
    })
    .catch(function (error) {
        showStatus('Oops! Something went wrong. Please try again.', 'error');
        btn.textContent = 'Send Message ✉';
        btn.disabled = false;
    });
}

function showStatus(message, type) {
    var status = document.getElementById('status-msg');
    if (!status) return;
    status.textContent = message;
    status.className = 'status-msg ' + type;
}

window.addEventListener('load', main);