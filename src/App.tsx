import { Routes ,Route} from "react-router-dom"
import Template from "./pages/Templates"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Campaign from "./pages/Campaign"
import Sender from "./pages/Senders"


function App() {

  return (
    <>
     <Routes>
      <Route path="/template" element={<Template/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/campaign" element={<Campaign/>}/>
      <Route path="/sender" element={<Sender/>}/>
      
      
     </Routes>
    </>
  )
}

export default App
