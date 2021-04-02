import React from "react";

let name = "";

function Services(props) {
  name = props.match.params.name;
  console.log(name);

  let items = [];
  if (name === "online-meeting") {
    items = ["Webex", "Zoom"];
  } else if (name === "intern-support") {
    items = ["Content Writing", "Poster Design", "Website Development"];
  } else if (name === "enotice") {
    items = ["E-Notice Issue"];
  } else if (name === "publicity") {
    items = ["Social Media", "Website Posting"];
  }
  console.log(items);

  return (
    <div className="service-container row">
      <div className="select-service col-5">
        <img src="/images/select.png" alt="" />
        <h2>Select Service</h2>
        <p>
          Please select a service for which you want to schedule an appointment.
        </p>

        <h3>Questions?</h3>
        <p>Call (858) 939-3746 for help.</p>
      </div>

      <div className="service-list col">
        <h2>Service Selection</h2>
        {items.map((item, index) => (
          <div
            key={index}
            className="service-box-x"
            onClick={() => props.history.push("/date-time/" + item)}
          >
            <p>{item}</p>
          </div>
        ))}

        <button
          type="button"
          className="mt-5 back-btn"
          onClick={() => props.history.push("/")}
        >
          Prev
        </button>
      </div>
    </div>
  );
}

export default Services;
export { name };
