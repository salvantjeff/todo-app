import TodoCard from '../TodoCard/TodoCard';
import './Home.css';
import TodosList from '../../data/TodosList.json';
import { useEffect, useState } from 'react';

function Home() {
    console.log(TodosList);
    const [todos, setTodos] = useState(TodosList);
    const [addTaskFormActive, setAddFormTaskActive] = useState(false);

    function handleTodoComplete(e) {
        const cardId = e.target.dataset.id;
        const newTodos = todos.filter(todo => todo.id !== cardId);
        setTodos(newTodos);
    };

    function handleAddTaskFormActive() {
        setAddFormTaskActive(!addTaskFormActive);
    };

    useEffect(() => {
        if (addTaskFormActive) {
            document.body.classList.add('addTaskFormActive');
        } else {
            document.body.classList.remove('addTaskFormActive');
        };
    }, [addTaskFormActive]);

    return (
        <div className="board-view__content">
            <section className="section-board add-button">
                <div onClick={handleAddTaskFormActive} className="add-task-button">
                    <p>+</p>
                    <p>Add task</p>
                </div>
            </section>
            <section className="section-board view">
                <div className="section-board__view-header">
                    <p>Overdue <span>9</span></p>
                </div>
                <div className="section-board__cards">
                    {todos.map((todo => {
                        return (
                            <TodoCard 
                                key={todo.id} 
                                todo={todo}
                                handleTodoComplete={handleTodoComplete}
                            />
                        );
                    }))}                    
                </div>
                <footer className="section-board__footer"></footer>
            </section>
        </div>
    );
};

export default Home;