import { useNavigate} from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
 
  const [logoutMenu, SetlogoutMenu] = useState(false);
  const navigate = useNavigate();
  const handleClick = (e) => {
    SetlogoutMenu(!logoutMenu);
    e.preventDefault();
  }
  const handleLogout = () =>{
    localStorage.clear();
    navigate('/signup');
  }
  
  return (
    <div className="h-38 bg-navbar-color container">
      <div className="w-24 h-24">
        <img
          src="src\assets\images\logo.jpg"
          onClick={() => {
            navigate('/');
          }}
          className="heroimg rounded-full"
        ></img>
      </div>
      <div className="navlinks">
        <ul>
          <li onClick={() => navigate("/list")}>
            <a href="">
              <i className="fa-solid fa-list fa-2x"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa-solid fa-cart-shopping fa-2x"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa-solid fa-user fa-2x" onClick={(e) => {handleClick(e)}}>
                <div className={ logoutMenu ? "block logoutmenudivstlye":"hidden"}>
                <ul className="logoutmenustyle">
                  <li className="logoutmenuli" onClick={() => { navigate('/profile');}}>Profile</li>
                  <li className="logoutmenuli" onClick={handleLogout}>Logout</li>
                </ul>
                </div>
              </i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    
  );
};

export default Navbar;
