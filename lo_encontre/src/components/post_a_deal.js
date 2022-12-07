import { useEffect } from 'react'
import { useDealContext } from "../hooks/useDealContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import DealsDetails from '../components/deals'
import DealForm from '../components/deal_form'

const PostaDeal = () => {
    const { product, dispatch } = useDealContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8000/api/deals', {
                headers: { 'Authorization': `Bearer ${user.email}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_DEALS', payload: json })
            }
        }

        if (user) {
            fetchProducts()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="product">
                {product && product.map((product) => (
                    <DealsDetails key={product._id} product={product} />
                ))}
            </div>
            <DealForm />
        </div>
    )
}

export default PostaDeal;