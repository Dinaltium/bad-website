function login() {
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    if (user === "" || pass === "") {
        alert("Fill all details");
        return false;
    }

    window.location.href = "events.html";
    return false;
}