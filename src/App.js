import Content from './components/content/content';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.scss';
// import G from './components/calender/components/g';
function App() {
  return (
    <Router>
      <div className="App">
        <Content/>
      </div>
    </Router>
    // <G/>
  );
}

export default App;
