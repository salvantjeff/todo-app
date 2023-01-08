import './NavBar.css';
import { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { GrHomeRounded, GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';

function NavBar() {
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

    return (
        <nav className="nav-bar">
            <div className="left-buttons">
                <div onClick={handleMenuClicked}><AiOutlineMenu/></div>
                <Link to='/app/today' className='links'>
                    <div><GrHomeRounded/></div>
                </Link>
            </div>
            <div className="right-buttons">
                <div><GrAdd /></div>
                <div className="profile-image-container">
                    J
                </div>
            </div>
        </nav>
    );
};

export default NavBar;