import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import AddProd from './components/AddProd';

function App() {
  const {user} = useContext(AuthContext)
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>} />
      <Route path="/create" element={user ? <AddProd /> : <Navigate to="/login"/>} />
      <Route path="/login"  element={!user ? <Login /> : <Navigate to="/"/>} />
    </Routes>
  );
}

export default App;
