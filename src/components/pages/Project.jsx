// react
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// components
import Container from "../layout/Container";
import Loader from "../layout/Loader";
import Message from "../layout/Message";
import ProjectForm from "../project/ProjectForm";

// css
import styles from "./Project.module.css";

export default function Project() {
  // MESSAGES
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  // GET PROJECT SELECTED
  const { id } = useParams();
  const [project, setProject] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => setProject(data))
        .catch((err) => console.error(err));
    }, 300);
  }, [id]);

  // SWITCH BETWEEN DETAILS AND EDIT FORM
  const [showProjectForm, setShowProjectForm] = useState(false);
  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  // EDIT PROJECT
  function editProject(project) {
    // budget validation
    if (project.budget < project.cost) {
      setMessage("Budget insufficient");
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return false;
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH", // just update the values sent
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Project successfully updated!");
        setMessageType("success");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message msg={message} type={messageType} />}
            <div className={styles.details_container}>
              <h1>Project: {project.name}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectForm ? "Edit project" : "Close"}
              </button>
              {!showProjectForm ? (
                // PROJECT DETAILS
                <div className={styles.project_info}>
                  <p>
                    <span>Category: </span>
                    {project.category.name}
                  </p>
                  <p>
                    <span>Total Budget: </span>
                    {Number(project.budget).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p>
                    <span>Total Cost: </span>
                    {Number(project.cost).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>
              ) : (
                // PROJECT EDIT FORM
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editProject}
                    projectData={project}
                    btnText="Edit Project"
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
