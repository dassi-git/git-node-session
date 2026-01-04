import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import useAuth from "../features/user/useAuth"


const Nav = () => {
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    console.log("isUserLoggedIn********", isUserLoggedIn);

    const [objToken] = useAuth()
    console.log("objToken", objToken);

    let roles = null;
    if (objToken) {
        roles = objToken.role;
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
                    {roles === "Admin" && isUserLoggedIn && <Link to="/updetProduct">   UpdetProduct   </Link>}
                    {roles === "Admin" && isUserLoggedIn && <Link to="/deleteProduct">   deleteProduct   </Link>} */}
                    {roles === "Admin" && isUserLoggedIn && <Link to="/adminproduct">   adminproduct   </Link>}
                </div>
            </nav>
        </>
    )
}
export default Nav