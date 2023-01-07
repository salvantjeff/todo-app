import './Header.css';

function Header({ currentTitle }) {
    return(
        <header>
            <div className="header-content">
                <h2 className="section-heading">
                    {currentTitle}
                    <span className="current-date">
                        Wed Jan 4
                    </span>
                </h2>
            </div>
        </header>
    );
}

export default Header;