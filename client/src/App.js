import { Button } from "@chakra-ui/react";
import { Provider, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import Home from './Pages/Home/home'
import ChatPage from "./Pages/ChatPage/ChatPage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import Contact from "./Pages/ContactPage/Contact";

function App() {
  const fetchUser = useSelector((state) => state.AuthReducer.authData);
  return (
    <>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={fetchUser ? <Navigate to="auth" /> : <Home />}
          />
          <Route
            path="/home"
            element={fetchUser ? <ChatPage /> : <Navigate to="../auth" />}
          />
          <Route
            path="/auth"
            element={fetchUser ? <Navigate to="../chat" /> : <AuthPage />}
          />
          <Route
            path="/chat"
            element={fetchUser ? <ChatPage /> : <Navigate to="../auth" />}
          />
          {/* <Route path='/profile/:id' element={fetchUser ? <Profile/> : <Navigate to='../auth'/>}/> */}
          <Route
            path="/contact"
            element={ <Contact />}
          />
          <Route
            path="/home"
            element={ <Home />}
          />
          <Route
            path="/auth"
            element={ <AuthPage />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
