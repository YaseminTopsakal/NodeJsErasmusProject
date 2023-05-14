import { BrowserRouter as Router, Route, Routes, Link, Outlet, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Portal from './Portal';

function App() {
  // var isLogin = localStorage.getItem('isLogin');


  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route  path="/portal"  element={<Portal/>}/>

      </Routes>
    </Router>
  );
}



export default App;
