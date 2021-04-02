import React from "react";
import { name } from "./Services";
import { service } from "./DateTime";

function EventInfo(props) {
  return (
    <div className="info-container row">
      <div className="enter-info col-4">
        <img src="/images/info.png" alt="" />
        <h2>Enter Information</h2>
        <p>
          Please provide your contact info and other details so that we can send
          you a confirmation and other info.
        </p>

        <h3>Questions?</h3>
        <p>Call (858) 939-3746 for help.</p>
      </div>

      <div className="info col">
        <h2>Event Details</h2>

        {/* <form action="/event-info" method="POST"> */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">
              Content/ description of the event
            </label>
            <textarea
              rows="3"
              className="form-control"
              name="eventDesc"
            ></textarea>
          </div>
          <div className="col">
            <label className="form-label">Service name</label>
            <input
              type="text"
              className="form-control"
              name="serviceName"
              value={service}
              readOnly
            />
          </div>
        </div>

        {name === "online-meeting" ? (
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Speaker name</label>
              <input type="text" className="form-control" name="speakerName" />
            </div>
            <div className="col">
              <label className="form-label">Speaker email</label>
              <input type="email" className="form-control" name="speakerMail" />
            </div>
          </div>
        ) : null}

        <div className="row mb-5">
          {name === "online-meeting" ? (
            <div className="col-6">
              <label className="form-label">Poster (if any)</label>
              <input type="file" className="form-control" name="poster" />
            </div>
          ) : (
            <div className="col-6">
              <label className="form-label">Poster</label>
              <input type="file" className="form-control" name="poster" />
            </div>
          )}
        </div>

        <button
          type="button"
          className="back-btn"
          onClick={() => props.history.push("/contact-info")}
        >
          Prev
        </button>

        <button
          onClick={() => props.history.push("/other-info")}
          className="btn btn-primary next-btn"
        >
          Next
        </button>
        {/* </form> */}
      </div>
    </div>
  );
}

export default EventInfo;
