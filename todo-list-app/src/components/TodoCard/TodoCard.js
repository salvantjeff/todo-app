import './TodoCard.css';
import { MdOutlineModeEditOutline, MdOutlineMoreHoriz } from 'react-icons/md';

function TodoCard({ todo, handleTodoComplete, toggleEditForm, dataID }) {

    return(
        <div className="section-board__todo-card">
            <div 
                onClick={handleTodoComplete} 
                className="priority-checkbox" 
                data-id={todo.id}
            ></div>
            <div className="todo_details">
                <div className="todo_details_contents">
                    <p className="todo_title">{todo.name}</p>
                    <p className="todo_description">{todo.description}</p>
                    <div className="due_date">{todo.date}</div>
                </div>
                <div className="todo_details_menu">
                    <button  className="more-details-button"><MdOutlineMoreHoriz/></button>
                    <div>
                        <button 
                            data-id={dataID} 
                            onClick={toggleEditForm} 
                            className="edit_button"
                        ><MdOutlineModeEditOutline/></button>
                    </div>
                </div>
            </div>
        </div>
    ); 
};

export default TodoCard;