import { useState, useEffect } from "react";
import "./style/App.scss";




export default function App() {

  /* Set todo and determinate todo an initial value (empty array) */
  const [todos, setTodos] = useState(() => {

    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {

      return JSON.parse(savedTodos);

    } else {

      return [];
    }
  });


  const [todo, setTodo] = useState("");


  /* Add todos to localstore */
  useEffect(() => {

    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos]);




  function handleInputChange(e) {
    setTodo(e.target.value);
  }



  /* Create todo w/form and button */
  function handleFormSubmit(e) {

    e.preventDefault();

    if (todo !== "") {
      setTodos([...todos, { id: todos.length + 1, text: todo.trim(), priority:"Priority" /* This is gonna select option part value */ }]);
    }

    setTodo("");
  }


  /* Delete todo from localstore */
  function handleDeleteClick(id) {
    
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }


  /* Listing todos on the screen w/serching text */
  useEffect(() => {

    console.log(todos)

  }, [])


  const spanStyle = {
    color: "white",
    backgroundColor: "black",
    padding: ".7rem",
    fontSize: "1.1rem"
  } 




  /* Create states for cases */
 












  return (
    <div className="App">

      <div className="main_div">
        <div className="logo_div">
          <img className="logo" />
        </div>

        <h2 className="create">Create New Job</h2>


        {/* Creating Todos */}
        <div className="form_button_div">

          <div className="create_margin">
            <h3>Job Name</h3>
            <form onSubmit={handleFormSubmit} >
              <input
                name="todo"
                type="text"
                autoComplete="off"
                value={todo}
                onChange={handleInputChange}
                className="job_name_input"
                maxLength="255"
              />
            </form>
          </div>

          <div className="create_margin">
            <h3>Job Priority</h3>
            <select className="create_important_input">
              <option value="">Choose</option>
              <option value={todo} onChange={handleInputChange}>Urgent</option>
              <option value={todo} onChange={handleInputChange}>Regular</option>
              <option value={todo} onChange={handleInputChange}>Trivial</option>
            </select>

          </div>

          <div className="create_margin">
            <button className="create_button" onClick={handleFormSubmit}>Create</button>
          </div>

        </div>





        {/* Searching Todos */}
        <div className="search_list">
          <div className="form_button_div search_form_button_div">

            <div className="create_margin">
              <h3>Job List</h3>
              <form /* onSubmit={""} */ >
                <input
                  /* name=""
                  type="text"
                  autoComplete="off"
                  value={""}
                  onChange={""}
                  maxLength="255" 
                  */
                  className="job_name_input"
                  placeholder="Job Name"
                />
              </form>
            </div>

            <div className="create_margin ">
              <h3>Job Priority</h3>
              <select className="create_important_input searchListWidth">
                <option value="">Priority(all)</option>
                <option value="Urgent">Urgent</option>
                <option value="Regular">Regular</option>
                <option value="Trivial">Trivial</option>
              </select>
            </div>
          </div>
        </div>














        {/* Todos */}
        <ul >
          {todos.map((todo) => (
            <li key={todo.id} className="todo-list">
              <p className="todo-text">{todo.text}</p>
              <div className="todo-priority">
                <p style={spanStyle}>{todo.priority}</p>
              </div>
              <div className="todo-buttons">
                <button className="edit_button"></button>
                <button className="delete_button" onClick={() => handleDeleteClick(todo.id)}></button>
              </div>
            </li>
          ))}
        </ul>


      </div>

    </div >
  );
}