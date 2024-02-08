import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addProject, getAllDepartment } from "../apis/api";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";

function RegistrationForm({ setModalState }) {
  const queryClient = useQueryClient();
  const { data } = useQuery(["deptName"], getAllDepartment);

  const [selectedDept, setSelectedDept] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const postMutation = useMutation(addProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(["deptName"]);
    },
  });

  const formOnSubmit = (e) => {
    setModalState(false);

    postMutation.mutate(e);
  };

  const DeptOnSelected = (item) => {
    setSelectedDept(item);
    setValue("department", item);
  };

  return (
    <Form
      onSubmit={handleSubmit(formOnSubmit)}
      style={{
        border: ".0625rem solid blue",
        borderRadius: "0.5rem",
        padding: "1rem",
      }}
    >
      {/* 부서 */}
      <Form.Group className="mb-3" controlId="formGridDepartment">
        <Form.Label>부서명</Form.Label>
        <DropdownButton
          variant="light"
          id="dropdown-basic-button"
          title={selectedDept ? selectedDept : "부서명을 선택해주세요."}
          onSelect={DeptOnSelected}
          {...register("department", {
            required: "부서명을 선택해주세요.",
          })}
        >
          {data &&
            data.map((item, index) => (
              <Dropdown.Item eventKey={item} key={index}>
                {item}
              </Dropdown.Item>
            ))}
        </DropdownButton>
      </Form.Group>

      {/* 프로젝트명 */}
      <Form.Group className="mb-3" controlId="formGridProject">
        <Form.Label>프로젝트명</Form.Label>
        <Form.Control
          type="text"
          placeholder="프로젝트명을 입력해주세요."
          {...register("project", {
            required: "프로젝트명을 입력해주세요.",
          })}
        />
        {errors.project && (
          <Form.Text className="text-danger">
            {errors.project.message}
          </Form.Text>
        )}
      </Form.Group>

      {/* 프로젝트코드 */}
      <Form.Group className="mb-3" controlId="formGridProjectCode">
        <Form.Label>프로젝트 코드</Form.Label>
        <Form.Control
          placeholder="프로젝트 코드를 입력해주세요."
          {...register("code", {
            required: "올바른 프로젝트 코드를 입력해주세요.",
            pattern: {
              value: /^[a-zA-Z]{4}-\d{3}$/,
              message:
                "프로젝트 코드는 네 개의 알파벳 + 하이픈 + 세 개의 숫자여야 합니다. 예: ABCD-123",
            },
          })}
        />
        {errors.code && (
          <Form.Text className="text-danger">{errors.code.message}</Form.Text>
        )}
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridStartDate">
          <Form.Label>시작일자</Form.Label>
          <Form.Control
            placeholder="시작일자를 0000-00-00 형식으로 입력해주세요."
            {...register("startDate", {
              required: "시작일자를 입력해주세요",
              pattern: {
                value: /^\d{4}-\d{2}-\d{2}$/,
                message: "시작일자를 YYYY-MM-DD 형식이여야 합니다.",
              },
            })}
          />
          {errors.startDate && (
            <Form.Text className="text-danger">
              {errors.startDate.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEndDate">
          <Form.Label>종료일자</Form.Label>
          <Form.Control
            placeholder="종료일자를 0000-00-00 형식으로 입력해주세요."
            {...register("endDate", {
              required: "종료일자를 입력해주세요",
              pattern: {
                value: /^\d{4}-\d{2}-\d{2}$/,
                message: "시작일자를 YYYY-MM-DD 형식이여야 합니다.",
              },
            })}
          />
          {errors.endDate && (
            <Form.Text className="text-danger">
              {errors.endDate.message}
            </Form.Text>
          )}
        </Form.Group>
      </Row>
      <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          type="submit"
          size="lg"
          style={{ width: "8rem" }}
        >
          등록
        </Button>
      </div>
    </Form>
  );
}

export default RegistrationForm;
