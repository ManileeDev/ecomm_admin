import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import AddProd from './components/AddProd';
import Pagenotfound from './components/Pagenotfound';
import Dashboard from './components/Dashboard';

function App() {
  const {user} = useContext(AuthContext)
  console.log(user)
  return (
    <Routes>
      <Route exact path="/" element={user ? <Home /> : <Navigate to="/login"/>} />
      {/* <Route path="/create" element={user ? <AddProd /> : <Navigate to="/login"/>} /> */}
      <Route path="/create" element={user ? <AddProd/> : <Navigate to="/login"/>} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login"/>} />
      <Route path="/login"  element={!user ? <Login /> : <Navigate to="/"/>} />
      <Route path="*" element={<Pagenotfound/>} />
    </Routes>
  );
}

export default App;
