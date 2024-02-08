import React, { useContext, useEffect } from "react";
import { DeptContext, ProjectsContext } from "../App";
import { useQuery } from "react-query";
import { getDeptProjects } from "../apis/api";
import { Card } from "react-bootstrap";

function ProjectList() {
  const { deptName } = useContext(DeptContext);
  const { projects, setProjects } = useContext(ProjectsContext);

  const { data, isSuccess, refetch } = useQuery(["deptProjects"], () =>
    getDeptProjects(deptName)
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (deptName !== null) {
      refetch();
      setProjects(data);
    }
  }, [data, deptName]);

  return (
    <>
      {isSuccess &&
        projects?.map((project) => (
          <Card
            border="primary"
            bg="light"
            text="dark"
            className="mb-2"
            key={project.key}
          >
            <Card.Header>프로젝트 코드: {project.projectCode}</Card.Header>
            <Card.Body>
              <Card.Title>{project.projectName}</Card.Title>
              <Card.Text>
                기간: {project.startDate} ~ {project.endDate}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
    </>
  );
}

export default ProjectList;
