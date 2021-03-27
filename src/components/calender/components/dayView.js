import './dayView.scss';
import Events from './events';
import TimeSeries from './timeSeries';

export default function DayView({calendarEvents}) {

    return (
        <div className="timeGrid">
            <TimeSeries />
            <Events calendarEvents={calendarEvents}/>
        </div>
    );
}