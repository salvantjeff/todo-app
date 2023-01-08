import TodoCard from '../TodoCard/TodoCard';
import './Home.css';
import TodosList from '../../data/TodosList.json';
import { useEffect, useState } from 'react';
import AddTaskForm from '../Forms/AddTaskForm/AddTaskForm';
import { v4 as uuidv4 } from 'uuid';
import Header from '../Header/Header';
import { GrAdd } from 'react-icons/gr';

function Home({ todoSections, setTodoSections }) {
    const inboxID = todoSections[0].id;
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
            if (section.id === inboxID) {
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
            if (section.id === inboxID) {
                return {
                    ...section,
                    data: [...section.data, addTask],
                };
            };
            return section;
        });
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

    function getTodaysTodos() {
        const currAllData = [...todoSections[0].data];
        const today = (new Date()).toDateString();
        let todayTodos = [];
        for (let item of currAllData) {
            let formatDate;
            if (Array.isArray(item.date)) {
                [formatDate] = [...item.date];
            } else {
                formatDate = item.date;
            };
            formatDate = formatDate.replace(/-/, '/').replace(/-/, '/');
            const currItem = (new Date(formatDate)).toDateString();
            if (today === currItem) {
                todayTodos.push(item);
            };
        };
        return todayTodos;
    };

    const todaysTodos = getTodaysTodos();
    return (
        <>
        <Header currentTitle={'Today'}/>
        <div className="board-view__content">
            <section className="section-board add-button">
                <div onClick={handleAddTaskFormActive} className="add-task-button">
                    <p><GrAdd/></p>
                    <p>Add task</p>
                </div>
            </section>
            <section className="section-board view">
                <div className="section-board__view-header">
                    <p>Overdue <span>9</span></p>
                </div>
                <div className="section-board__cards">
                    {todaysTodos.map((todo => {
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

export default Home;