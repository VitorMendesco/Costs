// react
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import Container from "../layout/Container";
import Message from "../layout/Message";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";

// css
import styles from "./Projects.module.css";

export default function Projects() {
  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Projects</h1>
        <LinkButton to="/newproject" text="New Project" />
      </div>
      {message && <Message msg={message} type="success" />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
      </Container>
    </div>
  );
}
