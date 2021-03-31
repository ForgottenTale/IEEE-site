import './dayView.scss';
import Events from './events';
import TimeSeries from './timeSeries';

export default function DayView({day}) {
  console.log(day.format("DD/MM/YYYY"));
    return (
        <div className="timeGrid">
            <TimeSeries />
            <Events day={day}/>
        </div>
    );
}