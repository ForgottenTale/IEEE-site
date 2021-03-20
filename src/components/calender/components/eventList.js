import './eventList.scss'


function Event({event}) {
    console.log(event)
    return (
        <div className="eventList_events_event">
            <div className="eventList_events_event_title">{event.title}</div>
            <div className="eventList_events_event_time">{event.time}</div>
        </div>
    );
}
function EventsList({ events }) {
    return (
        <div className="eventList">
            <h4 className="eventList_date">Date</h4>
            <p className="eventList_number">Number of events</p>
            <div className="eventList_events">
                {events !== undefined ?events.events.map((event)=><Event event ={event}/>):null}

        
            </div>
        </div>
    )
}



export default EventsList