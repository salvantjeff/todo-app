import './Header.css';

function Header() {
    return(
        <header>
            <div className="header-content">
                <h2 className="section-heading">
                    Today
                    <span className="current-date">
                        Wed Jan 4
                    </span>
                </h2>
            </div>
        </header>
    );
}

export default Header;