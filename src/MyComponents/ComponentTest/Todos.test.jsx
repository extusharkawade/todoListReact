import { cleanup, render } from "@testing-library/react";
import { screen, configure } from "@testing-library/react";

import { ToDos } from "../Todos";
import { TodoItem } from "../Todo";

afterEach(() => {
  cleanup();
});
describe(TodoItem, () => {
  test("Should render todos component ", () => {
    const todo = { srno: 1, title: "hello world", desc: "test description" };
    render(<TodoItem todo={todo} />);
    const singleTodo = screen.getByTestId("singleTodo");
    expect(singleTodo).toBeInTheDocument();
  });
  test("Should Show delete button", () => {
    const todo = {
      srno: 1,
      title: "hello world",
      desc: "test description",
    };
    const { getByRole } = render(<TodoItem todo={todo} />);
    const deleteBtn = getByRole("button", { name: "Delete" });
    expect(deleteBtn).toBeInTheDocument();
  });
  test("Should Show edit button", () => {
    const todo = {
      srno: 1,
      title: "hello world",
      desc: "test description",
    };
    const { getByRole } = render(<TodoItem todo={todo} />);
    const editBtn = getByRole("button", { name: "Edit" });
    expect(editBtn).toBeInTheDocument();
  });
});
