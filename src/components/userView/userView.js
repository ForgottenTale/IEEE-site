import './userView.scss';
import pic from '../../images/pic3.jpg';


const user = (data) => [
    <center>
        <img className="view_container_img" src={pic} alt=''></img>
        <p>{data.name}</p>
    </center>,
    <div className="view_container_item">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="feather feather-mail"
            viewBox="0 0 24 24"
        >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <path d="M22 6L12 13 2 6"></path>
        </svg>
    &nbsp; &nbsp;
    <p>{data.email}</p>
    </div>,
    <div className="view_container_item">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="feather feather-user"
            viewBox="0 0 24 24"
        >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    &nbsp; &nbsp;
    <p>{data.role}</p>
    </div>

]

const admin = (data) => [
    <div className="view_container_item">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="feather feather-users"
            viewBox="0 0 24 24"
        >
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path>
        </svg>
                       &nbsp; &nbsp;
                       <p>{data.team}</p>
    </div>
]


export default function View({ data, setView, type }) {
    return (
        <div className="view">
            <div className="view_overlay" onClick={() => setView(false)}>
            </div>
            <div className="view_container">
                {type === "user" || type === "admin" ? user(data) : null}
                {type === 'admin' ? admin(data) : null}
            </div>
        </div>
    );
}
