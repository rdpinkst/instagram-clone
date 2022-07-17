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
  const [signedOut, setSignedOut] = useState(false);
  

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        setUser("");
        setSignedOut(true);
        console.log("Logged Out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="App">
      <BrowserRouter>
        {user && <HomeNavbar logOut ={logOut} signedOut={signedOut} />}
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
