import { useEffect, useState } from 'react';
import './App.css';
import AddTaskForm from './components/Forms/AddTaskForm/AddTaskForm';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import LeftSideMenu from './components/LeftSideMenu/LeftSideMenu';
import NavBar from './components/NavBar/NavBar';
import TodosList from './data/TodosList.json';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ProjectsDetail from './components/ProjectsDetail/ProjectsDetail';
import TodoSections from './components/TodoSections/TodoSections';
import AddProjectForm from './components/Forms/AddProjectForm/AddProjectForm';
import { BsCalendarEvent } from 'react-icons/bs';
import { GrInbox } from 'react-icons/gr';
import EditTaskForm from './components/Forms/EditTaskForm/EditTaskForm';
import { 
  BsFillSquareFill, 
  BsFillCircleFill, 
  BsFillTriangleFill, 
  BsFillStarFill,
  BsFillArrowRightCircleFill 
} from 'react-icons/bs';
import { 
  auth, 
  login,
  signup,
  continueWithGoogle,
  logout
} from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignInPage from './components/AuthenticationPage/SignInPage/SignInPage';
import SignUpPage from './components/AuthenticationPage/SignUpPage/SignUpPage';
import ErrorPage from './components/ErrorPage/ErrorPage';

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
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    };
    if (user) {
      console.log('navigating to home page');
      navigate("/todo-app/sections/inbox");
    };
  }, [user, loading]);


  const [signInForm, setSignInForm] = useState({
    email: '',
    password: '',
  });

  function handleOnChangeSignInForm(e) {
    const newSignInForm = {
      ...signInForm,
      [e.target.name]: [e.target.value],
    };
    setSignInForm(newSignInForm);
  };

  async function handleSignInFormSubmit(e) {
    e.preventDefault();
    const [email] = [...signInForm.email];
    const [password] = [...signInForm.password];

    console.log('Signing in...');
    login(email, password);
    setSignInForm({
      email: '',
      password: '',
    });
  };

  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
  });

  function handleOnChangeSignUpForm(e) {
    const newSignUpForm = {
      ...signUpForm,
      [e.target.name]: [e.target.value],
    };
    setSignUpForm(newSignUpForm);
  };

  function handleSignUpFormSubmit(e) {
    e.preventDefault();
    const [email] = [...signUpForm.email];
    const [password] = [...signUpForm.password];
    
    console.log('Registering you as new user...');
    signup(email, password);
    setSignUpForm({
      email: '',
      password: '',
    });
  };

  function continueWithGoogleClicked() {
    continueWithGoogle();
  };
    
  const inboxID = "inbox";
  const [projects, setProjects] = useState([
    {
      name: 'Personal',
      id: "0d67c5d0-ab6d-4e05-88cb-1981a118",
      data: [
        {
          "name": "Go watch the new Avatar",
          "description": "In Imax 3D!",
          "date": "2023-01-13",
          "id": "c50088ec-3c5d-436f-b21a-f2489089",
          "priority": 3
        },
        {
          "name": "Practice dancing",
          "description": "Popping and gliding",
          "date": "2023-01-13",
          "id": "z1jiq44ec-a41b-1888-b1a-7610g2049",
          "priority": 4
        },
        {
          "name": "Read Striking Thoughts",
          "description": "Minimum of 25 pages",
          "date": "2023-01-06",
          "id": "9e0088ec-37dd-4532-8d5d-e1c19f3a",
          "priority": 3
        },
      ],
      icon: <BsFillArrowRightCircleFill/>,
    },
    {
      name: 'Health',
      id: "c8a41405-f84d-43c4-bfc2-467e11ad",
      data: [
        {
          "name": "Get morning sunlight exposure",
          "description": "Good for sleeping well :)",
          "date": "2023-01-13",
          "id": "bc4gjk0ec-a21b-1214-zzz-9998g-jui5yo",
          "priority": 1
        },
        {
          "name": "Workout - push/pull/legs",
          "description": "Leg day! progressive overload",
          "date": "2023-01-10",
          "id": "7a7a3a1c-436f-3c5d-b21a-529a458b",
          "priority": 2
        },
        {
          "name": "Early morning run",
          "description": "Start day off strong - 5k but 10k would be better",
          "date": "2023-01-13",
          "id": "ce8688ec-b21a-714-b-1a-fh48g08yi",
          "priority": 1
        },
        {
          "name": "Meditate",
          "description": "Use waking up app",
          "date": "2023-01-08",
          "id": "be86fcf3-8506-4d25-be3d-f2489089",
          "priority": 2
        },
      ],
      icon: <BsFillArrowRightCircleFill/>,
    },
    {
      name: 'School',
      id: "7e84a0aa-2326-4666-a9e2-6ed5d581",
      data: [
        {
          "name": "Review your day",
          "description": "what went well and what didn't. Make adjustments for next day :)",
          "date": "2023-01-14",
          "id": "xc4644ec-a21b-1214-b1a-1148g12yo",
          "priority": 4
        },
      ],
      icon: <BsFillArrowRightCircleFill/>,
    },
  ]);

  const [todoSections, setTodoSections] = useState([
    {
      name: 'Inbox',
      id: "inbox",
      data: TodosList,
      icon: <GrInbox/>,
    },
    {
      name: 'Today',
      id: "3ba46678-72b7-4bbd-a781-28201b31",
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
    icon: <BsFillArrowRightCircleFill/>,
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
      icon: <BsFillArrowRightCircleFill/>,
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
      // console.log('Projects to add: ', projectsToAdd);
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
  // console.log('ALL TODOS HASH MAP: ',allTodosHashMap);
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

  function handleLogout() {
    logout();
  };

  return (
    <div className="App">
        <NavBar 
          addTaskFormActive={addTaskFormActive} 
          setAddFormTaskActive={setAddFormTaskActive}
          logout={handleLogout}
        />
        <div className="content-wrapper">
          <main className="main-content">
            <div className="main-content__wrapper">
              <div className="agenda-view">
                <Routes>
                  <Route path='/todo-app' element={<Navigate to='/todo-app/signin'/>}/>
                  <Route 
                    path='/todo-app/signin'
                    element={
                      <SignInPage 
                        signInForm={signInForm}
                        handleOnChangeSignInForm={handleOnChangeSignInForm}
                        handleSignInFormSubmit={handleSignInFormSubmit}
                        continueWithGoogleClicked={continueWithGoogleClicked}
                      />
                    }
                  />
                  <Route 
                    path='/todo-app/signup'
                    element={
                      <SignUpPage 
                        signUpForm={signUpForm}
                        handleOnChangeSignUpForm={handleOnChangeSignUpForm}
                        handleSignUpFormSubmit={handleSignUpFormSubmit}
                        continueWithGoogleClicked={continueWithGoogleClicked}
                      />
                    }
                  />
                  <Route 
                    path='/todo-app/today' 
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
                    path='/todo-app/projects/:id' 
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
                    path='/todo-app/sections/:id' 
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
                  <Route path='*' element={<ErrorPage />} />
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
