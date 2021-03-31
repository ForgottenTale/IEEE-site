import './weekView.scss';
import Events from './events';
import TimeSeries from './timeSeries';
import WeekNames from './weekNames';


function WeekView({ days }) {

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
                    {days!==undefined ? days.map((day) => <Events day={day} key={day} />) : null}
                </div>
            </div>


        </div>
    );
}

export default WeekView;