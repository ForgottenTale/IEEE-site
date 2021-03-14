
import React, { useState, useEffect } from 'react';
import './calender.scss'


function Calender() {


    const [days, setDays] = useState([]);

    const [today,setToday] = useState([]);
    var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    

    
    useEffect(()=>{
        var monthNames = ["Januvary","February","March","April","May","June","July","August","September","October","Novemeber","December"];
        let d = new Date();
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
        setToday({"day":day,"month":monthNames[month],"year":year});
        var daysInMonth = new Date(year,month+1,0).getDate();
        d.setDate(1);
        let firstDayIndex = d.getDay();
        let lastDayIndex = new Date(d.getFullYear(),d.getMonth() + 1,0).getDay();
        var prevMonthLastDay = new Date(d.getFullYear(),d.getMonth(),0).getDate();
        
        var temp = [];
        var a = new Date();
        for(let i=firstDayIndex; i>0;i--){
            a.setDate(prevMonthLastDay);
            a.setMonth(month-1);
            temp.push({"day": prevMonthLastDay,"key":a.toLocaleDateString() })
            prevMonthLastDay =  prevMonthLastDay - 1;
        }
        console.log(daysInMonth)
        for(let i = 1; i<=daysInMonth;i++){
            a.setDate(i);
            a.setMonth(month);
            temp.push({"day": i ,"key":a.toLocaleDateString() })
        }
        
        for(let i=lastDayIndex; i<7;i++){
            a.setDate(i- lastDayIndex +1);
            a.setMonth(month+1);
            temp.push({"day": i- lastDayIndex +1,"key":a.toLocaleDateString() })
            
        }
        setDays(temp)
    },[])


    const nextMonth =(props)=>{
        console.log(props.day)

    }
    const prevMonth =()=>{
        console.log("Hi")
    }

    function DateBody(props) {
    
        if (props.day.day === new Date().getDate()) {
            return (
                <div className="date" onClick={()=>console.log(props.day.key)}>
                    <div className="date_day active" >{props.day.day}</div>
                    {props.day.key}
                </div>
            );
        }

        else {
            return (
                <div className="date" onClick={()=>console.log(props.day.key)} >
                    <div className="date_day">{props.day.day}</div>
                    {props.day.key}
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
               
                {(days===[])?{}:days.map((date) => <DateBody day={date} key={date.key}/>)}
             
            </div>
            <button onClick={prevMonth}>Prevous</button>
            <button onClick={nextMonth}>Next</button>
            
        </div>
    );


}


export default Calender