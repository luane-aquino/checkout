import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  it("should show primary button", async () => {
    const text = "example text";
    const clickFn = jest.fn();
    render(<Button text={text} handleClick={clickFn} />);

    const buttonElement = screen.getByRole("button", { name: text });
    expect(buttonElement).toBeVisible();
    userEvent.click(buttonElement);
    expect(clickFn).toHaveBeenCalledTimes(1);
    expect(buttonElement).toHaveClass("primary");
  });

  it("should show button with secondary color", async () => {
    const text = "example text";
    const clickFn = jest.fn();
    render(<Button text={text} handleClick={clickFn} isPrimary={false} />);

    const buttonElement = screen.getByRole("button", { name: text });
    expect(buttonElement).toBeVisible();
    userEvent.click(buttonElement);
    expect(clickFn).toHaveBeenCalledTimes(1);
    expect(buttonElement).toHaveClass("secondary");
  });
});
