
import './users.scss';
import Admins from './components/admin';

import { Route, Switch } from 'react-router-dom';
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
            <Route path="/">
                <Admins />
            </Route>
            {/* <Route path="/">
                <Users />
            </Route> */}

        </div>
    )
}

