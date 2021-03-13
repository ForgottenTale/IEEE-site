
import React, { useState, useEffect } from 'react';
import './calender.scss'


function Calender() {

    const [date, setDate] = useState({
        day: "0",
        month: "0",
        year: "0"
    })

    const [days, setDays] = useState([]);

    let prevMonthDays = []

    let nextMonthDays = []

    let temp = new Date();


    temp.setDate(1);

    var firstDayIndex = temp.getDay(); // to know whether its monday, tuesday .......
    var lastDay = new Date(
        temp.getFullYear(),
        temp.getMonth() + 1,
        0
    ).getDate(); // previous month last day

    const lastDayIndex = new Date(
        temp.getFullYear(),
        temp.getMonth() + 1,
        0
      ).getDay();

    console.log(firstDayIndex);
    console.log(lastDay);

    function DateBody(props) {
        if (props.day === date.day) {
            return (
                <div className="date">
                    <div className="date_day active">{props.day}</div>
                </div>
            );
        }

        else {
            return (
                <div className="date">
                    <div className="date_day">{props.day}</div>
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


    for(let i = firstDayIndex;i>0;i--){
        prevMonthDays.push(<DateBody day={lastDay} key={i+1} />)
        lastDay = lastDay-1;
    }

    for(let i = lastDayIndex+1;i<7;i++){
        nextMonthDays.push(<DateBody day={i-lastDayIndex} key={i+100} />)
    }



    useEffect(() => {
        var d = new Date();
        setDate((prevState) => { return { ...prevState, day: d.getDate(), month: d.getMonth(), year: d.getFullYear() } });
        var temp = []
        for (let i = 1; i <= 31; i++) {
            temp.push(i);

        }
        setDays(temp)

    
    }, []);
 
    var dayName = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return (
        <div className="monthView">
            {dayName.map((name)=><DayNameBody day={name} key={name}/>)}
            {prevMonthDays}
            {days.map((date) => <DateBody day={date} key={date} />)}
            {nextMonthDays}
        </div>
    );


}


export default Calender