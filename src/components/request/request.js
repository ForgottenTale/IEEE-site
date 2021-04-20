
import './request.scss';
import {useState} from 'react';
import Table from '../table/table';
import { Input2 } from '../utils/myReactLib';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RequestView from '../requestView/requestView';

export default function Request() {

    const header = ['Id', "Name", "Service", "Type", "Time", "Status", "Action"];
    const data = [
        { id: 1, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending",responses:[{name:"dddafsd",e_mail:"dark@gmail.com"}] },
        { id: 2, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending" },
        { id: 3, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending" },
        { id: 4, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending" },
        { id: 5, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending" },
        { id: 6, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending" },
        { id: 7, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending" },
        { id: 8, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending" },
        { id: 9, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending" },
        { id: 10, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending" },

    ];
    const { path } = useRouteMatch();
    const [request,setRequest] =useState(null);
    return (
        <Switch>
            <Route exact path={path}>
                <div className="request">
                    <div className="request_header">
                        <h6 className="request_header_title">All requests</h6>

                    </div>
                    <div className="request_sub">
                        <h6 className="request_sub_title">You have {data.length} request</h6>

                        <Input2 className="request_sub_input" placeholder="Search for requests" />

                    </div>
                    <Table headers={header} data={data} type='request' setRequest={setRequest} />
                </div>
            </Route>
            <Route path={path+'/:id'}>
                 <RequestView data={request}/>
            </Route>
        </Switch>

    )
}

