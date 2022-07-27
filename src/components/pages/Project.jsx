import { v4 } from "uuid";

// react
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// components
import Container from "../layout/Container";
import Loader from "../layout/Loader";
import Message from "../layout/Message";
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

// css
import styles from "./Project.module.css";

export default function Project() {
  // MESSAGES
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  // GET PROJECT SELECTED
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch((err) => console.error(err));
    }, 300);
  }, [id]);

  // SWITCH BETWEEN DETAILS AND EDIT FORM
  const [showProjectForm, setShowProjectForm] = useState(false);
  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  // ADDING SERVICES SECTION
  const [showServiceForm, setShowServiceForm] = useState(false);
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function createService(project) {
    setMessage("");

    const lastService = project.services.at(-1);
    lastService.id = v4();

    const newCost = parseFloat(project.cost) + parseFloat(lastService.cost);

    if (newCost > parseFloat(project.budget)) {
      setMessage("Over budget, check service cost");
      setMessageType("error");
      project.services.pop();
      return false;
    }

    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setShowServiceForm(false);
        setMessage("Service successfully created!");
        setMessageType("success");
      })
      .catch((err) => console.error(err));
  }

  // removing
  function removeService(id, cost) {
    setMessage("");

    const servicesUpdate = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;
    projectUpdated.services = servicesUpdate;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdate);
        setMessageType("success");
        setMessage("Service successfully deleted!");
      })
      .catch((err) => console.error(err));
  }

  // EDIT PROJECT
  function editProject(project) {
    setMessage("");

    // budget validation
    if (project.budget < project.cost) {
      setMessage("Budget insufficient");
      setMessageType("error");
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
            <div className={styles.service_form_container}>
              <h2>Add services:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Add service" : "Close"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    projectData={project}
                    btnText="Add service"
                  />
                )}
              </div>
            </div>
            <h2>Services</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    handleRemove={removeService}
                    key={service.id}
                  />
                ))}
              {services.length === 0 && (
                <p>There are no registered services.</p>
              )}
            </Container>
          </Container>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
