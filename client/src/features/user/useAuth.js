import { useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"
const useAuth = () => {
    const token = useSelector((state) => state.auth.token)
    try {
        const tokenObj = jwtDecode(token)
        return tokenObj
    }
    catch(error){
        return {}
    }

}
export default useAuth