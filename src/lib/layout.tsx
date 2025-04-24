import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"


type LayoutProp={
    children:React.ReactNode
}
const Layout=({children}:LayoutProp)=>{
    const location=useLocation();
    const validateRoute=['/template','/sender','/campaign' , "/"];
    const hideNavbar=!validateRoute.includes(location.pathname)

    return(
        <>
       {
        !hideNavbar && 
        <div className="hr">
            <Navbar/>
        </div>
       }
        <main className="mb-4">
            {children}
        </main>
        
        </>

    )

}

export default Layout