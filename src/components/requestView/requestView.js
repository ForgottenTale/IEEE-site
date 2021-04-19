import './requestView.scss';
import pic from '../../images/pic3.jpg';



export default function RequestView({ data }) {

    return (
        <div className="requestView">
            <div className="requestView_item">
                <p>Name</p>
                <input value={data.name} />
            </div>
            <div className="requestView_item">
                <p>Email</p>
                <input value={data.email} />
            </div>
            <div className="requestView_item">
                <p>Service</p>
                <input value={data.service} />
            </div>
            <div className="requestView_item">
                <p>Service type</p>
                <input value={data.type} />
            </div>
            <div className="requestView_item">
                <p>Desciption</p>
                <input value={data.type} />
            </div>
            {data.service === "Online meeting" ?
                [<div className="requestView_item">
                    <p>Cohost</p>
                    <input value={data.cohostName} />
                </div>,
                <div className="requestView_item">
                    <p>Time from</p>
                    <input value={data.type} />
                </div>,
                <div className="requestView_item">
                    <p>Time to</p>
                    <input value={data.type} />
                </div>
                ] : null
            }
        </div>

    );
}