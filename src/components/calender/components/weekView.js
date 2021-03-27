import './weekView.scss';
import Events from './events';
import TimeSeries from './timeSeries';
import WeekNames from './weekNames';

function WeekView({ calendarEvents }) {
    return (
        <div className="weekView">
            <div style={{ marginLeft: 40 }}>
                < WeekNames />
            </div>

            <div className="weekView_container">
                <div style={{ display: "flex", }}>
                    <TimeSeries />
                </div>
                <div className="weekView_container_events">
                    <Events calendarEvents={calendarEvents} />
                    <Events calendarEvents={calendarEvents} />
                    <Events calendarEvents={calendarEvents} />
                    <Events calendarEvents={calendarEvents} />
                    <Events calendarEvents={calendarEvents} />
                    <Events calendarEvents={calendarEvents} />
                    <Events calendarEvents={calendarEvents} />
                </div>
            </div>


        </div>
    );
}

export default WeekView;