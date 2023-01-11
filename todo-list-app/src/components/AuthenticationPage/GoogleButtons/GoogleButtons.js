import './GoogleButtons.css';
import googleIcon from "../../../img/google_icon.png";

function SignUpGoogleButton() {
    return (
        <div className='sing-up-with-google'>
            <img src={googleIcon} alt='google icon'/>
            <p>Sign up with Google</p>
        </div>
    );
};

function SignInGoogleButton({ signInGoogleClicked }) {
    return (
        <div onClick={signInGoogleClicked} className='sing-in-with-google'>
            <img src={googleIcon} alt='google icon'/>
            <p>Sign in with Google</p>
        </div>
    );
};

export { SignUpGoogleButton, SignInGoogleButton };