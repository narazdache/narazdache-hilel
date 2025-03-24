document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    let isValid = true;
    
    if (name === "") {
        document.getElementById("name-error").textContent = "name is required";
        isValid = false;
    }
    if (message.length < 5) {
        document.getElementById("message-error").textContent = "mesage must be at least 5 characters";
        isValid = false;
    }
    const phonePattern = /^\+380\d{9}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById("phone-error").textContent = "Phone number must start with +380 and have 9 more digits";
        isValid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("email error").textContent = "Invalid email format";
        isValid = false;
    }
    if (isValid) {
        console.log({ name, message, phone, email });
        alert("form submitted successfully!");
        this.reset();
    }
});