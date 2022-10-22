import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/Sign-in";
import SignUp from "./components/SignUp";
import Homepage from "./components/Homepage";
import ProfileInfo from "./components/ProfileInfo";
import HomeNavbar from "./components/HomeNavbar";
import AddPic from "./components/AddPic";

function App() {
  const [user, setUser] = useState("");
  const [newBio, setNewBio] = useState(false);
  const [updateBio, setUpdateBio] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        {user && (
          <HomeNavbar
            setUser={setUser}
            updateBio={updateBio}
            setUpdateBio={setUpdateBio}
          />
        )}
        <Routes>
          <Route path="/" element={<SignIn user={user} setUser={setUser} />} />
          <Route
            path="/sign-up"
            element={
              <SignUp
                user={user}
                setUser={setUser}
                setNewBio={setNewBio}
              />
            }
          />
          <Route path="/home" element={<Homepage user={user} />} />
          <Route
            path="/addpic"
            element={
              <AddPic
                user={user}
                setUser={setUser}
                newBio={newBio}
                setNewBio={setNewBio}
                updateBio={updateBio}
                setUpdateBio={setUpdateBio}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProfileInfo
                user={user}
                updateBio={updateBio}
                setUpdateBio={setUpdateBio}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
