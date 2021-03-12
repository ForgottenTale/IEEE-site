
import React from 'react';
import './calender.scss'

const data  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
;
function DateBody(props) {

    return (
        <div className="date">
         {props.day}
        </div>
    );

}


function Calender() {
    return (
        <div className="monthView">
             {data.map((date)=><DateBody day={date}/>)}
        </div>
    );


}


export default Calender