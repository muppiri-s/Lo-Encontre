import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
        alert("Sucessfully registered!")
        navigate('/login')
    }
    return (
        <div className='container'>
            <form className="sub_form" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <label>Email:</label>
                <input type="Email" onChange={(e) => setEmail(e.target.value)} value={email} /><br />
                <label>Password:</label>
                <input type="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <br/><br/>
                <button className='btn' disabled={isLoading}>Sign Up</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}

export default SignUp;