import React from 'react';
import { useState } from 'react';
import { useSignup } from '../Server/hooks/useSignup';

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }
    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <label>Email:</label>
                <input type="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <label>Password:</label>
                <input type="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <br/><br/>
                <button disabled={isLoading}>Sign Up</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}

export default SignUp;