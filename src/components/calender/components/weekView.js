import './weekView.scss';
import Events from './events';
import TimeSeries from './timeSeries';
import WeekNames from './weekNames';
import { useEffect, useState } from 'react';

function WeekView({ calendarEvents, days }) {
    const [currentWeek, setCurrentWeek] = useState(0)
    const [week,setWeeks]= useState([]);

    useEffect(() => {
        var weeks = [];
        var temp = [];
        var p = 0;
        for (let i = 0; i < days.length; i++) {
            temp.push(days[i]);
            
            if (temp.length % 7 === 0) {
                setWeeks(temp);
                temp = [];
                p=p+1;
            }
            if (days[i].key === new Date().toLocaleDateString()) {
                setCurrentWeek(p);
            }
            
        }
        console.log(weeks)
    }, [])

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
                    {week.map((day)=><Events calendarEvents={calendarEvents} day={day}/>)}
                </div>
            </div>


        </div>
    );
}

export default WeekView;