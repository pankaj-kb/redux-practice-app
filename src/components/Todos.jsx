import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeTodo,
  addTodo,
  completeTodo,
  unMark,
} from "../features/todoSlice";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

import { FaPlus } from "react-icons/fa";

import { MdDelete } from "react-icons/md";

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

  const handleUnMarkTodo = (id) => {
    dispatch(unMark(id));
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#01011F] text-[#0A120B] gap-[50px]">
      <div className="flex flex-col gap-[15px]">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex gap-[20px] justify-center items-center"
          >
            <h1
              className={`${
                todo.completed ? "bg-[#9DECFF] line-through" : "bg-[#FEF970]"
              } text-[#0A120B] text-[30px] text-center items-center font-[600] rounded-[30px] h-[80px] w-[450px] pt-[10px]`}
            >
              {todo.title}
            </h1>

            <Tooltip
              title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              position="bottom"
              trigger="mouseenter"
            >
              <input
                className="form-checkbox rounded-[20px] text-[#5B8AFD] h-6 w-6"
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  if (todo.completed) {
                    handleUnMarkTodo(todo.id);
                  } else {
                    handleCompleteTodo(todo.id);
                  }
                }}
              />
            </Tooltip>
            <Tooltip
              title="Remove task from list"
              position="bottom"
              trigger="mouseenter"
            >
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
              >
                <MdDelete className="text-[#ffffff] w-[50px] h-[50px] rounded-[100%] bg-[#E23D28] p-[14px]" />
              </button>
            </Tooltip>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[20px] justify-center items-center">
        <Tooltip title="Enter task here" position="bottom" trigger="mouseenter">
          <input
            className="text-[#5B8AFD] text-[30px] text-center items-center font-[600] rounded-[30px] h-[80px] w-[450px] pt-[10px] bg-[#ffffff] border-none"
            type="text"
            placeholder="Enter Task"
            value={inputTask}
            onChange={handleInputTask}
          />
        </Tooltip>
        <button onClick={handleAddTodo}>
          <FaPlus className="text-[#ffffff] w-[100px] h-[100px] rounded-[100%] bg-[#5E8BFF] p-[40px]" />
        </button>
      </div>
    </div>
  );
}

export default Todos;
