import React from "react";
import { TabContentItemEnum } from "../../common/types";
import Tabs from "../../components/molecules/Tabs";
import { usePayment } from "../../store/PaymentDetailsProvider";
import PaymentDetails from "../../components/molecules/PaymentDetails";
import "./styles.scss";
import Card from "../../components/atoms/Card";
import { Product } from "../../components/molecules/Product";
import { data } from "../../mock/data";
import Container from "../../components/atoms/Container";
import PaymentPlan from "../../components/molecules/PaymentPlan";
import Button from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";

const ConfirmationSuccess = () => {
  const { payment } = usePayment();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Bag");
  };

  return (
    <div className="ConfirmationSuccess">
      <Tabs path={TabContentItemEnum.success} />
      <div className="ConfirmationSuccess__wrapper">
        <PaymentDetails
          lastDigits={payment.cardNumber.slice(-4)}
          cardHolder={payment.cardHolderName}
          expiryDate={payment.cardValidUntil}
        />
        <Card>
          <Product.Title title="Produtos" />
          <Product.Root>
            {data.products.map((item, index) => (
              <Product.Description
                imageUrl={item.imageUrl}
                description={item.description}
                key={index}
              />
            ))}
          </Product.Root>
        </Card>
      </div>
      <Container>
        <PaymentPlan
          quantity={data.products.length}
          total={data.paymentPlan.total}
          shipping={data.paymentPlan.shipping}
          discount={data.paymentPlan.discount}
          subtotal={data.paymentPlan.subtotal}
        />
        <Button
          type="submit"
          text="Voltar ao inicio do protótipo"
          isPrimary={false}
          handleClick={handleClick}
        />
      </Container>
    </div>
  );
};

export default ConfirmationSuccess;
