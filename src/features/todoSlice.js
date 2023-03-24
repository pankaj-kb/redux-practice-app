import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: nanoid(), title: "Complete this app", completed: false },
    {
      id: nanoid(),
      title: "Modify this app",
      completed: false,
    },
  ], //Storing todos as in array
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        title: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = true;
      }
    },
    editTodo: () => {},
  },
});

export const { addTodo, removeTodo, completeTodo } = todoSlice.actions;

export default todoSlice.reducer;
