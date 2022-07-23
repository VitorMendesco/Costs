// react
import PropTypes from "prop-types";

// css
import styles from "./Select.module.css";

export default function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select name={name} id={name}>
        <option>Choose an option</option>
      </select>
    </div>
  );
}

Select.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string.isRequired,
  // options: PropTypes.string,
  handleOnChange: PropTypes.func,
  value: PropTypes.string,
};

Select.defaultProps = {};
