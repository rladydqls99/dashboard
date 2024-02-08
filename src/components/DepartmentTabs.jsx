import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getAllDepartment } from "../apis/api";
import { DeptContext } from "../App";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function DepartmentTabs() {
  const { deptName, setDeptName } = useContext(DeptContext);

  const { data, isSuccess } = useQuery(["deptName"], getAllDepartment);

  const deptNameOnClick = (dept) => {
    setDeptName(dept);
  };

  return (
    <>
      <Tabs defaultActiveKey="" className="mb-3" justify>
        {isSuccess &&
          data?.map((dept) => (
            <Tab
              eventKey={dept}
              title={dept || ""}
              onEntered={() => deptNameOnClick(dept)}
              key={dept}
            />
          ))}
      </Tabs>
    </>
  );
}

export default DepartmentTabs;
