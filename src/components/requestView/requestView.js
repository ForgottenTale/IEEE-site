import './requestView.scss';
import pic from '../../images/pic3.jpg';
import axios from 'axios';

import { useEffect } from 'react';

export default function RequestView({ data }) {
    useEffect(() => {
            const url = "http://localhost:5000/api/my-approvals";
            axios.get(url)
            .then((data)=>{
                console.log(data);
            })
            .catch(err=>console.error(err));
    }, [])

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


                <div className="requestView_con_item">
                    <p>Phone No</p>
                    <input value={data.number} />
                </div>
                <div className="requestView_con_item">
                    <p>Service</p>
                    <input value={data.service} />
                </div>

                <div className="requestView_con_item">
                    <p>Service type</p>
                    <input value={data.type} />
                </div>
                <div className="requestView_con_item">
                    <p>Desciption</p>
                    <textarea >{data.description}</textarea>
                </div>

                {data.service === "Online meeting" ?
                    [

                        <div className="requestView_con_item">
                            <p>Title</p>
                            <input value={data.title} />
                        </div>,
                        <div className="requestView_con_item">
                            <p>Date</p>
                            <input value={data.date} />
                        </div>,

                        <div className="requestView_con_item">
                            <p>Time from </p>
                            <input value={data.timeFrom} />
                        </div>,
                        <div className="requestView_con_item">
                            <p>Time to</p>
                            <input value={data.timeTo} />
                        </div>,
                        data.cohost !== undefined ? data.cohost.map((cohost, index) =>

                            [<div className="requestView_con_item">
                                <p>Co-host {index + 1}</p>
                                <input value={cohost.name} />
                            </div>,
                            <div className="requestView_con_item">
                                <p>Co-host {index + 1} email</p>
                                <input value={cohost.e_mail} />
                            </div>
                            ]
                        ) : null,

                        <div className="requestView_con_item">
                            <p>Speaker</p>
                            <input value={data.speakerName} />
                        </div>,
                        <div className="requestView_con_item">
                            <p>Speaker Email</p>
                            <input value={data.speakerEmail} />

                        </div>

                    ] : [<div className="requestView_con_item">
                        <p>Date</p>
                        <input value={data.date} />

                    </div>,
                    <div className="requestView_con_item">
                        <p>Time</p>
                        <input value={data.time} />
                    </div>]
                }


                {data.service === "Intern support" ? [

                    <div className="requestView_con_item">
                        <p>Purpose</p>
                        <input value={data.purpose} />
                    </div>,
                    <div className="requestView_con_item">
                        <p>Comments</p>
                        <textarea >{data.comments}</textarea>
                    </div>


                ] : null

                }
                {data.type === "Content Writing" ? [
                    <div className="requestView_con_item">
                        <p>Word Count</p>
                        <input value={data.wordCount} />
                    </div>
                ] : null}

                {data.type === "Poster Design" ? [
                    <div className="requestView_con_item">
                        <p>Poster Diamensions</p>
                        <input value={data.diamensions} />
                    </div>
                ] : null}

                {data.type === "Website development" ? [
                    <div className="requestView_con_item">
                        <p>URL</p>
                        <input value={data.url} />
                    </div>
                ] : null}

                {data.service === "e_notice" ? [
                    <div className="requestView_con_item">
                        <p>Comments</p>
                        <input value={data.comments} />
                    </div>,
                    <div className="requestView_con_item">
                        <p>Delivery Type</p>
                        <input value={data.deliveryType} />
                    </div>,

                ] : null}


                {data.service === "Publicity" ? [
                    <div className="requestView_con_item">
                        <p>Comments</p>
                        <input value={data.comments} />
                    </div>,
                    <div className="requestView_con_item">
                        <p>Program Schedule</p>
                        <input value={data.schedule} />
                    </div>,

                ] : null}
                {data.responses !== undefined ? data.responses.map((approver, index) =>

                    [<div className="requestView_con_item">
                        <p>{approver.name}</p>
                        <textarea >{approver.des}</textarea>
                    </div>,
                    ]
                ) : <div className="requestView_con_item">
                    <p>Endorsement</p>
                    <input value={"No one has endorsed this request"} />
                </div>}


            </div>
            <img src={pic} alt='poster' />


            <div className="requestView_button">
                <button>Approve</button>
                <button>Reject</button>
            </div>
        </div >

    );
}