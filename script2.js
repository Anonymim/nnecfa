document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("909L2zXEJs3U0ipQq"); // Ensure this is your actual Public Key

    const form = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit"); // Target the submit button

    form.addEventListener("submit", function(event) {
        event.preventDefault();

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
        submitButton.innerHTML = "Sending..."; // Update button text for UX

        emailjs.sendForm("service_mqe4c5k", "template_gtb7n4q", form)
            .then(
                function(response) {
                    alert("Message sent successfully!");
                    form.reset();
                    submitButton.disabled = false; // Re-enable button after success
                    submitButton.innerHTML = "Send"; // Reset button text
                },
                function(error) {
                    alert("Failed to send message. Check the console for details.");
                    console.error("EmailJS Error:", error);
                    submitButton.disabled = false; // Re-enable button after failure
                    submitButton.innerHTML = "Send"; // Reset button text
                }
            );
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
