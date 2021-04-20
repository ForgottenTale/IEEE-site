import './requestView.scss';
import pic from '../../images/pic3.jpg';



export default function RequestView({ data }) {

    return (
        <div className="requestView">
            <div className="requestView_con">
                <div className="requestView_con_item">
                    <p>Name</p>
                    <input value={data.name} />
                </div>
                <div className="requestView_con_item">
                    <p>Email</p>
                    <input value={data.email} />
                </div>
            </div>
            <div className="requestView_con">
                <div className="requestView_con_item">
                    <p>Service</p>
                    <input value={data.service} />
                </div>
                <div className="requestView_con_item">
                    <p>Service type</p>
                    <input value={data.type} />
                </div>
            </div>
            <div className="requestView_con">
                <div className="requestView_con_item">
                    <p>Desciption</p>
                    <input value={data.type} />
                </div>
                <div className="requestView_con_item">
                    <p>Service type</p>
                    <input value={data.type} />
                </div>
            </div>

            {data.service === "Online meeting" ?
                [
                    data.responses !== undefined ? data.responses.map((cohost, index) => 
                        <div className="requestView_con">
                            <div className="requestView_con_item">
                                <p>Co-host {index + 1}</p>
                                <input value={cohost.name} />
                            </div>
                            <div className="requestView_con_item">
                                <p>Co-host {index + 1} email</p>
                                <input value={cohost.e_mail} />
                            </div>
                        </div>
                    ) : null
                    ,
                    <div className="requestView_con">
                        <div className="requestView_con_item">
                            <p>Time from </p>
                            <input value={data.timeFrom} />
                        </div>
                        <div className="requestView_con_item">
                            <p>Time to</p>
                            <input value={data.timeTo} />
                        </div>
                    </div>

                ] : null
            }
        </div >

    );
}