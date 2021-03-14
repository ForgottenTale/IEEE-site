
import React, { useState, useEffect } from 'react';
import './calender.scss'


function Calender() {


    const [days, setDays] = useState([]);


    var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri",];
    
    useEffect(()=>{
        let d = new Date();
        let month = d.getMonth();
        let year = d.getFullYear();
        var daysInMonth = new Date(year,month+1,0).getDate();
        d.setDate(1);
        let firstDayIndex = d.getDay();
        let lastDayIndex = new Date(d.getFullYear(),d.getMonth() + 1,0).getDay();
        var prevMonthLastDay = new Date(d.getFullYear(),d.getMonth(),0).getDate();
        
        var temp = [];
        for(let i=firstDayIndex; i>0;i--){
            temp.push({"day": prevMonthLastDay,"key":i+100 })
            prevMonthLastDay =  prevMonthLastDay - 1;
        }
        for(let i = 1; i<=daysInMonth;i++){
            temp.push({"day": i ,"key":i+600 })
        }
        
        for(let i=lastDayIndex; i<7;i++){
            temp.push({"day": i- lastDayIndex +1,"key":i+200 })
            
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
                <div className="date">
                    <div className="date_day active" >{props.day.day}</div>
                </div>
            );
        }

        else {
            return (
                <div className="date">
                    <div className="date_day">{props.day.day}</div>
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