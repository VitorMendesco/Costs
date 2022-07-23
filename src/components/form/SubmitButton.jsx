// react
import PropTypes from "prop-types";

// css
import styles from "./SubmitButton.module.css";

export default function SubmitButton({ text }) {
  return (
    <div>
      <button className={styles.btn}>{text}</button>
    </div>
  );
}

SubmitButton.propTypes = {
    text: PropTypes.string.isRequired
}
SubmitButton.defaultProps = {
    text: "submit button"
}