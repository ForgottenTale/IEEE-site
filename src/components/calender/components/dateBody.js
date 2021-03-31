
import EventsList from './eventList';
import { useState } from 'react'
import './dateBody.scss'

// function DateBody(props) {

//     const [showEventList, setEventList] = useState(false);
//     console.log(props.day.format("D"))
    
//     var d = new Date();
//     d.setHours(0,0,0,0);
//     if (props.day.key === d.toISOString()) {
//         return (
//             <div className="date" onClick={() => console.log(props.day.key)} onMouseEnter={() => { setEventList(!showEventList) }} onMouseLeave={() => { setEventList(!showEventList) }}>
//                 <div className="date_day active" >{props.day.day}</div>
//                 <p style={{color:"white",fontSize:12}}>{props.day.key}</p>
//                 <div className="date_events">
//                     {showEventList ? <EventsList events={props.events} /> : null}
//                 </div>
//             </div>
//         );
//     }

//     else {
//         return (
//             <div className="date" 
//             onClick={() => console.log(props.day.key)} 
//             onMouseEnter={() => { setEventList(!showEventList) }} 
//             onMouseLeave={() => { setEventList(!showEventList) }}
//             >
//                 <div className="date_day">{props.day.day}</div>
//                 <p style={{color:"white",fontSize:12}}>{props.day.key}</p>
//                 <div className="date_events">
//                     {showEventList ? <EventsList  events={props.events}/> : null}
//                 </div>
//             </div>
//         );
//     }

// }

function DateBody(props) {

    const [showEventList, setEventList] = useState(false);

    var d = new Date();
    d.setHours(0,0,0,0);
    if (props.day.key === d.toISOString()) {
        return (
            <div className="date" onClick={() => console.log(props.day.key)} onMouseEnter={() => { setEventList(!showEventList) }} onMouseLeave={() => { setEventList(!showEventList) }}>
                <div className="date_day active" >{props.day.format("D")}</div>
                <p style={{color:"white",fontSize:12}}>{props.day.key}</p>
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
                <div className="date_day">{props.day.format("D")}</div>
                <p style={{color:"white",fontSize:12}}>{props.day.key}</p>
                <div className="date_events">
                    {showEventList ? <EventsList  events={props.events}/> : null}
                </div>
            </div>
        );
    }

}


export default DateBody