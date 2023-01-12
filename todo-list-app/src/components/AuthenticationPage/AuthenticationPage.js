import './AuthenticationPage.css';
import GoogleAuthPage from './GoogleAuthPage/GoogleAuthPage';

function AuthenticationPage({ signInWithGoogle }) {
    return (
        <div className='authentication-page'>
            <GoogleAuthPage signInWithGoogle={signInWithGoogle} />
        </div>
    );
};

export default AuthenticationPage;