

/*-------------Login Page-----------------------*/

const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const profileBox = document.getElementById("profileBox");
const userDisplay = document.getElementById("userNameDisplay");

function showSignUp() {
    loginBox.classList.add("hidden");
    signupBox.classList.remove("hidden");
}

function showLogin() {
    signupBox.classList.add("hidden");
    profileBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
}

function logout() {
    profileBox.classList.add("hidden");
    loginBox.classList.remove("hidden");

    const allInputs = document.querySelectorAll("input");
    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].value = "";
    }
}

// --- VALIDATION LOGIC ---

function login() {
    const usernameInput = loginBox.querySelector('input[type="text"]');
    const passwordInput = loginBox.querySelector('input[type="password"]');

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === "" || password === "") {
        alert("Please fill in all fields!");
        return false; 
    }

    if (password.length <= 6) {
        alert("Password must be more than 6 characters!");
        return false; 
    }

    userDisplay.innerText = username; 
    loginBox.classList.add("hidden");
    profileBox.classList.remove("hidden");
}

function signup() {
    const nameInput = signupBox.querySelector('input[type="text"]');
    const emailInput = signupBox.querySelector('input[type="email"]');
    const passwordInput = signupBox.querySelector('input[type="password"]');

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill in all fields!");
        return;
    }

    if (password.length <= 6) {
        alert("Password must be more than 6 characters!");
        return;
    }

    alert("Account Created Successfully!");
    showLogin();           // Go back to login screen
}


/*--------------------Seat Reservation-----------------------*/

const seatContainer = document.getElementById("seatContainer");
const resultDisplay = document.getElementById("result");
let selectedSeats = [];


if (seatContainer) {

    const totalSeats = 60; 

  
    for (let i = 1; i <= totalSeats; i++) {
        let seat = document.createElement("div");
        seat.classList.add("seat");
        seat.innerText = i;

        if (Math.random() < 0.15) {
            seat.classList.add("booked");
        }

        seat.addEventListener("click", function () {
            if (seat.classList.contains("booked")) return;

            seat.classList.toggle("selected");

            if (seat.classList.contains("selected")) {
                selectedSeats.push(i);
            } else {
                selectedSeats = selectedSeats.filter(s => s !== i);
            }
        });

        seatContainer.appendChild(seat);
    }
}

function confirmReservation() {
    if (!resultDisplay) return;

    if (selectedSeats.length === 0) {
        resultDisplay.innerText = "Please select at least one seat!";
        return;
    }

    resultDisplay.innerText = "You reserved seats: " + selectedSeats.join(", ");
    setTimeout(function () {
        payment();
    }, 2000);
}

function payment() {
    window.location.href = "payment.html";
}