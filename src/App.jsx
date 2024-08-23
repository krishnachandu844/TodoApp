import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  //copy right
  let copyright = String.fromCodePoint(174);

  //add Todo
  const onClickAddTodo = () => {
    if (newTodo === "") {
      toast.error("Don't Be Lazy Fatso");
    } else {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };
      todos.push(newTodoItem);
      setNewTodo("");
      toast.success("Todo Added Successfully");
    }
  };

  //Delete Todo
  const onClickDeleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      if (todo.id !== id) {
        return todo;
      }
    });
    setTodos(newTodos);
    toast.info("Todo Deleted Successfully");
  };

  //checkingTodo
  const onCheckedTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { id: todo.id, text: todo.text, completed: !todo.completed }
        : todo
    );
    setTodos(updatedTodos);
  };

  //update Todo
  const updateYourTodo = (id) => {
    let newText = window.prompt("Enter Your Text");
    if (newText === "") {
      toast.error("Enter Something ");
    } else {
      const updatedTodos = todos.map((todo) =>
        todo.id === id
          ? { id: todo.id, text: newText, completed: todo.completed }
          : todo
      );
      setTodos(updatedTodos);
      toast.info("Todo Updated Successfully");
    }
  };

  return (
    <div className='bg-container flex flex-col justify-center items-center min-h-screen'>
      <div className='card bg-card max-w-lg w-full rounded-2xl shadow-lg p-4 '>
        <h1 className='heading text-3xl mb-6 ml-6 '>Todo App</h1>
        <div className='flex justify-center'>
          <input
            type='text'
            className='rounded-l-md text-input focus:outline-black focus:ring-2 h-9 w-3/4 p-1'
            placeholder='Add Your Todo...'
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
          />
          <button
            className='bg-black px-4 text-cyan-50 rounded-r-md h-11 font-bold'
            onClick={onClickAddTodo}
          >
            Add
          </button>
          <ToastContainer autoClose={2000} />
        </div>
        <ul className='list-none m-3 mt-5'>
          {todos.map((todo) => (
            <li className='m-2 mt-6' key={todo.id}>
              <div className=' flex justify-between ml-5 font-semibold'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    value={todo.completed}
                    onChange={() => {
                      onCheckedTodo(todo.id);
                    }}
                  />
                  <p className={`ml-2 ${todo.completed ? "checked" : ""}`}>
                    {todo.text}
                  </p>
                </div>

                <div>
                  <button
                    className='border-black border-solid btn-1 mr-5 rounded-lg w-20 h -8'
                    onClick={() => {
                      updateYourTodo(todo.id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className='btn-2 border-0 rounded-lg text-cyan-50 w-20 h-8 '
                    onClick={() => {
                      onClickDeleteTodo(todo.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full c-center'>
        <span className='text-l font-semibold flex justify-end absolute bottom-0 right-0 mb-4 mr-4 '>
          {copyright} Mumini Krishna Chandu
        </span>
      </div>
    </div>
  );
}

export default App;
