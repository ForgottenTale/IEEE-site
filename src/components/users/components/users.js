import './admin.scss';
import { Input2 } from '../../utils/myReactLib';
import Table from '../../table/table';
import { useState, useEffect } from 'react';



export default function Admin({ setUser }) {
    const header = ['Id', "Name", "Email", "Role", ""];
    const [searchTerm, setSearchTerm] = useState("");
    const data = [{
        "id": 1, name: "Alan Mathew", email: "alanmathew@ieee.org", role: "Alpha admin ", college: "College of Engineering"
    },
    {
        "id": 2, name: "Alan Mathew", email: "alanmathew@ieee.org", role: "Alpha admin ",
    }]
    return (
        <div className="admin">
            <div className="admin_sub">
                <Input2 className="admin_sub_input" placeholder="Search for users" onChange={(e) => setSearchTerm(e.target.value)} />


            </div>
            <Table headers={header} data={data} type='user' setUser={setUser} searchTerm={searchTerm} />

        </div>
    )
}