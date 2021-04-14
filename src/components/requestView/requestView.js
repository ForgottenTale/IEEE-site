import './requestView.scss';
import pic from '../../images/pic3.jpg';
export default function RequestView({ data, setView }) {

    return (
        <div className="requestView">
            <div className="requestView_overlay" onClick={() => setView(false)}></div>
            <div className="requestView_container">
                <div className="requestView_container_item">
                    <p>Name : &nbsp;</p>
                    <p>{data.name}</p>
                </div>
                <div className="requestView_container_item">
                    <p>Email : &nbsp;</p>
                    <p>{data.email}</p>
                </div>
                <div className="requestView_container_item">
                    <p>Service : &nbsp;</p>
                    <p>{data.service}</p>
                </div>
                <div className="requestView_container_item">
                    <p>Type : &nbsp;</p>
                    <p>{data.type}</p>
                </div>
                <div className="requestView_container_item">
                    <p>Date : &nbsp;</p>
                    <p>{data.date}</p>
                </div>

                {data.service === "Online meeting" ? [
                    <div className="requestView_container_item">
                        <p>Time from : &nbsp;</p>
                        <p>{data.timeFrom}</p>
                    </div>,
                    <div className="requestView_container_item">
                        <p>Time to : &nbsp;</p>
                        <p>{data.timeTo}</p>
                    </div>,
                    <div className="requestView_container_item">
                        <p>Speaker : &nbsp;</p>
                        <p>{data.speakerName}</p>
                    </div>,
                    <div className="requestView_container_item">
                        <p>Speaker email : &nbsp;</p>
                        <p>{data.speakerEmail}</p>
                    </div>
                ] : null}
                {data.timeTo === undefined ?
                    <div className="requestView_container_item">
                        <p>Time : &nbsp;</p>
                        <p>{data.timeFrom}</p>
                    </div>
                    : null}

                <div className="requestView_container_item">
                    <p>Description : &nbsp;</p>
                    <p>{data.description}</p>
                </div>
                <center>
                    <img className="requestView_container_img" src={pic} alt=''></img>
                </center>

            </div>

        </div>

    );
}