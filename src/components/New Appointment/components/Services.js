import React from "react";
import {useHistory} from 'react-router-dom';


function Services({type,data,setData}) {

  const history = useHistory();


  const next = (item) => {
    // if (timeFrom !== "") {
      setData({ ...data,service:item })
    // }
    history.push("/date-time/");

  }

  let items = [];
  if (type === "online-meeting") {
    items = ["Webex", "Zoom"];
  } else if (type === "intern-support") {
    items = ["Content Writing", "Poster Design", "Website Development"];
  } else if (type === "enotice") {
    items = ["E-Notice Issue"];
  } else if (type === "publicity") {
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
            onClick={() =>next(item) }
          >
            <p>{item}</p>
          </div>
        ))}

        <button
          type="button"
          className="mt-5 back-btn"
          onClick={() =>history.push("/")}
        >
          Prev
        </button>
      </div>
    </div>
  );
}

export default Services;
