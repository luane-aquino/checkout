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
    <li className="ProductInfoWithPrice__list-item">
      <img
        src={imageUrl}
        alt=""
        className="ProductInfoWithPrice__image"
        aria-hidden
      />
      <p className="ProductInfoWithPrice__description">{description}</p>
      <div className="ProductInfoWithPrice__pricing">
        {oldPrice && (
          <div
            className="ProductInfoWithPrice__price-old"
            aria-label={`${formatToBrazilianCurrency(oldPrice)} reais`}
            data-testid="price-old"
          >
            <span aria-hidden>R$ </span>
            <p className="ProductInfoWithPrice__price-old__value" aria-hidden>
              {formatToBrazilianCurrency(oldPrice)}
            </p>
          </div>
        )}
        <p className="ProductInfoWithPrice__price">
          R$ {formatToBrazilianCurrency(price)}
        </p>
      </div>
    </li>
  );
};

export default ProductInfoWithPrice;
