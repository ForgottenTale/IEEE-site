import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ServiceList from "./components/ServiceList";
import Services from "./components/Services";
import DateTime from "./components/DateTime";
import ContactInfo from "./components/ContactInfo";
import EventInfo from "./components/EventInfo";
import OtherInfo from "./components/OtherInfo";
import SupportInfo from "./components/SupportInfo";
// import Verify from "./components/Verify";
// import Confirmation from "./components/Confirmation";

function App() {

  const [data, setData] = useState({});
  const [type, setType] = useState(null);
  // const [poster, setPoster] = useState("{}");
  return (
    <Router>
      <Switch>
        <Route path="/" exact >
          <ServiceList setType={setType} setData={setData} data={data} />
        </Route>
        <Route path="/services" >
          <Services type={type} setData={setData} data={data} />
        </Route>
        <Route path="/date-time">
          <DateTime setData={setData} data={data} />
        </Route>
        <Route path="/contact-info">
          <ContactInfo type={type} setData={setData} data={data} />
        </Route>
        <Route path="/event-info" >
          <EventInfo type={type} data={data} setData={setData} />
        </Route>
        <Route path="/other-info">
          <OtherInfo type={type} data={data} setData={setData}/>
        </Route>
        <Route path="/support-info"><SupportInfo type={type} setData={setData} data={data}/></Route>
        
         {/*<Route path="/verify" component={Verify} />
        <Route path="/confirmation" component={Confirmation} /> */}
      </Switch>
    </Router>
  );
}

export default App;
