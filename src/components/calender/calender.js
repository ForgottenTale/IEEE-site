
import React, { useState, useEffect } from 'react';
import './calender.scss'


function DateBody(props) {

    return (
        <div className="date">
           <div className="date_day">{props.day}</div> 
        </div>
    );

}


function Calender() {

    const [date, setDate] = useState({
        day: "0",
        month: "0",
        year: "0"
    })

    const [days,setDays] = useState([]);



    useEffect(() => {
        var d = new Date();
        setDate((prevState) => { return { ...prevState, day: d.getDate(), month: d.getMonth(), year: d.getFullYear() } });
        var temp =[]
        for(let i =1;i<=31;i++) {
            temp.push(i);
            
          }
        setDays(temp)
        // console.log(days)
        // console.log(date)
    }, []);

  

    return (
        <div className="monthView">
            {days.map((date) => <DateBody day={date} key={date}/>)}
        </div>
    );


}


export default Calender