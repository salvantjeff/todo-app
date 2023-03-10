import { useState } from 'react';
import './LeftSideMenu.css';
import { Link } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';

function LeftSideMenu({ 
    todoSections, 
    projects,
    setProjects, 
    todaysTodosCount,
    showProjectForm,
    handleRemoveProject,
    handleProjectClicked 
}) {
    
    function handleOnHover(e) {
        e.target.classList.add('activeHover');
    };

    function handleMouseOut(e) {
        e.target.classList.remove('activeHover');
    };

    return (
        <div className="left-side-menu__overlay">
            <div className="left-side-menu">
                <div className="left-side-menu__content">
                    <div className="side-menu__sections">
                        {todoSections.map(section => {
                            if (section.name === 'Today') {
                                return (
                                    <Link to={`/todo-app/today`} key={section.id} className="links">
                                        <div className="side-menu__section-item">
                                            <div className="section-item-details">
                                                <div>{section.icon}</div>
                                                <p>{section.name}</p>
                                            </div>
                                            <div className="section-item__count">
                                                {todaysTodosCount}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            return (
                                <Link to={`/todo-app/sections/${section.id}`} key={section.id} className="links">
                                    <div className="side-menu__section-item">
                                        <div className="section-item-details">
                                            <div>{section.icon}</div>
                                            <p>{section.name}</p>
                                        </div>
                                        <div className="section-item__count">
                                            {section.data.length}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="side-menu__projects">
                        <div onClick={showProjectForm} className="side-menu__projects-title">
                            <p>Projects</p>
                            <div><GrAdd/></div>
                        </div>
                        {projects.map(project => {
                            return (
                                <Link to={`/todo-app/projects/${project.id}`} key={project.id} className="links">
                                <div className="side-menu__projects-contents">
                                    <div 
                                        onClick={handleProjectClicked} 
                                        onMouseOut={handleMouseOut} 
                                        onMouseOver={handleOnHover} 
                                        className="side-menu__section-item"
                                        data-id={project.id}
                                    >
                                        <div className="section-item-details">
                                            <div>{project.icon}</div>
                                            <p>{project.name}</p>
                                        </div>
                                        <div className="section-item__count">{project.data.length}</div>
                                        <div onClick={handleRemoveProject} data-id={project.id} className="section-item__remove">-</div>
                                    </div>
                                </div>
                                </Link>
                                // <div key={project.id} className="side-menu__projects-contents">
                                //     <div onMouseOut={handleMouseOut} onMouseOver={handleOnHover} className="side-menu__section-item">
                                //         <div className="section-item-details">
                                //             <div>{project.icon}</div>
                                //             <p>{project.name}</p>
                                //         </div>
                                //         <div className="section-item__count">{project.data.length}</div>
                                //         <div onClick={handleRemoveProject} data-id={project.id} className="section-item__remove">-</div>
                                //     </div>
                                // </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSideMenu;