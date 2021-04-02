import React from "react";
import { name } from "./Services";

function OtherInfo(props) {
  let [count, setCount] = React.useState(1);

  function addCohost() {
    if (count < 3) {
      setCount(count + 1);
    }
  }

  function deleteCohost() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  function CohostData(props) {
    return (
      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Co-host name</label>
          <input
            type="text"
            className="form-control"
            name={"cohostName" + (props.id + 1)}
          />
        </div>
        <div className="col">
          <label className="form-label">Co-host email</label>
          <input
            type="email"
            className="form-control"
            name={"cohostMail" + (props.id + 1)}
          />
        </div>
      </div>
    );
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

        {name === "publicity" ? (
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
              onClick={() => props.history.push("/event-info")}
            >
              Prev
            </button>

            <button
              type="button"
              onClick={() => props.history.push("/verify")}
              className="btn btn-primary next-btn"
            >
              Next
            </button>
          </form>
        ) : (
          /* ............................................................................................... */

          <form>
            {[...Array(count)].map((e, i) => (
              <CohostData key={i} id={i} />
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

            {count !== 1 && (
              <button
                type="button"
                onClick={deleteCohost}
                className="btn btn-secondary btn-sm cohost-btn"
              >
                <i className="fas fa-trash"></i>
              </button>
            )}

            <button
              type="button"
              className="mt-5 back-btn"
              onClick={() => props.history.push("/event-info")}
            >
              Prev
            </button>

            <button
              type="button"
              onClick={() => props.history.push("/verify")}
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
