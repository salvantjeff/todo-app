import { useEffect, useState } from 'react';
import './App.css';
import AddTaskForm from './components/Forms/AddTaskForm/AddTaskForm';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import LeftSideMenu from './components/LeftSideMenu/LeftSideMenu';
import NavBar from './components/NavBar/NavBar';
import TodosList from './data/TodosList.json';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectsDetail from './components/ProjectsDetail/ProjectsDetail';
import TodoSections from './components/TodoSections/TodoSections';
import AddProjectForm from './components/Forms/AddProjectForm/AddProjectForm';
import { BsCalendarEvent } from 'react-icons/bs';
import { GrInbox } from 'react-icons/gr';
import { AiFillRightCircle } from 'react-icons/ai';
import EditTaskForm from './components/Forms/EditTaskForm/EditTaskForm';

const prioritiesList = [
  {
    value: 1,
    icon: '',
    id: 'first-priority',
    status: '',
  },
  {
    value: 2,
    icon: '',
    id: 'second-priority',
    status: '',
  },
  {
    value: 3,
    icon: '',
    id: 'third-priority',
    status: '',
  },
  {
    value: 4,
    icon: '',
    id: 'fourth-priority',
    status: 'selected',
  },
];

function App() {
  const inboxID = "26a8cd00-0e2b-4c6c-b047-3373843d261a";
  const [projects, setProjects] = useState([
    {
      name: 'Personal',
      id: "0d67c5d0-ab6d-4e05-88cb-1981a1187f5a",
      data: TodosList,
      icon: <AiFillRightCircle/>,
    },
    {
      name: 'Health',
      id: "c8a41405-f84d-43c4-bfc2-467e11ad27fd",
      data: TodosList,
      icon: <AiFillRightCircle/>,
    },
    {
      name: 'School',
      id: "7e84a0aa-2326-4666-a9e2-6ed5d581baef",
      data: TodosList,
      icon: <AiFillRightCircle/>,
    },
  ]);

  const [todoSections, setTodoSections] = useState([
    {
      name: 'Inbox',
      id: "26a8cd00-0e2b-4c6c-b047-3373843d261a",
      data: TodosList,
      icon: <GrInbox/>,
    },
    {
      name: 'Today',
      id: "3ba46678-72b7-4bbd-a781-28201b31935e",
      data: [],
      icon: <BsCalendarEvent/>,
    },
  ]);

  // Refactor by getting todaysTodos here and set as data in todoSections data prop
  //chicken or egg situation
  function getTodaysTodosCount() {
    const currAllData = [...todoSections[0].data];
    const today = (new Date()).toDateString();
    let todayTodos = 0;
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
            todayTodos += 1;
        };
    };
    return todayTodos;
  };
  const todaysTodosCount = getTodaysTodosCount();

  const [projectFormStatus, setProjectFormStatus] = useState(false);
  if (projectFormStatus) {
      document.body.classList.add('activeProjectForm');
  } else {
      document.body.classList.remove('activeProjectForm');
  };

  function showProjectForm() {
      setProjectFormStatus(true);
  };

  function closeProjectForm(e) {
    if (e.target.className === 'project-form-overlay' ||
        e.target.className === 'popup_cancel') {
        setProjectFormStatus(false);
    };
  };

  const [newProject, setNewProject] = useState({
    name: '',
    id: uuidv4(),
    data: [],
    icon: <AiFillRightCircle/>,
  });

  function handleOnChange(e) {
    const newUserProject = {
      ...newProject,
      name: e.target.value,
    };
    setNewProject(newUserProject);
  };

  function handleSubmitNewProject(e) {
    e.preventDefault();
    const newUserProjects = [
      ...projects,
      newProject,
    ];
    setProjects(newUserProjects);
    setNewProject({
      name: '',
      id: uuidv4(),
      data: [],
      icon: <AiFillRightCircle/>,
    });
    setProjectFormStatus(false);
  };

  function handleRemoveProject(e) {
    const projectID = e.target.dataset.id;
    const newUserProjects = projects.filter(project => project.id !== projectID);
    setProjects(newUserProjects);
  };

  useEffect(() => {
    function addProjectsToInbox() {
      let projectsToAdd = [];
      for (let project of projects) {
        for (let todo of project.data) {
          if (!(todo.id in allTodosHashMap)) {
            projectsToAdd.push(todo);
          };
        };
      };
      console.log('Projects to add: ', projectsToAdd);
      const newTodoSections = todoSections.map(section => {
        if (section.id === inboxID) {
          return {
            ...section,
            data: [
              ...section.data,
              ...projectsToAdd,
            ],
          };
        };
        return section;
      });
      setTodoSections(newTodoSections);
    };
    addProjectsToInbox();
  }, [projects]);

  function createAllTodosHashMap() {
    let hm = {};
    const allTodosData = todoSections[0].data;
    for (let todo of allTodosData) {
      if (!(todo.id in hm)) {
        hm[todo.id] = true;
      }
    };
    return hm;
  };
  const allTodosHashMap = createAllTodosHashMap();
  console.log('ALL TODOS HASH MAP: ',allTodosHashMap);
  const [priorities, setPriorities] = useState(prioritiesList);
  const [addTaskFormActive, setAddFormTaskActive] = useState(false);
  const [addTask, setAddTask] = useState({
    name: '',
    description: '',
    date: '',
    id: uuidv4(),
    priority: 4,
  });

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
    setPriorities(prioritiesList);
  };

  const [editFormStatus, setEditFormStatus] = useState(false);
  function toggleEditForm() {
      setEditFormStatus(!editFormStatus);
  };
  useEffect(() => {
      if (editFormStatus) {
          document.body.classList.add('active-edit-form');
      } else {
          document.body.classList.remove('active-edit-form');
      };
  }, [editFormStatus]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="content-wrapper">
          <main className="main-content">
            <div className="main-content__wrapper">
              <div className="agenda-view">
                {/* <Header /> */}
                <Routes>
                  <Route 
                    path='/app/today' 
                    element={<Home 
                      todoSections={todoSections} 
                      setTodoSections={setTodoSections}
                      addTask={addTask}
                      setAddTask={setAddTask}
                      addTaskFormActive={addTaskFormActive}
                      setAddFormTaskActive={setAddFormTaskActive}
                      handleAddNewTask={handleAddNewTask}
                      priorities={priorities}
                      setPriorities={setPriorities}
                      toggleEditForm={toggleEditForm}
                    />}
                  />
                  <Route 
                    path='/projects/:id' 
                    element={<ProjectsDetail 
                      projects={projects} 
                      setProjects={setProjects} 
                      addTask={addTask}
                      setAddTask={setAddTask}
                      addTaskFormActive={addTaskFormActive}
                      setAddFormTaskActive={setAddFormTaskActive}
                      priorities={priorities}
                      setPriorities={setPriorities}
                      prioritiesList={prioritiesList}
                      toggleEditForm={toggleEditForm}
                    />}
                  />
                  <Route 
                    path='/sections/:id' 
                    element={<TodoSections 
                      todoSections={todoSections} 
                      setTodoSections={setTodoSections}
                      addTask={addTask}
                      setAddTask={setAddTask}
                      addTaskFormActive={addTaskFormActive}
                      setAddFormTaskActive={setAddFormTaskActive}
                      handleAddNewTask={handleAddNewTask}
                      priorities={priorities}
                      setPriorities={setPriorities}
                      toggleEditForm={toggleEditForm}
                    />}
                  />
                </Routes>
                <LeftSideMenu 
                  todoSections={todoSections}
                  projects={projects}
                  setProjects={setProjects}
                  todaysTodosCount={todaysTodosCount}
                  showProjectForm={showProjectForm}
                  handleRemoveProject={handleRemoveProject}
                />
              </div>
            </div>
          </main>
        </div>
      </BrowserRouter>
      <AddProjectForm 
        closeProjectForm={closeProjectForm}
        handleOnChange={handleOnChange}
        newProject={newProject}
        onSubmit={handleSubmitNewProject}
      />
      <EditTaskForm/>
    </div>
  );
}

export default App;
