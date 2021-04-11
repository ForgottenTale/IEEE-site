import './menu.scss';
import logo from '../../images/logo.png';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';


export default function Menu({ toggle, state }) {

    const ref = useRef();

    const [open, setOpen] = useState(true);
    


    return (
        <div className={open?"menu open":"menu"} ref={ref}>
            <div className="menu_item">
                <img src={logo} alt="logo" />
            </div>
            <Link to="/" className="menu_item active">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-clipboard"
                    viewBox="0 0 24 24"
                >
                    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"></path>
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                </svg>
                <p className={open?"menu_item_name open":"menu_item_name"}>Dashboard</p>
            </Link>

            <Link to="/calender" className="menu_item ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-calendar"
                    viewBox="0 0 24 24"
                >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <path d="M16 2L16 6"></path>
                    <path d="M8 2L8 6"></path>
                    <path d="M3 10L21 10"></path>
                </svg>
                <p className={open?"menu_item_name open":"menu_item_name"}>Calender</p>
            </Link>

            <Link to="/settings" className="menu_item">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-settings"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
                </svg>
                <p className={open?"menu_item_name open":"menu_item_name"}>Settings</p>
            </Link>
            <div className="menu_item" onClick={() => {
                toggle(!state)
                setOpen(!state)
            }
            }>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-fast-forward"
                    viewBox="0 0 24 24"
                >
                    <path d="M13 19L22 12 13 5 13 19z"></path>
                    <path d="M2 19L11 12 2 5 2 19z"></path>
                </svg>
                <p className={open?"menu_item_name open":"menu_item_name"}>Collapse</p>
            </div>

        </div>
    );

}