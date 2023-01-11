import './AuthenticationPage.css';
import SignInPage from './SignInPage/SignInPage';
import SignUpPage from './SignUpPage/SignUpPage';

function AuthenticationPage({ 
    signUpForm, 
    handleOnChangeSignUpForm, 
    handleSignUpFormSubmit,
    signInForm, 
    handleOnChangeSignInForm, 
    handleSignInFormSubmit,
}) {
    return (
        <div className='authentication-page'>
            <SignInPage 
                signInForm={signInForm}
                handleOnChangeSignInForm={handleOnChangeSignInForm}
                handleSignInFormSubmit={handleSignInFormSubmit}
            />
            <SignUpPage 
                signUpForm={signUpForm}
                handleOnChangeSignUpForm={handleOnChangeSignUpForm}
                handleSignUpFormSubmit={handleSignUpFormSubmit}
            />
        </div>
    );
};

export default AuthenticationPage;