import './table.scss';
import pic from '../../images/pic3.jpg';
import { NavLink, useRouteMatch } from 'react-router-dom';
import SkeletonRowRequest from '../skeleton/skeletonRowRequest';
import SkeletonRowUser from '../skeleton/skeletonRowUser';


export default function Table({ headers, data, type, setUser, setRequest, searchTerm}) {


    const { path } = useRouteMatch();
    return (
        <div className="tableTag">
            <table>
                <tr>
                    {headers.map((header) => <th>{header}</th>)}
                </tr>
                {

                    (data !== null && data.length>0) ?
                        data.filter((val) => {
                            if (searchTerm === "") {
                                return val;
                            }
                            else if (
                                val.name.toLowerCase().includes(searchTerm.toLowerCase())
                                || val.type.toLowerCase().includes(searchTerm.toLowerCase())
                                || new Date(val.startTime).toDateString().toLowerCase().includes(searchTerm.toLowerCase())
                                || val.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
                            ) {
                                return val;
                            }
                        }).map((row, key) =>
                            <tr key={key}>
                                <td data-label="id">{row.id}</td>
                                <td data-label="Name">
                                    <div className="tableTag_user">
                                        <img src={pic} alt='profile-pic' className="tableTag_user_pic" />
                              <p>
                              {row.name}
                              </p>
                              
                                    </div>

                                </td>
                                {type === 'admin' || type === 'user' ? [
                                    <td data-label="Email">{row.email}</td>,
                                    <td data-label="Role">{row.role.replace('_'," ").toLowerCase()}</td>,

                                ] : null}
                            
                                {type === 'request' ? [
                                    <td data-label="Service">{row.type.replace('_', ' ')}</td>,
                                    <td data-label="Type">{row.serviceName}</td>,
                                    <td data-label="Time">{new Date(row.startTime).toDateString()}</td>,
                                    <td data-label="Status">
                                        <p >
                                            {row.status.toLowerCase()}
                                        </p>
                                    </td>,
                                ] : null}
                                <td>
                                    {type === 'request' ?
                                        <NavLink to={path + "/" + row.id} onClick={() => setRequest(row)}>View</NavLink>
                                        : <NavLink to={path + '/user/' + row.id} onClick={() => setUser(row)}>View</NavLink>}

                                </td>

                            </tr>
                        )

                        : (type==="user"||type==="admin"?[1, 2, 3, 5, 6, 7, 8].map((key) => <SkeletonRowUser key={key}/>):data!==[]&&[1, 2, 3, 5, 6, 7, 8].map((key) => <SkeletonRowRequest key={key} />))
                }


                {

                }


            </table>

        </div>
    )
}