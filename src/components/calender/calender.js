
import React, { useState, useEffect } from 'react';
import './calender.scss';
import DayView from './components/dayView';
import WeekView from './components/weekView';
import MonthView from './components/monthView';
import moment from 'moment';
import { pushEvents } from '../utils/date';
import axios from 'axios';


function Calender() {

    const [monthView, setMonthView] = useState(true);
    const [weekView, setWeekView] = useState(false);
    const [dayView, setDayView] = useState(false);
    const [calender, setCalendar] = useState([]);
    const [week, setWeek] = useState([]);
    const [day, setDay] = useState({});
    const [value, setValue] = useState(moment());
    const [daylist, setDayList] = useState([]);
    const [data,setData] = useState([]);

    useEffect(() => {
        const url = "/api/calendar?month=" + (value.clone().format('M') - 1) + "&year=" + value.clone().format('Y');
        axios.get(url, { withCredentials: true })
            .then((d) => {
                console.log(d)
                setData(d.data);
            })
            .catch(err => console.error(err));


    }, [value])

    useEffect(() => {


        const startDay = value.clone().startOf("month").startOf("week");
        const endDay = value.clone().endOf("month").endOf("week");
        const weekStart = value.clone().startOf('isoweek');
        const currentDay = value.clone().startOf("day");
        const day = startDay.clone().subtract(1, "day");
        const a = [];
        const weekDays = [];
        var temp = [];
        for (i = 1; i <= value.clone().daysInMonth(); i++) {
            temp.push(i);
        }
        setDayList(temp)

        if (monthView) {
       
            while (day.isBefore(endDay, "day")) {
                a.push(
                    Array(7).fill(0).map(() => {
                        var d = day.add(1, "day").clone();
                        d.events = pushEvents(d, data);
                        return d;
                    })
                );
            }

            setCalendar(a);

        }

        if (weekView) {
            for (var i = 0; i <= 6; i++) {
                var da = moment(weekStart).add(i, 'days').clone();
                weekDays.push(da);
                weekDays[i].events = pushEvents(da, data)

            }
            setWeek(weekDays);
        }


        if (dayView) {

            var tem = data.filter((Obj) => {
                if (Obj.date.toString() === currentDay.toISOString()) {
                    return Obj
                }
                else {
                    return null
                }

            });

            if (tem.length !== 0) {
                currentDay.events = tem[0].events;
            }
            else {
                currentDay.events = null
            }


            setDay(currentDay);
        }


    }, [value, weekView, monthView, dayView,data])


    const nextMonth = () => {


        if (monthView) {
            return value.clone().add(1, "month");
        }
        if (weekView) {
            return value.clone().add(1, "week");
        }
        if (dayView) {
            return value.clone().add(1, "day");
        }


    }

    const prevMonth = () => {


        if (monthView) {
            return value.clone().subtract(1, "month");
        }
        if (weekView) {
            return value.clone().subtract(1, "week");
        }
        if (dayView) {
            return value.clone().subtract(1, "day");
        }


    }

    const toggleDayView = () => {
        setDayView(true);
        setMonthView(false);
        setWeekView(false);
    }
    const toggleMonthView = () => {
        setDayView(false);
        setMonthView(true);
        setWeekView(false);
    }

    const toggleWeekView = () => {
        setDayView(false);
        setMonthView(false);
        setWeekView(true);
    }

    return (
        <div className="calender">
            <div className="calender_menu">
                <h2 className="calender_menu_today">
                    <select>
                        {daylist.map((val, key) => { return <option value={val} key={key}>{val}</option> })}
                    </select>
                    {value.format("MMMM")} {value.format("YYYY")}
                </h2>
                <div className="calender_menu_buttons">
                    <button className="calender_menu_buttons_button" onClick={() => setValue(prevMonth())}>&#60;</button>
                    <button className="calender_menu_buttons_button" onClick={() => setValue(nextMonth())}>&#62;</button>
                    <button className="calender_menu_buttons_button" onClick={toggleDayView}>Day</button>
                    <button className="calender_menu_buttons_button" onClick={toggleWeekView}>Week</button>
                    <button className="calender_menu_buttons_button" onClick={toggleMonthView}>Month</button>
                </div>
            </div>


            {dayView ? <DayView day={day} /> : null}
            {weekView ? <WeekView days={week} /> : null}
            {monthView ? <MonthView days={calender} /> : null}

        </div>
    );


}


export default Calender