function generate_year_range(start, end) {
  let years = "";
  for (let year = start; year <= end; year++) {
      years += "<option value='" + year + "'>" + year + "</option>";
  }
  return years;
}

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
/** or
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


const eventName = document.querySelector('#name');
const eventLocation = document.querySelector('#location');
const eventStartTime = document.querySelector('#start_time');
const eventEndTime = document.querySelector('#end_time');
const eventId = document.querySelector('#id');


fetch('http://localhost:3000/events')
    .then(response => response.json())
    .then(result => displayEvents(result)) 

        // showCalendar(currentMonth, currentYear);

function displayEvents(events) {
    events.forEach(event => { {displayEvent(event)}
    })
}

function displayEvent(event){
      // let startTime = new Date(`${event.start_time}`);
      // startTime.toDateString('start_time');
      const h2 = document.createElement('h2');
      h2.innerText = event.name;
      const h3 = document.createElement("h3")
      h3.innerHTML = "Location: " + event.location + " | " + "Your Event Starts at: " + event.start_time + " | " + "& Ends: " + event.end_time
      document.body.append(h2, h3);
      alert("Event Created!");
}





const newEventForm = document.querySelector('#new-event-form')
newEventForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(newEventForm);
  const newEventName = formData.get('name');
  const newEventLocation = formData.get('location');
  const newEventStartTime = formData.get('start_time');
  const newEventEndTime = formData.get('end_time');
  const newEventId = formData.get('id');
  const newEvent = {
    event: {
      name: newEventName,
      location: newEventLocation,
      start_time: newEventStartTime,
      end_time: newEventEndTime,
      id: newEventId
    }}

    saveEventToDatabase(newEvent)
    newEventForm.reset();
});


const saveEventToDatabase = (event) => {
  fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(event),
    }).then((response) => response.json())
      .then((result) => displayEvent(result));
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

function showCalendar(month, year) {

  let firstDay = ( new Date( year, month ) ).getDay();

  tbl = document.getElementById("calendar-body");


  tbl.innerHTML = "";


  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  let date = 1;
  for ( let i = 0; i < 6; i++ ) {
      let row = document.createElement("tr");

      for ( let j = 0; j < 7; j++ ) {
          if ( i === 0 && j < firstDay ) {
              cell = document.createElement( "td" );
              cellText = document.createTextNode("");
              cell.appendChild(cellText);
              row.appendChild(cell);
          } else if (date > daysInMonth(month, year)) {
              break;
          } else {
              cell = document.createElement("td");
              // cell.onclick = () => displayEventForm(date);
              cell.setAttribute("data-date", date);
              cell.setAttribute("data-month", month + 1);
              cell.setAttribute("data-year", year);
              cell.setAttribute("data-month_name", months[month]);
              cell.className = "date-picker";
              cell.innerHTML = "<span>" + date + "</span>";

              if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                  cell.className = "date-picker selected";
              }
              row.appendChild(cell);
              date++;
          }


      }

      tbl.appendChild(row);
  }

}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
