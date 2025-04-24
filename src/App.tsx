import { Routes ,Route} from "react-router-dom"
import Template from "./pages/Templates"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Campaign from "./pages/Campaign"
import Sender from "./pages/Senders"
import Layout from "./lib/layout"
import ErrorPage from "./components/ErrorPage"
import Home from "./pages/Home"
import ProtectedRoutes from "./components/ProtectedRoutes"
import EmailLogs from "./pages/Emaillogs.tsx"



function App() {

  return (
    <>
    <Layout>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/template" element={<ProtectedRoutes children={<Template/>} />}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/campaign" element={<ProtectedRoutes children={<Campaign/>}/>}/>
      <Route path="/sender" element={<ProtectedRoutes children={<Sender/>}/>}/>
      <Route path="/email-logs" element={<ProtectedRoutes children={<EmailLogs/>}/>}/>
      <Route path="*" element={<ErrorPage/>}/>
      
      
     </Routes>
     </Layout>
    </>
  )
}

export default App
