// react
import PropTypes from "prop-types";

// css
import styles from "../project/ProjectCard.module.css";
import { BsFillTrashFill } from "react-icons/bs";

export default function ServiceCard({
  id,
  name,
  cost,
  description,
  handleRemove,
}) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id, cost);
  };

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Cost:</span>{" "}
        {Number(cost).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
      <p>{description}</p>
      <div className={styles.project_card_actions}>
        <button onClick={remove}>
          <BsFillTrashFill />
          Delete
        </button>
      </div>
    </div>
  );
}

ServiceCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  cost: PropTypes.string,
  description: PropTypes.string,
  handleRemove: PropTypes.func.isRequired,
};
ServiceCard.defaultProps = {
  name: "service name",
  cost: "no service cost",
  description: "empty description",
};
