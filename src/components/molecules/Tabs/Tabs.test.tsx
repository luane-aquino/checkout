import React from "react";
import { render, screen } from "@testing-library/react";
import Tabs from "./";
import { TabContentItemEnum } from "../../../common/types";

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
});
