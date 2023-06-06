import "./App.scss";
import Login from "./Components/Login/Login";
import Box from "./Components/Login/Box/Box";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Searchbar from "./Components/Searchbar/Searchbar";
import List from "./Components/List/List";
import Page from "./Components/Page/Page";
import Dentist from "./Components/Dentist/Dentist";
import { useState } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const App: React.FC = () => {
  const [postId, setPostId] = useState(0);
  const [post, setPost] = useState();

  const keyExists = localStorage.accessToken == null;
  console.log(keyExists);

  // const navigate = useNavigate();

  // while (keyExists) {
  //   navigate("/users/signin");
  // }
  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              keyExists ? (
                <Login />
              ) : (
                <div className="App__container">
                  <Sidebar />
                  <div className="App__Content">
                    <Header />
                    {!post ? (
                      <div className="App__Content__List">
                        <Searchbar />
                        <List post={post} setPost={setPost} />
                      </div>
                    ) : (
                      <Page post={post} setPost={setPost} />
                    )}
                  </div>
                </div>
              )
            }
          />
          <Route path="/users/signin" element=<Login /> />
          <Route
            path="/dashboard"
            element=<div className="App__container">
              <Sidebar />
              <div className="App__Content">
                <Header />
                {!post ? (
                  <div className="App__Content__List">
                    <Searchbar />
                    <List post={post} setPost={setPost} />
                  </div>
                ) : (
                  <Page post={post} setPost={setPost} />
                )}
              </div>
            </div>
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
