import './AddProjectForm.css';

function AddProjectForm({ 
    closeProjectForm, 
    newProject, 
    handleOnChange, 
    onSubmit 
}) {
    return (
        <div onClick={closeProjectForm} className='project-form-overlay'>
            <div className='project-form-wrapper'>
            <form onSubmit={onSubmit} className="add_project_form" action="#">
                <h2 className="popup_message">Add a new project</h2>
                <div className="popup_name_input">
                    <label htmlFor='new_project_name'>Name</label>
                    <input 
                        id="new_project_name" 
                        name="new_project_name" 
                        type="text" 
                        value={newProject.name}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="popup_buttons">
                    <button className="popup_submit" type="submit">Submit</button>
                    <button 
                        className="popup_cancel" 
                        type='button' 
                        onClick={closeProjectForm}
                    >Cancel</button>
                    </div>
            </form>
            </div>
        </div>
    );
};

export default AddProjectForm;