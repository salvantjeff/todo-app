import './TodoCard.css';

function TodoCard() {
    return(
        <div className="section-board__todo-card">
            <div className="priority-checkbox"></div>
            <div className="todo_details">
                <div className="todo_details_contents">
                    <p className="todo_title">Read a book</p>
                    <p className="todo_description">Read minimum of 25 pages</p>
                    <div className="due_date">Wed Jan 4</div>
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