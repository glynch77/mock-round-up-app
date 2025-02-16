document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Content Loaded");
    const loginForm = document.getElementById("loginForm");
    const createAccountForm = document.getElementById("createAccountForm");

    // Handle Login Form submission
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:3000/login", {  // Adjust the URL if necessary
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");
                window.location.href = "dashboard.html"; 
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Try again later.");
        }
    });

    // Handle Create Account Form submission
    createAccountForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const email = document.getElementById("modalEmail").value; // Make sure this is captured from the modal too
        const password = document.getElementById("newPassword").value;

        console.log('Captured email:', email)

        try {
            const response = await fetch("http://localhost:3000/register", {  // Adjust the URL if necessary
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firstName, lastName, city, state, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Account created successfully!");
                window.location.href = "login.html"; // Redirect to login page
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Try again later.");
        }
    });
});

// Login Validation 

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the email and password from the form
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Basic client-side validation (you can expand this)
    if (!email || !password) {
        alert("Please fill in both fields.");
        return;
    }

    // Log the captured values for debugging
    console.log("Captured email:", email);
    console.log("Captured password:", password);

    // Send the data to the server for validation
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        // Handle server response (login success or failure)
        if (data.success) {
            alert("Login successful!");
            // Redirect user to the dashboard or home page, etc.
            window.location.href = "/dashboard"; // Example
        } else {
            alert("Invalid email or password. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error during login:", error);
        alert("There was an error with the login request.");
    });
});

