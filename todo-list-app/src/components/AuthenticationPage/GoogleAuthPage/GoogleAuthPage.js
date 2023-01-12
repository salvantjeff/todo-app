import './GoogleAuthPage.css';
import { ContinueWithGoogleButton } from '../GoogleButtons/GoogleButtons';

function GoogleAuthPage({ signInWithGoogle }) {
    return (
        <div className='google-auth-page'>
            <div className='google-auth-wrapper'>
                <h2 className="auth_page_title">Log into TodoList</h2>
                <div className="auth-connections">
                    <ContinueWithGoogleButton signInWithGoogle={signInWithGoogle} />
                </div>
            </div>
        </div>
    );
};

export default GoogleAuthPage;