import { useDealContext } from '../hooks/useDealContext'
import { useAuthContext } from '../hooks/useAuthContext'

const DealsDetails = ({ deals }) => {
    const { dispatch } = useDealContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        // console.log("Deals page",user.email)

        const response = await fetch('https://loencontre-kzki.onrender.com/api/deals/' + deals._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.email}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_deals', payload: json })
        }
    }

    return (
        <div>
            <h4>{deals.title}</h4>
            <p><strong>Weight (kg): </strong>{deals.load}</p>
            <p><strong>Price: </strong>{deals.reps}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default DealsDetails