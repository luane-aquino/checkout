import React from "react";
import { render, screen } from "@testing-library/react";
import Tabs from "./";
import { TabContentItemEnum } from "./";
import userEvent from "@testing-library/user-event";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

describe("Tabs", () => {
  it("should show 3 items in the tablist", () => {
    render(<Tabs path={TabContentItemEnum.bag} />);

    expect(screen.getByRole("tablist")).toBeVisible();
    expect(screen.getAllByRole("tab").length).toBe(3);
    expect(screen.getByText("Sacola")).toBeVisible();
    expect(screen.getByText("Pagamento")).toBeVisible();
    expect(screen.getByText("Confirmação")).toBeVisible();
  });

  it("should not change route when click payment tab", () => {
    render(<Tabs path={TabContentItemEnum.bag} />);

    const paymentTab = screen.getByText("Pagamento");

    userEvent.click(paymentTab);
    expect(mockUsedNavigate).not.toHaveBeenCalledWith("/payment");
  });

  it("should change route when click bag tab", () => {
    render(<Tabs path={TabContentItemEnum.payment} />);

    const bagTab = screen.getByText("Sacola");

    userEvent.click(bagTab);
    expect(mockUsedNavigate).toHaveBeenCalledWith("/bag");
  });
});
