const url = "http://localhost:3001/data";

// 전체 부서 가져오기
export const getAllDepartment = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    const data = await response.json();
    const deptNames = data.map((item) => item.deptName);

    return deptNames;
  } catch (error) {
    throw error;
  }
};

// 부서별 프로젝트 가져오기
export const getDeptProjects = async (deptName) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();

    if (deptName === "") {
      return data.flatMap((item) => item.projects);
    } else {
      const projects = data.filter((item) => item.deptName === deptName);
      return projects[0].projects;
    }
  } catch (error) {
    throw error;
  }
};

// 검색
export const getSearchedProject = async (keyword) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();

    const projects = data.flatMap((item) => item.projects);

    const searchedProjects = projects.filter(
      (project) =>
        project.projectCode.toLowerCase().includes(keyword) ||
        project.projectName.toLowerCase().includes(keyword)
    );

    return searchedProjects;
  } catch (error) {
    throw error;
  }
};

// 프로젝트 등록
export const addProject = async (newProject) => {
  let id;
  switch (newProject.department) {
    case "플랫폼사업관리부":
      id = 0;
      break;
    case "전략사업본부":
      id = 1;
      break;
    default:
      id = 2;
      break;
  }
  try {
    const date = new Date();
    const year = date.getFullYear;

    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();

    const department = data.find(
      (dept) => dept.deptName === newProject.department
    );

    department.projects.push({
      key: Date.now(),
      year: year,
      projectCode: newProject.code,
      projectName: newProject.project,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
    });

    const updateResponse = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(department),
    });
    return updateResponse;
  } catch (error) {
    throw error;
  }
};
