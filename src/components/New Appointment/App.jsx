import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ServiceList from "./components/ServiceList";
import Services from "./components/Services";
import DateTime from "./components/DateTime";
import ContactInfo from "./components/ContactInfo";
import EventInfo from "./components/EventInfo";
import SupportInfo from "./components/SupportInfo";
import OtherInfo from "./components/OtherInfo";
import Verify from "./components/Verify";
import Confirmation from "./components/Confirmation";

function App() {
  return (
    <Router>
      <Route path="/" exact component={ServiceList} />
      <Route path="/services/:name" component={Services} />
      <Route path="/date-time/:service" component={DateTime} />
      <Route path="/contact-info" component={ContactInfo} />
      <Route path="/event-info" component={EventInfo} />
      <Route path="/support-info" component={SupportInfo} />
      <Route path="/other-info" component={OtherInfo} />
      <Route path="/verify" component={Verify} />
      <Route path="/confirmation" component={Confirmation} />
    </Router>
  );
}

export default App;
