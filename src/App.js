import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import SignIn from "./components/Sign-in";
import SignUp from "./components/SignUp";
import Homepage from "./components/Homepage";
import ProfileInfo from "./components/ProfileInfo";
import HomeNavbar from "./components/HomeNavbar";
import AddPic from "./components/AddPic";
import { db } from "./firebase";

function App() {
  const [user, setUser] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [newBio, setNewBio] = useState(false);
  const [updateBio, setUpdateBio] = useState(false);
  const [profileToView, setProfileToView] = useState("");

  //Snapshot working and need to set to state
  useEffect(() => {
    if (user && !newBio) {
      const q = query(collection(db, "users"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log(snapshot.docs[0].data());
        setUserInfo(snapshot.docs[0].data());
      });
      return () => unsubscribe();
    }
  }, [user, newBio]);

  return (
    <div className="App">
      <BrowserRouter>
        {user && (
          <HomeNavbar
            user={user}
            setUser={setUser}
            updateBio={updateBio}
            setUpdateBio={setUpdateBio}
            setProfileToView={setProfileToView}
          />
        )}
        <Routes>
          <Route path="/" element={<SignIn user={user} setUser={setUser} />} />
          <Route
            path="/sign-up"
            element={
              <SignUp user={user} setUser={setUser} setNewBio={setNewBio} />
            }
          />
          <Route
            path="/home"
            element={
              <Homepage user={user} setProfileToView={setProfileToView} />
            }
          />
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
                userInfo={userInfo}
                setUserInfo={setUserInfo}
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
                profileToView={profileToView}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
