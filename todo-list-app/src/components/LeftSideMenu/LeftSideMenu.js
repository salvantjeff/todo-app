import { useState } from 'react';
import './LeftSideMenu.css';
import { Link } from 'react-router-dom';

function LeftSideMenu({ 
    todoSections, 
    projects,
    setProjects, 
    todaysTodosCount 
}) {

    function handleAddNewProject() {
        console.log('Adding new project');
    };

    return (
        <div className="left-side-menu__overlay">
            <div className="left-side-menu">
                <div className="left-side-menu__content">
                    <div className="side-menu__sections">
                        {todoSections.map(section => {
                            if (section.name === 'Today') {
                                return (
                                    <Link to={`/app/today`} key={section.id} className="links">
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
                                <Link to={`/sections/${section.id}`} key={section.id} className="links">
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
                        <div className="side-menu__projects-title">
                            <p>Projects</p>
                            <div>+</div>
                        </div>
                        {projects.map(project => {
                            return (
                                <div key={project.id} className="side-menu__projects-contents">
                                    <div className="side-menu__section-item">
                                        <div className="section-item-details">
                                            <div>{project.icon}</div>
                                            <p>{project.name}</p>
                                        </div>
                                        <div className="section-item__count">{project.data.length}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSideMenu;