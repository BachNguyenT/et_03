import "./App.scss";
import Header from "./Components/Header/Header.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";
import Searchbar from "./Components/Searchbar/Searchbar.js";
import List from "./Components/List/List.js";
import Page from "./Components/Page/Page.js";
import Dentist from './Components/Dentist/Dentist.js';
import { useState } from "react";

const App = () => {
  const [postId, setPostId] = useState(0);
  const [post, setPost] = useState();

  return (
    <div className="App">
      <div className="App__container">
        <Sidebar />
        <div className="App__Content">
          <Header />
           {postId === 0 ? (
            <div className="App__Content__List">
              <Searchbar />
              <List postId={postId} setPostId={setPostId} post={post} setPost={setPost}/>
            </div>
          ) : (
            <Page postId={postId} setPostId={setPostId} post={post} setPost={setPost}/>
          )}
          {/* <Dentist /> */}
        </div>
      </div>
    </div>
  );
};

export default App;
