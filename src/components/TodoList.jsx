import { useEffect, useState } from "react";
import "./TodoList.css";

function TodoList() {
    const [list, setList] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState("");

    useEffect(() => {
        fetch('http://localhost:3000/list')
            .then((response) => response.json())
            .then((data) => setList(data))
            .catch((error) => console.error(error));
    }, []);

    const addTodo = (e) => {
        e.preventDefault();
        if (!newTodoTitle.trim()) {
            return;
        }
        const newTodo = {
            title: newTodoTitle,
            status: false
        };

        fetch('http://localhost:3000/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        })
        .then((response) => response.json())
        .then((createdTodo) => {
            setList([...list, createdTodo]);
            setNewTodoTitle(""); 
        })
        .catch((error) => console.error(error));
    };

    const toggleTodo = (id) => {
        setList(list.map(item => 
            item.id === id ? { ...item, status: !item.status } : item
        ));
    };

    const deleteTodo = (id) => {
        fetch(`http://localhost:3000/list/${id}`, { method: 'DELETE' })
            .then((response) => {
                if (response.ok) {
                    setList(list.filter(item => item.id !== id));
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>

            <form onSubmit={addTodo} className="add-todo-form">
                <input
                    type="text"
                    placeholder="Ajouter une nouvelle tâche..."
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                />
                <button type="submit">➕</button>
            </form>

            <div className="todo-items-list">
                {Array.isArray(list) && list.map((l) => (
                    <div className="todo-item" key={l.id}>
                        <div className="todo-content">
                            <input
                                type="checkbox"
                                checked={l.status}
                                onChange={() => toggleTodo(l.id)}
                            />
                            <span style={{ textDecoration: l.status ? "line-through" : "none" }}>
                                {l.title}
                            </span>
                        </div>

                        <button 
                            className="delete-btn" 
                            onClick={() => deleteTodo(l.id)}
                            title="Supprimer cette tâche"
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoList;