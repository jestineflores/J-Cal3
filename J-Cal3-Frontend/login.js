const loginButton = document.querySelector('.login')
const loginForm = document.querySelector(".login-form")
const getEvents = document.querySelector(".get-events")

let isLogggedIn = false;

const authHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`
}
loginForm.addEventListener("submit", login);
getEvents.addEventListener("click", handleGetEvents);

document.addEventListener('DOMContentLoaded', handleGetEvents)

// function handleGetUsers(event) {
//     fetch("http://localhost:3000/users", {
//             headers: authHeaders
//         })
//         .then(response => response.json())
//         .then(console.log)
// }

function login(event) {
    event.preventDefault();

    const loginFormData = new FormData(event.target);
    const username = loginFormData.get("username");
    const password = loginFormData.get("password");

    const loginBody = { username, password }

    fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type:": "application/json"
            },
            body: JSON.stringify(loginBody)
        }).then(response => response.json())
        .then(result => {
            localStorage.setItem("token", result.token);
            isLogggedIn = true;
        })
    event.target.reset();
}

function handleGetEvents() {
    fetch('http://localhost:3000/events', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(events => {
            console.log(events);
            isLoggedIn = true;
        });
}