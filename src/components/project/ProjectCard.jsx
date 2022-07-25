// react
import PropTypes from "prop-types";

// components
import { Link } from "react-router-dom";

// css
import styles from "./ProjectCard.module.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

export default function ProjectCard({ project }) {
  return (
    <div className={styles.project_card}>
      <h4>{project.name}</h4>
      <p>
        <span>Budget: </span>{" "}
        {Number(project.budget).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
      <p className={styles.category_text}>
        <span
          className={`${styles[project.category.name.toLowerCase()]}`}
        ></span>{" "}
        {project.category.name}
      </p>
      <div className={styles.project_card_actions}>
        <Link to="/">
          <BsPencil /> Edit
        </Link>
        <button>
          <BsFillTrashFill /> Delete
        </button>
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
};
