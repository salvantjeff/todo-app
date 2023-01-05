import './AddTaskForm.css';

function AddTaskForm() {
    return (
        <form className='taskForm'>
            <div className='taskForm_area'>
                <div className='input_fields'>
                    <div className='input_fields__task'>
                        <input 
                            id='task_name'
                            type='text'
                            name='task_name'
                            placeholder='e.g. Read every day'
                        />
                    </div>
                    <div className='input_fields__description'>
                        <input 
                            id='task_description'
                            type='text'
                            name='task_description'
                            placeholder='Description'
                        />
                    </div>
                </div>
                <div className='taskForm_area__extra_fields'>
                    <div className='left_extra_fields'>
                        <button className="due_date__field">Due date</button>
                        <button className="bin__field">Inbox</button>
                    </div>
                    <div className="right_extra_fields">
                        <button className="priority__field">priority</button>
                    </div>
                </div>
            </div>
            <div className="taskForm__buttons">
                <button className="cancel__button">Cancel</button>
                <button type="submit" className="add_task__button">Add task</button>
            </div>
        </form>
    );
};

export default AddTaskForm;