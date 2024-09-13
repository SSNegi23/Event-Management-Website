import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
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
          <li>
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
              <i className="fa-solid fa-user fa-2x"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
