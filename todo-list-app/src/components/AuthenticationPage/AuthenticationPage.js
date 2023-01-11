import './AuthenticationPage.css';
import SignInPage from './SignInPage/SignInPage';
import SignUpPage from './SignUpPage/SignUpPage';

function AuthenticationPage() {
    return (
        <div className='authentication-page'>
            <SignInPage />
            <SignUpPage />
        </div>
    );
};

export default AuthenticationPage;