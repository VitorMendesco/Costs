// components
import ProjectForm from "../project/ProjectForm";

// css
import styles from "./NewProject.module.css";

export default function NewProject() {
  return (
    <div className={styles.newproject_container}>
      <h1>New Project</h1>
      <p>Create your project and add services later</p>
      <ProjectForm btnText="Create Project" />
    </div>
  );
}
