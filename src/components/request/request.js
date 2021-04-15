
import './request.scss';
import Table from '../table/table';
import { Input2 } from '../utils/myReactLib';

export default function Request() {

    const header = ['Id', "Name", "Service", "Type", "Time", "Status","Action"];
    const data = [
        { id:1, name:"Sara Anan Jose",service: "Online meeting",type: "Zoom ",time: "2pm IST 05/27/2021",status:"Pending"},
        { id:2, name:"Sara Anan Jose",service: "Online meeting",type: "Zoom ",time: "2pm IST 05/27/2021",status:"Pending"},
        { id:1, name:"Sara Anan Jose",service: "Online meeting",type: "Zoom ",time: "2pm IST 05/27/2021",status:"Pending"},
        { id:2, name:"Sara Anan Jose",service: "Online meeting",type: "Zoom ",time: "2pm IST 05/27/2021",status:"Pending"},
        { id:1, name:"Sara Anan Jose",service: "Online meeting",type: "Zoom ",time: "2pm IST 05/27/2021",status:"Pending"},
        { id:2, name:"Sara Anan Jose",service: "Online meeting",type: "Zoom ",time: "2pm IST 05/27/2021",status:"Pending"},
        { id:1, name:"Sara Anan Jose",service: "Online meeting",type: "Zoom ",time: "2pm IST 05/27/2021",status:"Pending"},
        { id:2, name:"Sara Anan Jose",service: "Online meeting",type: "Zoom ",time: "2pm IST 05/27/2021",status:"Pending"},
        { id:1, name:"Sara Anan Jose",service: "Online meeting",type: "Zoom ",time: "2pm IST 05/27/2021",status:"Pending"},
        { id:2, name:"Sara Anan Jose",service: "Online meeting",type: "Zoom ",time: "2pm IST 05/27/2021",status:"Pending"},

   ];

    return (
        <div className="request">
            <div className="request_header">
                <h6 className="request_header_title">All requests</h6>

            </div>
            <div className="request_sub">
                <h6 className="request_sub_title">You have 360 request</h6>

                <Input2 className="request_sub_input" placeholder="Search for requests" />

            </div>
            <Table headers={header} data={data} type='request' />
        </div>
    )
}

