import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/Sign-in';
import SignUp from './components/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
