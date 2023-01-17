import './GoogleButtons.css';
import googleIcon from "../../../img/google_icon.png";

function SignUpGoogleButton({ continueWithGoogleClicked }) {
    return (
        <div onClick={continueWithGoogleClicked} className='sing-up-with-google'>
            <img src={googleIcon} alt='google icon'/>
            <p>Sign up with Google</p>
        </div>
    );
};

function SignInGoogleButton({ continueWithGoogleClicked }) {
    return (
        <div onClick={continueWithGoogleClicked} className='sing-in-with-google'>
            <img src={googleIcon} alt='google icon'/>
            <p>Sign in with Google</p>
        </div>
    );
};

function ContinueWithGoogleButton({ continueWithGoogleClicked }) {
    return (
        <div onClick={continueWithGoogleClicked} className='continue-with-google'>
            <img src={googleIcon} alt='google icon'/>
            <p>Continue with Google</p>
        </div>
    );
};

export { 
    SignUpGoogleButton, 
    SignInGoogleButton, 
    ContinueWithGoogleButton 
};