import Api from '../Api'
import './Login.css'

export const Login = ({ onReceive }) => {

    const handleFacebookLogin = async () => {
        let result = await Api.fbPopup();
        if (result) {
            onReceive(result.user);
        } else {
            alert('Error');
        }
    }

    return (
        <div className='login'>
            <button onClick={handleFacebookLogin}>Logar com facebook</button>
        </div >
    );
}