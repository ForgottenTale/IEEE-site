
function test(n){
    var d = new Date();
    d.setFullYear(2021);
    d.setMonth(n);
    
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    
    d.setDate(1);
    
    let firstDayIndex = d.getDay();
    let lastDayIndex = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDay();
    var prevMonthLastDay = new Date(d.getFullYear(), d.getMonth(), 0);
    var temp = [];
    
    d = new Date(prevMonthLastDay);
    d.setDate(d.getDate()-firstDayIndex);
    
    for (let i = firstDayIndex; i > 0; i--) {
        d.setDate(d.getDate()+1)
        temp.push({ "day": d.getDate(), "key": d.toISOString()})
    
    }
    
    d.setMonth(month);
    d.setFullYear(year);
    for (let i = 1; i <= daysInMonth; i++) {
        d.setDate(i);
        temp.push({ "day": i, "key": d.toISOString() })
    
    }
    d.setDate(1);
    d.setMonth(month + 1);
    
    for (let i = 1;i<=(6-lastDayIndex);i++){
      d.setDate(i);
        temp.push({ "day": i , "key": d.toISOString() })
    }

    return temp;
}


let d = new Date();


        if (next !== 0) {

            // if(d.getMonth() + next){
            //     d.setFullYear(d.setFullYear()+1);
            //     setNext(0);
            // }
            // if(d.getMonth() + next<0){
            //     d.setFullYear(d.setFullYear()-1);
            //     setNext(0);
            // }
            d.setDate(1);
            d.setFullYear(date.year);
            d.setMonth(date.month);

        }
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();

        setToday({ "day": day, "month": monthNames[month], "year": year });

        var daysInMonth = new Date(year, month + 1, 0).getDate();

        d.setDate(1);

        let firstDayIndex = d.getDay();
        let lastDayIndex = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDay();
        var prevMonthLastDay = new Date(d.getFullYear(), d.getMonth(), 0);
        var events = [];
        var temp = [];


        d = new Date(prevMonthLastDay);
        d.setDate(d.getDate() - firstDayIndex);
        d.setHours(0, 0, 0, 0);

        for (let i = 0; i <firstDayIndex; i++) {
            d.setDate(d.getDate() + 1)
            events = data.filter((Obj) => {

                if (Obj.date.toString() === d.toISOString()) {
                    return Obj.events
                }
                else {
                    return null
                }
            })
            temp.push({ "day": d.getDate(), "key": d.toISOString(), "events": events[0] })

        }
        console.log(month+1);
        d.setMonth(month);
        d.setFullYear(year);

        for (let i = 1; i <= daysInMonth; i++) {
            d.setDate(i);

            events = data.filter((Obj) => {
                if (Obj.date.toString() === d.toISOString()) {
                    return Obj.events
                }
                else {
                    return null
                }
            })

            temp.push({ "day": i, "key": d.toISOString(), "events": events[0] })

        }
        d.setDate(1);
        d.setMonth(month + 1);

        for (let i = 1;i<=(6-lastDayIndex);i++){
            d.setDate(i);
            events = data.filter((Obj) => {
                if (Obj.date.toString() === d.toISOString()) {
                    return Obj.events
                }
                else {
                    return null
                }
            })
            temp.push({ "day": i, "key": d.toISOString(), "events": events[0] })
        }
        setDays(temp);
        // console.log(temp)

        setNumberOfWeeks(temp.length / 7);

        var nWeek = 0;
        var temp3 = [];
        for (let i = 0; i < temp.length; i++) {
            temp3.push(temp[i]);
            if (temp3.length % 7 === 0) {
                temp3 = [];
                nWeek = nWeek + 1;
            }
            if (temp[i].key === new Date().toISOString().slice(0, 10).replace('/', '-')) {
                setCurrentWeek(nWeek);
                break;
            }
        }
        // console.log(nWeek);
        // if(month===0){
        //     setNext(0);
        //     d.setFullYear(d.setFullYear-1);
        // }
