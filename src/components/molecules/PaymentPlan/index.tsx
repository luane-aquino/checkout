import { formatToBrazilianCurrency } from "../../../utils/currency";
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
        aria-label={`${quantity} ${text}, R$ ${formatToBrazilianCurrency(
          total,
        )}`}
      >
        <p aria-hidden>{`Produtos(${quantity})`}</p>
        <p aria-hidden>R$ {formatToBrazilianCurrency(total)}</p>
      </li>
      <li
        className="payment-plan__item"
        aria-label={`frete, R$ ${formatToBrazilianCurrency(shipping)}`}
      >
        <p aria-hidden>Frete:</p>
        <p aria-hidden>R$ {formatToBrazilianCurrency(shipping)}</p>
      </li>
      <li
        className="payment-plan__item"
        aria-label={`desconto, R$ ${formatToBrazilianCurrency(discount)}`}
      >
        <p aria-hidden>Desconto:</p>
        <p className="purple" aria-hidden>
          R$ {formatToBrazilianCurrency(discount)}
        </p>
      </li>
      <li
        className="payment-plan__item bigger"
        aria-label={`subtotal, R$ ${formatToBrazilianCurrency(subtotal)}`}
      >
        <p aria-hidden>Subtotal</p>
        <p aria-hidden>R$ {formatToBrazilianCurrency(subtotal)}</p>
      </li>
    </ul>
  );
};

export default PaymentPlan;
