import React from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import confirmIcon from '../../../images/info.png'

function Verify({ type, data }) {
  const history = useHistory();


  const handleSubmit = () => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const formData = new FormData();
    const length = keys.length;

    for (let i = 0; i <length; i++) {
      formData.append(keys[i], values[i]);
    }

    handleUpload(formData);

    console.log(Array.from(formData))
    history.push("/confirmation");
  }

  const handleUpload = async (data) => {


    try {
      const url = '/api/book/'+type;
      const res = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(res);

    } catch (err) {
      console.log(err);
    }

  }


  return (
    <div className="ub">
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
                <p>{data.timeFrom.toISOString().slice(0, 10)}</p>
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
          {type === "online-meeting" || type === "publicity" ? (
            <button
              type="button"
              className="back-btn"
              onClick={() => history.push("/other-info")}
            >
              Prev
            </button>
          ) : null}
          {type === "intern-support" || type === "enotice" ? (
            <button
              type="button"
              className="back-btn"
              onClick={() => history.push("/support-info")}
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
    </div>
  );
}

export default Verify;
