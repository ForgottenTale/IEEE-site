
import React, { useState, useEffect } from 'react';
import './calender.scss';
import DayView from './components/dayView';
import WeekView from './components/weekView';
import MonthView from './components/monthView';
import moment from 'moment';
import {pushEvents} from '../utils/date';


function Calender() {

    const [monthView, setMonthView] = useState(true);
    const [weekView, setWeekView] = useState(false);
    const [dayView, setDayView] = useState(false);
    const [calender, setCalendar] = useState([]);
    const [week, setWeek] = useState([]);
    const [day, setDay] = useState({});
    const [value, setValue] = useState(moment());



    useEffect(() => {

        const data = [
         
            {
                "date": "2021-03-30T18:30:00.000Z",
                "events": [
                    {
                        "title": "Webinar on CyptoCurrency",
                        "time": "9 pm - 10 pm IST",
                        "timeFrom": "2021-03-30T19:30:00.000Z",
                        "timeTo": "2021-03-30T22:30:00.000Z",
                        "background": '#616161'
                    },
                    {
                        "title": "Webinar on CyptoCurrency",
                        "time": "9 pm - 10 pm IST",
                        "timeFrom": "2021-03-30T22:30:00.000Z",
                        "timeTo": "2021-03-31T00:30:00.000Z",
                        "background": '#616161'
                    },
                ]
            },
            

        ]
        const startDay = value.clone().startOf("month").startOf("week");
        const endDay = value.clone().endOf("month").endOf("week");
        const weekStart = value.clone().startOf('isoweek');
        const currentDay = value.clone().startOf("day");
        const day = startDay.clone().subtract(1, "day");
        const a = [];
        const weekDays = [];

        if (monthView) {
            while (day.isBefore(endDay, "day")) {
                a.push(
                    Array(7).fill(0).map(() => {
                        var d = day.add(1, "day").clone();
                        d.events = pushEvents(d,data);
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
                weekDays[i].events=pushEvents(da,data)

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


    }, [value, weekView, monthView, dayView])


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
                <h2 className="calender_menu_today"> {value.format("MMMM")} {value.format("YYYY")}</h2>
                <div className="calender_menu_buttons">
                    <button className="calender_menu_buttons_button" onClick={() => setValue(prevMonth())}>&#60;</button>
                    <button className="calender_menu_buttons_button" onClick={() => setValue(nextMonth())}>&#62;</button>
                    <button className="calender_menu_buttons_button" onClick={toggleDayView}>Day</button>
                    <button className="calender_menu_buttons_button" onClick={toggleWeekView}>Week</button>
                    <button className="calender_menu_buttons_button" onClick={toggleMonthView}>Month</button>
                </div>
            </div>


            {dayView ? <DayView day={day}/> : null}
            {weekView ? <WeekView days={week} /> : null}
            {monthView ? <MonthView days={calender} /> : null}

        </div>
    );


}


export default Calender