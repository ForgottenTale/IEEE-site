import './weekView.scss';
import Events from './events';
import TimeSeries from './timeSeries';
import WeekNames from './weekNames';
import { useEffect, useState } from 'react';

function WeekView({ calendarEvents, days, currentWeek, numberOfWeeks }) {
    const [week, setWeek] = useState([]);

    useEffect(() => {
        var temp = [];
        var temp2 = [];
        var p = 0;

        for (let i = 0; i < days.length; i++) {
            temp.push(days[i]);
            if (temp.length % 7 === 0) {
                p = p + 1;
                temp2.push(temp);
                temp = [];
            }

        }
        setWeek(temp2);

    }, [days]);


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
                    {/* {(currentWeek >0) ? week[currentWeek].map((day)=><Events calendarEvents={calendarEvents} day={day} key={day.key}/>):null} */}
                    {week[currentWeek]!==undefined ? week[currentWeek].map((day) => <Events calendarEvents={calendarEvents} day={day} key={day.key} />) : null}
                </div>
            </div>


        </div>
    );
}

export default WeekView;