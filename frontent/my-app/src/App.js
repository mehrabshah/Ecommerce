
import './App.css';
import {BrowserRouter as Router} from "react-router-dom"
import Header from './component/layout/Header';
import WebFont from "webfontloader"
function App() {
  return (
    <div className="App">
      <Router><Header/></Router>
    </div>
  );
}

export default App;
