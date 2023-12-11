import { BrazilianCurrency } from "../../../utils/currencyUtils";
import "./styles.scss";

type PaymentPlanType = {
  quantity: number;
  total: number;
  shipping: number;
  discount: number;
  subtotal: number;
};

const PaymentPlan = ({
  quantity,
  total,
  shipping,
  discount,
  subtotal,
}: PaymentPlanType) => {
  return (
    <ul className="payment-plan">
      <li className="payment-plan__item">
        <p>{`Produtos(${quantity})`}</p>
        <p>R$ {BrazilianCurrency.format(total)}</p>
      </li>
      <li className="payment-plan__item">
        <p>Frete:</p>
        <p>R$ {BrazilianCurrency.format(shipping)}</p>
      </li>
      <li className="payment-plan__item">
        <p>Desconto</p>
        <p className="purple">R$ {BrazilianCurrency.format(discount)}</p>
      </li>
      <li className="payment-plan__item bold">
        <p>Subtotal</p>
        <p>R$ {BrazilianCurrency.format(subtotal)}</p>
      </li>
    </ul>
  );
};

export default PaymentPlan;
