import './EditTaskForm.css';
import { GrClose, GrTrash } from 'react-icons/gr';
import { FaFlag } from 'react-icons/fa';
import { 
    BsFillSquareFill, 
    BsFillCircleFill, 
    BsFillTriangleFill, 
    BsFillStarFill 
} from 'react-icons/bs';

function EditTaskForm({ toggleEditForm }) {
    function handleOverlayClicked(e) {
        if (e.target.className === 'edit-task-overlay') {
            toggleEditForm();
        };
    };
    
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
                    <form className="editForm" action="#">
                        <div className="edit_todo">
                            <div className="edit_checkbox"></div>
                            <div className="edit_todo_details">
                                <div className="editForm_area">
                                    <div className="edit_input_fields">
                                        <div className="edit_input_fields__task">
                                            <input 
                                                type="text" 
                                                id="edit_task_name" 
                                                name="edit_task_name" 
                                                placeholder="e.g., Read every day"
                                            />
                                        </div>
                                        <div className="edit_input_fields__description">
                                            <input 
                                                type="text" 
                                                id="edit_task_description" 
                                                name="edit_task_description" 
                                                placeholder="Description"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="date_section">
                            <label className="edit_due_date" htmlFor="edit_due_date">Due date</label>
                            <input id="edit_due_date" name="edit_due_date" type="date"/>
                        </div>
                        <div className="priority_section">
                            <div className="priority_label">Priority</div>
                            <div className="priority_options">
                                <div className="editPriorityLevel" data-priority="1">
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
                                </div>
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
                        <div className="delete_section">
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