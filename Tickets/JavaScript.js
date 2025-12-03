function showSignUp() {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("signupBox").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("signupBox").classList.add("hidden");
    document.getElementById("profileBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
}

function login() {
    const userDisplay = document.getElementById("userNameDisplay");
    const username = document.querySelector('#loginBox input[type="text"]').value;
    const password = document.querySelector('#loginBox input[type="password"]').value;

    if (username === "" || password === "") {
        alert("Please fill in all fields!");
        return false;
    }
    if (password.length <= 6) {
        alert("Password must be more than 6 characters!");
        return false;
    }

    userDisplay.innerText = username;
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("profileBox").classList.remove("hidden");
}

function logout() {
    document.getElementById("profileBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
}

function signup() {
    alert("Account Created Successfully!");
    showLogin();
}

const eventsDB = [
    { name: "Music Concert", type: "Concert", img: "music_concert.png", desc: "A night of rock and pop music." },
    { name: "Jazz Night", type: "Concert", img: "jazzNight.png", desc: "Smooth jazz vibes downtown." },
    { name: "Summer Fest", type: "Concert", img: "summerFestival.png", desc: "The biggest outdoor festival." },
    { name: "Wednesday", type: "Cinema", img: "wednesday.jpg", desc: "Horror comedy series screening." },
    { name: "Action Hero", type: "Cinema", img: "actionHero.png", desc: "Premiere of the new blockbuster." },
    { name: "Indie Film", type: "Cinema", img: "indieFilm.png", desc: "Award-winning independent movie." },
    { name: "Shakespeare Live", type: "Drama", img: "shakespaeareLive.png", desc: "A classic retelling of Hamlet." },
    { name: "Modern Theater", type: "Drama", img: "modernTheater.png", desc: "Contemporary arts performance." },
    { name: "Tech Conference", type: "Seminar", img: "tech_expo.png", desc: "Future tech trends expo." },
    { name: "Art Exhibition", type: "Workshop", img: "art_festival .png", desc: "Modern art gallery showcase." }
];

function filterCategory(category) {
    localStorage.setItem("selectedFilter", category);
    window.location.href = "eventList.html";
}

function loadEvents() {
    const container = document.getElementById("eventContainer");
    if (!container) return;

    const filter = localStorage.getItem("selectedFilter") || "All";

    container.innerHTML = "";

    const header = document.getElementById("listHeader");
    if (filter !== "All") {
        header.innerHTML = `Showing: <span style="color:#ae23d4">${filter}</span> 
                            <button onclick="resetFilter()" style="padding:5px 10px; margin-left:10px; cursor:pointer;">Show All</button>`;
    } else {
        header.innerHTML = "All Upcoming Events";
    }

    eventsDB.forEach(event => {
        if (filter === "All" || event.type === filter) {

            const card = document.createElement("div");
            card.className = "event-card";
            card.innerHTML = `
                <img src="${event.img}" alt="${event.name}">
                <h2>${event.name}</h2>
                <p>${event.desc}</p>
                <button onclick="viewDetails('${event.name}', '${event.img}', '${event.type}')" class="btn">Learn More</button>
            `;
            container.appendChild(card);
        }
    });
}

function resetFilter() {
    localStorage.setItem("selectedFilter", "All");
    location.reload();
}

function viewDetails(name, image, type) {
    localStorage.setItem("currentEventName", name);
    localStorage.setItem("currentEventImage", image);
    localStorage.setItem("currentEventType", type);
    window.location.href = "eventDetails.html";
}

if (document.getElementById("eventContainer")) {
    window.onload = loadEvents;
}

if (document.getElementById("detailsContainer")) {

    const eventName = localStorage.getItem("currentEventName") || "Event";
    const eventImg = localStorage.getItem("currentEventImage") || "music_concert.png";
    const eventType = localStorage.getItem("currentEventType") || "Concert";

    document.getElementById("detailsName").innerText = eventName;
    document.getElementById("detailsImg").src = eventImg;

    const randomPrice = Math.floor(Math.random() * 70) + 30;
    document.getElementById("detailsPrice").innerText = "$" + randomPrice;

    const organizers = ["Elite Events", "Star Productions", "City Vibes", "MegaShow Inc."];
    document.getElementById("detailsOrg").innerText = organizers[Math.floor(Math.random() * organizers.length)];

    if (eventType === "Concert") {
        document.getElementById("singerSection").style.display = "block";
        const singers = ["The Weeknd", "Taylor Swift", "Atif Aslam", "Arijit Singh"];
        document.getElementById("singerName").innerText = singers[Math.floor(Math.random() * singers.length)];
    }

    window.goToReservation = function () {
        localStorage.setItem("currentEventPrice", randomPrice);
        window.location.href = "seatReserve.html";
    };
}

const seatContainer = document.getElementById("seatContainer");

if (seatContainer) {
    const totalSeats = 60;
    let selectedSeats = [];
    const pricePerSeat = parseInt(localStorage.getItem("currentEventPrice")) || 50;
    const priceDisplay = document.getElementById("reservationPriceDisplay");

    priceDisplay.innerText = `Price per seat: $${pricePerSeat}. Select seats to continue.`;

    for (let i = 1; i <= totalSeats; i++) {
        let seat = document.createElement("div");
        seat.classList.add("seat");
        seat.innerText = i;
        if (Math.random() < 0.2) seat.classList.add("booked");

        seat.addEventListener("click", function () {
            if (seat.classList.contains("booked")) return;
            seat.classList.toggle("selected");

            if (seat.classList.contains("selected")) {
                selectedSeats.push(i);
            } else {
                selectedSeats = selectedSeats.filter(s => s !== i);
            }

            const total = selectedSeats.length * pricePerSeat;
            priceDisplay.innerText = selectedSeats.length > 0 ?
                `Selected: ${selectedSeats.length} seat(s). Total: $${total}` :
                `Price per seat: $${pricePerSeat}. Select seats to continue.`;
        });
        seatContainer.appendChild(seat);
    }

    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            if (selectedSeats.length === 0) {
                alert("Please select at least one seat!");
                return;
            }
            const finalTotal = selectedSeats.length * pricePerSeat;
            localStorage.setItem("finalSeatCount", selectedSeats.length);
            localStorage.setItem("finalTotalPrice", finalTotal);
            window.location.href = "payment.html";
        });
    }
}

const paymentForm = document.getElementById("paymentForm");
if (paymentForm) {
    const eventName = localStorage.getItem("currentEventName") || "Event";
    const seatCount = localStorage.getItem("finalSeatCount") || "0";
    const totalPrice = localStorage.getItem("finalTotalPrice") || "0";

    document.getElementById("payEventName").innerText = eventName;
    document.getElementById("paySeatCount").innerText = seatCount;
    document.getElementById("payTotal").innerText = "$" + totalPrice;

    paymentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("fullName").value;
        const card = document.getElementById("cardNumber").value;

        if (name === "" || card === "") {
            alert("Please fill in required fields.");
            return;
        }
        paymentForm.style.display = "none";
        document.getElementById("successMessage").style.display = "block";
    });

}
