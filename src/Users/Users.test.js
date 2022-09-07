import { fireEvent, render, screen } from "@testing-library/react";
import Users from "./Users";

test("renders learn react link", () => {
  render(<Users />);
  const linkElement = screen.getByText(/Users Finder/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders the heading, input field and button", () => {
  render(<Users />);

  expect(screen.getByRole("heading")).toHaveTextContent("Users Finder");
  expect(
    screen.getByPlaceholderText("Enter an name to find user...")
  ).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveTextContent("Find");
});

test("fetches and displays all users", async () => {
  render(<Users />);
  const listItems = await screen.findAllByRole("listitem");
  expect(listItems).toHaveLength(10);
  expect(listItems[0]).toHaveTextContent("Leanne Graham");
  expect(listItems[1]).toHaveTextContent("Ervin Howell");
  expect(listItems[2]).toHaveTextContent("Clementine Bauch");
});

test("displays filtered users when searching for an name", async () => {
  render(<Users />);

  const input = screen.getByPlaceholderText("Enter an name to find user...");

  fireEvent.change(input, { target: { value: "Leanne Graham" } });
  fireEvent.click(screen.getByRole("button", { name: "Find" }));

  expect(
    await screen.findByText("Showing results for Leanne Graham:")
  ).toBeInTheDocument();

  const listItems = screen.getAllByRole("listitem");
  expect(listItems).toHaveLength(1);
  expect(listItems[0]).toHaveTextContent("Leanne Graham");
});
