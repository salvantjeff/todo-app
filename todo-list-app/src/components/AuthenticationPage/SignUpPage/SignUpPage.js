import './SignUpPage.css';
import { ContinueWithGoogleButton } from '../GoogleButtons/GoogleButtons';
import { Link } from 'react-router-dom';

function SignUpPage({
    signUpForm, 
    handleOnChangeSignUpForm, 
    handleSignUpFormSubmit,
    continueWithGoogleClicked,
}) {
    return (
        <div className='authentication-page'>
            <div className="sign-up_page">
                <div className="sign-up_auth_content">
                    <h2 className="sign-up_title">Create account to get started</h2>
                    <div className="auth-connections">
                        <ContinueWithGoogleButton continueWithGoogleClicked={continueWithGoogleClicked} />
                    </div>
                    <hr className="divider"/>
                    <form onSubmit={handleSignUpFormSubmit} className="sign-up_form">
                        <p className="input-item">
                            <label htmlFor="sign-up_email">Email</label>
                            <input 
                                type="email" 
                                id="sign-up_email" 
                                placeholder="thor@gmail.com" 
                                required={true}
                                name='email'
                                value={signUpForm.email}
                                onChange={handleOnChangeSignUpForm}
                            />
                        </p>
                        <p className="input-item">
                            <label htmlFor="sign-up_pwd">Password</label>
                            <input 
                                type="password" 
                                id="sign-up_pwd" 
                                placeholder="6+ characters"
                                required={true}
                                name='password'
                                value={signUpForm.password}
                                onChange={handleOnChangeSignUpForm}
                            />
                        </p>
                        <div className="button-item">
                            <button type="submit" className="sign-up_button">Create Account</button>
                        </div>
                        <div className="sign-in_choice">Already a member?
                            <Link to='/todo-app/signin' className='sign-up_link'><p>Sign in</p></Link> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;



