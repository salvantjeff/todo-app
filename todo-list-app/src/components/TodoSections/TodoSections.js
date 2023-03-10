import './TodoSections.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TodoCard from '../TodoCard/TodoCard';
import AddTaskForm from '../Forms/AddTaskForm/AddTaskForm';
import { v4 as uuidv4 } from 'uuid';
import Header from '../Header/Header';
import { GrAdd } from 'react-icons/gr';
import getOverdue from '../../Functionality/getOverdue';

function TodoSections({ 
    todoSections, 
    setTodoSections, 
    handleAddNewTask, 
    addTask, 
    setAddTask, 
    setAddFormTaskActive, 
    addTaskFormActive,
    priorities,
    setPriorities,
    handleEditClicked,
}) {
    const { id } = useParams();

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

    function getTitle() {
        let title = '';
        for (let section of todoSections) {
            if (section.id === id) {
                title = section.name;
            };
        }
        return title;
    };
    const currentTitle = getTitle();
    const [currTodos] = [...todoSections.filter(section => section.id === id)];
    if (currTodos.data.length >= 4) {
        document.body.classList.add('cardsOverflow');
    } else {
        document.body.classList.remove('cardsOverflow');
    };
    return (
        <>
        <Header currentTitle={currentTitle} />
        <div className="board-view__content">
            <section className="section-board add-button">
                <div onClick={handleAddTaskFormActive} className="add-task-button">
                    <p><GrAdd/></p>
                    <p>Add task</p>
                </div>
            </section>
            <section className="section-board view">
                <div className="section-board__view-header">
                    <div className='header-details'>
                        <div className='left-header-details'>
                            <p>Overdue <span className='all-todos-count'>{getOverdue(currTodos.data).length}</span></p>
                        </div>
                        <div className='right-header-details'>
                            <p>All todos <span className='all-todos-count'>{currTodos.data.length}</span></p>
                        </div>
                    </div>
                </div>
                <div className="section-board__cards">
                    {currTodos.data.map(todo => {
                        return (
                            <TodoCard 
                                key={todo.id} 
                                todo={todo}
                                handleTodoComplete={handleTodoComplete}
                                handleEditClicked={handleEditClicked}
                                dataID={todo.id}
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
                priorities={priorities}
                setPriorities={setPriorities}
            />
        </div>
        </>
    );
};

export default TodoSections;