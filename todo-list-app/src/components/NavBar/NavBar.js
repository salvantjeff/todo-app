import './NavBar.css';

function NavBar() {
    return (
        <nav className="nav-bar">
            <div className="left-buttons">
                <div>menu</div>
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