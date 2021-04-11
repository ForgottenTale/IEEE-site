
import './users.scss';
import { Input2 } from '../utils/myReactLib';

export default function Users() {

    return (
        <div className="users">
            <div className="users_header">
                <h6 className="users_header_title">All Users</h6>

            </div>
            <div className="users_type">
                <h6 className="users_type_title">Users</h6>
                <h6 className="users_type_title">Admins</h6>

            </div>
            <div className="users_sub">
                <Input2 className="users_sub_input" />
                <Input2 className="users_sub_input" />

            </div>
        </div>
    )
}

