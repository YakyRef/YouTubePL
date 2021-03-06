function SignOut({ auth }) {
    const signOut = () => {
        auth.signOut()
    }
    return (
        <div onClick={signOut}>
            <button>Sign Out</button>
        </div>
    );
}

export default SignOut;