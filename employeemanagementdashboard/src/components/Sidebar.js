import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import { RiDashboardFill } from "react-icons/ri";
import { BsPersonLinesFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";

export default function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">
      <h3 className="logo">EMD</h3>

      <nav className="nav-items">
        <Link className="menu-items" to="/dashboard">
          <RiDashboardFill className="menu-icons"/> Dashboard
        </Link>

        <Link className="menu-items" to="/employees">
        <BsPersonLinesFill className="menu-icons"/> Employees
        </Link>
      </nav>
      <div className="logout-btn">
      <AiOutlineLogout className="logout" onClick={onLogout}/> 
      <p className="logout-txt">logout</p>
      </div>
    </div>
  );
}
