import './AuthenticationPage.css';
import SignInPage from './SignInPage/SignInPage';
import SignUpPage from './SignUpPage/SignUpPage';

function AuthenticationPage({ 
    signUpForm, 
    handleOnChangeSignUpForm, 
    handleSignUpFormSubmit,
}) {
    return (
        <div className='authentication-page'>
            <SignInPage />
            <SignUpPage 
                signUpForm={signUpForm}
                handleOnChangeSignUpForm={handleOnChangeSignUpForm}
                handleSignUpFormSubmit={handleSignUpFormSubmit}
            />
        </div>
    );
};

export default AuthenticationPage;