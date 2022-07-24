// react
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// components
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

// css
import styles from "./ProjectForm.module.css";

export default function ProjectForm({ handleSubmit, projectData, btnText }) {
  // GET CATEGORIES
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // CREATE OR EDIT SETUP
  const [project, setProject] = useState(projectData || {});
  // SEND TO BACKEND
  const submit = (event) => {
    event.preventDefault();
    handleSubmit(project);
  };

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Project Name"
        name="name"
        value={project.name ? project.name : ""}
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Total Budget"
        name="budget"
        value={project.budget ? project.budget : ""}
        handleOnChange={handleChange}
      />
      <Select
        name="category_id"
        text="Select Category"
        value={project.category ? project.category.name : ""}
        options={categories}
        handleOnChange={handleCategory}
      />
      <SubmitButton text={btnText} />
    </form>
  );

  // update project obj's name and budget
  function handleChange(event) {
    setProject({ ...project, [event.target.name]: event.target.value });
  }
  // update category choosed
  function handleCategory(event) {
    setProject({
      ...project,
      category: {
        id: event.target.options[event.target.selectedIndex].id,
        name: event.target.options[event.target.selectedIndex].text,
      },
    });
  }
}

ProjectForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  projectData: PropTypes.object,
  btnText: PropTypes.string.isRequired,
};
ProjectForm.defaultProps = {};
