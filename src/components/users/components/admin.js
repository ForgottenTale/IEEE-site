import './admin.scss';
import { Input2,Table } from '../../utils/myReactLib';
import {useState} from 'react';
 

function View(){
    return(
        <div className="view">
E
        </div>
    );
}


export default function Admin(){

    const [view, setView] = useState(false);

    const header = ['Id', "Name", "Email", "Role", "Team", ""];
    const data = [[
        1, "Sara Anan Jose", "sarananajose@ieee.org", "Alpha admin ", "Content",
    ],
    [
        2, "Sara Anan Jose", "sarananajose@ieee.org", "Alpha admin ", "Content",
    ]];
    return (
        <div className="admin">
            <div className="admin_sub">
                <Input2 className="admin_sub_input" />
                <Input2 className="admin_sub_input" />

            </div>
            <Table headers={header} data={data} setView={setView}/>
        </div>
    )
}