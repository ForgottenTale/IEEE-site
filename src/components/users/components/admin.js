import './admin.scss';
import { Input2} from '../../utils/myReactLib';

import Table from '../../table/table';


export default function Admin({setUser}){


    const header = ['Id', "Name", "Email", "Role", "Team", ""];
    const data = [{
        "id": 1, name: "Alan Mathew", email: "alanmathew@ieee.org", role: "Alpha admin ", team: "content",
    },
    {
        "id": 2, name: "Alan Mathew", email: "alanmathew@ieee.org", role: "Alpha admin ", team: "web",
    },
    {
        "id": 2, name: "Alan Mathew", email: "alanmathew@ieee.org", role: "Alpha admin ", team: "design",
    }]
    return (
        <div className="admin">
            <div className="admin_sub">
                <Input2 className="admin_sub_input" placeholder="Search for admins" />

            </div>
            <Table headers={header} data={data} type='admin' setUser={setUser}/>
        </div>
    )
}