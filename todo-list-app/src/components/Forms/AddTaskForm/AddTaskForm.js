import { useEffect, useState } from 'react';
import './AddTaskForm.css';
import { v4 as uuidv4 } from 'uuid';

function AddTaskForm() {
    const [priorityStatus, setPriorityStatus] = useState(false);

    useEffect(() => {
        if (priorityStatus) {
            document.body.classList.add('activePriorityPopUp');
        } else {
            document.body.classList.remove('activePriorityPopUp');
        };
    }, [priorityStatus]);

    function handlePriorityClicked() {
        setPriorityStatus(!priorityStatus);
    };

    const [addTask, setAddTask] = useState({
        name: '',
        description: '',
        date: '',
        id: '',
        priority: 4,
    });

    function handleChange(e) {
        console.log(e.target.name);
    };

    return (
        <form className='taskForm'>
            <div className='taskForm_area'>
                <div className='input_fields'>
                    <div className='input_fields__task'>
                        <input 
                            id='task_name'
                            type='text'
                            name='name'
                            placeholder='e.g. Read every day'
                            value={addTask.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='input_fields__description'>
                        <input 
                            id='task_description'
                            type='text'
                            name='description'
                            placeholder='Description'
                            value={addTask.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='taskForm_area__extra_fields'>
                    <div className='left_extra_fields'>
                        <div className='due_date__field'>
                            <input 
                                type='date'
                                name='date'
                                value={addTask.date}
                                onChange={handleChange}
                            />
                        </div>
                        <button type='button' className="bin__field">Inbox</button>
                    </div>
                    <div className="right_extra_fields">
                        <button 
                            onClick={handlePriorityClicked} 
                            type='button' 
                            className="priority__field"
                        >
                            {`Priority ${addTask.priority}`}
                            <PriorityOptions />
                        </button>
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

const prioritiesList = [
    {
        name: 'Priority 1',
        icon: '',
        id: 'first-priority',
        status: '',
    },
    {
        name: 'Priority 2',
        icon: '',
        id: 'second-priority',
        status: '',
    },
    {
        name: 'Priority 3',
        icon: '',
        id: 'third-priority',
        status: '',
    },
    {
        name: 'Priority 4',
        icon: '',
        id: 'fourth-priority',
        status: '',
    },
];

function PriorityOptions() {
    const [priorities, setPriorities] = useState(prioritiesList);

    function handleOptionSelected(e) {
        const targetID = e.target.dataset.id;
        const newPriorities = priorities.map(priority => {
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
        setPriorities(newPriorities);
    };

    return (
        <div className='priority-options'>
            {priorities.map(priority => {
                return (
                    <div 
                        onClick={handleOptionSelected}
                        key={priority.id} 
                        className={`priority-option ${priority.status}`}
                        data-id={priority.id}
                    >
                        <div>Flag</div>
                        <p>{priority.name}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default AddTaskForm;