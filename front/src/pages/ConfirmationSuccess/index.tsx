import Tabs, { TabContentItemEnum } from "../../components/molecules/Tabs";
import { PaymentContextType, usePayment } from "store/PaymentDetailsProvider";
import PaymentDetails from "components/molecules/PaymentDetails";
import "./styles.scss";
import Card from "components/atoms/Card";
import { Product } from "components/molecules/Product";
import Container from "components/atoms/Container";
import PaymentPlan from "components/molecules/PaymentPlan";
import Button from "components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { CartContextType, useCart } from "store/CartProvider";

const ConfirmationSuccess = () => {
  const { payment } = usePayment() as PaymentContextType;
  const {
    cart: { products },
  } = useCart() as CartContextType;
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
            {products.map((item, index) => (
              <Product.Info
                imageUrl={item.imageUrl}
                description={item.description}
                key={index}
              />
            ))}
          </Product.Root>
        </Card>
      </div>
      <Container>
        <PaymentPlan />
        <Button
          type="submit"
          text="Voltar ao inicio do protótipo"
          styleSecondary={true}
          handleClick={handleClick}
        />
      </Container>
    </div>
  );
};

export default ConfirmationSuccess;
