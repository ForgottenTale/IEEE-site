import './content.scss';
import Menu from '../menu/menu';
import TopNav from '../topNav/topNav';
import Appointments from '../appointments/appointments';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Calender from '../calender/calender';
import Setting from '../settings/settings';
import Request from '../request/request';
import Users from '../users/users';
// import AdminDashboard from '../adminDashboard/adminDashboard';

export default function Content() {

    const [open, setOpen] = useState(true);
    const [activeComponent, setActiveComponent] =useState("Dashboard");


    return (
        <div className="content">
            <Menu toggle={setOpen} state={open} setActiveComponent={setActiveComponent}/>
            <div className= {open?"content_container open":"content_container"} >
                <TopNav activeComponent={activeComponent} />
                <Switch>
                    <Route exact path="/">
                        <h5 className="content_container_user">Welcome Alan Mathew !</h5>
                        <Appointments />
                        {/* <AdminDashboard /> */}
                    </Route>
                    <Route path="/calendar">
                        <Calender/>
                    </Route>
                    <Route path="/settings">
                        <Setting/>
                    </Route>
                    <Route path="/requests">
                        <Request/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}