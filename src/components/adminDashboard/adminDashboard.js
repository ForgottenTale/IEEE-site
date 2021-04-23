import './adminDashboard.scss';
import { useState, useEffect } from 'react';
import Table from '../table/table';
import { Input2 } from '../utils/myReactLib';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RequestView from '../requestView/requestView';
import axios from 'axios';
import ServiceSelection from '../New Appointment/App';

export default function AdminDashboard({role}) {
    const [data, setData] = useState(null);
    const header = ['Id', "Name", "Service", "Type", "Time", "Status", "Action"];
    const { path } = useRouteMatch();
    const [request, setRequest] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [refresh, setRefresh] = useState(true);
    const [pop,setPop] =useState(false);
    const [values, setValues] = useState({
        approved: 0,
        denied: 0,
        pending: 0,
        total: 0
    })
    useEffect(() => {
        console.log("role in dashboard", role);
        if(role=="ALPHA_ADMIN" || role=="BETA_ADMIN"){
            var url = "/api/my-approvals/history";
            axios.get(url, { withCredentials: true })
                .then((data) => {
                    console.log(data);
                    if(data.status==200)
                        setData(data.data);
                })
                .catch(err => console.error(err));
           
            }else if(role=="REGULAR"){
                var url = "/api/my-appointments";
                axios.get(url, { withCredentials: true })
                    .then((data) => {
                        console.log(data);
                        if(data.status==200)
                            setData(data.data);
                    })
                    .catch(err => console.error(err));
            }
           var url = "/api/activity";
            axios.get(url, { withCredentials: true })
                .then((data) => {
                    console.log(data);
                    setValues({
                        approved: data.data.approved,
                        denied: data.data.declined,
                        pending: data.data.pending,
                        total: data.data.approved + data.data.pending + data.data.pending
                    });
                })
                .catch(err => console.error(err));
        }, [role]);

    return (
        <Switch>
            
            <Route exact path={path}>
            {pop?<ServiceSelection setPop={setPop} pop={pop}/>:null}
                <div className="request">
                    <div className="adminDashboard">
                        <div className="adminDashboard_con">
                            <div className="adminDashboard_con_box">
                                <h5>Approved request</h5>
                                <p>{values.approved}</p>
                            </div>
                            <div className="adminDashboard_con_box">
                                <h5>Pending request</h5>
                                <p>{values.pending}</p>
                            </div>
                            <div className="adminDashboard_con_box">
                                <h5>Declined request</h5>
                                <p>{values.denied}</p>
                            </div>
                            <div className="adminDashboard_con_box">
                                <h5>Total request</h5>
                                <p>{values.total}</p>
                            </div>
                        </div>
                    </div>
                    <h6 className="request_sub_title" style={{margin:30}}>All completed request</h6>
                    <div className="request_sub">
                        

                        <Input2 className="request_sub_input" placeholder="Search for requests" onChange={(e) => setSearchTerm(e.target.value)} />
                        <button className="appointments_header_button" onClick={()=>{setPop(true)}}>+ New Appointment</button>
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