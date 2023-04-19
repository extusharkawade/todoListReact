import { cleanup, fireEvent, render } from "@testing-library/react";
import { screen, configure } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ToDos } from "../Todos";
import { TodoItem } from "../Todo";
import { act } from "react-dom/test-utils";

describe(TodoItem, () => {
  afterEach(() => {
    cleanup();
  });
  test("Should render todos component ", () => {
    const todo = { srno: 1, title: "hello world", desc: "test description" };
    render(<TodoItem todo={todo} />);
    const singleTodo = screen.getByTestId("singleTodo");
    expect(singleTodo).toBeInTheDocument();
  });

  test("Title should be diplay", () => {
    const todo = {
      srno: 1,
      title: "hello world ",
      desc: "test description",
    };
    const { container } = render(<TodoItem todo={todo} />);
    expect(container.innerHTML).toMatch("hello world ");
  });
  test("Description should be disply", () => {
    const todo = {
      srno: 1,
      title: "hello world ",
      desc: "test description",
    };
    const { container } = render(<TodoItem todo={todo} />);
    expect(container.innerHTML).toMatch("test description");
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

  test("Should open confirmation popup on delete button", () => {
    const todo = {
      srno: 1,
      title: "hello world",
      desc: "test description",
    };
    const { getByRole, container } = render(<TodoItem todo={todo} />);
    console.log("This is container", container.innerHTML);
    fireEvent.click(getByRole("button", { name: "Delete" }));
    expect(screen.getByTestId("deleteConfirmationBox")).toBeVisible();
  });

  test("Should open edit dialogue box on edit button click", () => {
    const todo = {
      srno: 1,
      title: "hello world",
      desc: "test description",
    };
    const { getByRole, container } = render(<TodoItem todo={todo} />);
    const editBtn = getByRole("button", { name: "Edit" });
    fireEvent.click(editBtn);
    expect(screen.getByTestId("editDialogue")).toBeVisible();
  });

  test.skip("Should close confirmation popup on cancel button", async () => {
    const todo = {
      srno: 1,
      title: "hello world",
      desc: "test description",
    };
    const { getByRole, container } = render(<TodoItem todo={todo} />);
    console.log("This is container", container.innerHTML);

    act(() => {
      fireEvent.click(getByRole("button", { name: "Delete" }));
    });
    act(() => {
      userEvent.click(getByRole("button", { name: "Cancel" }));
    });

    expect(screen.getByTestId("deleteConfirmationBox")).not.toBeVisible();
  });
});
