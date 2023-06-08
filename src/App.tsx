import "./App.scss";
import Login from "./Components/Login/Login";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Searchbar from "./Components/Searchbar/Searchbar";
import Posts from "./Components/Posts/Posts";
import Edit from "./Components/Edit/Edit";
import NewArticle from "./Components/Create/Create";
import { useState } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

const App: React.FC = () => {
  const [postId, setPostId] = useState(0);
  const [post, setPost] = useState();

  const keyExists = localStorage.accessToken == null;

  // const navigate = useNavigate();

  // while (keyExists) {
  //   navigate("/users/signin");
  // }

  const Content = () => {
    let path = useLocation().pathname;
    console.log(path);
    return (
      <Routes>
        <Route
          path="/*"
          element=<div className="App__Content__Posts">
            <Searchbar />
            <Routes>
              <Route path="/" element=<Posts post={post} setPost={setPost} category="BLOG" />/>
              <Route path="/events" element=<Posts post={post} setPost={setPost} category="EVENT" />/>
            </Routes>
          </div>
        />

        <Route path={"/edit"} element=<Edit post={post} setPost={setPost} /> />

        <Route path={"/create"} element=<NewArticle /> />
      </Routes>
    );
  };

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
                      <div className="App__Content__Posts">
                        <Searchbar />
                        <Posts post={post} setPost={setPost} />
                      </div>
                    ) : (
                      <Edit post={post} setPost={setPost} />
                    )}
                  </div>
                </div>
              )
            }
          />
          <Route path="/users/signin" element=<Login /> />
          <Route
            path="/dashboard/*"
            element=<div className="App__container">
              <Sidebar />
              <div className="App__Content">
                <Header />

                <Content />
              </div>
            </div>
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
