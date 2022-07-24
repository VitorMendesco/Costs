// react
import PropTypes from "prop-types";

// css
import styles from "./Select.module.css";

export default function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select name={name} id={name} onChange={handleOnChange} value={value}>
        <option>Choose an option</option>
        {options.map((option) => (
          <option id={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnChange: PropTypes.func,
  value: PropTypes.string,
};

Select.defaultProps = {
  value: "",
};
