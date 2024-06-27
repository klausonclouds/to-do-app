import React, { useState, useEffect } from 'react';
import './todolist.css';
import Popup from '../popup/Popup';
import { render } from '@testing-library/react';

const Todolist = () => {

  // let todos = JSON.parse(localStorage.getItem('todos')) || [];

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [checkedStates, setCheckedStates] = useState([]);
  const [sortOption, setSortOption] = useState('sort');

  const [isPopup, setIsPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [selectedTodoObj, setSelectedTodoObj] = useState(null);

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(todoList);
  }, []);

  const handlePopup = () => {
    setIsPopup((prevIsPopup) => !prevIsPopup);
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

  const renderTodos = () => {
    setTodos(JSON.parse(localStorage.getItem('todos')));
  }


  const handleCheckboxChange = (id, isChecked) => {

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const newStatus = isChecked ? 'completed' : 'in-progress';
        return { ...todo, status: newStatus };
      } 
      return todo;
    });
    
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);


    setCheckedStates({
      ...checkedStates,
      [id]: isChecked
    });

  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete the to-do item?')) {
      const updateTodos = todos.filter((todo) => todo.id !== id);

      localStorage.setItem('todos', JSON.stringify(updateTodos));
      setTodos(updateTodos);
    }
  };


  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    sortTodos(e.target.value);
  };

  const sortTodos = (option) => {
    const sortedTodos = [...todos];
    if (option === 'dueDate') {
      sortedTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (option === 'status') {
      sortedTodos.sort((a, b) => a.status.localeCompare(b.status)).reverse();
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
          <select name="sort todo-btn" value={sortOption} onChange={handleSortChange}>
            <option value="sort">Sort By</option>
            <option value="dueDate">Sort by Due Date (Default)</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
        <Popup type="add" onClick={handlePopup} isPopup={isPopup} renderTodos={renderTodos}/>
        <ul>
          {todos.map((todo, index) => (
            <li
              className={`todo-container ${todo.status.toLowerCase().replace(' ', '-')}`}
              key={todo.id}
            >
              <input
                type="checkbox"
                name={todo.title}
                id={todo.id}
                checked={checkedStates[todo.id] || false}
                onChange={(e) => handleCheckboxChange(todo.id, e.target.checked)}
              />
              <div className="todo-content">
                <span className="todo-due">{todo.dueDate}</span>
                <div className="todo-title">{todo.title}</div>
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
        renderTodos={renderTodos}
      />
    </>
  );
};

export default Todolist;

