import { useStore } from "@/store";
import { useState } from "react";
import { URL } from "@/store";

export default function PostPredict() {
    const predictFake = useStore((state) => state.postPredictFake);
    const [loading, setLoading] = useState(false);
    const [newTodo, setNewTodo] = useState("");
    console.log("url", URL);

    const SOURCE_URL = process.env.NEXT_PUBLIC_API_URL;


    const handleCreateTodo = async () => {
        if (newTodo.length === 0) return alert("Todo input must not be empty");

        // prevent this error  Error creating todo item: SyntaxError: Unexpected token 'h', "hello_world" is not valid JSON

        const data = {
            "text": newTodo
        }
        console.log("data", data,typeof(data) );
        

        try {
            const response = await fetch(`http://localhost:8000/api/predict`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log("result", result);
            return result;
        } catch (error) {
            // PredictData.tsx:31 Error creating todo item: SyntaxError: Unexpected token 'h', "hello_world" is not valid JSON

            console.error("Error creating todo item:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center space-x-2 mb-4">
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="border rounded px-2 py-1 flex-1"
            />
            <button
                disabled={loading}
                className={`px-2 py-1 text-white rounded ${loading ? "bg-gray-400" : "bg-green-500"
                    }`}
                onClick={handleCreateTodo}
            >
                Add
            </button>
        </div>
    );
}
