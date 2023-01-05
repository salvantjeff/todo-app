import TodoCard from '../TodoCard/TodoCard';
import './Home.css';
import TodosList from '../../data/TodosList.json';

function Home() {
    console.log(TodosList);
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
                    <TodoCard />
                    <TodoCard />
                    <TodoCard />
                    <TodoCard />
                    <TodoCard />
                    <TodoCard />
                    <TodoCard />
                    <TodoCard />
                </div>
                <footer className="section-board__footer"></footer>
            </section>
        </div>
    );
};

export default Home;