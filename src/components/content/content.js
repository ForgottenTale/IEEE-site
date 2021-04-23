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
import AdminDashboard from '../adminDashboard/adminDashboard';
import PageNotFound from '../404/pageNotFound';


function All(props) {
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
                    <Route path="/dashboard" >
                        {console.log("props", props)}
                        <h5 className="content_container_user">Welcome {props.name} !</h5>
                         <Appointments /> 
                        {console.log("admingProps", props)}
                        {/* <AdminDashboard role={props.role}/> */}
                    </Route>
                    <Route path="/calendar" >
                        <Calender />
                    </Route>
                    <Route path={'/settings'}>
                        <Setting />
                    </Route>
                    <Route path={'/requests'}>
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

export default function Content(props) {



    return (
        <Router>
            <Switch>
                <Route path='/login'>
                    <Login {...props} />
                </Route>
                <Route path="/*">
                    <All {...props}/>
                </Route>
                {/* <Route path="/*">
                    <PageNotFound/>
                </Route> */}

            </Switch>
        </Router>


    );
}