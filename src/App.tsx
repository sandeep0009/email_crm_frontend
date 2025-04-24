import { Routes ,Route} from "react-router-dom"
import Template from "./pages/Templates"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Campaign from "./pages/Campaign"
import Sender from "./pages/Senders"
import Layout from "./lib/layout"
import ErrorPage from "./components/ErrorPage"
import { Home } from "lucide-react"


function App() {

  return (
    <>
    <Layout>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/template" element={<Template/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/campaign" element={<Campaign/>}/>
      <Route path="/sender" element={<Sender/>}/>
      <Route path="*" element={<ErrorPage/>}/>
      
      
     </Routes>
     </Layout>
    </>
  )
}

export default App
