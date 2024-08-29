document.addEventListener("DOMContentLoaded", function () {
    const form = document.forms["form"];
    const nameInput = form["name"];
    const passwordInput = form["password"];
    const confirmPasswordInput = form["confirmpassword"];
    const phoneNoInput = form["phoneNo"];
    const emailInput = form["email"];
    const genderInput = form["gender"];

    const nameStatus = document.getElementById("name-status");
    const passwordStatus = document.getElementById("password-status");
    const confirmPasswordStatus = document.getElementById("confirm-password-status");
    const phoneStatus = document.getElementById("phone-status");
    const emailStatus = document.getElementById("email-status");
    const genderStatus = document.getElementById("gender-status");

    nameInput.addEventListener("input", function () {
        validateName(nameInput, nameStatus);
    });
    passwordInput.addEventListener("input", function () {
        validatePassword(passwordInput, passwordStatus);
        validateConfirmPassword(confirmPasswordInput, passwordInput, confirmPasswordStatus);
    });
    confirmPasswordInput.addEventListener("input", function () {
        validateConfirmPassword(confirmPasswordInput, passwordInput, confirmPasswordStatus);
    });
    phoneNoInput.addEventListener("input", function () {
        validatePhoneNo(phoneNoInput, phoneStatus);
    });
    emailInput.addEventListener("input", function () {
        validateEmail(emailInput, emailStatus);
    });
    genderInput.addEventListener("change", function () {
        validateGender(genderInput, genderStatus);
    });

    form.addEventListener("submit", function (event) {
        // Validate all fields before submitting
        validateName(nameInput, nameStatus);
        validatePassword(passwordInput, passwordStatus);
        validateConfirmPassword(confirmPasswordInput, passwordInput, confirmPasswordStatus);
        validatePhoneNo(phoneNoInput, phoneStatus);
        validateEmail(emailInput, emailStatus);
        validateGender(genderInput, genderStatus);

        // Check if there are any invalid fields
        if (document.querySelectorAll('.invalid').length > 0) {
            event.preventDefault(); // Prevent form submission

            // Display a summary message
            alert("Please correct the highlighted errors before submitting the form.");
        }
    });

    function validateName(input, status) {
        const nameRegex = /^[A-Za-z\s]+$/;
        if (nameRegex.test(input.value)) {
            setValid(status);
            input.setCustomValidity(""); // Clear custom validity message
        } else {
            setInvalid(status);
            input.setCustomValidity("Name must contain only letters and spaces.");
            input.reportValidity(); // Trigger browser's default validation UI
        }
    }

    function validatePassword(input, status) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]{2,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (passwordRegex.test(input.value)) {
            setValid(status);
            input.setCustomValidity(""); // Clear custom validity message
        } else {
            setInvalid(status);
            input.setCustomValidity("Password must be at least 8 characters long, contain at least one uppercase letter, two lowercase letters, one number, and one special character.");
            input.reportValidity(); // Trigger browser's default validation UI
        }
    }

    function validateConfirmPassword(input, passwordInput, status) {
        if (input.value === passwordInput.value && input.value !== "") {
            setValid(status);
            input.setCustomValidity(""); // Clear custom validity message
        } else {
            setInvalid(status);
            input.setCustomValidity("Passwords do not match.");
            input.reportValidity(); // Trigger browser's default validation UI
        }
    }

    function validatePhoneNo(input, status) {
        const phoneRegex = /^[0-9]+$/;
        if (phoneRegex.test(input.value)) {
            setValid(status);
            input.setCustomValidity(""); // Clear custom validity message
        } else {
            setInvalid(status);
            input.setCustomValidity("Phone number must contain only numbers.");
            input.reportValidity(); // Trigger browser's default validation UI
        }
    }

    function validateEmail(input, status) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input.value)) {
            setValid(status);
            input.setCustomValidity(""); // Clear custom validity message
        } else {
            setInvalid(status);
            input.setCustomValidity("Please enter a valid email address.");
            input.reportValidity(); // Trigger browser's default validation UI
        }
    }

    function validateGender(input, status) {
        if (input.value !== "select") {
            setValid(status);
            input.setCustomValidity(""); // Clear custom validity message
        } else {
            setInvalid(status);
            input.setCustomValidity("Please select a gender.");
            input.reportValidity(); // Trigger browser's default validation UI
        }
    }

    function setValid(statusElement) {
        statusElement.textContent = "✔";
        statusElement.classList.add("valid");
        statusElement.classList.remove("invalid");
    }

    function setInvalid(statusElement) {
        statusElement.textContent = "✖";
        statusElement.classList.add("invalid");
        statusElement.classList.remove("valid");
    }
});
