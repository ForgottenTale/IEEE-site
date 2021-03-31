import DateBody from './dateBody';
import './monthView.scss';
import WeekNames from './weekNames';
import { useEffect } from 'react';


// function MonthView({ days }) {


//     return (
//         <div >
//             <WeekNames />
//             <div className="monthView">
//                 {(days === []) ? {} : days.map((date) => <DateBody day={date} key={date.key} events={date.events} />)}
//             </div>
//         </div>
//     );

// }


function MonthView({ days }) {

    useEffect(() => {

        // var a = days;
   
        // a[0][0][0].events= "Name" 
        // a[0][0].push({ events: "Name"  })
        // a[0][0].events =[{ events: "Name"  }]
        // console.log(days);
        // console.log(days);

    }, [days])


    return (
        <div >
            <WeekNames />
            <div className="monthView">
                {(days === []) ? {} : days.map((date) => date.map((day) => <DateBody day={day} key={day.format("D").toString()}  />))}
            </div>
        </div>
    );

}


export default MonthView;