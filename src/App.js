import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/Sign-in';
import SignUp from './components/SignUp';
import Homepage from './components/Homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} /> 
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
