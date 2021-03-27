
import './weekNames.scss';

function DayNameBody(props) {

    return (
        <div className="dayNameBody">
            <div className="dayNameBody_name">{props.day}</div>
        </div>
    );


};
export default function WeekNames() {
    var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
        <div style={{display:"flex"}}>
            { dayName.map((name) => <DayNameBody day={name} key={name} />)}
        </div>

    );
}