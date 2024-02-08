import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getSearchedProject } from "../apis/api";
import { DeptContext, ProjectsContext } from "../App";
import RegistrationForm from "./RegistrationForm";
import { Button, Container, Form } from "react-bootstrap";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [inputState, setInputState] = useState(false);
  const [modalState, setModalState] = useState(false);

  const { setProjects } = useContext(ProjectsContext);
  const { setDeptName } = useContext(DeptContext);

  const { data, refetch } = useQuery(
    ["searchedProject"],
    () => getSearchedProject(inputValue),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (data) {
      setProjects(data);
    }
  }, [data, inputState]);

  const searchOnSubmit = (e) => {
    e.preventDefault();
    setInputValue("");
    setDeptName(null);
    setInputState(!inputState);

    refetch();
  };

  const onChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const modalOnClick = () => {
    setModalState(!modalState);
  };

  return (
    <Container>
      <div
        className="d-flex justify-content-end"
        style={{ marginBottom: "1rem" }}
      >
        <Button
          size="lg"
          variant="primary"
          style={{ width: "9rem" }}
          onClick={modalOnClick}
          aria-controls="example-fade-text"
          aria-expanded={modalState}
        >
          {modalState ? "등록 취소" : "프로젝트 등록"}
        </Button>
      </div>
      <Form
        onSubmit={searchOnSubmit}
        style={{
          display: "flex",
          gap: "1rem",
          border: "primary",
          marginBottom: "1rem",
        }}
      >
        <Form.Control
          size="lg"
          type="text"
          placeholder="프로젝트 코드 또는 프로젝트 명을 입력해주세요"
          onChange={onChange}
          value={inputValue}
        ></Form.Control>
        <Button
          size="lg"
          variant="secondary"
          type="submit"
          style={{ width: "10rem" }}
        >
          검색
        </Button>
      </Form>

      {modalState && <RegistrationForm setModalState={setModalState} />}
    </Container>
  );
}

export default SearchBar;
