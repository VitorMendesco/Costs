// react
import { Link } from "react-router-dom";

// css
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav_wrapper}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/company">Company</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/newproject">New Project</Link>
        </li>
      </ul>
    </nav>
  );
}
