import { BrazilianCurrency } from "../../../../utils/currencyUtils";
import "./styles.scss";

type ProductDescriptionWithPriceType = {
  imageUrl: string;
  description: string;
  price: number;
  oldPrice?: number | null;
};

const ProductDescriptionWithPrice = ({
  imageUrl,
  description,
  price,
  oldPrice,
}: ProductDescriptionWithPriceType) => {
  return (
    <li className="list-item">
      <img src={imageUrl} alt="" width="60px" height="60px" className="image" />
      <p className="desc">{description}</p>
      <div className="pricing">
        {oldPrice && (
          <div
            className="price-old"
            aria-label={`${BrazilianCurrency.format(oldPrice)} reais`}
          >
            <span aria-hidden>R$ </span>
            <p className="price-old__value" aria-hidden>
              {BrazilianCurrency.format(oldPrice)}
            </p>
          </div>
        )}
        <p className="price">R$ {BrazilianCurrency.format(price)}</p>
      </div>
    </li>
  );
};

export default ProductDescriptionWithPrice;
