import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import confirmIcon from "../../../images/info.png";

function Verify({ path, type, data, setId }) {
  const history = useHistory();

  const handleSubmit = () => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const formData = new FormData();
    const length = keys.length;

    for (let i = 0; i < length; i++) {
      formData.append(keys[i], values[i]);
    }

    handleUpload(formData);

    console.log(Array.from(formData));
    history.push(path + "/confirmation");
  };

  const handleUpload = async (data) => {
    try {
      const url = "http://localhost:5000/api/book/";
      const res = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="service-container row">
      <div className="select-service col-5">
        <img src={confirmIcon} alt="" />
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
              <p>{data.startTime.slice(0, 10)}</p>
            </div>
            <div className="mb-4">
              <p className="label">Service:</p>
              <p>{data.type}</p>
            </div>
          </div>
          <div className="col">
            <div className="mb-2">
              <p className="label">Time:</p>
              <p>05:00 - 06:00</p>
            </div>
          </div>
        </div>

        {type === "online_meeting" || type === "publicity" ? (
          <button
            type="button"
            className="back-btn"
            onClick={() => history.push(path + "/other-info")}
          >
            Prev
          </button>
        ) : null}
        {type === "intern_support" || type === "e_notice" ? (
          <button
            type="button"
            className="back-btn"
            onClick={() => history.push(path + "/support-info")}
          >
            Prev
          </button>
        ) : null}

        <button
          type="button"
          className="btn btn-primary submit-btn"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Verify;
