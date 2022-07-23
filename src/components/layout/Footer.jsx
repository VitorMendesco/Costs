// css
import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <a href="https://github.com/VitorMendesco" target="_blank" rel="noreferrer" draggable={false}>
          <FaGithub />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/vitor-mendesco/" target="_blank" rel="noreferrer" draggable={false}>
          <FaLinkedin />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/_mendesco/" target="_blank" rel="noreferrer" draggable={false}>
          <FaInstagram />
          </a>
        </li>
      </ul>
      <p className={styles.copyright}><span>Vitor Mendes</span> &copy; 2022</p>
    </footer>
  );
}
