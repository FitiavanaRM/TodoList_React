import { useEffect, useState } from "react";
import "./TodoList.css";

function TodoList() {
    const [list, setList] = useState([]);

useEffect(() => {
        fetch('http://localhost:3000/list')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setList(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const toogleTodo = (id) => {
        setList(list.map(item =>
            item.id === id ? { ...item, status: !item.status } : item
        ));
    };
    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            {Array.isArray(list) && list.map((l) => (
                <div className="todo-item" key={l.id}>
                    <input
                        type="checkbox"
                        checked={l.status}
                        onChange={() => toogleTodo(l.id)}
                    />
                    <span>{l.title}</span>
                </div>
            ))}
        </div>
    );
}   

export default TodoList;