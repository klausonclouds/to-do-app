import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './popup.css';

const endPoint = 'https://onlineprojectsgit.github.io/API/WDEndpoint.json';

function Popup({ onClick, isPopup, type, selectedTodoObj }) {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignTo: '',
    status: '',
    id: null,
  });

  // Fetch data during inital render
  useEffect(() => {
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.info.students);
      })
      .catch((err) => console.error(err.message));
  }, []);

  // update formData each time the selected todo updates
  useEffect(() => {
    if (selectedTodoObj) {
      setFormData(selectedTodoObj);
    }
  }, [selectedTodoObj]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
        id: uuidv4(),
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'add') {
      // Add new todo and store into localstorage
      let todoList = JSON.parse(localStorage.getItem('todos'));
      console.log(todoList);
      todoList.push(formData);
      localStorage.setItem('todos', JSON.stringify(todoList));
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        assignTo: '',
        status: '',
        id: null,
      });
      onClick();
    } else {
      const todoList = JSON.parse(localStorage.getItem('todos'));
      const objIndex = todoList.findIndex((todo) => {
        return todo.id === selectedTodoObj.id;
      });
      console.log(objIndex);
      todoList[objIndex] = formData;
      console.log(todoList);
      localStorage.setItem('todos', JSON.stringify(todoList));
      onClick();
    }
  };

  return isPopup ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClick}>
          &#10006;
        </button>
        <form className="todo-form" onSubmit={handleSubmit}>
          <h3 className="form-heading">{type === 'add' ? 'Add Todo' : 'Update Todo'}</h3>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="description"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            autoFocus
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="title"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="due-date">Due Date</label>
          <input
            type="date"
            id="due-date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="assign-to">Assign to</label>
          <select
            id="assign-to"
            name="assignTo"
            value={formData.assignTo}
            onChange={handleInputChange}
            required
          >
            <option value=""></option>
            {students.map((student, i) => (
              <option key={i} value={student}>
                {student}
              </option>
            ))}
          </select>

          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value=""></option>
            <option value="In-progress">In-progress</option>
            <option value="Completed">Completed</option>
            <option value="Review">Review</option>
          </select>

          <div className="popup-btns">
            <button className="add-btn">{type === 'add' ? 'Add Task' : 'Update Task'}</button>
            <button className="cancel-btn" type="button" onClick={onClick}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ''
  );
}

export default Popup;
