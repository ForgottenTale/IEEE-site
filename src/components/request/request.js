
import './request.scss';
import { Input2 } from '../utils/myReactLib';

export default function Request() {

    return (
        <div className="request">
            <div className="request_header">
                <h6 className="request_header_title">All requests</h6>

            </div>
            <div className="request_sub">
                <h6 className="request_sub_title">You have 360 request</h6>

                <Input2 className="request_sub_input"/>

            </div>
            </div>
    )
}

