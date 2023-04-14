import "./App.css";
import Header from "./MyComponents/Header";

import { Footer } from "./MyComponents/Footer";

import { AddTodo } from "./MyComponents/AddTodo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { About } from "./MyComponents/About";
import { ToDos } from "./MyComponents/Todos";

function App() {
  const [toDos, setTodos] = useState([]);

  return (
    <>
      <Router>
        <Header title="My To Do List" searchBar={true} />
        <Routes>
          <Route path="/" element={<AddTodo />} />
          <Route path="/about" element={<About />} />
          <Route path="/TodoItems" element={<ToDos />}></Route>
        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;
