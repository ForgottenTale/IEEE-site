
import EventsList from './eventList';
import { useState } from 'react'

function DateBody(props) {

    const [showEventList, setEventList] = useState(false);
    

    if (props.day.key === new Date().toLocaleDateString()) {
        return (
            <div className="date" onClick={() => console.log(props.day.key)} onMouseEnter={() => { setEventList(!showEventList) }} onMouseLeave={() => { setEventList(!showEventList) }}>
                <div className="date_day active" >{props.day.day}</div>
                <div className="date_events">
                    {showEventList ? <EventsList events={props.events} /> : null}
                </div>
            </div>
        );
    }

    else {
        return (
            <div className="date" 
            onClick={() => console.log(props.day.key)} 
            onMouseEnter={() => { setEventList(!showEventList) }} 
            onMouseLeave={() => { setEventList(!showEventList) }}
            >
                <div className="date_day">{props.day.day}</div>
                <div className="date_events">
                    {showEventList ? <EventsList  events={props.events}/> : null}
                </div>
            </div>
        );
    }

}

export default DateBody