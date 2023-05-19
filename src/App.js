import "./App.scss";
import Header from "./Components/Header/Header.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";
import Searchbar from "./Components/Searchbar/Searchbar.js";
import List from "./Components/List/List.js";

const App = () => {
  
  return (
    <div className="App">
      <div className="App__container">
        <Sidebar />
        <div className="App__Content">
          <Header />
          <div className="App__Content__List">
            <Searchbar />
            <List/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
