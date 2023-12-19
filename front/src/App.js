import './App.css';
import Dash from './components/Dash/Dash.js';
import RecipeDetail from './components/Dash/ReceipeDetails.js';
import Signup from './components/Signup/Signup.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {

  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Route - Sign Up */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dash" />
              ) : (
                <Signup />
              )
            }
          />

          {/* Private Route - Dashboard */}
          <Route
            path="/dash"
            element={isAuthenticated ? <Dash /> : <Navigate to="/" />}
          />

          {/* Private Route - Add Recipe */}
          <Route
            path="/add/:id"
            element={isAuthenticated ? <RecipeDetail edit={false} /> : <Navigate to="/" />}
          />

          {/* Private Route - Edit Recipe */}
          <Route
            path="/edit/:id"
            element={isAuthenticated ? <RecipeDetail edit={true} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
