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
import { 
  BsFillSquareFill, 
  BsFillCircleFill, 
  BsFillTriangleFill, 
  BsFillStarFill 
} from 'react-icons/bs';

const prioritiesList = [
  {
    value: 1,
    icon: <BsFillStarFill color='red' size='1.2rem'/>,
    id: 'first-priority',
    status: '',
  },
  {
    value: 2,
    icon: <BsFillSquareFill color='orange' size='1.2rem'/>,
    id: 'second-priority',
    status: '',
  },
  {
    value: 3,
    icon: <BsFillTriangleFill color='blue' size='1.2rem'/>,
    id: 'third-priority',
    status: '',
  },
  {
    value: 4,
    icon: <BsFillCircleFill color='#efefef' size='1.2rem'/>,
    id: 'fourth-priority',
    status: 'selected',
  },
];

const prioritiesListEdit = [
  {
    value: 1,
    icon: <BsFillStarFill color='red' size='1.2rem'/>,
    id: 'first-priority-edit',
    status: '',
  },
  {
    value: 2,
    icon: <BsFillSquareFill color='orange' size='1.2rem'/>,
    id: 'second-priority-edit',
    status: '',
  },
  {
    value: 3,
    icon: <BsFillTriangleFill color='blue' size='1.2rem'/>,
    id: 'third-priority-edit',
    status: '',
  },
  {
    value: 4,
    icon: <BsFillCircleFill color='#efefef' size='1.2rem'/>,
    id: 'fourth-priority-edit',
    status: 'selected',
  },
];

function App() {
  const inboxID = "26a8cd00-0e2b-4c6c-b047-3373843d261a";
  const [projects, setProjects] = useState([
    {
      name: 'Personal',
      id: "0d67c5d0-ab6d-4e05-88cb-1981a1187f5a",
      data: [],
      icon: <AiFillRightCircle/>,
    },
    {
      name: 'Health',
      id: "c8a41405-f84d-43c4-bfc2-467e11ad27fd",
      data: [],
      icon: <AiFillRightCircle/>,
    },
    {
      name: 'School',
      id: "7e84a0aa-2326-4666-a9e2-6ed5d581baef",
      data: [],
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
    let projectName = newProject.name ? newProject.name : 'New Project';
    const newUserProjects = [
      ...projects,
      {
        ...newProject,
        name: projectName
      },
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

  const [currentEditTodo, setCurrentEditTodo] = useState('');
  function handleEditClicked(e) {
    const targetID = e.target.dataset.id;
    setCurrentEditTodo(targetID);
    setEditFormStatus(!editFormStatus);
  };
  
  useEffect(() => {
    function setEditFormContent() {
      let targetTodoData = {
        name: '',
        description: '',
        date: '',
        id: uuidv4(),
        priority: 4,
      };
      const allTodosData = [...todoSections[0].data];
      for (let todo of allTodosData) {
        if (todo.id === currentEditTodo) {
          targetTodoData = {...todo};
        }
      };
      setEditTodo(targetTodoData);

      const newPrioritiesEdit = prioritiesEdit.map(priority => {
        if (priority.value === targetTodoData.priority) {
          return {
            ...priority,
            status: 'selected',
          };
        };
        return {
          ...priority,
          status: '',
        };
      });
      setPrioritiesEdit(newPrioritiesEdit);
    };
    setEditFormContent();
  }, [currentEditTodo]);

  useEffect(() => {
    if (editFormStatus) {
      document.body.classList.add('active-edit-form');
    } else {
      document.body.classList.remove('active-edit-form');
    };
  }, [editFormStatus]);

  const [editTodo, setEditTodo] = useState({
    name: '',
    description: '',
    date: '',
    id: uuidv4(),
    priority: 4,
  });

  function handleOnChangeEditForm(e) {
    const newEditTodo = {
      ...editTodo,
      [e.target.name]: [e.target.value]
    };
    setEditTodo(newEditTodo);
  };

  const [prioritiesEdit, setPrioritiesEdit] = useState(prioritiesListEdit);
  const [currentProjectBin, setCurrentProjectBin] = useState('');
  function handleProjectClicked(e) {
    const targetID = e.target.dataset.id;
    setCurrentProjectBin(targetID);
  };

  function handleEditTodoDelete() {
    const newTodoSections = todoSections.map(section => {
      if (section.id === inboxID) {
        return {
          ...section,
          data: section.data.filter(todo => todo.id !== currentEditTodo)
        }
      };
      return section;
    });
    setTodoSections(newTodoSections);
    const newProjects = projects.map(project => {
      if (project.id === currentProjectBin) {
        return {
          ...project,
          data: project.data.filter(todo => todo.id !== currentEditTodo)
        }
      };
      return project;
    });
    setProjects(newProjects);

    toggleEditForm();
    setEditTodo({
      name: '',
      description: '',
      date: '',
      id: uuidv4(),
      priority: 4,
    });
    setPrioritiesEdit(prioritiesListEdit);
  };

  function handleSaveChanges(e) {
    e.preventDefault();
    const newTodoSections = todoSections.map(section => {
      if (section.id === inboxID) {
        return {
          ...section,
          data: section.data.map(todo => {
            if (todo.id === currentEditTodo) {
              return {
                ...editTodo,
              };
            };
            return todo;
          })
        }
      };
      return section;
    });
    setTodoSections(newTodoSections);
    const newProjects = projects.map(project => {
      if (project.id === currentProjectBin) {
        return {
          ...project,
          data: project.data.map(todo => {
            if (todo.id === currentEditTodo) {
              return {
                ...editTodo,
              };
            };
            return todo;
          })
        }
      };
      return project;
    });
    setProjects(newProjects);
    toggleEditForm();
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar 
          addTaskFormActive={addTaskFormActive} 
          setAddFormTaskActive={setAddFormTaskActive}
        />
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
                      handleEditClicked={handleEditClicked}
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
                      handleEditClicked={handleEditClicked}
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
                      handleEditClicked={handleEditClicked}
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
                  handleProjectClicked={handleProjectClicked}
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
      <EditTaskForm 
        toggleEditForm={toggleEditForm}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        handleOnChangeEditForm={handleOnChangeEditForm}
        prioritiesEdit={prioritiesEdit}
        setPrioritiesEdit={setPrioritiesEdit}
        handleEditTodoDelete={handleEditTodoDelete}
        handleSaveChanges={handleSaveChanges}
      />
    </div>
  );
}

export default App;
