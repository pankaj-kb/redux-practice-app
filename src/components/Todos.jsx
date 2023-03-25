import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeTodo, addTodo, completeTodo } from "../features/todoSlice";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

function Todos() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [inputTask, setInputTask] = useState("");

  const handleInputTask = (event) => {
    setInputTask(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputTask !== "") {
      dispatch(addTodo(inputTask));
      setInputTask("");
    }
  };

  const handleCompleteTodo = (id) => {
    dispatch(completeTodo(id));
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h1
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.title}
          </h1>
          <Tooltip
            title="Remove task from list"
            position="bottom"
            trigger="mouseenter"
          >
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Remove Task
            </button>
          </Tooltip>
          <Tooltip
            title="Mark the task as complete"
            position="bottom"
            trigger="mouseenter"
          >
            {!todo.completed && (
              <button onClick={() => handleCompleteTodo(todo.id)}>Done</button>
            )}
          </Tooltip>
        </div>
      ))}
      <div>
        <Tooltip title="Enter task here" position="bottom" trigger="mouseenter">
          <input
            type="text"
            placeholder="Enter Task"
            value={inputTask}
            onChange={handleInputTask}
          />
        </Tooltip>
        <button onClick={handleAddTodo}>Add Task</button>
      </div>
    </div>
  );
}

export default Todos;
