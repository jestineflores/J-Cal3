// generate the list of years to be used in the dropdown
function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

// Get Today's date and display it to the user
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let y = today.getFullYear();
let m = today.getMonth() + 1;
let d = today.getDate();

document.getElementById("date").innerHTML = m + "/" + d + "/" + y;

let createYear = generate_year_range(1970, 2050);
/** or if we wanted to limit new event creation to this year only
 * createYear = generate_year_range( 1970, currentYear );
 */

document.getElementById("year").innerHTML = createYear;

let calendar = document.getElementById("calendar");
let lang = calendar.getAttribute('data-lang');

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let dayHeader = "<tr>";
for (day in days) {
    dayHeader += "<th data-days='" + days[day] + "'>" + days[day] + "</th>";
}
dayHeader += "</tr>";

document.getElementById("thead-month").innerHTML = dayHeader;


monthAndYear = document.getElementById("monthAndYear");

showCalendar(currentMonth, currentYear);

//populates the calendar that appears on the screen
function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";

    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells that will make up the calendar
    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span >" + date + "</span>";
                cell.onclick = () => displayEventForm(event, date, year);

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.className = "date-picker selected";
                }
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row);
    }

}


const eventName = document.querySelector('#name');
const eventLocation = document.querySelector('#location');
const eventStartTime = document.querySelector('#start_time');
const eventEndTime = document.querySelector('#end_time');

const newEventForm = document.querySelector('#new-event-form')

fetch('http://localhost:3000/login' {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(parseJson)
    .then(response => {
        const { token } = response
        localStorage.setItem('token', token)
    })

function logout() {
    localStorage.removeItem("token")
}

fetch('http://localhost:3000/events')
    .then(response => response.json())
    .then(result => displayEvents(result))

// showCalendar(currentMonth, currentYear);

function displayEvents(events) {
    console.log("displayEvents is Being Called on line 113")
    console.log(events);
    events.forEach(event => {
        { displayEvent(event) }
    })
}

function displayEvent(event) {
    // let startTime = new Date(`${event.start_time}`);
    // startTime.toDateString('start_time');
    const h2 = document.createElement('h2');
    h2.innerText = event.name;
    const h3 = document.createElement("h3")
    h3.innerHTML = "Location: " + event.location + " | " + "Your Event Starts at: " + event.start_time + " | " + "& Ends: " + event.end_time
    document.body.append(h2, h3);
    alert("Event Created!");
}

function displayEventForm(event, month, year) {
    event.preventDefault(); // otherwise page refreshes

    const m = parseInt(day) + 1;
    const d = parseInt(event.target.parentNode.dataset.date);

    const formattedStartDate = `${year}-${formatMonth(m)}-${formatDay(d)}T09:00`;
    const formattedEndDate = `${year}-${formatMonth(m)}-${formatDay(d)}T09:30`;

    document.getElementById("start_time").value = formattedStartDate;
    document.getElementById("end_time").value = formattedEndDate;
    console.log(document.getElementById("start_time"));
    console.log(document.getElementById("start_time").innerHTML);

    newEventForm.style.display = "flex" // as opposed to hidden
}


const saveEventToDatabase = (event) => {
    fetch('http://localhost:3000/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(event)
        })
        .then((response) => response.json())
        .then(e => console.log(e));
}



function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

// set up an onclick listener for when 'Create New Event' is Clicked
// When clicked, we want to collect the form data and persist it to the db
document.getElementById("create_new_event").onclick = (e) => {
    e.preventDefault();
    const newEventForm = document.getElementById("new-event-form");
    const newEventName = document.getElementById("name").value;
    const newEventLocation = document.getElementById("location").value;
    const newEventStartTime = document.getElementById("start_time").value;
    const newEventEndTime = document.getElementById("end_time").value;
    console.log(newEventName, newEventLocation, newEventStartTime, newEventEndTime);

    const newEvent = {
        event: {
            name: newEventName,
            location: newEventLocation,
            start_time: newEventStartTime,
            end_time: newEventEndTime
        }
    }
    saveEventToDatabase(newEvent)
    newEventForm.reset();
    newEventForm.style.display = "none";
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
};


function formatDay(value) {
    return format(value);
}

function formatMonth(month) {
    return format(month);
}

// to ensure we are passing in a valid timestamp
// if less than 10, we want to prepend a 0
// 6 -> 06
// otherwise, we leave it as is
function format(value) {
    const valueStr = `${value}`;
    return valueStr.length == 1 ? "0" + valueStr : valueStr;
}