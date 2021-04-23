import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import ServiceList from "./components/ServiceList";
import Services from "./components/Services";
import DateTime from "./components/DateTime";
import EventInfo from "./components/EventInfo";
import OtherInfo from "./components/OtherInfo";
import SupportInfo from "./components/SupportInfo";
import Verify from "./components/Verify";
import Confirmation from "./components/Confirmation";
import "./ub.css";
import "./style.css";

function App() {
  const [data, setData] = useState({});
  const [type, setType] = useState(null);
  // const [poster, setPoster] = useState("{}");

  const { path } = useRouteMatch();

  return (
    <Router>
      <Switch>
        <Route path={path} exact>
          <ServiceList
            path={path}
            setType={setType}
            data={data}
            setData={setData}
          />
        </Route>
        <Route path={path + "/services"}>
          <Services path={path} type={type} data={data} setData={setData} />
        </Route>
        <Route path={path + "/date-time"}>
          <DateTime path={path} type={type} data={data} setData={setData} />
        </Route>
        <Route path={path + "/event-info"}>
          <EventInfo path={path} type={type} data={data} setData={setData} />
        </Route>
        <Route path={path + "/other-info"}>
          <OtherInfo path={path} type={type} data={data} setData={setData} />
        </Route>
        <Route path={path + "/support-info"}>
          <SupportInfo path={path} type={type} data={data} setData={setData} />
        </Route>
        <Route path={path + "/verify"}>
          <Verify path={path} type={type} data={data} />
        </Route>
        <Route path={path + "/confirmation"}>
          <Confirmation path={path} type={type} data={data} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
