
import './App.css';
import Dash from './components/Dash/Dash.js';
import RecipeDetail from './components/Dash/ReceipeDetails.js';
import Signup from './components/Signup/Signup.js';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/dash" element={<Dash />} />
          <Route path="/add/:id" element={<RecipeDetail edit={false}/>} />
          <Route path="/edit/:id" element={<RecipeDetail edit={true}/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
