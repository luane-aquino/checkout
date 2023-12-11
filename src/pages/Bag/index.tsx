import React from "react";
import "./styles.scss";
import Tabs from "../../components/molecules/Tabs";
import { TabContentItemEnum } from "../../common/types";
import Button from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { Product } from "../../components/molecules/Product";
import { data } from "../../mock/data";
import Card from "../../components/atoms/Card";
import Container from "../../components/atoms/Container";
import PaymentPlan from "../../components/molecules/PaymentPlan";

function Bag() {
  const navigate = useNavigate();
  const handleClick = () => {
    // chama a rota payment
    console.log("***[clicked!]");
    navigate("/payment");
  };

  return (
    <div className="Bag">
      <Tabs path={TabContentItemEnum.bag} />
      {/* produtos */}
      <div className="products-wrapper">
        <Card>
          <Product.Root>
            {data.products.map((item, index) => (
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
      {/* prices */}
      <Container>
        <PaymentPlan
          quantity={data.products.length}
          total={data.paymentPlan.total}
          shipping={data.paymentPlan.shipping}
          discount={data.paymentPlan.discount}
          subtotal={data.paymentPlan.subtotal}
        />
        <Button text="Seguir para o pagamento" handleClick={handleClick} />
      </Container>
    </div>
  );
}

export default Bag;
