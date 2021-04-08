
import Content from './components/content/content';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.scss';
import {useEffect} from 'react';
import axios from 'axios';


function App() {
  useEffect(()=>{
    axios.get("http://localhost:5000/hi").then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    },[])
  return (
    <Router>
      <div className="App">
        <Content/>
      </div>
    </Router>
 
  );
}

export default App;
