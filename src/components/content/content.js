import './content.scss';
import Menu from '../menu/menu';
import TopNav from '../topNav/topNav';
import Appointments from '../appointments/appointments';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Calender from '../calender/calender';
import Setting from '../settings/settings';

export default function Content() {

    const [open, setOpen] = useState(true);

    var style = {}
    if (!open) {
        style = { marginLeft: 60 }
    }
    else {
        style = { marginLeft: 220 }
    }


    return (
        <div className="content">
            <Menu toggle={setOpen} state={open} />
            <div className="content_container" style={style}>
                <TopNav />
                <Switch>
                    <Route exact path="/">
                        <h5 className="content_container_user">Welcome Alan Mathew !</h5>
                        <Appointments />
                    </Route>
                    <Route path="/calender">
                        <Calender/>
                    </Route>
                    <Route path="/settings">
                        <Setting/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}