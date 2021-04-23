import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import dateIcon from "../../../images/date.png";

function minDay() {
  let newday = new Date();
  newday.setDate(newday.getDate() + 5);
  let year = newday.getFullYear();
  let month = newday.getMonth() + 1;
  let day = newday.getDate();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  let min = year + "-" + month + "-" + day;

  return min;
}

function DateTime({ path, type, setData, data }) {
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");

  const history = useHistory();

  let minDate = minDay();

  const next = (event) => {
    event.preventDefault();

    // if (timeFrom !== "") {
    var fromHour = timeFrom.slice(0, 2);
    var fromMin = timeFrom.slice(3, 5);
    var toHour = timeTo.slice(0, 2);
    var toMin = timeTo.slice(3, 5);

    console.log(timeFrom);
    console.log(timeTo);

    setData({
      ...data,
      timeFrom: new Date(new Date(date).setHours(fromHour, fromMin, 0, 0)),
      timeTo: new Date(new Date(date).setHours(toHour, toMin, 0, 0)),
    });

    if (type === "online_meeting" || type === "publicity") {
      history.push(path + "/event-info");
    } else if (type === "intern_support" || type === "e_notice") {
      history.push(path + "/support-info");
    }
    // }
  };

  return (
    <div className="ub">
      <div className="service-container row">
        <div className="select-service col-5">
          <img src={dateIcon} alt="" />
          <h2>Select Date & Time</h2>
          <p>Please select the date and time for your appointment.</p>
          <h3>Questions?</h3>
          <p>Call (858) 939-3746 for help.</p>
        </div>
        <div className="date col">
          <h2>Select Date & Time</h2>

          <form onSubmit={next}>
            <div className="row mb-4">
              <div className="col-5">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  min={minDate}
                  name="date"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
            {data.type === "online_meeting" ? (
              <div className="row mb-5">
                <div className="col-5">
                  <label className="form-label">From</label>
                  <input
                    type="time"
                    className="form-control"
                    name="time"
                    onChange={(e) => setTimeFrom(e.target.value)}
                  />
                </div>
                <div className="col-5">
                  <label className="form-label">To</label>
                  <input
                    type="time"
                    className="form-control"
                    name="time"
                    onChange={(e) => setTimeTo(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="row mb-5">
                <div className="col-5">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="time"
                    onChange={(e) => setTimeFrom(e.target.value)}
                  />
                </div>
              </div>
            )}
            <button
              type="button"
              className="mt-5 back-btn"
              onClick={() => history.push(path + "/services")}
            >
              Prev
            </button>
            <button className="btn btn-primary mt-5 next-btn">Next</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DateTime;
