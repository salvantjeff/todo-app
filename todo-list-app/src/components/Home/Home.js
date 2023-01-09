import TodoCard from '../TodoCard/TodoCard';
import './Home.css';
import TodosList from '../../data/TodosList.json';
import { useEffect, useState } from 'react';
import AddTaskForm from '../Forms/AddTaskForm/AddTaskForm';
import { v4 as uuidv4 } from 'uuid';
import Header from '../Header/Header';
import { GrAdd } from 'react-icons/gr';

function Home({ 
    todoSections, 
    setTodoSections, 
    handleAddNewTask, 
    addTask, 
    setAddTask, 
    setAddFormTaskActive, 
    addTaskFormActive,
    priorities,
    setPriorities,
    toggleEditForm
}) {
    const inboxID = todoSections[0].id;

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

    if (todaysTodos.length >= 4) {
        document.body.classList.add('cardsOverflow');
    } else {
        document.body.classList.remove('cardsOverflow');
    };

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
                    <p>All todos <span className='all-todos-count'>{todaysTodos.length}</span></p>
                </div>
                <div className="section-board__cards">
                    {todaysTodos.map((todo => {
                        return (
                            <TodoCard 
                                key={todo.id} 
                                todo={todo}
                                handleTodoComplete={handleTodoComplete}
                                toggleEditForm={toggleEditForm}
                                dataID={todo.id}
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
                priorities={priorities}
                setPriorities={setPriorities}
            />
        </div>
        </>
    );
};

export default Home;