import React from "react";
import { render, screen } from "@testing-library/react";
import { Product } from "./index";
import Card from "../../atoms/Card";
import { ProductType } from "../../../pages/Bag";
import { CartType } from "../../../store/CartProvider";

const data = {
  paymentPlan: {
    total: 624.8,
    shipping: 5.3,
    discount: 30,
    subtotal: 600.1,
  },
  products: [
    {
      description:
        "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução",
      imageUrl:
        "https://www.alboradainfo.com/image/cache/produto/2152/59f985654994860cdfbf736edb4e70b6.jpg",
      price: 225.9,
      oldPrice: 243.9,
    },
    {
      description:
        "Good Girl Carolina Herrera Eau de Parfum - Perfume Feminino 30ml",
      imageUrl:
        "https://epocacosmeticos.vteximg.com.br/arquivos/ids/438948-500-500/good-girl-eau-de-parfum-carolina-herrera-perfume-feminino-30ml.jpg?v=637600522703130000",
      price: 299,
      oldPrice: null,
    },
    {
      description: "Senscience Inner Restore Intensif - Máscara Capilar 50ml",
      imageUrl:
        "https://prohair.vteximg.com.br/arquivos/ids/155822-500-500/2021_MI_SENS_Foto_Producto_Inner-Restore_50ml_Fte.png?v=637965126747670000",
      price: 99.9,
      oldPrice: null,
    },
  ],
};

describe("Product", () => {
  it("should show product details", async () => {
    const productsData = data as CartType;
    render(
      <Card>
        <Product.Root>
          {productsData?.products.map((item: ProductType, index: number) => (
            <Product.InfoWithPrice
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
            <Product.InfoWithPrice
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

  it("should show product details without price", async () => {
    const productsData = data as CartType;
    render(
      <Card>
        <Product.Root>
          {productsData?.products.map((item: ProductType, index: number) => (
            <Product.Info
              imageUrl={item.imageUrl}
              description={item.description}
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
    expect(screen.queryByText("243,90")).not.toBeInTheDocument();
    expect(screen.queryByText("R$ 225,90")).not.toBeInTheDocument();
  });
});
