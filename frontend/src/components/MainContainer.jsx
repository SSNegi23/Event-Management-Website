import { Outlet } from "react-router-dom";
import "../styles/MainContainer.css";
import Sidebar from "./sidebar"

const MainContainer = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default MainContainer