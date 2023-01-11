import './SignInPage.css';
import { SignInGoogleButton } from '../GoogleButtons/GoogleButtons';

function SignInPage() {
    return (
        <div className="sign-in_page">
            <div className="sign-in_auth_content">
                <h2 className="sign-in_title">Sign in to continue</h2>
                <div className="auth-connections">
                    <SignInGoogleButton />
                </div>
                <hr className="divider" />
                <form className="sign-in_form">
                    <p className="input-item">
                        <label htmlFor="sign-in_email">Email</label>
                        <input type="email" id="sign-in_email" placeholder="thor@gmail.com" required={true}/>
                    </p>
                    <p className="input-item">
                        <label htmlFor="sign-in_pwd">Password</label>
                        <input type="password" id="sign-in_pwd" placeholder="6+ characters"/>
                    </p>
                    <div className="button-item">
                        <button type="submit" className="sign-in_button">Sign In</button>
                    </div>
                    <p className="sign-up_choice">Not a member? <a className="sign-up_link" href="#">Sign up now</a></p>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;
