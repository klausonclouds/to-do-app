import React, { useEffect, useState } from 'react';
import './popup.css';

const endPoint = 'https://onlineprojectsgit.github.io/API/WDEndpoint.json';

function Popup(props) {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignTo: '',
    status: '',
    id: null,
  });

  useEffect(() => {
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.info.students);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
        id: Date.now(),
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // ?? Store new task to local storage. Maybe get task list first then add to task list then store in local storage
    localStorage.setItem('newTask', JSON.stringify(formData));
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      assignTo: '',
      status: '',
      id: null,
    });
    props.onClick();
  };

  return props.isPopup ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={props.onClick}>
          &#10006;
        </button>
        <form className="todo-form" onSubmit={handleSubmit}>
          <h3 className="form-heading">{props.type === 'add' ? 'Add Todo' : 'Update Todo'}</h3>
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
            <option value="in-progress">In-progress</option>
            <option value="Completed">Completed</option>
            <option value="Review">Review</option>
          </select>

          <div className="popup-btns">
            <button className="add-btn">{props.type === 'add' ? 'Add Task' : 'Update Task'}</button>
            <button className="cancel-btn" type="button" onClick={props.onClick}>
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
