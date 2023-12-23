import React from "react";
import {
  CartContextType,
  PaymentContextType,
  TabContentItemEnum,
} from "../../common/types";
import Tabs from "../../components/molecules/Tabs";
import { usePayment } from "../../store/PaymentDetailsProvider";
import PaymentDetails from "../../components/molecules/PaymentDetails";
import "./styles.scss";
import Card from "../../components/atoms/Card";
import { Product } from "../../components/molecules/Product";
import Container from "../../components/atoms/Container";
import PaymentPlan from "../../components/molecules/PaymentPlan";
import Button from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../store/CartProvider";

const ConfirmationSuccess = () => {
  const { payment } = usePayment() as PaymentContextType;
  const { cart } = useCart() as CartContextType;
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
            {cart.products.map((item, index) => (
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
          quantity={cart.products.length}
          total={cart.paymentPlan.total}
          shipping={cart.paymentPlan.shipping}
          discount={cart.paymentPlan.discount}
          subtotal={cart.paymentPlan.subtotal}
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
