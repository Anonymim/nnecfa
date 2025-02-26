document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Fetch and trim input values
        let nameField = document.getElementById("name");
        let emailField = document.getElementById("email");
        let messageField = document.querySelector("textarea[name='message']");

        let name = nameField.value.trim();
        let email = emailField.value.trim();
        let message = messageField.value.trim();



        // Show success message and reset form
        alert("Thank you, " + name + "! Your message has been sent successfully.");
        form.reset();

        // Reset values explicitly to prevent incorrect validation on next submit
        nameField.value = "";
        emailField.value = "";
        messageField.value = "";

        return; // Stop further execution
    });

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
