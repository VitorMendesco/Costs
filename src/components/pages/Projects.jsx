// react
import { useLocation } from "react-router-dom";

// components
import Container from "../layout/Container";
import Message from "../layout/Message";
import LinkButton from "../layout/LinkButton";

// css
import styles from "./Projects.module.css";

export default function Projects() {
  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Projects</h1>
        <LinkButton to="/newproject" text="New Project" />
      </div>
      {message && <Message msg={message} type="success" />}
      <Container customClass="start">
        <p>Projects...</p>
      </Container>
    </div>
  );
}
