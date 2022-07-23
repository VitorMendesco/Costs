// react
import {Link} from "react-router-dom";

// css
import styles from "./LinkButton.module.css";

export default function LinkButton({to, text}) {
    return (
        <Link to={to} className={styles.btn} draggable={false}>
            {text}
        </Link>
    );
}