
import React, { useState, useEffect } from 'react';
import './calender.scss';
import DayView from './components/dayView';
import WeekView from './components/weekView';
import MonthView from './components/monthView';

function Calender() {


    const [days, setDays] = useState([]);
    const [today, setToday] = useState([]);
    const [monthView, setMonthView] = useState(true);
    const [weekView, setWeekView] = useState(false);
    const [dayView, setDayView] = useState(false);
    const [next, setNext] = useState(0);
    const [numberOfWeeks, setNumberOfWeeks] = useState(0);
    const [currentWeek, setCurrentWeek] = useState(0);
    const [date, setDate] = useState({});




    useEffect(() => {
        setDate({
            day: new Date().getDate(),
            month:new Date().getMonth(),
            year: new Date().getFullYear()
        })
    }, [])

    useEffect(() => {
        const data = [
            {
                "date": "2021-03-19",
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
                "date": "2021-03-22",
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
                "date": "2021-03-20",
                "events": [
                    { "title": "Webinar on CyptoCurrency", "time": "9 pm - 10 pm IST" },
                    { "title": "Webinar on NFT", "time": "6 pm - 8 pm IST" }
                ]
            },
            {
                "date": "2021-03-28",
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

        var monthNames = ["Januvary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"];
        let d = new Date();


        if (next !== 0) {

            // if(d.getMonth() + next){
            //     d.setFullYear(d.setFullYear()+1);
            //     setNext(0);
            // }
            // if(d.getMonth() + next<0){
            //     d.setFullYear(d.setFullYear()-1);
            //     setNext(0);
            // }
            d.setDate(1);
            d.setFullYear(date.year);
            d.setMonth(date.month);
            console.log(d);

        }
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
        console.log(day + "/" + month + "/" + year)


        setToday({ "day": day, "month": monthNames[month], "year": year });
        console.log({ "day": day, "month": monthNames[month], "year": year });

        var daysInMonth = new Date(year, month + 1, 0).getDate();
        console.log(daysInMonth);
        d.setDate(1);
        console.log(d);
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
                if (Obj.date.toString() === d.toISOString().slice(0,10).replace('/','-')) {
                    return Obj.events
                }
                else {
                    return null
                }
            })
            p.push({ "day": prevMonthLastDay, "key": d.toISOString().slice(0,10).replace('/','-'), "events": events[0] })
            prevMonthLastDay = prevMonthLastDay - 1;
        }
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            temp.push(p[i]);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            d.setDate(i);
            d.setMonth(month);

            events = data.filter((Obj) => {
                if (Obj.date.toString() === d.toISOString().slice(0,10).replace('/','-')) {
                    return Obj.events
                }
                else {
                    return null
                }
            })

            temp.push({ "day": i, "key": d.toISOString().slice(0,10).replace('/','-'), "events": events[0] })

        }

        for (let i = lastDayIndex; i < 6; i++) {
            d.setDate(i - lastDayIndex + 1);
            d.setMonth(month + 1);
            events = data.filter((Obj) => {
                if (Obj.date.toString() === d.toISOString().slice(0,10).replace('/','-')) {
                    return Obj.events
                }
                else {
                    return null
                }
            })
            temp.push({ "day": i - lastDayIndex + 1, "key": d.toISOString().slice(0,10).replace('/','-'), "events": events[0] })
        }
        setDays(temp)

        setNumberOfWeeks(temp.length/7);
        var nWeek=0;

        var temp3=[];
        for(let i=0;i<temp.length;i++){
            temp3.push(temp[i]);
            if (temp3.length % 7 === 0) {
                temp3=[];
                nWeek=nWeek+1;  
            }
            if(temp[i].key===new Date().toISOString()){
                setCurrentWeek(nWeek);
                break;
            }
        }

        // if(month===0){
        //     setNext(0);
        //     d.setFullYear(d.setFullYear-1);
        // }


    }, [next,date])

    const nextMonth = () => {


        if (monthView) {
            setNext(next + 1);
            if (date.month + 1 <= 11) {
                setDate((prevState) => { return { ...prevState, month: date.month + 1 } })
            }

            if (date.month + 1 > 11) {
                setDate({
                    day: 1,
                    month: 0,
                    year: date.year + 1 
                })
            }
        }
        if (weekView) {
            if (currentWeek < numberOfWeeks - 1 && currentWeek >= 0) {
                setCurrentWeek(currentWeek + 1);
            }

            if (currentWeek === numberOfWeeks - 1) {
                setNext(next + 1);
                setCurrentWeek(0);
            }
        }


    }
    const prevMonth = () => {
        if (monthView) {
            setNext(next - 1);
            if (date.month - 1 >=0) {
                setDate((prevState) => { return { ...prevState, month: date.month - 1 } })
            }

            if (date.month - 1 < 0) {
                setDate({
                    day: 1,
                    month: 11,
                    year: date.year - 1 
                })
            }
        }
        if (weekView) {
            if (currentWeek < numberOfWeeks && currentWeek !== 0) {
                setCurrentWeek(currentWeek - 1);
            }
            if (currentWeek === 0) {
                setNext(next - 1);
                setCurrentWeek(numberOfWeeks - 1);
            }
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



    const calendarEvents = [
        {
            timeFrom: 1616700600000,
            timeTo: 1616715000000,
            title: 'Sleep'
        },
        {
            timeFrom: 1616725800000,
            timeTo: 1616736600000,
            title: 'Business meeting'
        },
        {
            timeFrom: 1616738400000,
            timeTo: 1616760000000,
            title: 'Wind down time'
        }
    ];


    return (
        <div className="calender">


            <div className="calender_menu">
                <h2 className="calender_menu_today">{today.day} {today.month} {today.year}</h2>
                <div className="calender_menu_buttons">
                    <button className="calender_menu_buttons_button" onClick={prevMonth}>&#60;</button>
                    <button className="calender_menu_buttons_button" onClick={nextMonth}>&#62;</button>
                    <button className="calender_menu_buttons_button" onClick={toggleDayView}>Day</button>
                    <button className="calender_menu_buttons_button" onClick={toggleWeekView}>Week</button>
                    <button className="calender_menu_buttons_button" onClick={toggleMonthView}>Month</button>
                </div>
            </div>





            {dayView ? <DayView calendarEvents={calendarEvents} /> : null}
            {weekView ? <WeekView calendarEvents={calendarEvents} days={days} currentWeek={currentWeek} numberOfWeeks={numberOfWeeks} /> : null}
            {monthView ? <MonthView days={days} /> : null}

        </div>
    );


}


export default Calender