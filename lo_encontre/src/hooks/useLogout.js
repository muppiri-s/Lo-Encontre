import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    let navigate = useNavigate();
    const { dispatch } = useAuthContext()

    const logout = () => {
        localStorage.removeItem('user')

        navigate('/logo');
        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}