import './view.scss';
import pic from '../../images/pic3.jpg'

export default function View({ data, setView, type }) {
    return (
        <div className="view">
            <div className="view_overlay" onClick={() => setView(false)}>
            </div>
            <div className="view_container">
                <center>
                    <img className="view_container_img"  src={pic} alt=''></img>
                </center>
                <div className="view_container_item">
                    <p>Name :&nbsp;</p> <p>{data.name}</p>
                </div>
                <div className="view_container_item">
                    <p>Email :&nbsp;</p> <p>{data.email}</p>
                </div>
                <div className="view_container_item">
                    <p>Role :&nbsp;</p> <p>{data.role}</p>
                </div>

                {type === 'admin' ?
                    <div className="view_container_item">
                        <p>Team :&nbsp;</p> <p>{data.team}</p>
                    </div> : null}
            </div>
        </div>
    );
}
