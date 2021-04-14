import './table.scss';
import UserView from '../userView/userView';
import {useState} from 'react';
import RequestView from '../requestView/requestView';

export default function Table({ headers, data, type }) {

    const [view, setView] = useState(false);
    return (
        <div className="tableTag">
            <table>
                <tr>
                    {headers.map((header) => <th>{header}</th>)}
                </tr>


                {
                    data.map((row) =>
                        <tr>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            {type === 'admin' || type === 'user' ? [
                                <td>{row.email}</td>,
                                <td>{row.role}</td>,

                            ] : null}
                            {type === 'admin' ? [
                                <td>{row.team}</td>,
                            ] : null}
                            {type === 'request' ? [
                                <td>{row.service}</td>,
                                <td>{row.type}</td>,
                                <td>{row.time}</td>,
                                <td>{row.status}</td>,
                            ] : null}
                            <td onClick={()=>setView(!view)}>View</td>
                            {view&&(type==='user'||type==='admin')?<UserView data={row} setView={setView} type={type}/>:null}
                            {view&&type==='request'?<RequestView data={row} setView={setView}/>:null}
                        </tr>
                    )
                }


            </table>
       
        </div>
    )
}