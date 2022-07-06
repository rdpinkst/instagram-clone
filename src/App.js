import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/Sign-in';
import SignUp from './components/SignUp';
import Homepage from './components/Homepage';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState({})
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn user={user} setUser={setUser} />} />
          <Route path="/sign-up" element={<SignUp user={user} setUser={setUser} />} /> 
          <Route path="/home" element={<Homepage user={user} setUser={setUser} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
