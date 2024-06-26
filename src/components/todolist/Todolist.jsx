import React, { useState, useEffect } from 'react';
import './todolist.css';
import Popup from '../popup/Popup';

const Todolist = () => {
  // let todos = JSON.parse(localStorage.getItem('todos')) || [];

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [checkedStates, setCheckedStates] = useState({});
  const [sortOption, setSortOption] = useState('sort');

  const [isPopup, setIsPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [selectedTodoObj, setSelectedTodoObj] = useState(null);

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem('todos'));
    setTodos(todoList);
  }, []);

  const handlePopup = () => {
    setIsPopup((prevIsPopup) => !prevIsPopup);
    // <Popup type="add" onClick={handlePopup} isPopup={isPopup} />
  };

  const handleUpdatePopup = () => {
    setUpdatePopup((prev) => !prev);
  };

  const handleUpdateTodo = (id) => {
    handleUpdatePopup();
    const selectedTodo = todos.find((todo) => id === todo.id);
    console.log(selectedTodo);
    console.log(id);
    setSelectedTodoObj(selectedTodo);
  };

  const initTodos = () => {
    setTodos([
      {
        title: 'haircut',
        description: 'haircut in World Square',
        dueDate: '2024/06/02',
        assignTo: 'Jiangcheng He',
        status: 'in-progress',
        id: '8223',
      },
      {
        title: 'grocery',
        description: 'harris farm',
        dueDate: '2024/06/30',
        assignTo: 'Kun Chang',
        status: 'in-progress',
        id: '29482',
      },
    ]);
  };

  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const newStatus = !checkedStates[id] ? 'completed' : 'in-progress';
        return { ...todo, status: newStatus };
      }
      return todo;
    });

    setTodos(updatedTodos);

    setCheckedStates({
      ...checkedStates,
      [id]: !checkedStates[id],
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete the to-do item?')) {
      const updateTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updateTodos);
    }
  };

  // const handleEdit = (id) => {};

  // const handleUpdatePopup = (id) => {
  //     setUpdatePopup((prevUpdatePopup) => !prevUpdatePopup);
  //     const selectedTodo = storedTodos.find((todo) => todo.id === id);
  //     setSelectedTodoObj(selectedTodo);
  //   };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    sortTodos(e.target.value);
  };

  const sortTodos = (option) => {
    const sortedTodos = [...todos];
    if (option === 'dueDate') {
      sortedTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (option === 'status') {
      sortedTodos.sort((a, b) => a.status.localeCompare(b.status));
    }

    setTodos(sortedTodos);
  };

  return (
    <>
      <div className="todos-container">
        <div className="todo-menu">
          <button className="add todo-btn" onClick={handlePopup}>
            Add To-Do
          </button>
          <button onClick={initTodos}>Init Todos</button>
          {/* <button className="Sort todo-btn">Sort By</button> */}
          <select name="sort todo-btn" value={sortOption} onChange={handleSortChange}>
            <option value="sort">Sort By</option>
            <option value="dueDate">Sort by Due Date (Default)</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
        <Popup type="add" onClick={handlePopup} isPopup={isPopup} />
        <ul>
          {todos.map((todo, index) => (
            <li
              className="todo-container"
              key={todo.id}
              style={{
                backgroundColor: `var(${
                  checkedStates[todo.id]
                    ? '--unchecked-background-color'
                    : '--checked-background-color'
                })`,
              }}
            >
              <input
                type="checkbox"
                name={todo.title}
                id={todo.id}
                checked={checkedStates[todo.id] || false}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <div className="todo-content">
                <div className="todo-title">{todo.title}</div>
                <span className="todo-due">{todo.dueDate}</span>
                <div className="todo-description">{todo.description}</div>
                <div className="todo-status">Status: {todo.status}</div>
              </div>

              <button className="delete todo-btn" onClick={() => handleDelete(todo.id)}>
                Delete
              </button>
              <button
                className="edit todo-btn"
                onClick={
                  (handleUpdatePopup,
                  () => {
                    handleUpdateTodo(todo.id);
                  })
                }
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Popup
        type="update"
        isPopup={updatePopup}
        onClick={handleUpdatePopup}
        selectedTodoObj={selectedTodoObj}
        handleUpdateTodo={handleUpdateTodo}
      />
    </>
  );
};

export default Todolist;
