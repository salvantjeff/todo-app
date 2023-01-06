import { useEffect, useState } from 'react';
import './AddTaskForm.css';

function AddTaskForm({ onSubmit, addTask, setAddTask }) {
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

    const [priorities, setPriorities] = useState(prioritiesList);

    function handleChange(e) {
        const newAddTask = {
            ...addTask,
            [e.target.name]: [e.target.value]
        };
        setAddTask(newAddTask);
    };

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

    useEffect(() => {
        const [newPriorityValue] = [...priorities.filter(priority => priority.status === 'selected')];
        let newAddTask = {...addTask};
        if (newPriorityValue) {
            newAddTask = {
                ...addTask,
                priority: newPriorityValue.value,
            };
        };
        setAddTask(newAddTask);
    }, [priorities]);

    return (
        <form onSubmit={onSubmit} className='taskForm'>
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
                            <PriorityOptions 
                                handleOptionSelected={handleOptionSelected}
                                priorities={priorities}
                            />
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
        status: '',
    },
];

function PriorityOptions({ priorities, handleOptionSelected }) {
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
                        <p>Priority {priority.value}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default AddTaskForm;