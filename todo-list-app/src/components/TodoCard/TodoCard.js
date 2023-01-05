import './TodoCard.css';

function TodoCard({ todo }) {
    return(
        <div className="section-board__todo-card">
            <div className="priority-checkbox"></div>
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