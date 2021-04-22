
import Content from './components/content/content';
import { useEffect } from 'react'
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';




function App() {

  useEffect(() => {
    const formData = new URLSearchParams();
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    formData.append('username', "Alan.mathew@ieee.org");
    formData.append('password', "something");
    const url = "http://localhost:5000/api/login/"
    axios.post(url, formData, { headers: headers, withCredentials: true }).then((data) => {
      console.log(data);
    })
      .catch(err => console.error(err));
  }, [])

  return (
    <div className="App">
      <Content />
    </div>
  );
}

export default App;
