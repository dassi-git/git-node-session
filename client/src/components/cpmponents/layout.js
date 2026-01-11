import { Outlet } from "react-router-dom"
import Nav from "./Nav"

const Layout=()=>{
    return(
        <>
        <Nav></Nav>
        <main>
            <Outlet></Outlet>
        </main>
            </>
    )
}
export default Layout