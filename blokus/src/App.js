import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./containers/Login/Login";
import HomePage from "./containers/HomePage/HomePage";
import appRoutes from './shared/appRoutes';


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path={appRoutes.login} element={<Login />} />
          <Route path={appRoutes.home} element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
