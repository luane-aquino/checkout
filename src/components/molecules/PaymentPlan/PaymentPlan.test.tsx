import React from "react";
import { render, screen } from "@testing-library/react";
import PaymentPlan from "./";
import data from "../../../../public/mocks/productMock.json";
import { CartType } from "../../../common/types";

describe("PaymentPlan", () => {
  it("should show payment plan details", async () => {
    const productsData = data as CartType;
    render(
      <PaymentPlan
        quantity={productsData?.products.length}
        total={productsData?.paymentPlan.total}
        shipping={productsData?.paymentPlan.shipping}
        discount={productsData?.paymentPlan.discount}
        subtotal={productsData?.paymentPlan.subtotal}
      />,
    );

    expect(screen.getByLabelText("3 produtos, R$ 624,80")).toBeVisible();
    expect(screen.getByLabelText("frete, R$ 5,30")).toBeVisible();
    expect(screen.getByLabelText("desconto, R$ 30,00")).toBeVisible();
    expect(screen.getByLabelText("subtotal, R$ 600,10")).toBeVisible();
  });
});
