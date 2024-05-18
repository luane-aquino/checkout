import { render, screen, waitFor } from "@testing-library/react";
import Payment from "./";
import userEvent from "@testing-library/user-event";
import { usePayment } from "../../store/PaymentDetailsProvider";
import { useCart } from "../../store/CartProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  let queryClient: any;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  it("should render Payment page", () => {
    (usePayment as jest.Mock).mockReturnValue({
      setPaymentValue: jest.fn(),
    });
    (useCart as jest.Mock).mockReturnValue({
      cart: {
        products: [{ imageUrl: "example.jpg", description: "Product 1" }],
        paymentPlan: { total: 100, shipping: 10, discount: 5, subtotal: 105 },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Payment />
      </QueryClientProvider>,
    );

    expect(screen.getByRole("tablist")).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Cartão de crédito", level: 1 }),
    ).toBeVisible();
    expect(screen.getByTestId("PaymentPlan")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Finalizar pedido" }),
    ).toBeVisible();
  });

  it("should be able to submit the payment", async () => {
    (usePayment as jest.Mock).mockReturnValue({
      setPaymentValue: jest.fn(),
    });
    (useCart as jest.Mock).mockReturnValue({
      cart: {
        products: [{ imageUrl: "example.jpg", description: "Product 1" }],
        paymentPlan: { total: 100, shipping: 10, discount: 5, subtotal: 105 },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Payment />
      </QueryClientProvider>,
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

    expect(
      screen.getByRole("button", {
        name: "Finalizar pedido",
      }),
    ).toBeVisible();
  });

  it("should not go to /confirmation when inputs are empty", async () => {
    (usePayment as jest.Mock).mockReturnValue({
      setPaymentValue: jest.fn(),
    });
    (useCart as jest.Mock).mockReturnValue({
      cart: {
        products: [{ imageUrl: "example.jpg", description: "Product 1" }],
        paymentPlan: { total: 100, shipping: 10, discount: 5, subtotal: 105 },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Payment />
      </QueryClientProvider>,
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
