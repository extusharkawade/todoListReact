import React from "react";
import { TodoItem } from "./Todo";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { DbErrorModal } from "./DbErrorModal";

export const ToDos = (props) => {
  const [toDos, setTodos] = useState([]);
  const [loading, setloading] = useState(true);
  const [dbError, setdbError] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3031/todo")
      .then((res) => {
        return setTodos(res.data), setloading(false), setdbError(false);
      })
      .catch((err) => {
        return setdbError(true);
      });
  }, []);

  const onDelete = (todo) => {
    console.log("on delete clicked", todo);
    var path = "http://localhost:3031/todo/".concat(todo.id);
    axios
      .delete(path)
      .then(() => {
        return setdbError(false);
      })
      .catch((err) => {
        return setdbError(true);
      });
    setTodos(
      toDos.filter((e) => {
        return e !== todo;
      })
    );
  };

  const onEdit = (newTitle, newDesc, todo) => {
    console.log("edit button clicked for ");
    setTodos(
      toDos.filter((e) => {
        todo.title = newTitle;
        todo.desc = newDesc;
        axios
          .put("http://localhost:3031/todo/".concat(todo.id), {
            title: newTitle,
            desc: newDesc,
          })
          .then(() => {
            console.log("Task edited");
            return setdbError(false);
          })
          .catch(() => {
            return setdbError(true);
          });

        // return e !== todo;
        return e + todo;
      })
    );
  };
  return (
    <div className="container">
      <h3 className="text-center  my-3">ToDo List</h3>
      {console.log("Todo length", toDos.length)}
      {console.log("todoo", toDos)}
      <br></br>

      {dbError ? <DbErrorModal dbModal={true} /> : <div></div>}

      {loading ? (
        <div>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : toDos.length > 0 ? (
        toDos
          .slice(0)
          .reverse()
          .map((todo) => {
            return (
              <TodoItem
                todo={todo}
                key={todo.srno}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            );
          })
      ) : (
        <h2>Nothing To Display</h2>
      )}
    </div>
  );
};
