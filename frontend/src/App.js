import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';

function App() {
  return (
    <Router>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </main>
      <footer>
        <div className="footer">All rights reserved</div>
      </footer>
    </Router>
  );
}

export default App;
