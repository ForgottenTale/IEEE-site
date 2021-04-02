import React from "react";
import { name } from "./Services";
import { service } from "./DateTime";

function Verify(props) {
  return (
    <div className="service-container row">
      <div className="select-service col-5">
        <img src="/images/info.png" alt="" />
        <h2>Verify Order Details</h2>
        <p>
          Double check your reservation details and click submit button if
          everything is correct.
        </p>

        <h3>Questions?</h3>
        <p>Call (858) 939-3746 for help.</p>
      </div>

      <div className="verify col">
        <h2>Verify Booking Details</h2>

        <h3>Appointment Info</h3>
        <div className="row">
          <div className="col">
            <div className="mb-2">
              <p className="label">Date:</p>
              <p>01-01-2021</p>
            </div>
            <div className="mb-4">
              <p className="label">Service:</p>
              <p>{service}</p>
            </div>
          </div>

          <div className="col">
            <div className="mb-2">
              <p className="label">Time:</p>
              <p>05:00 - 06:00</p>
            </div>
          </div>
        </div>

        <h3>Customer Info</h3>
        <div className="row mb-3">
          <div className="col">
            <div className="mb-2">
              <p className="label">Name:</p>
              <p>Alan Mathew</p>
            </div>
            <div className="mb-4">
              <p className="label">Email:</p>
              <p>alanmathew@ieee.org</p>
            </div>
          </div>

          <div className="col">
            <div className="mb-2">
              <p className="label">Phone:</p>
              <p>0123456789</p>
            </div>
          </div>
        </div>

        {name === "online-meeting" || name === "publicity" ? (
          <button
            type="button"
            className="back-btn"
            onClick={() => props.history.push("/other-info")}
          >
            Prev
          </button>
        ) : null}

        {name === "intern-support" || name === "enotice" ? (
          <button
            type="button"
            className="back-btn"
            onClick={() => props.history.push("/support-info")}
          >
            Prev
          </button>
        ) : null}

        <button
          type="button"
          className="btn btn-primary submit-btn"
          onClick={() => props.history.push("/confirmation")}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Verify;
