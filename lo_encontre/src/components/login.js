import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
        navigate("/home");
    }
    return (
        <div className='container'>
            <form className="sub_form" onSubmit={handleSubmit}>
                <h3>Login</h3>
                <label>Email:</label>
                <input type="Email" onChange={(e) => setEmail(e.target.value)} value={email} /><br />
                <label>Password:</label>
                <input type="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <br/><br />
                <button className='btn' disabled={isLoading}>Log in</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}

export default Login;