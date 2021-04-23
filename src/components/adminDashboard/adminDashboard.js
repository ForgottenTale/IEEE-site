import './adminDashboard.scss';
import { useState, useEffect } from 'react';
import Table from '../table/table';
import { Input2 } from '../utils/myReactLib';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RequestView from '../requestView/requestView';
import axios from 'axios';

export default function AdminDashboard() {
    const [data, setData] = useState(null);
    const header = ['Id', "Name", "Service", "Type", "Time", "Status", "Action"];
    const { path } = useRouteMatch();
    const [request, setRequest] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [refresh, setRefresh] = useState(true);
    useEffect(() => {

        const url = "http://localhost:5000/api/my-approvals/history";
        axios.get(url, { withCredentials: true })
            .then((data) => {
                console.log(data);
                if(data.status==200)
                    setData(data.data);
            })
            .catch(err => console.error(err));


    }, [refresh])
    return (
        <Switch>
            <Route exact path={path}>
                <div className="request">
                    <div className="adminDashboard">
                        <div className="adminDashboard_con">
                            <div className="adminDashboard_con_box">
                                <h5>Approved request</h5>
                                <p>6</p>
                            </div>
                            <div className="adminDashboard_con_box">
                                <h5>Pending request</h5>
                                <p>6</p>
                            </div>
                            <div className="adminDashboard_con_box">
                                <h5>Declined request</h5>
                                <p>6</p>
                            </div>
                            <div className="adminDashboard_con_box">
                                <h5>Total request</h5>
                                <p>6</p>
                            </div>
                        </div>
                    </div>

                    <div className="request_sub">
                        <h6 className="request_sub_title">All completed request</h6>

                        <Input2 className="request_sub_input" placeholder="Search for requests" onChange={(e) => setSearchTerm(e.target.value)} />

                    </div>

                    <Table headers={header} data={data} type='request' setRequest={setRequest} searchTerm={searchTerm} />


                </div>
            </Route>
            <Route path={path + '/:id'}>
                <RequestView req={request} setRefresh={setRefresh} refresh={refresh} showButton={false} />
            </Route>
        </Switch>
    );
}