
import './users.scss';
import Admins from './components/admin';
import User from './components/users';
import { useState } from 'react';


export default function Users() {

    const [usertype, setUserType]  = useState(false)

    return (
        <div className="users">
            <div className="users_header">
                <h6 className="users_header_title" >All Users</h6>

            </div>
            <div className="users_type">
                <h6 className={usertype?"users_type_title ":"users_type_title active"} onClick={()=>setUserType(false)}>Users</h6>
                <h6 className={usertype?"users_type_title active":"users_type_title "} onClick={()=>setUserType(true)}>Admins</h6>

            </div>
       
              {usertype? <Admins />:<User />}


        </div>
    )
}

