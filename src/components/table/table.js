import './table.scss';

export default function Table({ headers, data, type }) {

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
                            <td>View</td>
                        </tr>
                    )
                }


            </table>
        </div>
    )
}