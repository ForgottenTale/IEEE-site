

var d = new Date();


export function date() {
    return (d.getMonth().toString());
}

export function date2() {
    return "hi2"
}
export function setMonth(props) {
    
    d.setMonth(props);
}



// let d = new Date();
// let day = d.getDate();
// let month = d.getMonth();
// let year = d.getFullYear();
// var daysInMonth = new Date(year, month + 1, 0).getDate();
// d.setDate(1);
// let firstDayIndex = d.getDay();
// let lastDayIndex = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDay();
// var prevMonthLastDay = new Date(d.getFullYear(), d.getMonth(), 0).getDate();
// var events = [];
// var temp = [];
// var p = [];
// for (let i = firstDayIndex; i > 0; i--) {
//     d.setDate(prevMonthLastDay);
//     d.setMonth(month - 1);
//     events = data.filter((Obj) => {
//         if (Obj.date.toString() === d.toISOString().slice(0, 10)) {
//             return Obj.events
//         }
//         else {
//             return null
//         }
//     })
//     p.push({ "day": prevMonthLastDay, "key": d.toLocaleDateString(), "events": events[0] })
//     prevMonthLastDay = prevMonthLastDay - 1;
// }
// for (let i = firstDayIndex - 1; i >= 0; i--) {
//     temp.push(p[i]);
// }

// for (let i = 1; i <= daysInMonth; i++) {
//     d.setDate(i);
//     d.setMonth(month);

//     events = data.filter((Obj) => {
//         if (Obj.date.toString() === d.toLocaleDateString()) {
//             return Obj.events
//         }
//         else {
//             return null
//         }
//     })

//     temp.push({ "day": i, "key": d.toLocaleDateString(), "events": events[0] })

// }

// for (let i = lastDayIndex; i < 6; i++) {
//     d.setDate(i - lastDayIndex + 1);
//     d.setMonth(month + 1);
//     events = data.filter((Obj) => {
//         if (Obj.date.toString() === d.toLocaleDateString()) {
//             return Obj.events
//         }
//         else {
//             return null
//         }
//     })
//     temp.push({ "day": i - lastDayIndex + 1, "key": d.toLocaleDateString(), "events": events[0] })
// }
// setDays(temp)