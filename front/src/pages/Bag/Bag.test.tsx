import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartProvider from "../../store/CartProvider";
import Bag from "./";

// Mocking the react-router-dom useNavigate
const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

// Mocking the API call using jest.mock
jest.mock("../../apis", () => ({
  getProducts: jest.fn(() =>
    Promise.resolve({
      paymentPlan: {
        total: 624.8,
        shipping: 5.3,
        discount: 30,
        subtotal: 600.1,
      },
      products: [
        {
          description: "Product 1",
          imageUrl: "image1.jpg",
          price: 100,
          oldPrice: 120,
        },
        {
          description: "Product 2",
          imageUrl: "image2.jpg",
          price: 50,
          oldPrice: null,
        },
      ],
    }),
  ),
}));

describe("Bag", () => {
  let queryClient: any;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  it("should render bag page", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Bag />
        </CartProvider>
      </QueryClientProvider>,
    );

    // Wait for the API call to resolve
    await screen.findByTestId("ProductRoot");

    // Assert that the necessary elements are present on the page
    expect(screen.getByRole("tablist")).toBeVisible();
    expect(screen.getByTestId("ProductRoot")).toBeVisible();
    expect(screen.getByTestId("PaymentPlan")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Seguir para o pagamento" }),
    ).toBeVisible();
  });

  it("should navigate to /payment when the button is clicked", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Bag />
        </CartProvider>
      </QueryClientProvider>,
    );

    // Wait for the API call to resolve
    await screen.findByTestId("ProductRoot");

    // Click the button
    userEvent.click(
      screen.getByRole("button", { name: "Seguir para o pagamento" }),
    );

    // Assert that the useNavigate function is called with the correct path
    expect(mockUseNavigate).toHaveBeenCalledWith("/payment");
  });
});
