import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

function CohostData(props) {

  return (
    <div className="row mb-3">

      <div className="col">
        <label className="form-label">Co-host name</label>
        <input

          className="form-control"
          name="cohostName"
          value={props.cohost[props.id].cohostName}
          onChange={e => props.handleChange(props.id, e)}
        />
      </div>
      <div className="col">
        <label className="form-label">Co-host email</label>
        <input

          className="form-control"
          name="cohostMail"
          value={props.cohost[props.id].cohostMail}
          onChange={e => props.handleChange(props.id, e)}
        />
      </div>


    </div>
  );
}

function OtherInfo({ type, data, setData }) {

  const history = useHistory();
  let [count, setCount] = useState(1);
  const [cohost, setCohost] = useState([
    { cohostName: "asdas", cohostMail: "sdasd" }
  ]);

  function nextButton() {
    setData(
      {
        ...data,
        cohosts: cohost
      });

    history.push("/verify");
  }

  function addCohost() {
    if (count < 3) {

    }

    setCohost([...cohost, { "cohostName": "", "cohostMail": "" }])
  }

  function deleteCohost(i) {
    if (count < 0) {
      setCount(count - 1);
      const values = [...cohost];
      values.splice(i, 1);
      setCohost(values)
    }

  }


  function handleChange(index, e) {

    let values = [...cohost];
    e.preventDefault();
    values[index][e.target.name] = e.target.value;
    setCohost(values);

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
        <h2>Other Details</h2>

        {type === "publicity" ? (
          <form>
            <div className="row mb-3">
              <div className="col-6">
                <label className="form-label">Program schedule (if any)</label>
                <input type="text" className="form-control" name="schedule" />
              </div>
            </div>

            <div className="row mb-5">
              <div className="col">
                <label className="form-label">Comments</label>
                <textarea
                  rows="3"
                  className="form-control"
                  name="comments"
                ></textarea>
              </div>
            </div>

            <button
              type="button"
              className="back-btn"
              onClick={() => history.push("/event-info")}
            >
              Prev
            </button>

            <button
              type="button"
              onClick={() => nextButton()}
              className="btn btn-primary next-btn"
            >
              Next
            </button>
          </form>
        ) : (
          /* ............................................................................................... */

          <form>
            {cohost.map((e, i) => (
              <CohostData key={i} id={i} cohost={cohost} handleChange={handleChange} />
            ))}

            {count !== 3 && (
              <button
                type="button"
                onClick={addCohost}
                className="btn btn-secondary btn-sm cohost-btn"
              >
                <i className="fas fa-plus"></i>
              </button>
            )}


            <button
              type="button"
              onClick={deleteCohost}
              className="btn btn-secondary btn-sm cohost-btn"
            >
              <i className="fas fa-trash"></i>
            </button>


            <button
              type="button"
              className="mt-5 back-btn"
              onClick={() => history.push("/event-info")}
            >
              Prev
            </button>

            <button
              type="button"
              onClick={() => nextButton()}
              className="btn btn-primary mt-5 next-btn"
            >
              Next
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default OtherInfo;
