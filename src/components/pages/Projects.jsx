// react
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import Container from "../layout/Container";
import Message from "../layout/Message";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loader from "../layout/Loader";

// css
import styles from "./Projects.module.css";

export default function Projects() {
  // MESSAGE CHANGER
  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  // PROJECT REQUESTER
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.error(err));
    }, 300);
  }, []);

  // LOADER HANDLER
  const [removeLoading, setRemoveLoading] = useState(false);

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
        {!removeLoading && <Loader />}
        {removeLoading && projects.length === 0 && (
          <Message msg={"There are no projects registered"} type="error" />
        )}
      </Container>
    </div>
  );
}
