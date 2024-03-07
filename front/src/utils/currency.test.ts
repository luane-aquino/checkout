import React from "react";
import { formatToBrazilianCurrency } from "./currency";

describe("utils", () => {
  it("should format number to brazilian currency", async () => {
    const result = formatToBrazilianCurrency(115.5);
    expect(result).toBe("115,50");
  });
});
