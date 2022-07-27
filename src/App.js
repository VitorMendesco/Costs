// react
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./components/pages/Home";
import Projects from "./components/pages/Projects";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import NewProject from "./components/pages/NewProject";
import Project from "./components/pages/Project";

// components
import Navbar from "./components/layout/Navbar";
import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Container customClass="min_height container_app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/company" element={<Company />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/newproject" element={<NewProject />} />
            <Route path="/project/:id" element={<Project />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
