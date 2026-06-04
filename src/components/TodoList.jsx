import { useEffect, useState } from "react";
import "./TodoList.css";

function TodoList({todo, tTodo, deleteTodo, edit}) {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/list')
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => console.log(error));
    }, []);

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            {list.map((l) => (
                <div className="todo-item" key={l.id}>
                    <input
                        type="checkbox"
                        checked={l.status}
                        readOnly
                    />

                    <span>{l.title}</span>
                </div>
            ))}
        </div>
    );
}   

export default TodoList;