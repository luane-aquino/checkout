import React from "react";
import { render, screen } from "@testing-library/react";
import ConfirmationSuccess from "./";
import { usePayment } from "../../store/PaymentDetailsProvider";
import { useCart } from "../../store/CartProvider";
import userEvent from "@testing-library/user-event";

// Mocking the react-router-dom useNavigate
const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

// Mocking the store hooks
jest.mock("../../store/PaymentDetailsProvider");
jest.mock("../../store/CartProvider");

describe("ConfirmationSuccess", () => {
  it("should render ConfirmationSuccess page correctly with provided data", async () => {
    (usePayment as jest.Mock).mockReturnValue({
      payment: {
        cardNumber: "1234567890123456",
        cardHolderName: "John Doe",
        cardValidUntil: "12/2023",
      },
    });
    (useCart as jest.Mock).mockReturnValue({
      cart: {
        products: [{ imageUrl: "example.jpg", description: "Product 1" }],
        paymentPlan: { total: 100, shipping: 10, discount: 5, subtotal: 105 },
      },
    });
    render(<ConfirmationSuccess />);

    // Assert that the rendered text matches the provided data
    expect(screen.getByText("Compra efetuada com sucesso")).toBeVisible();
    expect(screen.getByText("****.****.****.3456")).toBeVisible();
    expect(screen.getByText("John Doe")).toBeVisible();
    expect(screen.getByText("12/2023")).toBeVisible();

    // Assert product details
    const images = await screen.findAllByRole("img", { hidden: true });
    expect(images.length).toBe(1);
    expect(screen.getByText("Product 1")).toBeVisible();

    // Assert payment plan details
    expect(screen.getByLabelText("1 produto, R$ 100,00")).toBeVisible();

    // submit
    const buttonSubmit = screen.getByRole("button", {
      name: "Voltar ao inicio do protótipo",
    });

    expect(buttonSubmit).toHaveClass("secondary");
  });

  it("should navigate to /Bag when button is clicked", () => {
    (usePayment as jest.Mock).mockReturnValue({
      payment: {
        cardNumber: "1234567890123456",
        cardHolderName: "John Doe",
        cardValidUntil: "12/2023",
      },
    });
    (useCart as jest.Mock).mockReturnValue({
      cart: {
        products: [{ imageUrl: "example.jpg", description: "Product 1" }],
        paymentPlan: { total: 100, shipping: 10, discount: 5, subtotal: 105 },
      },
    });
    render(<ConfirmationSuccess />);

    const buttonElement = screen.getByRole("button", {
      name: "Voltar ao inicio do protótipo",
    });

    userEvent.click(buttonElement);

    // Assert that useNavigate was called with the correct path
    expect(mockUseNavigate).toHaveBeenCalledWith("/Bag");
  });
});
