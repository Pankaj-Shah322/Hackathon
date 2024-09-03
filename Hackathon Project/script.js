// Initialize Google Map
let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 27.7172, lng: 85.3240 }, // Centered at Kathmandu, Nepal
        zoom: 13
    });
}

// Function to switch between sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
}

// Function to optimize route
function optimizeRoute() {
    const startLocation = document.getElementById('start-location').value;
    const endLocation = document.getElementById('end-location').value;

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const request = {
        origin: startLocation,
        destination: endLocation,
        travelMode: 'DRIVING'
    };

    directionsService.route(request, (result, status) => {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        } else {
            alert('Could not optimize the route.');
        }
    });
}

// Ticket booking functionality
let routes = [
    { id: 1, name: "Route A (Station A to Station B)" },
    { id: 2, name: "Route B (Station C to Station D)" },
];

document.addEventListener('DOMContentLoaded', () => {
    const routeSelect = document.getElementById('route-select');
    const scheduleTable = document.getElementById('schedule-table');

    // Populate the route dropdown and schedules table
    routes.forEach(route => {
        const option = document.createElement('option');
        option.value = route.id;
        option.textContent = route.name;
        routeSelect.appendChild(option);

        // Add to schedule table
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${route.name}</td>
            <td>${getRandomTime()}</td>
            <td>${getRandomTime()}</td>
        `;
        scheduleTable.appendChild(row);
    });
});

// Function to get a random time for schedules
function getRandomTime() {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const period = Math.random() > 0.5 ? 'AM' : 'PM';
    return `${hours}:${minutes} ${period}`;
}

function bookTicket() {
    const routeId = document.getElementById('route-select').value;
    const passengerName = document.getElementById('passenger-name').value;
    const selectedRoute = routes.find(route => route.id == routeId);

    const bookingInfo = `Ticket booked for ${passengerName} on ${selectedRoute.name}`;
    document.getElementById('booking-info').innerText = bookingInfo;
}

// Real-Time Bus Tracking (Simulated)
function trackBus(busLocation) {
    // Clear previous markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // Add a new marker
    const marker = new google.maps.Marker({
        position: busLocation,
        map: map,
        title: 'Bus'
    });

    markers.push(marker);
}

// Simulate bus tracking every 5 seconds
setInterval(() => {
    const simulatedLocation = {
        lat: 27.7172 + (Math.random() - 0.5) * 0.01,
        lng: 85.3240 + (Math.random() - 0.5) * 0.01
    };
    trackBus(simulatedLocation);
}, 5000);

// Passenger Check-In functionality
function checkInPassenger() {
    const ticketNumber = document.getElementById('ticket-number').value;

    // For simplicity, just display the ticket number in the check-in info
    const checkInInfo = `Passenger with Ticket Number ${ticketNumber} checked in successfully.`;
    document.getElementById('check-in-info').innerText = checkInInfo;
}
