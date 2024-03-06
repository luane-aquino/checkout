import React from "react";
import { render, screen } from "@testing-library/react";
import PaymentPlan from "./";
import { useCart } from "../../../store/CartProvider";

// Mocking the store hooks
jest.mock("../../../store/CartProvider");

describe("PaymentPlan", () => {
  it("should show payment plan details", async () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: {
        products: [
          { imageUrl: "example.jpg", description: "Product 1" },
          { imageUrl: "example.jpg", description: "Product 2" },
        ],
        paymentPlan: { total: 100, shipping: 10, discount: 5, subtotal: 105 },
      },
    });
    render(<PaymentPlan />);
    expect(screen.getByLabelText("2 produtos, R$ 100,00")).toBeVisible();
    expect(screen.getByLabelText("frete, R$ 10,00")).toBeVisible();
    expect(screen.getByLabelText("desconto, R$ 5,00")).toBeVisible();
    expect(screen.getByLabelText("subtotal, R$ 105,00")).toBeVisible();
  });
});
