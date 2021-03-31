import './eventList.scss'


function Event({event}) {
    // console.log(event)
    return (
        <div className="eventList_events_event">
            <div className="eventList_events_event_title">{event.title}</div>
            <div className="eventList_events_event_time">{event.time}</div>
        </div>
    );
}
function EventsList({ day }) {
    console.log(day)
    return (
        <div className="eventList">
            <h4 className="eventList_date">{day.format("DD MMM,YYYY")}</h4>
            <p className="eventList_number"> Number of events : {(day !== undefined && day.events !==null )?day.events.length:0}</p>
            <div className="eventList_events">
                {(day !== undefined && day.events !==null )?day.events.map((event)=><Event event ={event}  key={event.timeFrom}/>):null}

        
            </div>
        </div>
    )
}



export default EventsList