import React from 'react';
import { useState } from 'react';

const SignUp = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password)
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
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;