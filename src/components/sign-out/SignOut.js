import { Button } from 'antd';

function SignOut({ auth }) {
    const signOut = () => {
        auth.signOut()
    }
    return (
        <div onClick={signOut}>
            <Button size="large">Sign Out</Button>
        </div>
    );
}

export default SignOut;