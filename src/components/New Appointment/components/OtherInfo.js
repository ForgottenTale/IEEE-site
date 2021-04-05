import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

function OtherInfo({ type, data, setData }) {

  const history = useHistory();
  let [count, setCount] = useState(1);
  const [cohost, setCohost] = useState([
    { cohostName: "asdas", cohostMail: "sdasd" }
  ]);



  function addCohost() {
    // if (count < 3) {
    //   setCount(count + 1);
    // }
    setCohost([...cohost, { "cohostName": "", "cohostMail": "" }])
  }

  function deleteCohost(i) {
    // if (count > 1) {
    //   setCount(count - 1);
    // }
    const values = [...cohost];
    values.splice(i, 1);
    setCohost(values)
  }


  const handleChange = (index, e) => {

    let values = [...cohost];

    e.preventDefault();
    console.log(e.target.value);
    values[index][e.target.name] = e.target.value;
    console.log(values)

    setCohost(values);

    // setCohost(prev=>{
    //   prev.map((item,i)=>{
    //     if(i !== index){
    //       return item
    //     }

    //     return{
    //       ...item,[e.target.name]:e.target.value
    //     }
    //   });
    // });

    // 
  }

  function CohostData(props) {


    return (
      <div className="row mb-3">

        <div className="col">
          <label className="form-label">Co-host name</label>
          <input

            className="form-control"
            name="cohostName"
            value={cohost[props.id].cohostName}
            onChange={e => handleChange(props.id, e)}
          />
        </div>
        <div className="col">
          <label className="form-label">Co-host email</label>
          <input

            className="form-control"
            name="cohostMail"
            value={cohost[props.id].cohostMail}
            onChange={e => handleChange(props.id, e)}
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
              onClick={() => history.push("/verify")}
              className="btn btn-primary next-btn"
            >
              Next
            </button>
          </form>
        ) : (
      /* ............................................................................................... */

      <form>
        {cohost.map((e, i) => (
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
          onClick={() => history.push("/verify")}
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
