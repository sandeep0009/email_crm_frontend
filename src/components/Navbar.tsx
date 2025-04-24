import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button";
const Navbar=()=>{
    const token=localStorage.getItem('token');
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/signin');

    }
    return(
        <>
        <div className="flex justify-between items-center bg-white shadow-2xl p-4">
            <div>
                <h1 className="font-bold">Reach Flow</h1>
            </div>
            <div>
                <ul className="flex gap-6">
                    <li>
                        <Link to="/sender" className="hover:font-bold" >Sender</Link>
                    </li>
                    <li>
                    <Link to="/template" className="hover:font-bold">Template</Link>
                    </li>
                    <li>
                    <Link to="/campaign" className="hover:font-bold">Campaign</Link>
                    </li>
                </ul>
            </div>
            <div>
                {
                    token ?
                    <>
                    <Button onClick={handleLogout}>LogOut</Button>
                    </>
                    :
                    <>
                    <div className="flex gap-5">
                        <Button onClick={()=>navigate('/signin')}>Login</Button>
                        <Button onClick={()=>navigate('/signup')}>SignUp</Button>

                    </div>
                    </>
                }

            </div>

        </div>
        
        </>
    )

}

export default Navbar