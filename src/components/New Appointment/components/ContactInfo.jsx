import React from "react";
import { name } from "./Services";
import { service } from "./DateTime";

function ContactInfo(props) {
  function nextButton() {
    if (name === "online-meeting" || name === "publicity") {
      props.history.push("/event-info");
    } else if (name === "intern-support" || name === "enotice") {
      props.history.push("/support-info");
    }
  }

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
        <h2>Contact Information</h2>

        {/* <form action="/contact-info" method="POST"> */}
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">First name</label>
              <input type="text" className="form-control" name="fName" />
            </div>
            <div className="mb-5">
              <label className="form-label">Phone number</label>
              <input type="text" className="form-control" name="phoneNumber" />
            </div>
          </div>

          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Last name</label>
              <input type="text" className="form-control" name="lName" />
            </div>
            <div className="mb-5">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="mail" />
            </div>
          </div>
        </div>

        <button
          type="button"
          className="back-btn"
          onClick={() => props.history.push("/date-time/" + service)}
        >
          Prev
        </button>

        <button onClick={nextButton} className="btn btn-primary next-btn">
          Next
        </button>
        {/* </form> */}
      </div>
    </div>
  );
}

export default ContactInfo;
