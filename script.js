// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});



document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.elements.name.value = '';
    e.target.elements.email.value = '';
    e.target.elements.message.value = '';
});


// community feedback
document.addEventListener("DOMContentLoaded", function() {
    var cards = document.querySelectorAll(".feedback-card");
    var currentIndex = 0;

    setInterval(function() {
        // Hide the current card
        cards[currentIndex].classList.remove("active");
        // Increment index and wrap around if needed
        currentIndex = (currentIndex + 1) % cards.length;
        // Show the next card
        cards[currentIndex].classList.add("active");
    }, 100); // Change card every 10 seconds
});

document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.elements.name.value = '';
    e.target.elements.email.value = '';
    e.target.elements.message.value = '';
});


document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document
            .querySelector("textarea[name='message']")
            .value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert("Thank you, " + name + "! Your message has been sent successfully.");
        form.reset();
    });

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
