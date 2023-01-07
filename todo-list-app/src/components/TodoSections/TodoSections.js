import './TodoSections.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TodoCard from '../TodoCard/TodoCard';
import AddTaskForm from '../Forms/AddTaskForm/AddTaskForm';
import { v4 as uuidv4 } from 'uuid';
import Header from '../Header/Header';

function TodoSections({ todoSections, setTodoSections }) {
    const { id } = useParams();
    const [addTaskFormActive, setAddFormTaskActive] = useState(false);
    const [addTask, setAddTask] = useState({
        name: '',
        description: '',
        date: '',
        id: uuidv4(),
        priority: 4,
    });

    function handleTodoComplete(e) {
        const cardId = e.target.dataset.id;
        const newTodoSections = todoSections.map(section => {
            if (section.id === id) {
                return {
                    ...section,
                    data: section.data.filter(todo => todo.id !== cardId)
                }
            };
            return section;
        });
        setTodoSections(newTodoSections);
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

    function handleAddNewTask(e) {
        e.preventDefault();
        console.log('Adding new task...');
        const newTodoSections = todoSections.map(section => {
            if (section.id === id) {
                return {
                    ...section,
                    data: [...section.data, addTask]
                }
            };
            return section;
        })
       
        setTodoSections(newTodoSections);
        setAddTask({
            name: '',
            description: '',
            date: '',
            id: uuidv4(),
            priority: 4,
        });
        setAddFormTaskActive(false);
    };

    function getTitle() {
        let title = '';
        // const sectionsList = [...todoSections];
        for (let section of todoSections) {
            if (section.id === id) {
                title = section.name;
            };
        }
        return title;
    };
    const currentTitle = getTitle();
    const [currTodos] = [...todoSections.filter(section => section.id === id)];
    return (
        <>
        <Header currentTitle={currentTitle} />
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
                    {currTodos.data.map(todo => {
                        return (
                            <TodoCard 
                                key={todo.id} 
                                todo={todo}
                                handleTodoComplete={handleTodoComplete}
                            />
                        );
                    })}
                </div>
                <footer className="section-board__footer"></footer>
            </section>
            <AddTaskForm 
                onSubmit={handleAddNewTask}
                addTask={addTask}
                setAddTask={setAddTask}
                setAddFormTaskActive={setAddFormTaskActive}
            />
        </div>
        </>
    );
};

export default TodoSections;