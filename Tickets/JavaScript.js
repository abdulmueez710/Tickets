

/*-------------Login Page-----------------------*/


const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const profileBox = document.getElementById("profileBox");
const userDisplay = document.getElementById("userNameDisplay");

//let username = document.getElementsByClassName("").value;

//function validation() {
//    if (username == "") {
//        alert.log("Please input all fields");
//        return false;
//    }
//}

function showSignUp() {
    if (loginBox && signupBox) {
        loginBox.classList.add("hidden");
        signupBox.classList.remove("hidden");
    }
}

function showLogin() {
    if (loginBox && signupBox) {
        signupBox.classList.add("hidden");
        loginBox.classList.remove("hidden");
    }
}

function login() {
    if (loginBox && profileBox) {
        loginBox.classList.add("hidden");
        profileBox.classList.remove("hidden");
    }
}

function signup() {
    if (signupBox && profileBox) {
        signupBox.classList.add("hidden");
        profileBox.classList.remove("hidden");

        if (userDisplay) {
            userDisplay.innerText = "New User";
        }

        alert("Account Created Successfully!");
    }
}

function logout() {
    if (profileBox && loginBox) {
        profileBox.classList.add("hidden");
        loginBox.classList.remove("hidden");
    }
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