import './table.scss';
import pic from '../../images/pic3.jpg';
import { NavLink,useRouteMatch  } from 'react-router-dom';

export default function Table({ headers, data, type,setUser,setRequest }) {

    const { path } =useRouteMatch();
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
                            <td >
                                <div className="tableTag_user">
                                    <img src={pic} alt='profile-pic' className="tableTag_user_pic" />
                                &nbsp; &nbsp;
                                {row.name}
                                </div>

                            </td>
                            {type === 'admin' || type === 'user' ? [
                                <td>{row.email}</td>,
                                <td>{row.role}</td>,

                            ] : null}
                            {type === 'admin' ? [
                                <td className="team">
                                    <div className={"team_body "+ row.team}>
                                        <div className={"team_body_con"}>
                                            <div className={"team_body_con_dot "+ row.team} ></div>
                                            <p>&nbsp;{row.team}</p>
                                        </div>

                                    </div>
                                </td>,
                            ] : null}
                            {type === 'request' ? [
                                <td>{row.service}</td>,
                                <td>{row.type}</td>,
                                <td>{row.time}</td>,
                                <td>
                                    <p className={row.status}>
                                        {row.status}
                                    </p>
                                </td>,
                            ] : null}
                            <td>
                                {type === 'request'?
                                <NavLink to={path+"/"+row.id} onClick={()=>setRequest(row)}>View</NavLink>
                                :<NavLink to={path+'/user/'+row.id} onClick={()=>setUser(row)}>View</NavLink>}
                              
                            </td>
                        </tr>
                    )
                }


            </table>

        </div>
    )
}