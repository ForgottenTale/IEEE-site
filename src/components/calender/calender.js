
import React, { useState, useEffect } from 'react';
import './calender.scss';
import DayView from './components/dayView';
import WeekView from './components/weekView';
import MonthView from './components/monthView';
import moment from 'moment';

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
                "date": "2021-02-27T18:30:00.000Z",
                "events": [
                    {
                        "title": "Webinar on CyptoCurrency",
                        "time": "9 pm - 10 pm IST",
                        "timeFrom": 1616700600000,
                        "timeTo": 1616715000000,
                        "background": '#616161'
                    },
                ]
            },
            {
                "date": "2021-03-21T18:30:00.000Z",
                "events": [
                    {
                        "title": "Webinar on CyptoCurrency", "time": "9 pm - 10 pm IST",
                        "timeFrom": 1616700600000,
                        "timeTo": 1616715000000,
                        "background": '#616161'
                    },
                    {
                        "title": "Webinar on CyptoCurrency", "time": "9 pm - 10 pm IST",
                        "timeFrom": 1616725800000,
                        "timeTo": 1616736600000,
                        "background": '#33B779'
                    },
                ]
            },
            {
                "date": "2021-03-30T18:30:00.000Z",
                "events": [
                    { "title": "Webinar on CyptoCurrency", "time": "9 pm - 10 pm IST" },
                    { "title": "Webinar on NFT", "time": "6 pm - 8 pm IST" }
                ]
            },
            {
                "date": "2021-03-27T18:30:00.000Z",
                "events": [
                    {
                        "title": "Webinar on CyptoCurrency",
                        "time": "9 pm - 10 pm IST",
                        "timeFrom": 1616700600000,
                        "timeTo": 1616715000000,
                        "background": '#616161'
                    },
                ]
            },

        ]
        const startDay = value.clone().startOf("month").startOf("week");
        const endDay = value.clone().endOf("month").endOf("week");
        const weekStart = value.clone().startOf('isoweek');
        const dayStart = value.clone().startOf("day");
        const day = startDay.clone().subtract(1, "day");
        const a = [];
        const days = [];

        while (day.isBefore(endDay, "day")) {
            a.push(
                Array(7)
                    .fill(0).map(() => {

                        var d = day.add(1, "day").clone();
                        var temp = [];
                        temp = data.filter((Obj) => {
                            if (Obj.date.toString() === d.toISOString()) {
                                return Obj
                            }
                            else {
                                return null
                            }

                        });

                        if (temp.length !== 0) {
                            d.events = temp[0].events;
                        }
                        else {
                            d.events = null
                        }
                        return d;
                    })
            );
        }

        for (var i = 0; i <= 6; i++) {
            days.push(moment(weekStart).add(i, 'days').clone());
        }

        setCalendar(a);
        setWeek(days);
        setDay(dayStart);
    }, [value])


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


            {dayView ? <DayView day={day} /> : null}
            {weekView ? <WeekView days={week} /> : null}
            {monthView ? <MonthView days={calender} /> : null}

        </div>
    );


}


export default Calender