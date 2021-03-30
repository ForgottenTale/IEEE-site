import DateBody from './dateBody';
import './monthView.scss';
import WeekNames from './weekNames';


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
    console.log(days)

    return (
        <div >
            <WeekNames />
            <div className="monthView">
                {(days === []) ? {} : days.map((date) => date.map((day)=><DateBody day={day} key={day.format("D").toString()} events={date.events} />) )}
            </div>
        </div>
    );

}


export default MonthView;