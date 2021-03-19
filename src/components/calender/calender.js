
import React, { useState, useEffect } from 'react';
import './calender.scss'
import DateBody from './components/dateBody'

function Calender() {


    const [days, setDays] = useState([]);
    const [today, setToday] = useState([]);
    const [next, setNext] = useState(0);

    const data = [
        {
            "date": "19/03/2020",
            "events": [
                { "Title": "Webinar on CyptoCurrency", "time": "9 pm - 10 pm IST" },
                { "Title": "Webinar on NFT", "time": "6 pm - 8 pm IST" }
            ]
        },
        {
            "date": "20/03/2020",
            "events": [
                { "Title": "Webinar on CyptoCurrency", "time": "9 pm - 10 pm IST" },
                { "Title": "Webinar on NFT", "time": "6 pm - 8 pm IST" }
            ]
        },
    ]

    var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];



    useEffect(() => {
        var monthNames = ["Januvary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"];
        let d = new Date();
        let day = d.getDate();

        if (next > 0) {

            d.setMonth(d.getMonth() + next);
        }
        else if (next < 0) {
            d.setMonth(d.getMonth() - next);
        }
        let month = d.getMonth();
        let year = d.getFullYear();


        setToday({ "day": day, "month": monthNames[month], "year": year });
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        d.setDate(1);
        let firstDayIndex = d.getDay();
        let lastDayIndex = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDay();
        var prevMonthLastDay = new Date(d.getFullYear(), d.getMonth(), 0).getDate();

        var temp = [];
        var p = [];
        for (let i = firstDayIndex; i > 0; i--) {
            d.setDate(prevMonthLastDay);
            d.setMonth(month - 1);
            p.push({ "day": prevMonthLastDay, "key": d.toLocaleDateString() })
            prevMonthLastDay = prevMonthLastDay - 1;
        }
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            temp.push(p[i]);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            d.setDate(i);
            d.setMonth(month);
            temp.push({ "day": i, "key": d.toLocaleDateString() })
        }

        for (let i = lastDayIndex; i < 6; i++) {
            d.setDate(i - lastDayIndex + 1);
            d.setMonth(month + 1);
            temp.push({ "day": i - lastDayIndex + 1, "key": d.toLocaleDateString() })

        }
        setDays(temp)
    }, [next])


    const nextMonth = () => {

        setNext(next + 1);

    }
    const prevMonth = () => {
        setNext(next - 1);
    }



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

                {(days === []) ? {} : days.map((date) => <DateBody day={date} key={date.key} />)}

            </div>


        </div>
    );


}


export default Calender