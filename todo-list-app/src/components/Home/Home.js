import TodoCard from '../TodoCard/TodoCard';
import './Home.css';
import TodosList from '../../data/TodosList.json';
import { useState } from 'react';

function Home() {
    console.log(TodosList);
    const [todos, setTodos] = useState(TodosList);

    function handleTodoComplete(e) {
        const cardId = e.target.dataset.id;
        const newTodos = todos.filter(todo => todo.id !== cardId);
        setTodos(newTodos);
    };

    return (
        <div className="board-view__content">
            <section className="section-board add-button">
                <div className="add-task-button">
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