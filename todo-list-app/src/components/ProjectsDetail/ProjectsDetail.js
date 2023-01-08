import './ProjectsDetail.css';
import { v4 as uuidv4 } from 'uuid';
import Header from '../Header/Header';
import AddTaskForm from '../Forms/AddTaskForm/AddTaskForm';
import { useParams } from 'react-router-dom';
import TodoCard from '../TodoCard/TodoCard';
import { useState, useEffect } from 'react';
import { GrAdd } from 'react-icons/gr';

function ProjectsDetail({ 
    projects, 
    setProjects, 
    addTask, 
    setAddTask, 
    setAddFormTaskActive, 
    addTaskFormActive 
}) {
    const { id } = useParams();
    // const [addTaskFormActive, setAddFormTaskActive] = useState(false);
    // const [addTask, setAddTask] = useState({
    //     name: '',
    //     description: '',
    //     date: '',
    //     id: uuidv4(),
    //     priority: 4,
    // });

    function handleTodoComplete(e) {
        const cardId = e.target.dataset.id;
        const newProjects = projects.map(project => {
            if (project.id === id) {
                return {
                    ...project,
                    data: project.data.filter(todo => todo.id !== cardId)
                }
            };
            return project;
        });
        setProjects(newProjects);
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
        const newProjects = projects.map(project => {
            if (project.id === id) {
                return {
                    ...project,
                    data: [...project.data, addTask]
                }
            };
            return project;
        })
       
        setProjects(newProjects);
        setAddTask({
            name: '',
            description: '',
            date: '',
            id: uuidv4(),
            priority: 4,
        });
        setAddFormTaskActive(false);
        //Reset priorities selector
    };

    function getTitle() {
        let title = '';
        for (let project of projects) {
            if (project.id === id) {
                title = project.name;
            };
        }
        return title;
    };
    let currentTitle = getTitle();
    let [currTodos] = [...projects.filter(project => project.id === id)];
    let message = 'Use menu to navigate or create a new project';
    if (currTodos && currTodos.data.length >= 4) {
        document.body.classList.add('cardsOverflow');
    } else {
        document.body.classList.remove('cardsOverflow');
    };
    return (
        <>
        <Header currentTitle={!currTodos ? 'Project deleted' : currentTitle} />
        {!currTodos ? <div className="board-view__content"><p>{message}</p></div> : 
            <div className="board-view__content">
               <section className="section-board add-button">
                   <div onClick={handleAddTaskFormActive} className="add-task-button">
                       <p><GrAdd/></p>
                       <p>Add task</p>
                   </div>
               </section>
               <section className="section-board view">
                   <div className="section-board__view-header">
                       <p>All todos <span className='all-todos-count'>{currTodos.data.length}</span></p>
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
        }
        </>
    );
};

export default ProjectsDetail;