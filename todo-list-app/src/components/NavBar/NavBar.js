import './NavBar.css';
import { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

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
                <div>home</div>
            </div>
            <div className="right-buttons">
                <div>Add</div>
                <div className="profile-image-container">
                    profile
                </div>
            </div>
        </nav>
    );
};

export default NavBar;