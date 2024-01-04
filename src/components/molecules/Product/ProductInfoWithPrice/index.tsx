import { formatToBrazilianCurrency } from "../../../../utils/currency";
import "./styles.scss";

type ProductInfoWithPriceType = {
  imageUrl: string;
  description: string;
  price: number;
  oldPrice?: number | null;
};

const ProductInfoWithPrice = ({
  imageUrl,
  description,
  price,
  oldPrice,
}: ProductInfoWithPriceType) => {
  return (
    <li className="list-item">
      <img
        src={imageUrl}
        alt=""
        width="60px"
        height="60px"
        className="image"
        aria-hidden
      />
      <p className="desc">{description}</p>
      <div className="pricing">
        {oldPrice && (
          <div
            className="price-old"
            aria-label={`${formatToBrazilianCurrency(oldPrice)} reais`}
            data-testid="price-old"
          >
            <span aria-hidden>R$ </span>
            <p className="price-old__value" aria-hidden>
              {formatToBrazilianCurrency(oldPrice)}
            </p>
          </div>
        )}
        <p className="price">R$ {formatToBrazilianCurrency(price)}</p>
      </div>
    </li>
  );
};

export default ProductInfoWithPrice;
