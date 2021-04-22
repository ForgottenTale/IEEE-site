import './content.scss';
import Menu from '../menu/menu';
import TopNav from '../topNav/topNav';
import Appointments from '../appointments/appointments';
import { useState } from 'react';
import { Route, Switch, useRouteMatch, BrowserRouter as Router } from 'react-router-dom';
import Calender from '../calender/calender';
import Setting from '../settings/settings';
import Request from '../request/request';
import Users from '../users/users';
import Login from '../login/login';
// import AdminDashboard from '../adminDashboard/adminDashboard';


function All() {

    const [open, setOpen] = useState(true);
    const [activeComponent, setActiveComponent] = useState("Dashboard");
    const { path } = useRouteMatch();
    console.log(path)
    return (
        <div className="content">
            <Menu toggle={setOpen} state={open} setActiveComponent={setActiveComponent} />
            <div className={open ? "content_container open" : "content_container"} >
                <TopNav activeComponent={activeComponent} />

                <Switch>
                    <Route path="/dashboard" exact>
                        <h5 className="content_container_user">Welcome Alan Mathew !</h5>
                        <Appointments />
                        {/* <AdminDashboard /> */}
                    </Route>
                    <Route path="/calendar" exact>
                        <Calender />
                    </Route>
                    <Route path={'/settings'} exact>
                        <Setting />
                    </Route>
                    <Route path={'/requests'} exact>
                        <Request />
                    </Route>
                    <Route path={'/users'}>
                        <Users />
                    </Route>
                </Switch>




            </div>
        </div>
    )
}

export default function Content() {



    return (
        <Router>
            <Switch>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path="/*" exact>
                    <All />
                </Route>

            </Switch>
        </Router>


    );
}