import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import SignIn from "./components/Sign-in";
import SignUp from "./components/SignUp";
import Homepage from "./components/Homepage";
import ProfileInfo from "./components/ProfileInfo";
import HomeNavbar from "./components/HomeNavbar";

function App() {
  const [user, setUser] = useState("");
  

  return (
    <div className="App">
      <BrowserRouter>
        {user && <HomeNavbar setUser={setUser}  />}
        <Routes>
          <Route path="/" element={<SignIn user={user} setUser={setUser} />} />
          <Route
            path="/sign-up"
            element={<SignUp user={user} setUser={setUser} />}
          />
          <Route
            path="/home"
            element={<Homepage user={user} />}
          />
          <Route path="/profile" element={<ProfileInfo user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
