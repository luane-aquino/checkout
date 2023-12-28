import React from "react";
import { render, screen } from "@testing-library/react";
import PaymentDetails from "./";

const paymentDetailsMock = {
  lastDigits: "1234",
  cardHolder: "John Doe",
  expiryDate: "12/2023",
};

describe("PaymentDetails", () => {
  it("should render PaymentDetails component correctly with provided data", () => {
    render(
      <PaymentDetails
        lastDigits={paymentDetailsMock.lastDigits}
        cardHolder={paymentDetailsMock.cardHolder}
        expiryDate={paymentDetailsMock.expiryDate}
      />,
    );

    // Assert that the rendered text matches the provided data
    expect(
      screen.getByText(`****.****.****.${paymentDetailsMock.lastDigits}`),
    ).toBeVisible();
    expect(screen.getByText(paymentDetailsMock.cardHolder)).toBeVisible();
    expect(screen.getByText(paymentDetailsMock.expiryDate)).toBeVisible();
  });
});
