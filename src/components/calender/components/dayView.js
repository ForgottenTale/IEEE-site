import './dayView.scss';
import Events from './events';
import TimeSeries from './timeSeries';

export default function DayView({day}) {
    console.log(day);
    return (
        <div className="timeGrid">
            <TimeSeries />
            {/* {day.length!==0?<Events day={day}/>:null} */}
        </div>
    );
}