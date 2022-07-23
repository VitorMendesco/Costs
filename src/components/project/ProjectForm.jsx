// react
import PropTypes from "prop-types";

// components
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

// css
import styles from "./ProjectForm.module.css";

export default function ProjectForm({ btnText }) {
  return (
    <form className={styles.form}>
      <Input type="text" text="Project Name" name="name" />
      <Input type="number" text="Total Budget" name="budget" />
      <Select name="category_id" text="Select Category" />
      <SubmitButton text={btnText} />
    </form>
  );
}

ProjectForm.propTypes = {
  btnText: PropTypes.string.isRequired,
};
ProjectForm.defaultProps = {};
