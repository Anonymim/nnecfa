document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("909L2zXEJs3U0ipQq"); // Ensure this is your actual Public Key

    const form = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit");

    // Check if event listener is already added
    if (!form.dataset.listenerAdded) {
        form.dataset.listenerAdded = "true"; // Mark that listener is added

        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent default form submission

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Invalid email address.");
                return;
            }

            // Disable the submit button to prevent duplicate submissions
            submitButton.disabled = true;
            submitButton.innerHTML = "Sending...";

            emailjs.sendForm("service_mqe4c5k", "template_gtb7n4q", form)
                .then(
                    function(response) {
                        alert(`Thank you, ${name}! Your message was sent successfully.`);
                        form.reset();
                        submitButton.disabled = false; // Re-enable button
                        submitButton.innerHTML = "Send"; // Reset button text
                    },
                    function(error) {
                        alert("Failed to send message. Check the console for details.");
                        console.error("EmailJS Error:", error);
                        submitButton.disabled = false; // Re-enable button
                        submitButton.innerHTML = "Send"; // Reset button text
                    }
                );
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
