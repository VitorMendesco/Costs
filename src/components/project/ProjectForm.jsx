// react
import { useEffect, useState } from "react";
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

  // CREATE OR EDIT VERIFICATION
  const [project, setProject] = useState(projectData || {});

  // SEND TO BACKEND
  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Project Name"
        name="name"
        handleOnChange={handleChange}
        value={project.name ? project.name : ''}
      />
      <Input
        type="number"
        text="Total Budget"
        name="budget"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ''}
      />
      <Select
        name="category_id"
        text="Select Category"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.name : ''}
      />
      <SubmitButton text={btnText} />
    </form>
  );

  // set project name and budget
  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  // set project category
  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.options[e.target.selectedIndex].id,
        name: e.target.options[e.target.selectedIndex].text,
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
