import Content from './components/content/content';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Content/>
      </div>
    </Router>
 
  );
}

export default App;
