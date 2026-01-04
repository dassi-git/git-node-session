import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import useAuth from "../features/user/useAuth"
import { logOut } from "../features/user/authSlice"
import { Button } from 'primereact/button'


const Nav = () => {
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log("isUserLoggedIn********", isUserLoggedIn);

    const [objToken] = useAuth()
    console.log("objToken", objToken);

    let roles = null;
    if (objToken) {
        roles = objToken.role;
    }

    const handleLogout = () => {
        dispatch(logOut())
        navigate('/')
    }

    return (
        <>
            <nav >
                <div>Logo</div>
                <div>
                {isUserLoggedIn &&  <div> hello {objToken.name}</div>}
                    <Link to="/"> home page </Link>
                   
                    {<Link to="/login">   login   </Link>}
                    {<Link to="/register">   register  </Link>}
                    {<Link to="/allProduct">   AllProduct   </Link>}
                    {/* {roles === "Admin" && isUserLoggedIn && <Link to="/adProduct">   addProduct   </Link>}
                    {roles === "Admin" && isUserLoggedIn && <Link to="/updateProduct">   UpdateProduct   </Link>}
                    {roles === "Admin" && isUserLoggedIn && <Link to="/deleteProduct">   deleteProduct   </Link>} */}
                    {roles === "Admin" && isUserLoggedIn && <Link to="/adminproduct">   adminproduct   </Link>}
                    {isUserLoggedIn && (
                        <Button 
                            label="יציאה" 
                            icon="pi pi-sign-out" 
                            onClick={handleLogout}
                            className="p-button-link p-button-danger"
                            style={{ marginRight: '10px' }}
                        />
                    )}
                </div>
            </nav>
        </>
    )
}
export default Nav