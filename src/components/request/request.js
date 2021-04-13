
import './request.scss';
import { Input2, Table } from '../utils/myReactLib';

export default function Request() {

    const header = ['Id', "Name", "Service", "Type", "Time", "Status","Action"];
    const data = [
        [ 1, "Sara Anan Jose", "Online meeting", "Zoom ", "2pm IST 05/27/2021","Pending",],
        [ 2, "Sara Anan Jose", "Online meeting", "Zoom ", "2pm IST 05/27/2021","Pending",],

   ];

    return (
        <div className="request">
            <div className="request_header">
                <h6 className="request_header_title">All requests</h6>

            </div>
            <div className="request_sub">
                <h6 className="request_sub_title">You have 360 request</h6>

                <Input2 className="request_sub_input" />

            </div>
            <Table headers={header} data={data} />
        </div>
    )
}

