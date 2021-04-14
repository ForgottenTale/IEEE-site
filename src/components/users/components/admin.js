import './admin.scss';
import { Input2} from '../../utils/myReactLib';

import Table from '../../table/table';


export default function Admin(){


    const header = ['Id', "Name", "Email", "Role", "Team", ""];
    const data = [{
        "id": 1, name: "Sara Anan Jose", email: "sarananajose@ieee.org", role: "Alpha admin ", team: "Content",
    },
    {
        "id": 2, name: "Sara Anan Jose", email: "sarananajose@ieee.org", role: "Alpha admin ", team: "Content",
    }]
    return (
        <div className="admin">
            <div className="admin_sub">
                <Input2 className="admin_sub_input" />
                <Input2 className="admin_sub_input" />

            </div>
            <Table headers={header} data={data} type='admin'/>
        </div>
    )
}