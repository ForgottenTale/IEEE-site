import './weekView.scss';
import Events from './events';
import TimeSeries from './timeSeries';

function WeekView({calendarEvents}) {
    return (
        <div className="weekView">
            <TimeSeries/>
            <div className="weekView_events">
            <Events calendarEvents={calendarEvents} />
             <Events calendarEvents={calendarEvents} />
             <Events calendarEvents={calendarEvents} />
             <Events calendarEvents={calendarEvents} />
             <Events calendarEvents={calendarEvents} />
             <Events calendarEvents={calendarEvents} />
             <Events calendarEvents={calendarEvents} />
            </div>
             
        </div>
    );
}

export default WeekView;