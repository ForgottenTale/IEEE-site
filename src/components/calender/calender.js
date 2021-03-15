
import React, { useState, useEffect } from 'react';
import './calender.scss'


function Calender() {


    const [days, setDays] = useState([]);
    const [today, setToday] = useState([]);
    const [next, setNext] = useState(0);

    var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];



    useEffect(() => {
        var monthNames = ["Januvary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"];
        let d = new Date();
        let day = d.getDate();

        if (next > 0) {
            
            d.setMonth(d.getMonth()+next);
        }
        else if (next < 0) {
            d.setMonth(d.getMonth()-next);
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
       
        setDays([]);
        setNext(next + 1);

    }
    const prevMonth = () => {
    
        setDays([]);
        setNext(next - 1);
    }

    function DateBody(props) {

        if (props.day.key === new Date().toLocaleDateString()) {
            return (
                <div className="date" onClick={() => console.log(props.day.key)}>
                    <div className="date_day active" >{props.day.day}</div>
                    <p style={{color:"white"}}>{props.day.key}</p>
                </div>
            );
        }

        else {
            return (
                <div className="date" onClick={() => console.log(props.day.key)} >
                    <div className="date_day">{props.day.day}</div>
                    <p style={{color:"white"}}>{props.day.key}</p>
                </div>
            );
        }

    }

    function DayNameBody(props) {

        return (
            <div className="dayNameBody">
                <div className="dayNameBody_name">{props.day}</div>
            </div>
        );


    }
    return (
        <div>
            <h2 className="today">{today.day} {today.month} {today.year}</h2>
            <div className="monthView">

                {dayName.map((name) => <DayNameBody day={name} key={name} />)}

                {(days === []) ? {} : days.map((date) => <DateBody day={date} key={date.key} />)}

            </div>
            <button onClick={prevMonth}>Prevous</button>
            <button onClick={nextMonth}>Next</button>

        </div>
    );


}


export default Calender