document.getElementById("buttons").addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        alert("клікнуто на кнопці: " + event.target.textContent);
    }
});