document.addEventListener("DOMContentLoaded", function () {
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
        const email = document.getElementById("email").value; // Make sure this is captured from the modal too
        const password = document.getElementById("newPassword").value;

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
