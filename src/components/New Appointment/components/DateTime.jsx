import React from "react"
import { name } from "./Services"

let service = "";

function minDay() {
  let newday = new Date();
  newday.setDate(newday.getDate() + 5);
  let year = newday.getFullYear();
  let month = newday.getMonth()+1;
  let day = newday.getDate();
  
  if(month < 10)
      month = '0' + month;
  if(day < 10)
      day = '0' + day;
  
  let min = year + "-" + month + "-" + day;
  
  // console.log(newday);
  // console.log(year);
  // console.log(month);
  // console.log(day);
  // console.log(min);

  return min;
}

function DateTime(props) {
  service = props.match.params.service;
  console.log(service);

  let minDate = minDay();
  console.log(minDate);

  return (
    <div className="service-container row">
      <div className="select-service col-5">
        <img src="/images/date.png" alt="" />
        <h2>Select Date & Time</h2>
        <p>
          Click on a date to see a timeline of available slots. Click on a green
          time slot to reserve it.
        </p>

        <h3>Questions?</h3>
        <p>Call (858) 939-3746 for help.</p>
      </div>

      <div className="date col">
        <h2>Select Date & Time</h2>
        {/* <form action="/date-time"> */}
        <div className="row">
          <div className="col-6">
            <div className="mb-4">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                min={minDate}
                name="date"
              />
            </div>
            <div className="mb-5">
              <label className="form-label">Time</label>
              <input type="time" className="form-control" name="time" />
            </div>
          </div>
        </div>

        <button
          type="button"
          className="mt-5 back-btn"
          onClick={() => props.history.push("/services/" + name)}
        >
          Prev
        </button>

        <button onClick={() => props.history.push("/contact-info")} className="btn btn-primary mt-5 next-btn">
          Next
        </button>
        {/* </form> */}
      </div>
    </div>
  );
}

export default DateTime;
export { service };
