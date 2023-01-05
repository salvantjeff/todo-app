import './TodoCard.css';

function TodoCard({ todo, handleTodoComplete }) {
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
                    <button  className="more-details-button">...</button>
                    <div className="delete_box">
                        <button className="edit_button">?</button>
                    </div>
                </div>
            </div>
        </div>
    ); 
};

export default TodoCard;