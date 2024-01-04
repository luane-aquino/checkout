import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Payment from "./";
import userEvent from "@testing-library/user-event";
import PaymentDetailsProvider, {
  usePayment,
} from "../../store/PaymentDetailsProvider";
import CartProvider from "../../store/CartProvider";

// Mocking the store hooks
jest.mock("../../store/PaymentDetailsProvider");
jest.mock("../../store/CartProvider");

// Mocking the react-router-dom useNavigate
const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

describe("Payment", () => {
  it("should render Payment page", () => {
    (usePayment as any).mockReturnValue({
      payment: {
        cardNumber: "1234567890123456",
        cardHolderName: "John Doe",
        cardValidUntil: "12/2023",
      },
    });
    render(<Payment />);

    // Assert that the necessary elements are present on the page
    expect(screen.getByRole("tablist")).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Cartão de crédito", level: 1 }),
    ).toBeVisible();
    expect(screen.getByTestId("PaymentPlan")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Finalizar pedido" }),
    ).toBeVisible();
  });

  it.skip("should go to /confirmation", async () => {
    render(
      <PaymentDetailsProvider>
        <CartProvider>
          <Payment />
        </CartProvider>
      </PaymentDetailsProvider>,
    );

    const numberElement = screen.getByLabelText("Número");
    userEvent.type(numberElement, "1234567812345678");
    const cardHolderNameElement = screen.getByLabelText(
      "Nome do titular do cartão",
    );
    userEvent.type(cardHolderNameElement, "maria");
    const validUntilElement = screen.getByLabelText("Data de validade");
    userEvent.type(validUntilElement, "022028");
    const cvvElement = screen.getByLabelText("Código CVV:");
    userEvent.type(cvvElement, "123");

    const buttonSubmit = screen.getByRole("button", {
      name: "Finalizar pedido",
    });

    userEvent.click(buttonSubmit);

    await waitFor(() =>
      expect(mockUseNavigate).toHaveBeenCalledWith("/confirmation"),
    );
  });

  it.skip("should not go to /confirmation when inputs are empty", async () => {
    render(
      <PaymentDetailsProvider>
        <CartProvider>
          <Payment />
        </CartProvider>
      </PaymentDetailsProvider>,
    );

    const buttonSubmit = screen.getByRole("button", {
      name: "Finalizar pedido",
    });

    userEvent.click(buttonSubmit);

    expect(
      await screen.findByText("insira um número de cartão válido"),
    ).toBeVisible();
    expect(screen.getByText("insira um nome válido")).toBeVisible();
    expect(screen.getByText("insira uma data válida")).toBeVisible();
    expect(screen.getByText("insira um cvv válido")).toBeVisible();

    await waitFor(() =>
      expect(mockUseNavigate).not.toHaveBeenCalledWith("/confirmation"),
    );
  });
});
