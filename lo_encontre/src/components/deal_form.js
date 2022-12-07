import { useState } from "react"
import { useDealContext } from "../hooks/useDealContext"
import { useAuthContext } from '../hooks/useAuthContext'

function DealForm() {
    const { dispatch } = useDealContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [weight, setWeight] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState(null)
    // const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')
            return
        }
        const emailID = user.email
        const deals = { title, weight, price, emailID }
        //const response = await fetch('http://localhost:8000/api/deals/list/?id='+id, {
        const response = await fetch('https://loencontre-kzki.onrender.com/api/deals', {
            method: 'POST',
            body: JSON.stringify(deals),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json()
        console.log(json)

        if (!response.ok) {
            setError(json.error)
            // setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            console.log("response", response)
            setTitle('')
            setWeight('')
            setPrice('')
            setError(null)
            // setEmptyFields([])
            dispatch({ type: 'CREATE_deals', payweight: json })
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h3> Add a Product </h3>

                <label> Title:</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    // className={emptyFields.includes('title') ? 'error' : ''}
                />

                <label>Weight (in kg):</label>
                <input
                    type="number"
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
                    // className={emptyFields.includes('weight') ? 'error' : ''}
                />

                <label>Price :</label>
                <input
                    type="text"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    // className={emptyFields.includes('price') ? 'error' : ''}
                />

                <button className="btn" >Add product</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default DealForm;