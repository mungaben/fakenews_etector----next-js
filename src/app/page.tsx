"use client";

import Landing from "@/components/HomeLanding/Landing";
import PredictForm from "@/components/HomeLanding/PredictForm";
import PostPredict from "@/components/PredictData";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import { useStore } from "@/store";
import { useEffect } from "react";

const Home: React.FC = () => {
  const todos = useStore((state) => state.todos);
  const fetchTodos = useStore((state) => state.fetchTodos);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container mx-auto max-w-md p-4 space-y-4 flex   w-full  flex-col  h-full  ">
        <Landing/>
        <PredictForm/>
    </div>
  );
};

export default Home;
