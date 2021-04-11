import React, { useState } from "react"
import { useHistory } from 'react-router-dom';
import dateIcon from '../../../images/date.png';

function minDay() {


  let newday = new Date();
  newday.setDate(newday.getDate() + 5);
  let year = newday.getFullYear();
  let month = newday.getMonth() + 1;
  let day = newday.getDate();

  if (month < 10)
    month = '0' + month;
  if (day < 10)
    day = '0' + day;

  let min = year + "-" + month + "-" + day;


  return min;
}

function DateTime({ setData, data }) {


  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");

  const history = useHistory();

  let minDate = minDay();

  const next = () => {
    // if (timeFrom !== "") {
    var fromHour = timeFrom.slice(0, 2);
    var fromMin = timeFrom.slice(3, 5);
    var toHour = timeTo.slice(0, 2);
    var toMin = timeTo.slice(3, 5);

    console.log(timeFrom);
    console.log(timeTo);

    setData(
      {
        ...data,
        timeFrom: new Date(new Date(date).setHours(fromHour, fromMin, 0, 0)),
        timeTo: new Date(new Date(date).setHours(toHour, toMin, 0, 0))
      });
    history.push("/contact-info/");
    // }

  }


  return (
    <div className="service-container row">
      <div className="select-service col-5">
        <img src={dateIcon} alt="" />
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

        <div className="row">
          <div className="col-6">
            <div className="mb-4">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                min={minDate}
                name="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

           

            <div className="mb-5">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                onChange={(e) => setTimeFrom(e.target.value)} />
            </div>

            {data.type === "online-meeting" ? <div className="mb-5">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                onChange={(e) => setTimeTo(e.target.value)} />
            </div> : null}
          </div>
        </div>

        <button
          type="button"
          className="mt-5 back-btn"
          onClick={() => history.push("/services/")}
        >
          Prev
        </button>

        <button onClick={() => next()} className="btn btn-primary mt-5 next-btn">
          Next
        </button>

      </div>
    </div>
  );
}

export default DateTime;

