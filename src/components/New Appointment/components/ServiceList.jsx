import React from 'react';
import { Link } from "react-router-dom";

function ServiceList({ setType, setData }) {


    const clickHander = (type) => {
        setType(type);
        setData({ "type": type });
    }


    

    return (
        <div className="service-container row">
            <div className="select-service col-5">
                <img src="/images/select.png" alt="" />
                <h2>Select Service</h2>
                <p>Please select a service for which you want to schedule an appointment.</p>

                <h3>Questions?</h3>
                <p>Call (858) 939-3746 for help.</p>
            </div>

            <div className="service-list col">
                <h2 >Service Selection</h2>

                <div className="service-box">
                    <div className="sub-services">
                        <p>2 services</p>
                        <Link onClick={()=>clickHander("online-meeting")} to="/services/online-meeting" className="btn btn-outline-primary btn-sm"><i className="fas fa-plus"></i></Link>
                    </div>
                    <div className="service-name">
                        <img src="/images/onlinemeeting.png" alt="" />
                        <p>Online Meetings/ Webinar</p>
                    </div>
                </div>

                <div className="service-box">
                    <div className="sub-services">
                        <p>2 services</p>
                        <Link onClick={()=>clickHander("intern-support")} to="/services/intern-support" className="btn btn-outline-primary btn-sm"><i className="fas fa-plus"></i></Link>
                    </div>
                    <div className="service-name">
                        <img src="/images/internsupport.png" alt="" />
                        <p>Intern Support</p>
                    </div>
                </div>

                <div className="service-box">
                    <div className="sub-services">
                        <p>1 service</p>
                        <Link onClick={()=>clickHander("enotice")} to="/services/enotice" className="btn btn-outline-primary btn-sm"><i className="fas fa-plus"></i></Link>
                    </div>
                    <div className="service-name">
                        <img src="/images/enotice.png" alt="" />
                        <p>E-Notice</p>
                    </div>
                </div>

                <div className="service-box">
                    <div className="sub-services">
                        <p>2 services</p>
                        <Link to="/services/publicity" className="btn btn-outline-primary btn-sm"><i className="fas fa-plus"></i></Link>
                    </div>
                    <div className="service-name">
                        <img src="/images/publicity.png" alt="" />
                        <p>Publicity</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceList;