import { CartContextType, useCart } from "../../../store/CartProvider";
import { formatToBrazilianCurrency } from "../../../utils/currency";
import "./styles.scss";

const PaymentPlan = () => {
  const {
    cart: { products, paymentPlan },
  } = useCart() as CartContextType;
  const text = products.length === 1 ? "produto" : "produtos";

  return (
    <ul className="payment-plan" data-testid="PaymentPlan">
      <li
        className="payment-plan__item"
        aria-label={`${products.length} ${text}, R$ ${formatToBrazilianCurrency(
          paymentPlan.total,
        )}`}
      >
        <p aria-hidden>{`Produtos(${products.length})`}</p>
        <p aria-hidden>R$ {formatToBrazilianCurrency(paymentPlan.total)}</p>
      </li>
      <li
        className="payment-plan__item"
        aria-label={`frete, R$ ${formatToBrazilianCurrency(
          paymentPlan.shipping,
        )}`}
      >
        <p aria-hidden>Frete:</p>
        <p aria-hidden>R$ {formatToBrazilianCurrency(paymentPlan.shipping)}</p>
      </li>
      <li
        className="payment-plan__item"
        aria-label={`desconto, R$ ${formatToBrazilianCurrency(
          paymentPlan.discount,
        )}`}
      >
        <p aria-hidden>Desconto:</p>
        <p className="purple" aria-hidden>
          R$ {formatToBrazilianCurrency(paymentPlan.discount)}
        </p>
      </li>
      <li
        className="payment-plan__item bigger"
        aria-label={`subtotal, R$ ${formatToBrazilianCurrency(
          paymentPlan.subtotal,
        )}`}
      >
        <p aria-hidden>Subtotal</p>
        <p aria-hidden>R$ {formatToBrazilianCurrency(paymentPlan.subtotal)}</p>
      </li>
    </ul>
  );
};

export default PaymentPlan;
