import React, { useState } from "react";
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
              title="Remove task from list"
              position="bottom"
              trigger="mouseenter"
            >
              <button
                className="bg-[#FFFFFF]"
                onClick={() => dispatch(removeTodo(todo.id))}
              >
                Remove Task
              </button>
            </Tooltip>
            <Tooltip
              title="Mark the task as complete"
              position="bottom"
              trigger="mouseenter"
            >
              {!todo.completed && (
                <button
                  className="bg-[#FFFFFF]"
                  onClick={() => handleCompleteTodo(todo.id)}
                >
                  Done
                </button>
              )}
            </Tooltip>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[20px] justify-center items-center">
        <Tooltip title="Enter task here" position="bottom" trigger="mouseenter">
          <input
            className="text-[#0A120B] text-[30px] text-center items-center font-[600] rounded-[30px] h-[80px] w-[450px] pt-[10px] bg-[#ffffff]"
            type="text"
            placeholder="Enter Task"
            value={inputTask}
            onChange={handleInputTask}
          />
        </Tooltip>
        <button className="bg-[#FFFFFF]" onClick={handleAddTodo}>
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Todos;
