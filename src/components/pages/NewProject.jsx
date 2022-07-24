// react
import { useNavigate } from "react-router-dom";

// components
import ProjectForm from "../project/ProjectForm";

// css
import styles from "./NewProject.module.css";

export default function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    // initialize costs and services
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        navigate("/projects", { message: "Project created!" });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>New Project</h1>
      <p>Create your project and add services later</p>
      <ProjectForm handleSubmit={createPost} btnText="Create Project" />
    </div>
  );
}
