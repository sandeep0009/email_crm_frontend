import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"


const ErrorPage=()=>{
    const navigate=useNavigate();
    return(
        <>
        <div className="min-h-screen flex justify-center items-center text-center m-auto">
            <div>
                Page Doesn't Exist <Button onClick={()=>
                navigate('/')

                }>Go Back to Home</Button>
            </div>

        </div>
        </>
    )
}

export default ErrorPage