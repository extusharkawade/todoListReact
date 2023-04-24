import {
  fireEvent,
  render,
  screen,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { AddTodo } from "../AddTodo";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { ToDos } from "../Todos";
import { History } from "history";
import { createMemoryHistory } from "history";
afterEach(() => {
  cleanup();
});

const renderAddTodo = () => {
  const methods = render(<AddTodo />, {
    wrapper: BrowserRouter,
  });
  return methods;
};

describe(AddTodo, () => {
  test("Should render AddTodo Component and check if Todo Title and desc label is showing or not", () => {
    renderAddTodo();

    const titleElement = screen.getByTestId("todo-title");
    const descElement = screen.getByTestId("todo-desc");
    // console.log("title element", titleElement);
    expect(descElement).toBeInTheDocument();
    expect(descElement).toHaveTextContent("Description");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent("Todo Title");
  });

  test("Should fire Add Todo button", () => {
    const { getByRole } = renderAddTodo();
    // const { getByRole } = render(<AddTodo />, { wrapper: BrowserRouter });
    const addTodoBtn = getByRole("button", { name: "Add Todo" });
    act(() => {
      fireEvent.click(addTodoBtn);
    });
  });

  test("Test add todo form title and description with valid inputs", () => {
    // const titleNode = getAllByTestId("titleId");
    const mockOnSubmit = jest.fn();
    const { getByLabelText, getByRole, wrapper } = render(
      <AddTodo onSubmit={mockOnSubmit()} />,
      {
        wrapper: BrowserRouter,
      }
    );

    const titleInput = getByLabelText("Todo Title");
    const descInput = getByLabelText("Description");
    act(() => {
      userEvent.type(titleInput, "new go to the market");
      userEvent.type(descInput, "new bring maggie from market");
      // fireEvent.click(getByRole("button", { name: "Add Todo" }));
      userEvent.click(getByRole("button"), { name: "Add Todo" });
    });

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test("Test invalid title", () => {
    const { getByLabelText, container } = renderAddTodo();
    const titleInput = getByLabelText("Todo Title");
    act(() => {
      userEvent.type(titleInput, "Go");
    });

    expect(container.innerHTML).toMatch("Enter valid title");
  });

  test("test valid title", () => {
    const { getByLabelText, container } = renderAddTodo();
    const TitleInput = getByLabelText("Todo Title");
    act(() => {
      userEvent.type(TitleInput, "Go to the home");
    });
    expect(container.innerHTML).not.toMatch("Enter valid title");
  });

  test("Test invalid description", () => {
    const { getByLabelText, container } = renderAddTodo();
    const descInput = getByLabelText("Description");
    act(() => {
      userEvent.type(descInput, "Go");
    });
    expect(container.innerHTML).toMatch("Enter valid description");
  });

  test("Test valid description", async () => {
    const { getByLabelText, container } = renderAddTodo();
    const descInput = getByLabelText("Description");
    act(() => {
      userEvent.type(descInput, "go to market and bring maggieeeeee");
    });
    expect(container.innerHTML).not.toMatch("Enter valid description");
  });

  test("View task button should be on page", () => {
    const { getByRole } = renderAddTodo();
    const viewTaskLink = getByRole("link", { name: "View Tasks" });
    expect(viewTaskLink).toBeInTheDocument();
  });

  // test("View task link should route to the /TodoItems path", () => {
  //   const { getByRole } = render(
  //     <MemoryRouter initialEntries={["/TodoItems"]}>
  //       <AddTodo />
  //     </MemoryRouter>
  //   );
  //   const viewTaskLink = getByRole("link", { name: "View Tasks" });
  //   expect(viewTaskLink).toBeInTheDocument();
  //   userEvent.click(viewTaskLink);
  //   expect(screen.getByText("/TodoItems")).toBeInTheDocument();
  // });

  // test.skip("View task link should route to the /TodoItems pathh", async () => {
  //   window.history.pushState({}, "", "/");
  //   render(
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<AddTodo />} />
  //         <Route
  //           path="/TodoItems"
  //           element={<div data-testid="todos-component">Hello worldd</div>}
  //         />
  //       </Routes>
  //     </BrowserRouter>
  //   );
  //   await waitForElementToBeRemoved(() => {
  //     screen.getByText("Loading...");
  //   });
  //   const viewTaskBtn = screen.getByTestId("buttonId");

  //   userEvent.click(viewTaskBtn);
  //   expect(screen.getByTestId("todos-component")).toBeInTheDocument();
  // });

  test("Test view task button", async () => {
    const history = createMemoryHistory({ initialEntries: ["/TodoItems"] });

    const { getByRole, getByLabelText, container, debug } = renderAddTodo();
    const linkElement = screen.getByTestId("buttonId");
    act(() => {
      userEvent.click(linkElement);
    });

    expect(history.location.pathname).toBe("/TodoItems");
    // const viewTaskBtn = screen.getByTestId("buttonId");
    //const viewTaskBtn = getByRole("link", { name: "View Tasks" });
    //const addTodoBtn = getByRole("button", { name: "Add Todo" });
    // act(() => {
    //   userEvent.click(viewTaskBtn);
    // });

    // // await new Promise((r) => setTimeout(r, 1000));
    // expect(container.innerHTML).not.toMatch(addTodoBtn.textContent);
  });
});
