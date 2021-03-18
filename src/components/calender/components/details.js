import './eventList.scss'

function EventsList() {
    return (
        <div className="eventList">
            <h4 className="eventList_date">Date</h4>
            <p className="eventList_number">Number of events</p>
            <div className="eventList_events">
                <div className="eventList_events_event">
                    <div className="eventList_events_event_title"> Webinar on IoT</div>
                    <div className="eventList_events_event_time">3:30 pm - 4:30 pm</div>
                </div>
                <div className="eventList_events_event">
                    <div className="eventList_events_event_title"> Webinar on IoT</div>
                    <div className="eventList_events_event_time">3:30 pm - 4:30 pm</div>
                </div>
            </div>
        </div>
    )
}

export default EventsList