import {
  cleanup,
  fireEvent,
  getByLabelText,
  render,
  waitFor,
} from "@testing-library/react";
import { screen, configure } from "@testing-library/react";
import { TodoItem } from "../Todo";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Await } from "react-router-dom";

function renderTodo() {
  const mockedOnEdit = jest.fn();
  const mockedOnDelete = jest.fn();
  const todo = { srno: 1, title: "hello world", desc: "test description" };
  return render(
    <TodoItem todo={todo} onDelete={mockedOnDelete} onEdit={mockedOnEdit} />
  );
}

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
    const { container } = renderTodo();
    expect(container.innerHTML).toMatch("hello world ");
  });
  test("Description should be disply", () => {
    const { container } = renderTodo();
    expect(container.innerHTML).toMatch("test description");
  });

  test("Should Show delete button", () => {
    const { getByRole } = renderTodo();
    const deleteBtn = getByRole("button", { name: "Delete" });
    expect(deleteBtn).toBeInTheDocument();
  });
  test("Should Show edit button", () => {
    const { getByRole } = renderTodo();
    const editBtn = getByRole("button", { name: "Edit" });
    expect(editBtn).toBeInTheDocument();
  });

  test("Should open confirmation popup on delete button", () => {
    const { getByRole, container } = renderTodo();
    console.log("This is container", container.innerHTML);
    fireEvent.click(getByRole("button", { name: "Delete" }));
    expect(screen.getByTestId("deleteConfirmationBox")).toBeVisible();
  });

  test("Should open edit dialogue box on edit button click", () => {
    const { getByRole, container } = renderTodo();
    const editBtn = getByRole("button", { name: "Edit" });
    fireEvent.click(editBtn);
    expect(screen.getByTestId("editDialogue")).toBeVisible();
  });

  test("Should close edit todo dialogue if inputs are valid ", async () => {
    const { getByRole } = renderTodo();
    const editDescValidation = jest.fn(() => false);
    console.log("editDescValidationnn", editDescValidation);
    const editBtn = getByRole("button", { name: "Edit" });
    act(() => {
      fireEvent.click(editBtn);
    });

    const editSubmitBtn = getByRole("button", { name: "Submit" });

    const editedTitleInput = screen.getByLabelText("Title");
    const editedDescInput = screen.getByLabelText("Description");
    userEvent.type(editedTitleInput, "Buy charger");
    userEvent.type(editedDescInput, "Buy charger for watch");
    act(() => {
      fireEvent.click(editSubmitBtn);
    });
    await waitFor(() => {
      expect(screen.queryByTestId("editDialogue")).not.toBeInTheDocument();
    });
  });

  test("Should not close edit todo dialogue if inputs are invalid ", async () => {
    const { getByRole } = renderTodo();
    const editDescValidation = jest.fn(() => false);
    console.log("editDescValidationnn", editDescValidation);
    const editBtn = getByRole("button", { name: "Edit" });
    act(() => {
      fireEvent.click(editBtn);
    });

    const editSubmitBtn = getByRole("button", { name: "Submit" });

    const editedTitleInput = screen.getByLabelText("Title");
    const editedDescInput = screen.getByLabelText("Description");
    userEvent.type(editedTitleInput, "Bu");
    userEvent.type(editedDescInput, "");
    act(() => {
      fireEvent.click(editSubmitBtn);
    });
    await waitFor(() => {
      expect(screen.queryByTestId("editDialogue")).toBeInTheDocument();
    });
  });

  test.skip("should call editTitleValidation method while editing todo task", () => {
    const { getByRole } = renderTodo();
    const editBtn = getByRole("button", { name: "Edit" });
    act(() => {
      userEvent.click(editBtn);
    });
    expect(screen.getByTestId("editDialogue")).toBeVisible();
    const editedTitleInput = screen.getByLabelText("Title");

    const editSubmitBtn = getByRole("button", { name: "Submit" });
    const editTitleValidation = jest.fn(() => {
      return false;
    });
    act(() => {
      userEvent.type(editedTitleInput, "kltushah"),
        new MouseEvent((onchange = { editTitleValidation }));
    });
    expect(editTitleValidation).toHaveBeenCalled();
  });

  test("Should close edit dialogue box on toggle button click", async () => {
    const todo = {
      srno: 1,
      title: "hello world",
      desc: "test description",
    };
    const { getByRole } = render(<TodoItem todo={todo} />);
    const editBtn = getByRole("button", { name: "Edit" });
    fireEvent.click(editBtn);
    const toggleBtn = screen.getByTestId("editModalTestId");
    fireEvent.click(getByRole("button", { name: /Close/i }));

    await waitFor(() => {
      expect(screen.queryByTestId("editDialogue")).not.toBeInTheDocument();
    });
  });

  test("Should close delete confirmation popup on delete button", async () => {
    const setdeleteModel = jest.fn();
    const { getByRole, container, debug } = renderTodo();

    console.log("This is container", container.innerHTML);
    fireEvent.click(getByRole("button", { name: "Delete" }));
    expect(screen.getByTestId("deleteConfirmationBox")).toBeVisible();
    const confirmDeleteBtn = getByRole("button", { name: "Delete1" });

    fireEvent.click(confirmDeleteBtn);

    await waitFor(() => {
      expect(
        screen.queryByTestId("deleteConfirmationBox")
      ).not.toBeInTheDocument();
    });
  });

  test("Should close delete confirmation popup on cancel button", async () => {
    const { getByRole, container } = renderTodo();
    const todoDeleteButton = getByRole("button", { name: "Delete" });
    act(() => {
      userEvent.click(todoDeleteButton);
    });
    const confirmCancelBtn = getByRole("button", { name: "Cancel" });
    fireEvent.click(confirmCancelBtn);
    await waitFor(() => {
      expect(
        screen.queryByTestId("deleteConfirmationBox")
      ).not.toBeInTheDocument();
    });
  });
});
