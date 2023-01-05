import './LeftSideMenu.css';

function LeftSideMenu() {
    return (
        <div className="left-side-menu__overlay">
            <div className="left-side-menu">
                <div className="left-side-menu__content">
                    <div className="side-menu__sections">
                        <div className="side-menu__section-item">
                            <div className="section-item-details">
                                <div>icon</div>
                                <p>Inbox</p>
                            </div>
                            <div className="section-item__count">3</div>
                        </div>
                        <div className="side-menu__section-item">
                            <div className="section-item-details">
                                <div>icon</div>
                                <p>Inbox</p>
                            </div>
                            <div className="section-item__count">3</div>
                        </div>
                    </div>
                    <div className="side-menu__projects">
                        <p className="side-menu__projects-title">Projects</p>
                        <div className="side-menu__projects-contents">
                            <div className="side-menu__section-item">
                                <div className="section-item-details">
                                    <div>o</div>
                                    <p>Personal :)</p>
                                </div>
                                <div className="section-item__count">7</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSideMenu;