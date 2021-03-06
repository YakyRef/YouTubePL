import firebase from 'firebase/app';
import { Button } from 'antd';
import {
    GoogleOutlined
} from '@ant-design/icons';

function SignIn({ auth }) {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
    return (
        <div className="sign-in" onClick={signInWithGoogle}>

            <Button size="large" type="primary">Sign In with Google <GoogleOutlined /></Button>
        </div>
    );
}

export default SignIn;