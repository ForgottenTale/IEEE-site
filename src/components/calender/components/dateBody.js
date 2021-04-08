
import EventsList from './eventList';
import { useState } from 'react';
import './dateBody.scss';


function DateBody(props) {

    const [showEventList, setEventList] = useState(false);

    var d = new Date();
    d.setHours(0, 0, 0, 0);


    return (
        <div className="date"
            onClick={() => console.log(props.day.key)}
            onMouseEnter={() => { setEventList(!showEventList) }}
            onMouseLeave={() => { setEventList(!showEventList) }}
        >
            <div className="date_day">{props.day.format("D")}</div>
            <p style={{ color: "white", fontSize: 12 }}>{props.day.key}</p>
            <div className="date_events">
                {showEventList ? <EventsList day={props.day} /> : null}
            </div>
        </div>
    );


}


export default DateBody