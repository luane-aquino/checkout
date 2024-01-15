import Card from "../../atoms/Card";
import "./styles.scss";

type PaymentDetailsType = {
  lastDigits: string;
  cardHolder: string;
  expiryDate: string;
};

const PaymentDetails = ({
  lastDigits,
  cardHolder,
  expiryDate,
}: PaymentDetailsType) => {
  return (
    <Card>
      <div className="PaymentDetails__wrapper">
        <p className="PaymentDetails__title">Compra efetuada com sucesso</p>
        <p className="PaymentDetails__text">****.****.****.{lastDigits}</p>
        <p className="PaymentDetails__text">{cardHolder}</p>
        <p className="PaymentDetails__text">{expiryDate}</p>
      </div>
    </Card>
  );
};

export default PaymentDetails;
