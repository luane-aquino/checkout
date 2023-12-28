import React, { useEffect } from "react";
import "./styles.scss";
import Tabs from "../../components/molecules/Tabs";
import {
  CartContextType,
  ProductType,
  TabContentItemEnum,
} from "../../common/types";
import Button from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { Product } from "../../components/molecules/Product";
import Card from "../../components/atoms/Card";
import Container from "../../components/atoms/Container";
import PaymentPlan from "../../components/molecules/PaymentPlan";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../apis";
import { useCart } from "../../store/CartProvider";

function Bag() {
  const navigate = useNavigate();
  const { setCartValue } = useCart() as CartContextType;
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const handleClick = () => {
    navigate("/payment");
  };

  useEffect(() => {
    if (data) {
      setCartValue(data);
    }
  }, [data]);

  return (
    <div className="Bag">
      <Tabs path={TabContentItemEnum.bag} />
      <div className="products-wrapper">
        <Card>
          <Product.Root>
            {data?.products.map((item: ProductType, index: number) => (
              <Product.DescriptionWithPrice
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
        <PaymentPlan
          quantity={data?.products.length}
          total={data?.paymentPlan.total}
          shipping={data?.paymentPlan.shipping}
          discount={data?.paymentPlan.discount}
          subtotal={data?.paymentPlan.subtotal}
        />
        <Button text="Seguir para o pagamento" handleClick={handleClick} />
      </Container>
    </div>
  );
}

export default Bag;
