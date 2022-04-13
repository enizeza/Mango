import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<><Header /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
