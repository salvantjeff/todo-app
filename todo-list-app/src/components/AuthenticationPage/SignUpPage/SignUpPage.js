import './SignUpPage.css';
import { SignUpGoogleButton } from '../GoogleButtons/GoogleButtons';

function SignUpPage({
    signUpForm, 
    handleOnChangeSignUpForm, 
    handleSignUpFormSubmit,
}) {
    return (
        <div className="sign-up_page hide">
            <div className="sign-up_auth_content">
                <h2 className="sign-up_title">Create account to get started</h2>
                <div className="auth-connections">
                    <SignUpGoogleButton />
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
                    <p className="sign-in_choice">Already a member? <a className="sign-in_link" href="#">Sign In</a></p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;



