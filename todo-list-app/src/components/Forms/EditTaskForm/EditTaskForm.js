import './EditTaskForm.css';
import { GrClose, GrTrash } from 'react-icons/gr';
import { FaFlag } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function EditTaskForm({ 
    toggleEditForm, 
    editTodo, 
    setEditTodo, 
    handleOnChangeEditForm,
    prioritiesEdit,
    setPrioritiesEdit,
    handleEditTodoDelete,
    handleSaveChanges, 
}) {
    function handleOverlayClicked(e) {
        if (e.target.className === 'edit-task-overlay') {
            toggleEditForm();
        };
    };
    
    function handlePrioritySelected(e) {
        const targetID = e.target.dataset.id;
        const newPrioritiesEdit = prioritiesEdit.map(priority => {
            if (priority.id === targetID) {
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

    useEffect(() => {
        const [newPriorityValue] = [...prioritiesEdit.filter(priority => priority.status === 'selected')];
        let newEditTodo = {...editTodo};
        if (newPriorityValue) {
            newEditTodo = {
                ...editTodo,
                priority: newPriorityValue.value,
            };
        };
        setEditTodo(newEditTodo);
    }, [prioritiesEdit]);

    return (
        <div onClick={handleOverlayClicked} className='edit-task-overlay'>
            <div className="edit_menu_wrapper">
                <div className="edit_menu_top_bar">
                    <p className="top_bar_title">Your Todo</p>
                    <button 
                        className="edit_menu_close_button" 
                        type='button' 
                        onClick={toggleEditForm}
                    ><GrClose/></button>
                </div>
                <div className="edit_menu_section">
                    <form onSubmit={handleSaveChanges} className="editForm">
                        <div className="edit_todo">
                            <div className="edit_checkbox"></div>
                            <div className="edit_todo_details">
                                <div className="editForm_area">
                                    <div className="edit_input_fields">
                                        <div className="edit_input_fields__task">
                                            <input 
                                                type="text" 
                                                id="edit_task_name" 
                                                name="name" 
                                                placeholder="e.g., Read every day"
                                                value={editTodo.name}
                                                onChange={handleOnChangeEditForm}
                                            />
                                        </div>
                                        <div className="edit_input_fields__description">
                                            <input 
                                                type="text" 
                                                id="edit_task_description" 
                                                name="description" 
                                                placeholder="Description"
                                                value={editTodo.description}
                                                onChange={handleOnChangeEditForm}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="date_section">
                            <label className="edit_due_date" htmlFor="edit_due_date">Due date</label>
                            <input 
                                id="edit_due_date" 
                                name="date" 
                                type="date"
                                value={editTodo.date}
                                onChange={handleOnChangeEditForm}
                            />
                        </div>
                        <div className="priority_section">
                            <div className="priority_label">Priority</div>
                            <div className="priority_options">
                                {prioritiesEdit.map(priority => {
                                    return (
                                        <div 
                                            onClick={handlePrioritySelected}
                                            key={priority.id} 
                                            data-id={priority.id}
                                            className={`editPriorityLevel ${priority.status}`}
                                        >
                                            {priority.icon}
                                        </div>
                                    );
                                })}
                                {/* <div className="editPriorityLevel" data-priority="1">
                                    <BsFillStarFill color='red' size='1.2rem'/>
                                </div>
                                <div className="editPriorityLevel" data-priority="2">
                                    <BsFillSquareFill color='orange' size='1.2rem'/>
                                </div>
                                <div className="editPriorityLevel" data-priority="3">
                                    <BsFillTriangleFill color='blue' size='1.2rem'/>
                                </div>
                                <div className="editPriorityLevel" data-priority="4">
                                    <BsFillCircleFill color='#efefef' size='1.2rem'/>
                                </div> */}
                            </div>
                        </div>
                        <div className="edit_form__buttons">
                            <button 
                                className="edit_cancel__button" 
                                type='button' 
                                onClick={toggleEditForm}
                            >Cancel</button>
                            <button className="save__button" type="submit">Save changes</button>
                        </div>
                        <div onClick={handleEditTodoDelete} className="delete_section">
                            <button className="delete_todo" id="delete_todo"><GrTrash color='red' /></button>
                            <label className="delete_todo_label" htmlFor="delete_todo">Delete task</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditTaskForm;