import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"


type LayoutProp={
    children:React.ReactNode
}
const Layout=({children}:LayoutProp)=>{
    const location=useLocation();
    const validateRoute=['/template','/sender','/campaign' , "/",'/email-logs'];
    
    const hideNavbar=!validateRoute.includes(location.pathname)

    return(
        <>
        <div className="max-w-7xl m-auto">

       {
        !hideNavbar && 
        <div className="hr">
            <Navbar/>
        </div>
       }
        <main className="mb-4">
            {children}
        </main>
        </div>
        
        </>

    )

}

export default Layout