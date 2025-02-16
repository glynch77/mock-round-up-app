document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Content Loaded");
    
    const loginForm = document.getElementById("loginForm");
    const createAccountForm = document.getElementById("createAccountForm");

    // ✅ Handle Login Form Submission
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form reload

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Please fill in both fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");
                window.location.href = "landingpage.html"; // ✅ Redirect to dashboard
            } else {
                alert("Error: " + (data.error || "Invalid credentials"));
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Something went wrong. Please try again later.");
        }
    });

    // ✅ Handle Create Account Form Submission
    createAccountForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form reload

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const city = document.getElementById("city").value.trim();
        const state = document.getElementById("state").value.trim();
        const email = document.getElementById("modalEmail").value.trim(); // Ensure correct field
        const password = document.getElementById("newPassword").value.trim();

        if (!firstName || !lastName || !city || !state || !email || !password) {
            alert("All fields are required.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, city, state, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Account created successfully! Redirecting to login...");
                window.location.href = "login.html"; // ✅ Redirect to login page
            } else {
                alert("Error: " + (data.error || "Account creation failed"));
            }
        } catch (error) {
            console.error("Error during account creation:", error);
            alert("Something went wrong. Please try again later.");
        }
    });
});
