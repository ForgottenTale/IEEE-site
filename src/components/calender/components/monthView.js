import DateBody from './dateBody';
import './monthView.scss';

function DayNameBody(props) {

    return (
        <div className="dayNameBody">
            <div className="dayNameBody_name">{props.day}</div>
        </div>
    );

    
}

function MonthView({days}){

    
    var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return(
        <div className="monthView">
            {dayName.map((name) => <DayNameBody day={name} key={name} />)}
            {(days === []) ? {} : days.map((date) => <DateBody day={date} key={date.key} events={date.events} />)}
        </div>
    );

}

export default MonthView;