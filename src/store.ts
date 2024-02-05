import { create } from "zustand";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type CreateTodo = {
  title: string;
};
// predictFake news and return the result of the prediction
type PredictFake = {
  url: string;
  data: any;
};




type TodoStore = {
  todos: Todo[];
  fetchTodos: () => void;
  postPredictFake: ( data: any) => void;
  addTodo: (todo: CreateTodo) => void;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: number) => void;
};


export const URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  : "http://localhost:3000/api";

export const useStore = create<TodoStore>((set) => ({
  todos: [],
  fetchTodos: async () => {
    try {
      const response = await fetch(`${URL}/todos`);
      const todos = await response.json();
      set({ todos });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  },


  postPredictFake: async (data) => {
    console.log("data in store", data);
    try {
      const response = await fetch(`${URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data }),
      });
      const result = await response.json();
      console.log("result", result);
      return result;
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  },


  addTodo: async (todo) => {
    try {
      const response = await fetch(`${URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const createdTodo = await response.json();
      set((state) => ({ todos: [...state.todos, createdTodo] }));
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  },

  updateTodo: async (updatedTodo) => {
    try {
      const response = await fetch(`${URL}/todos/${updatedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      const updatedItem = await response.json();
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === updatedItem.id ? updatedItem : todo
        ),
      }));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  },

  deleteTodo: async (id) => {
    try {
      await fetch(`${URL}/todos/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  },
}));