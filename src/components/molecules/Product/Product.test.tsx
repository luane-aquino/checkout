import React from "react";
import { render, screen } from "@testing-library/react";
import { Product } from "./index";
import Card from "../../atoms/Card";
import { CartType, ProductType } from "../../../common/types";
import data from "../../../../public/mocks/productMock.json";

describe("Product", () => {
  it("should show product details", async () => {
    const productsData = data as CartType;
    render(
      <Card>
        <Product.Root>
          {productsData?.products.map((item: ProductType, index: number) => (
            <Product.DescriptionWithPrice
              imageUrl={item.imageUrl}
              description={item.description}
              price={item.price}
              oldPrice={item.oldPrice}
              key={index}
            />
          ))}
        </Product.Root>
      </Card>,
    );

    const images = await screen.findAllByRole("img", { hidden: true });
    expect(images.length).toBe(3);
    expect(
      screen.getByText(
        "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução",
      ),
    ).toBeVisible();
    expect(screen.getByText("243,90")).toBeVisible();
    expect(screen.getByText("R$ 225,90")).toBeVisible();
  });

  it("should show old price only once", () => {
    const productsData = data as CartType;
    render(
      <Card>
        <Product.Root>
          {productsData?.products.map((item: ProductType, index: number) => (
            <Product.DescriptionWithPrice
              imageUrl={item.imageUrl}
              description={item.description}
              price={item.price}
              oldPrice={item.oldPrice}
              key={index}
            />
          ))}
        </Product.Root>
      </Card>,
    );

    expect(screen.getAllByTestId("price-old").length).toBe(1);
  });
});
