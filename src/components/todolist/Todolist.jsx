import React, { useState } from "react";
import './todolist.css';
// import '../../index.css'

const Todolist = () => {

    // let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
    const [checkedStates, setCheckedStates] = useState({});
    const [sortOption, setSortOption] = useState("sort");

    const initTodos = () => {

            setTodos([
                {
                    title: 'haircut',
                    description: 'haircut in World Square',
                    dueDate: '02/06/2024',
                    assignTo: 'Klaus',
                    status: 'in-progress',
                    id: '8223'
                },
                {
                    title: 'grocery',
                    description: 'harris farm',
                    dueDate: '03/06/2024',
                    assignTo: 'kun',
                    status: 'in-progress',
                    id: '29482'
                }
            ])

        }
    const handleCheckboxChange = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                const newStatus = !checkedStates[id] ? 'completed' : 'in-progress';
                return { ...todo, status: newStatus };
            }
            return todo;
        });

        setTodos(updatedTodos);

        setCheckedStates({
            ...checkedStates,
            [id]: !checkedStates[id]
        });


    };

    const handleDelete = (id) => {
        if(window.confirm("Are you sure to delete the to-do item?")) {
            const updateTodos = todos.filter( todo => todo.id !== id);
            setTodos(updateTodos);
        }
    }

    const handleEdit = (id) => {

    }

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        sortTodos(e.target.value)
    }

    const sortTodos = (option) => {
        const sortedTodos = [...todos];
        if(option === "dueDate") {
            sortedTodos.sort( (a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if ( option === "status") {
            sortedTodos.sort( (a, b) => a.status.localeCompare(b.status));
        }

        setTodos(sortedTodos);
    }

    return (
        <div className="todos-container">
            <div className="todo-menu">
                <button className="add todo-btn">Add To-Do</button>
                <button onClick={initTodos}>Init Todos</button>
                {/* <button className="Sort todo-btn">Sort By</button> */}
                <select name="sort todo-btn" value={sortOption} onChange={handleSortChange}>
                    <option value="sort">Sort By</option>
                    <option value="dueDate">Sort by Due Date (Default)</option>
                    <option value="status">Sort by Status</option>
                </select>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li
                    className="todo-container"
                    key={todo.id}
                    style={{
                        backgroundColor: `var(${checkedStates[todo.id] ? '--unchecked-background-color' : '--checked-background-color'})`
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
                            <div className="todo-title">
                                {todo.title}
                            </div>
                            <span className="todo-due">
                                {todo.dueDate}
                            </span>
                            <div className="todo-description">
                                {todo.description}
                            </div>
                            <div className="todo-status">
                                Status: {todo.status}
                            </div>
                        </div>
                        <button className="delete todo-btn" onClick={ () => handleDelete(todo.id)}>Delete</button>
                        <button className="edit todo-btn" onClick={ () => handleEdit(todo.id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Todolist;