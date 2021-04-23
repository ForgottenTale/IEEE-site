import './admin.scss';
import { Input2 } from '../../utils/myReactLib';
import Table from '../../table/table';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Admin({ setUser }) {
    const header = ['Id', "Name", "Email", "Role", ""];
    const [searchTerm, setSearchTerm] = useState("");
    const [data,setData] = useState(null);

    useEffect(() => {
        const url = "/api/users?role=regular";
        axios.get(url, { withCredentials: true })
            .then((d) => {
                console.log(d)
                setData(d.data);
            })
            .catch(err => console.error(err));


    }, [])
    return (
        <div className="admin">
            <div className="admin_sub">
                <Input2 className="admin_sub_input" placeholder="Search for users" onChange={(e) => setSearchTerm(e.target.value)} />


            </div>
            <Table headers={header} data={data} type='user' setUser={setUser} searchTerm={searchTerm} />

        </div>
    )
}