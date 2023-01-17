import './ErrorPage.css';
import errorImage from '../../img/no-results.png';

function ErrorPage() {
    return (
        <div className='error-page'>
            <div className='error-page-wrapper'>
                <div className='error-image'>
                    <img src={errorImage} alt='404 page not found'/>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;