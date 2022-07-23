// components
import LinkButton from "../layout/LinkButton";

// css
import styles from "./Home.module.css";
import savings from "../../img/savings.svg";

export default function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Welcome to <span>Costs</span></h1>
      <p>Start managing your projects from now on!</p>
      <LinkButton to="/newproject" text="Create Project" />
      <img src={savings} alt="Savings" draggable={false} />
    </section>
  );
}
