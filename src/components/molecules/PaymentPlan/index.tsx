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
  const text = quantity === 1 ? "produto" : "produtos";
  return (
    <ul className="payment-plan" data-testid="PaymentPlan">
      <li
        className="payment-plan__item"
        aria-label={`${quantity} ${text}, R$ ${BrazilianCurrency.format(
          total,
        )}`}
      >
        <p aria-hidden>{`Produtos(${quantity})`}</p>
        <p aria-hidden>R$ {BrazilianCurrency.format(total)}</p>
      </li>
      <li
        className="payment-plan__item"
        aria-label={`frete, R$ ${BrazilianCurrency.format(shipping)}`}
      >
        <p aria-hidden>Frete:</p>
        <p aria-hidden>R$ {BrazilianCurrency.format(shipping)}</p>
      </li>
      <li
        className="payment-plan__item"
        aria-label={`desconto, R$ ${BrazilianCurrency.format(discount)}`}
      >
        <p aria-hidden>Desconto:</p>
        <p className="purple" aria-hidden>
          R$ {BrazilianCurrency.format(discount)}
        </p>
      </li>
      <li
        className="payment-plan__item bigger"
        aria-label={`subtotal, R$ ${BrazilianCurrency.format(subtotal)}`}
      >
        <p aria-hidden>Subtotal</p>
        <p aria-hidden>R$ {BrazilianCurrency.format(subtotal)}</p>
      </li>
    </ul>
  );
};

export default PaymentPlan;
