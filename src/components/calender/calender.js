
import React, { useState, useEffect } from 'react';
import './calender.scss';
import DateBody from './components/dateBody';
import DayView from './components/dayView';

function Calender() {


    const [days, setDays] = useState([]);
    const [today, setToday] = useState([]);
    const [next, setNext] = useState(0);



    var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];



    useEffect(() => {
        var monthNames = ["Januvary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"];
        let d = new Date();
        let day = d.getDate();
        const data = [
            {
                "date": "19/3/2021",
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
                "date": "22/3/2021",
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
                "date": "20/3/2021",
                "events": [
                    { "title": "Webinar on CyptoCurrency", "time": "9 pm - 10 pm IST" },
                    { "title": "Webinar on NFT", "time": "6 pm - 8 pm IST" }
                ]
            },

        ]

        if (next !== 0) {

            d.setMonth(d.getMonth() + next);
        }

        let month = d.getMonth();
        let year = d.getFullYear();


        setToday({ "day": day, "month": monthNames[month], "year": year });
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        d.setDate(1);
        let firstDayIndex = d.getDay();
        let lastDayIndex = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDay();
        var prevMonthLastDay = new Date(d.getFullYear(), d.getMonth(), 0).getDate();
        var events = [];
        var temp = [];
        var p = [];
        for (let i = firstDayIndex; i > 0; i--) {
            d.setDate(prevMonthLastDay);
            d.setMonth(month - 1);
            events = data.filter((Obj) => {
                if (Obj.date.toString() === d.toLocaleDateString()) {
                    return Obj.events
                }
                else {
                    return null
                }
            })
            p.push({ "day": prevMonthLastDay, "key": d.toLocaleDateString(), "events": events[0] })
            prevMonthLastDay = prevMonthLastDay - 1;
        }
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            temp.push(p[i]);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            d.setDate(i);
            d.setMonth(month);

            events = data.filter((Obj) => {
                if (Obj.date.toString() === d.toLocaleDateString()) {
                    return Obj.events
                }
                else {
                    return null
                }
            })

            temp.push({ "day": i, "key": d.toLocaleDateString(), "events": events[0] })

        }

        for (let i = lastDayIndex; i < 6; i++) {
            d.setDate(i - lastDayIndex + 1);
            d.setMonth(month + 1);
            events = data.filter((Obj) => {
                if (Obj.date.toString() === d.toLocaleDateString()) {
                    return Obj.events
                }
                else {
                    return null
                }
            })
            temp.push({ "day": i - lastDayIndex + 1, "key": d.toLocaleDateString(), "events": events[0] })
        }
        setDays(temp)


    }, [next])


    const nextMonth = () => {
        setNext(next + 1);

    }
    const prevMonth = () => {
        setNext(next - 1);
    }

    const calendarEvents = [
        {
          timeFrom: 1616700600000,
          timeTo: 1616715000000,
          title: 'Sleep',
          background: '#616161'
        },
        {
          timeFrom: 1616725800000,
          timeTo: 1616736600000,
          title: 'Business meeting',
          background: '#33B779'
        },
        {
          timeFrom: 1616738400000,
          timeTo: 1616760000000,
          title: 'Wind down time',
          background: '#616161'
        }
      ];

    function DayNameBody(props) {

        return (
            <div className="dayNameBody">
                <div className="dayNameBody_name">{props.day}</div>
            </div>
        );

        
    }
    return (
        <div className="calender">


            <div className="calender_menu">
                <h2 className="calender_menu_today">{today.day} {today.month} {today.year}</h2>
                <div className="calender_menu_buttons">
                    <button className="calender_menu_buttons_button" onClick={prevMonth}>&#60;</button>
                    <button className="calender_menu_buttons_button" onClick={nextMonth}>&#62;</button>
                    <button className="calender_menu_buttons_button" onClick={nextMonth}>Day</button>
                    <button className="calender_menu_buttons_button" onClick={nextMonth}>Month</button>
                </div>
            </div>

            <div className="calender_monthView">

                {dayName.map((name) => <DayNameBody day={name} key={name} />)}

                {(days === []) ? {} : days.map((date) => <DateBody day={date} key={date.key} events={date.events} />)}

            </div>
            <DayView calendarEvents={calendarEvents} />

        </div>
    );


}


export default Calender