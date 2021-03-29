import './dashboard.scss';
import Menu from '../menu/menu';
import TopNav from '../topNav/topNav';
import Appointments from '../appointments/appointments';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

export default function Dashboard() {

    const [open, setOpen] = useState(true);
    var style = { }
    if (!open) {
        style = { marginLeft: 60 }
        console.log(style)
    }
    else{
        style = { marginLeft: 220 }
    }


    return (
        <div className="dashboard">
            <Menu toggle={setOpen} state={open} />
            <div className="dashboard_content" style={style}>
                <TopNav />
                <h5>Welcome Alan Mathew !</h5>
                <Appointments />

            </div>
        </div>
    );
}