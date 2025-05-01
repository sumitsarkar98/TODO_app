import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const navigateTo = useNavigate();

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/api/v1/todo/fetchtodos",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTodos(response.data.todos);
      setError(null);
    } catch (error) {
      setError("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodo.trim()) return;
    try {
      await axios.post(
        "http://localhost:4000/api/v1/todo/createTodo",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      setNewTodo("");
      toast.success("Todo added!");
      fetchTodos();
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    try {
      await axios.put(
        `http://localhost:4000/api/v1/todo/todo/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Todo status updated!");
      fetchTodos();
    } catch (error) {
      setError("Failed to update todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/todo/todo/${id}`, {
        withCredentials: true,
      });
      toast.success("Todo deleted!");
      fetchTodos();
    } catch (error) {
      setError("Failed to delete todo");
    }
  };

  const startEdit = (todo) => {
    setEditTodoId(todo._id);
    setEditedText(todo.text);
  };

  const cancelEdit = () => {
    setEditTodoId(null);
    setEditedText("");
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/todo/todo/${id}`,
        { text: editedText },
        { withCredentials: true }
      );
      toast.success("Todo updated!");
      setEditTodoId(null);
      setEditedText("");
      fetchTodos();
    } catch (error) {
      setError("Failed to update todo");
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/user/logout", null, {
        withCredentials: true,
      });
      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const remainingTodos =
    todos?.filter((todo) => todo && todo.completed === false).length || 0;

  return (
    <div className="my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && todoCreate()}
          className="flex-grow p-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={todoCreate}
          className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300"
        >
          Add
        </button>
      </div>

      {loading ? (
        <div className="text-center justify-center">
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <ul className="space-y-2">
          {todos
            .filter((todo) => todo && typeof todo.completed === "boolean")
            .map((todo) => (
              <li
                key={todo._id}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => todoStatus(todo._id)}
                    className="mr-2"
                  />
                  {editTodoId === todo._id ? (
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="p-1 border rounded"
                    />
                  ) : (
                    <span
                      className={`${
                        todo.completed
                          ? "line-through text-gray-800 font-semibold"
                          : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {editTodoId === todo._id ? (
                    <>
                      <button
                        onClick={() => saveEdit(todo._id)}
                        className="text-green-600 hover:text-green-900 duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-600 hover:text-gray-900 duration-200"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(todo)}
                        className="text-blue-500 hover:text-blue-800 duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => todoDelete(todo._id)}
                        className="text-red-500 hover:text-red-800 duration-300"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
        </ul>
      )}

      <p className="mt-4 text-center text-sm text-gray-700">
        {remainingTodos} remaining todos
      </p>
      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
