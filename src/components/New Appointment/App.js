import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";
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

function App(props) {
  const [data, setData] = useState({});
  const [type, setType] = useState(null);
  const { path } = useRouteMatch();
  // const [poster, setPoster] = useState("{}");
  return (

    <div className="ub">
      <div className="overlay" onClick={() => { props.setPop(!props.pop) }}></div>
      <Router>
        <Switch>
          <Route path={path}>
            <ServiceList setType={setType} setData={setData} data={data} />
          </Route>
          <Route path={path + "/services"}>
            <Services type={type} setData={setData} data={data} />
          </Route>
          <Route path={path + "/date-time"}>
            <DateTime type={type} setData={setData} data={data} />
          </Route>
          <Route path={path + "/event-info"}>
            <EventInfo type={type} data={data} setData={setData} />
          </Route>
          <Route path={path + "/other-info"}>
            <OtherInfo type={type} data={data} setData={setData} />
          </Route>
          <Route path={path + "/support-info"}>
            <SupportInfo type={type} setData={setData} data={data} />
          </Route>
          <Route path={path + "/verify"} component={Verify}>
            <Verify type={type} data={data} />
          </Route>
          <Route path="/confirmation" component={Confirmation} />
        </Switch>
      </Router>
    </div >
  );
}

export default App;
