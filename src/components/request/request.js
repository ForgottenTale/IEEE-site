
import './request.scss';
import { useState } from 'react';
import Table from '../table/table';
import { Input2 } from '../utils/myReactLib';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RequestView from '../requestView/requestView';

export default function Request() {

    const header = ['Id', "Name", "Service", "Type", "Time", "Status", "Action"];
    const data = [
        { id: 1, name: "Sara Anan Jose", email: "test@gmail.com", date: "28/20/2002", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending", cohost: [{ name: "dddafsd", e_mail: "dark@gmail.com" }],responses: [{ name: "Neeraj", des: "dark@gmail.com" },{ name: "Neeraj", des: "dark@gmail.com" }], description: "This is just a test for sometig idk fljdsafjosdjfosadjifosadijfoasidjfojasodfjoisdjfosadjfosadjo" },
        { id: 2, name: "Sara Anan Jose", email: "test@gmail.com", date: "28/20/2002", service: "Intern support", type: "Content Writing", time: "2pm IST 05/27/2021", status: "pending", purpose: "testing", comments: "This is just a test for sometig idk fljdsafjosdjfosadjifosadijfoasidjfojasodfjoisdjfosadjfosadjo",wordCount:"600",description: "This is just a test for sometig idk fljdsafjosdjfosadjifosadijfoasidjfojasodfjoisdjfosadjfosadjo"  },
        { id: 3, name: "Sara Anan Jose", email: "test@gmail.com", date: "28/20/2002", service: "Intern support", type: "Poster Design", time: "2pm IST 05/27/2021", purpose: "testing", comments: "This is just a test for sometig idk fljdsafjosdjfosadjifosadijfoasidjfojasodfjoisdjfosadjfosadjo", diamensions: "350*360", status: "pending",description: "This is just a test for sometig idk fljdsafjosdjfosadjifosadijfoasidjfojasodfjoisdjfosadjfosadjo"  },
        { id: 4, name: "Sara Anan Jose", email: "test@gmail.com", date: "28/20/2002", service: "Intern support", type: "Website development", time: "2pm IST 05/27/2021", status: "pending", purpose: "testing", comments: "This is just a test for sometig idk fljdsafjosdjfosadjifosadijfoasidjfojasodfjoisdjfosadjfosadjo",url:"https:\\sdsdsdsd",description: "This is just a test for sometig idk fljdsafjosdjfosadjifosadijfoasidjfojasodfjoisdjfosadjfosadjo"   },
        { id: 5, name: "Sara Anan Jose", email: "test@gmail.com", date: "28/20/2002", service: "e_notice", type: "E-notice issue ", time: "2pm IST 05/27/2021", status: "pending",deliveryType:"Express",comments: "This is just a test for sometig idk fljdsafjosdjfosadjifosadijfoasidjfojasodfjoisdjfosadjfosadjo",description: "This is just a test for sometig idk fljdsafjosdjfosadjifosadijfoasidjfojasodfjoisdjfosadjfosadjo"  },
        { id: 6, name: "Sara Anan Jose", email: "test@gmail.com", date: "28/20/2002", service: "Publicity", type: "Social", time: "2pm IST 05/27/2021", status: "pending",comments: "This is just a test for sometig idk fljdsafjosdjfosadjifosadijfoasidjfojasodfjoisdjfosadjfosadjo",schedule:"sdsdsdsd",description: "This is just a test for sometig idk fljdsafjosdjfosadjifosadijfoasidjfojasodfjoisdjfosadjfosadjo"  },
        { id: 7, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending" },
        { id: 8, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending" },
        { id: 9, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending" },
        { id: 10, name: "Sara Anan Jose", service: "Online meeting", type: "Zoom ", time: "2pm IST 05/27/2021", status: "pending" },

    ];
    const { path } = useRouteMatch();
    const [request, setRequest] = useState(null);
    return (
        <Switch>
            <Route exact path={path}>
                <div className="request">
                    <div className="request_header">
                        <h6 className="request_header_title">All requests</h6>

                    </div>
                    <div className="request_sub">
                        <h6 className="request_sub_title">You have {data.length} request</h6>

                        <Input2 className="request_sub_input" placeholder="Search for requests" />

                    </div>
                    <Table headers={header} data={data} type='request' setRequest={setRequest} />
                </div>
            </Route>
            <Route path={path + '/:id'}>
                <RequestView data={request} />
            </Route>
        </Switch>

    )
}

