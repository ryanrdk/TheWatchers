import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginView from "./components/LoginView";
import "./components/styles.css";
import Header from "./components/Header";
import MailingList from "./components/MailingList";
import ActiveStudents from "./components/ActiveStudents";
import Demographics from "./components/Demographics";

const App = () => {
  return (
    <div
      className='full-screen'
      style={{
        alignContent: "center",
        justifyContent: "center",
        display: "flex",
        flexWrap: "wrap"
      }}>
      <BrowserRouter>
        <div className='full-screen'>
          <Route path='/' exact component={LoginView} />
          <Route path='/demographs' exact component={Demographics} />
          <Route path='/watcher' exact component={ActiveStudents} />
          <Route path='/mailinglist' exact component={MailingList} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
