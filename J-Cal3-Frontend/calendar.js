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


// const handleSubmitClicked = (payload) => {
//   // console.log("Handle Submit Clicked");
//   console.log(payload);
//   postData('http://localhost:3000/events', payload)
//       .then(response => {
//           alert("Event Created!");
//           showCalendar(currentMonth, currentYear);
//       });
// }

// const displayEventForm = (year, month, startDay) => {
//     let eventInputWithLabel = renderInputWithLabel("Event Name: ");
//     let locationInputWithLabel = renderInputWithLabel("Event Location: ");
//     let startTimeInputWithLabel = renderInputWithLabel("Start: ", { "type": "time" });
//     let endTimeInputWithLabel = renderInputWithLabel("End: ", { "type": "time" });
//     let submit = renderButtonWithCallback("Submit: ", () => {
//         let name = eventInputWithLabel.input;
//         let location = locationInputWithLabel.input;
//         let startInput = startTimeInputWithLabel.input;
//         let endInput = endTimeInputWithLabel.input;
//         let nameVal = name.value;
//         let locationVal = location.value;
//         let startVal = startInput.value;
//         let endVal = endInput.value;
// //                   if (validateFormParams(nameVal, locationVal, startVal, endVal) == false) {
// //                     alert("Error Please Check Your Values.")
// //                     return;
// //                   }
//         let startTime = `${year}-${month}-${startDay > 9 ? startDay : `0${startDay}`} ${startVal}`;
//         let endTime = `${year}-${month}-${startDay > 9 ? startDay : `0${startDay}`} ${endVal}`;
//   let payload = {nameVal, locationVal, startTime, endTime};
// //   // TODO: IMPLEMENT THIS
// //   // MAKE SURE YEAR MONTH DAY are correct
//   console.log(payload);
//   handleSubmitClicked(payload);
// //   // TODO: COMMENT BACK IN
// //   // handleSubmitClicked({start_time: "2020-05-06 14:22", end_time: "2020-05-06 14:22", event: "First Event", location: "Denver", calendar_id: 1})
//     })

//     let exit = renderButtonWithCallback("Back", () => {
//       hideEventForm();
//     });
    

//   let buttonsDiv = document.createElement("div");
//   buttonsDiv.setAttribute("class", "event-form-buttons");
//   buttonsDiv.appendChild(submit);
//   buttonsDiv.appendChild(exit);

//   let div = document.createElement("div");
//   div.setAttribute("class", "new-event-form");
//   div.appendChild(eventInputWithLabel.div);
//   div.appendChild(locationInputWithLabel.div);
//   div.appendChild(startTimeInputWithLabel.div);
//   div.appendChild(endTimeInputWithLabel.div);
//   div.appendChild(buttonsDiv);

//   document.body.appendChild(div);
// }
  
// const renderInputWithLabel = (label, inputAttributes = {}, labelAttributes) => {
// const div = document.createElement("div");
// div.setAttribute("class", "input-with-label");
// let input = setAttributes(document.createElement("input"), inputAttributes);
// let span = setAttributes(document.createElement("span"), labelAttributes);
// span.innerHTML = label;
// div.appendChild(span);
// div.appendChild(input);
// return {div, input};
// }

// const setAttributes = (element, attributes = {}) => {
//   const keys = Object.keys(attributes);
//   keys.forEach(key => {
//     element.setAttribute(key, attributes[key]);
//     }
//   );
//   return element;
// }

// const renderButtonWithCallback = (label, callback) => {
//   let btn = document.createElement("button");
//   btn.value = label;
//   btn.onclick = callback;
//   return btn;

// }



// function displayEventInfo(events) {
//   console.log(events);
//   events.forEach((event) => {
//     const eventTitle = document.createElement('h2');
//     eventTitle.innerText = event.name;
//     document.body.append(eventTitle);
//   })




// function showEvent(event) {


//   event.name.forEach(event => {
//       const eventElement = document.createElement('li');
//       eventElement.innerText = event.name;
//       eventName.append(eventElement);
//   });


let params = new URLSearchParams(window.location.search)
let id = params.get("id")

fetch(`http://localhost:3000/events/${id}`)
    .then(response => response.json())
    .then(event => {
        let h2 = document.createElement("h2")

        h2.innerText = event.name
        
        let showEvent = document.createElement("h3")
        showEvent.innerText = event.location + " " + event.start_time + " | " + event.end_time

        document.body.append(h2, showEvent)

    })


const eventName = document.querySelector('#name');
const eventLocation = document.querySelector('#location');
const eventStartTime = document.querySelector('#start_time');
const eventEndTime = document.querySelector('#end_time');

const eventURL = 'http://localhost:3000/events';


fetch(eventURL)
  .then((response) => response.json())
  .then(showEvent);



function showEvent(events){
  eventName.innerText = event.name
  eventLocation.innerText = event.location
  eventStartTime.innerText = event.start_time
  eventEndTime.innerText = event.end_time

  events.forEach((event) => {
    const eventTitle = document.createElement('h2')
    eventTitle.innerText = event.name
    document.body.append(eventTitle)
})};


// function populateEvents(events){
//     events.forEach( event => {
//         const eventDiv = document.createElement('div')
//         const eventName = document.createElement('h1')
//         eventDiv.className = `event-card event-card-${event.id}`
//         eventDiv.innerHTML = `
//             <h2 class="event-name">${event.name}</h2>
//             <h3 class="event-location">${event.location}</h3>
//             <h4 class="event-start-time">${event.start_time}</h4>
//             <h5 class="event-end-time">${event.end_time}</h5>`
//     bagelsContainer.append(eventDiv)
//     } )
// }


const newEventForm = document.querySelector('#new-event-form')
newEventForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(newEventForm);
  const newEventName = formData.get('name');
  const newEventLocation = formData.get('location)');
  const newEventStartTime = formData.get('start_time');
  const newEventEndTime = formData.get('end_time');
  const newEvent = {
    event: {
      name: newEventName,
      location: newEventLocation,
      start_time: newEventStartTime,
      end_time: newEventEndTime
    },
  };

  const eventTitle = document.createElement('h2');
  eventTitle.innerText = newEventName;
  document.body.append(eventTitle);

  saveEventToDatabase(newEvent)
  newEventForm.reset();
});



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
              cell.onclick = () => showEvent(event);
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

function saveEventToDatabase(newEvent) {
  fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(newEvent),
  }).then((response) => response.json())
    .then(console.log);
}