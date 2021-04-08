
import './settings.scss';
import { Input } from '../utils/myReactLib';

export default function Setting() {
    return (
        <div className="settings">
            <h5>User Profile</h5>
            <div className="settings_con">


                <Input className="input" label="First Name" />
                <Input className="input" label="Last Name" />

            </div>
            <div className="settings_con">

                <Input className="input" label="Email" />
                <Input className="input" label="Phone" />

            </div>
            <button>Save</button>
            <h5>Set a new Password</h5>
            <div className="settings_con">


                <Input className="input" label="New Password" />
                <Input className="input" label="Confirm New Password" />


            </div>
            <button>Save</button>
        </div>
    );
}