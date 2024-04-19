import { useEffect, useState } from "react";
import "./styles.scss";
import Tabs, { TabContentItemEnum } from "components/molecules/Tabs";
import Button from "components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { Product } from "components/molecules/Product";
import Card from "components/atoms/Card";
import Container from "components/atoms/Container";
import PaymentPlan from "components/molecules/PaymentPlan";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "apis";
import { CartContextType, CartType, useCart } from "store/CartProvider";
import { normalizeData } from "utils/helpers";
import Loading from "components/molecules/Loading";

export type ProductType = {
  imageUrl: string;
  description: string;
  price: number;
  oldPrice?: number;
};

function Bag() {
  const navigate = useNavigate();
  const { setCartValue } = useCart() as CartContextType;
  const [cart, setCart] = useState<CartType>();
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getProducts,
  });

  const handleClick = () => {
    navigate("/payment");
  };

  useEffect(() => {
    if (data) {
      const normalizedData = normalizeData(data);
      setCartValue(normalizedData);
      setCart(normalizedData);
    }
  }, [data, setCartValue]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="Bag">
      <Tabs path={TabContentItemEnum.bag} />
      <div className="products-wrapper">
        <Card>
          <Product.Root>
            {cart?.products.map((item: ProductType, index: number) => (
              <Product.InfoWithPrice
                imageUrl={item.imageUrl}
                description={item.description}
                price={item.price}
                oldPrice={item.oldPrice}
                key={index}
              />
            ))}
          </Product.Root>
        </Card>
      </div>
      <Container>
        <PaymentPlan />
        <Button text="Seguir para o pagamento" handleClick={handleClick} />
      </Container>
    </div>
  );
}

export default Bag;
