import React from "react";
import ToDo from "./components/todo/todo.js";
import Header from "./components/header/header.js";
import Footer from "./components/footer/footer.js";

import "./app.scss";

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ToDo />
        <Footer />
      </>
    );
  }
}
