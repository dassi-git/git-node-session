import { useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"
const useAuth = () => {
    const token = useSelector((state) => state.auth.token)
    const s = useSelector((state) => state.auth)
    console.log("state.auth",s);
    try {
        const tokenObj = jwtDecode(token)
        return [tokenObj]
    }
    catch(error){
        return [null]
    }

}
export default useAuth