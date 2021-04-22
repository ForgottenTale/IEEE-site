
import Content from './components/content/content';
import Login from './components/login/login';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import { useState } from 'react';



function App() {
  const [user, setUser] = useState(null);
  return (user=== null ? <Router>
    <div className="App">
        <Content />
      </div>
    </Router>:<Login setUser={setUser} />

  );
}

export default App;
