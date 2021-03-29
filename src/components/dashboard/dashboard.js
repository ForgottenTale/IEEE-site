import './dashboard.scss';
import Menu from '../menu/menu';
import TopNav from '../topNav/topNav';
import Appointments from '../appointments/appointments';

export default function Dashboard() {

    return (
        <div className="dashboard">
            <Menu />
            <div className="dashboard_content" style={{ marginLeft: 220 }}>
                <TopNav/>
                <h5>Welcome Alan Mathew !</h5>
                <Appointments/>

            </div>
        </div>
    );
}