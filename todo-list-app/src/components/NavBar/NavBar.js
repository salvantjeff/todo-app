import './NavBar.css';
import { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { GrHomeRounded, GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';

function NavBar({ setAddFormTaskActive, addTaskFormActive, logout }) {
    const [menuStatus, setMenuStatus] = useState(false);
    
    function handleMenuClicked() {
        setMenuStatus(!menuStatus);
    };

    useEffect(() => {
        if (menuStatus) {
            document.body.classList.add('active-menu');
        } else {
            document.body.classList.remove('active-menu');
        }
    }, [menuStatus]);

    function handleAddTaskFormActive() {
        setAddFormTaskActive(!addTaskFormActive);
    };

    return (
        <nav className="nav-bar">
            <div className="left-buttons">
                <div onClick={handleMenuClicked}><AiOutlineMenu/></div>
                <Link to='/todo-app/today' className='links'>
                    <div><GrHomeRounded/></div>
                </Link>
            </div>
            <div className="right-buttons">
                <div onClick={handleAddTaskFormActive}><GrAdd /></div>
                <Link to='/todo-app/signin' className='links'>
                    <div className='logout-button' onClick={logout}>log out</div>
                </Link>
                <div className="profile-image-container">
                    J
                </div>
            </div>
        </nav>
    );
};

export default NavBar;