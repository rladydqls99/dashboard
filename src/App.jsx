import SearchBar from "./components/SearchBar";
import DepartmentTabs from "./components/DepartmentTabs";
import ProjectList from "./components/ProjectList";
import { QueryClient, QueryClientProvider } from "react-query";
import { createContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

const queryClient = new QueryClient();
export const DeptContext = createContext("");
export const ProjectsContext = createContext([]);

function App() {
  const [deptName, setDeptName] = useState("");
  const [projects, setProjects] = useState([]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DeptContext.Provider value={{ deptName, setDeptName }}>
          <ProjectsContext.Provider value={{ projects, setProjects }}>
            <Container
              style={{
                maxWidth: "73.75rem",
                padding: "3rem",
                marginTop: "3rem",
                border: ".0625rem solid blue",
                borderRadius: "1rem ",
              }}
            >
              <SearchBar />
              <DepartmentTabs />
              <ProjectList />
            </Container>
          </ProjectsContext.Provider>
        </DeptContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
