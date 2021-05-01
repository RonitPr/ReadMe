import "./App.css";
import React from "react";
import UserProfile from "./pages/UserProfile";
import RequestsPage from "./pages/RequestsPage";
import UserRequestsPage from "./pages/UserRequestsPage";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchFilterBox from "./components/SearchFilters";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import logo from "./assets/siteLogo.png";
import FeedPage from "./pages/FeedPage";
import FillRequestPage from "./pages/FillRequestPage";

function App() {
  // Variables to tie the search bar with the other components.
  const { search } = window.location;
  const query = new URLSearchParams(search).get("q");

  return (
    <div className="App">
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="row align-items-center">
                <div className="col-sm">
                  <div>Hello, {"UserName"}</div>
                </div>
                <div className="col-sm">
                  <div>
                    <SearchBar />
                  </div>
                </div>
                <div className="col-sm">
                  <Link to="/">
                    <img
                      width={100}
                      height={20}
                      className="float-right"
                      src={logo}
                      alt="Generic placeholder"
                    />
                  </Link>
                </div>
              </div>
              <div className="row"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm" />
            <div className="col-sm">
              <SearchFilterBox />
            </div>
            <div className="col-sm" />
          </div>
          <div className="row">
            <div className="col">
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <NavBar />
            </div>
            <div className="col-10">
              <div className="scrollableDiv">
                <Switch>
                  <Route exact path="/">
                    <div>
                      <FeedPage query={query} />
                    </div>
                  </Route>
                  <Route path="/login">
                    <UserProfile />
                  </Route>
                  <Route path="/requests">
                    <RequestsPage />
                  </Route>
                  <Route path="/userRequests">
                    <UserRequestsPage />
                  </Route>
                  <Route path="/fillRequest">
                    <FillRequestPage />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
