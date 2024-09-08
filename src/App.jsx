import { Outlet } from "react-router-dom"
import ManageProjects from "./components/ManageProjects"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"









function App() {
return (
  <>
  <Navbar/>
  <Outlet/>
  </>

)
}

export default App
