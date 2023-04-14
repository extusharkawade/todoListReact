import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { DbErrorModal } from "./DbErrorModal";

export const AddTodo = (props) => {
  const [isEdit, setisEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setdesc] = useState("");
  const [srno, setsrno] = useState(5);
  const [error, seterror] = useState(false);
  const [descError, setdescError] = useState("");
  const [dbError, setdbError] = useState(false);
  const [toDos, setTodos] = useState([]);

  useEffect(() => {
    // need this to set srno to tasks
    axios
      .get("http://localhost:3031/todo")
      .then((res) => setTodos(res.data))
      .catch((err) => {
        return console.log(err), setdbError(true);
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    <DbErrorModal />;

    title.length < 3 && seterror(true);
    desc.length < 5 && setdescError(true);

    console.log("Title and description", title, desc);
    if (!(title.length < 3 || desc.length < 5)) {
      setsrno(toDos[toDos.length - 1].srno + 1);
      const task = { title, desc };
      console.log("here is task", task);

      setTitle("");
      setdesc("");
      fetch("http://localhost:3031/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      })
        .then(() => {
          console.log("new task added");
        })
        .catch((err) => {
          return console.log(err), setdbError(true);
        });

      seterror(false);
      setdescError(false);
      setisEdit(false);
    }
  };
  const titleValidation = () => {
    if (title.length < 3) {
      seterror(true);
    } else {
      seterror(false);
    }
  };
  const descValidation = () => {
    if (desc.length < 5) {
      setdescError(true);
    } else {
      setdescError(false);
    }
  };

  // const updateTodos = () => {
  //   console.log("in update");
  //   axios
  //     .get("http://localhost:3031/todo")
  //     .then((res) => setTodos(res.data))
  //     .catch((err) => {
  //       return console.log(err), setdbError(true);
  //     });
  //   console.log("set todos of update", toDos);
  // };

  return (
    <div className="container my-3">
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Todo Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              titleValidation();
            }}
            className="form-control"
            id="titleId"
            aria-describedby="emailHelp"
          />
          {error ? (
            <span className="fw-light text-danger">Enter valid title </span>
          ) : (
            <div></div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            value={desc}
            onChange={(e) => {
              setdesc(e.target.value);
              descValidation();
            }}
            className="form-control"
            id="desc"
          />
          {descError ? (
            <div className="fw-light text-danger">Enter valid description</div>
          ) : (
            <div></div>
          )}
        </div>

        {dbError ? <DbErrorModal dbModal={true} /> : <div></div>}

        {isEdit ? (
          <button type="submit" className="btn btn-sm btn-success">
            Update Todo
          </button>
        ) : (
          <button type="submit" className="btn btn-sm btn-success">
            Add Todo
          </button>
        )}
      </form>
      {/* <ToDos arr={toDos} onDelete={onDelete} onEdit={onEdit} /> */}
      <hr></hr>
      <div>
        <Link
          to="/TodoItems"
          button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          // onClick={updateTodos}
        >
          View Tasks
        </Link>
      </div>
    </div>
  );
};
