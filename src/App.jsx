import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addNotification from "react-push-notification";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  //copy right
  let copyright = String.fromCodePoint(174);

  //Reminder
  const setReminder = (time, id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, reminder: time } : todo
    );
    setTodos(updatedTodos);
  };

  //add Todo
  const onClickAddTodo = () => {
    if (newTodo === "") {
      toast.error("Don't Be Lazy Fatso");
    } else {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        reminder: "",
        reminderTriggered: false,
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
  //check notification
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        }
      });
    }
  }, []);

  //check reminders for every minute
  useEffect(() => {
    const interval = setInterval(() => {
      todos.forEach((todo) => {
        const reminderTime = new Date(todo.reminder).getTime();
        const currentTime = new Date().getTime();

        if (reminderTime <= currentTime && !todo.reminderTriggered) {
          console.log(reminderTime);
          triggerNotification(todo);
          todo.reminderTriggered = true;
        }
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [todos]);

  const triggerNotification = (todo) => {
    console.log("Hello");
    addNotification({
      title: "Todo Task",
      subtitle: `Reminder ${todo.text}`,
      message: "Reminder for your todo task",
      theme: "darkblue",
      native: true, // when using native, your OS will handle theming.
    });
  };

  return (
    <div className='bg-container flex flex-col justify-center items-center min-h-screen'>
      <div className='card bg-card w-1/2 rounded-2xl shadow-lg flex flex-col'>
        <h1 className='heading text-3xl mb-6 ml-16 '>Todo App</h1>
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
        <ul className='list-none m-3 mt-5 ml-16 w-5/6'>
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
                  <input
                    type='datetime-local'
                    className='ml-12'
                    onChange={(e) => {
                      const time = e.target.value;
                      setReminder(time, todo.id);
                    }}
                  />
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
