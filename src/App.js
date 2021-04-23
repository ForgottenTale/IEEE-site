
import Content from './components/content/content';
import { useEffect } from 'react'
import axios from 'axios';
import './App.scss';
import {useState} from 'react';




function App() {
  const [user, setUser] = useState({id: null, name: null, role: null, email: null});
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    const url = "http://localhost:5000/api/credentials/"
    axios.get(url, { headers: headers, withCredentials: true }).then((data) => {
      console.log(data)
      if(data.status === 200)
        return data.data
    })
    .then(userInfo=>{
      setUser({
        id: userInfo.id,
        name: userInfo.name,
        role: userInfo.role,
        email: userInfo.email
      })
    })
    .catch(err => {
      if(!(/\/login$/).test(window.location))
      window.location.replace('/login')
    });
  }, [])

  return (
    <div className="App">
        <Content {...user}/>
    </div>
  );
}

export default App;
