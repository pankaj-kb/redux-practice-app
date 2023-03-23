import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeTodo, addTodo } from "../features/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [inputTask, setInputTask] = useState("");

  const handleInputTask = (event) => {
    setInputTask(event.target.value);
  };

  return (
    <div>
      {todos.map((todo) => (
        <>
          <h1 key={todo.id}>{todo.title}</h1>
          <button onClick={() => dispatch(removeTodo(todo.id))}>
            Remove Task
          </button>
        </>
      ))}
      <div>
        <input
          type="text"
          placeholder="Enter Task"
          onChange={handleInputTask}
        />
        <h1>{inputTask}</h1>
        <button> Add Task</button>
      </div>
    </div>
  );
}

export default Todos;
